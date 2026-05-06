# Rabbit Behavioral Diagrams

This document summarizes Rabbit's runtime behavior after reviewing the frontend route map, Redux/API calls, Express routes, middleware, and persistence models. Diagrams are written in Mermaid so they can be rendered by GitHub, many Markdown previewers, and Mermaid Live Editor.

PlantUML equivalents are available as separate self-contained `.puml` files in `docs/plantuml/README.md` for teams that prefer PlantUML renderers or need one source file per diagram.

Rendered SVG visualizations are embedded in `docs/diagram-visualizations.md` for quick viewing without a separate diagram renderer.

## System Actors and Boundary

Rabbit has three primary external actors:

- **Guest shopper**: browses products, searches/filters, subscribes to the newsletter, and can maintain a guest cart.
- **Authenticated customer**: does everything a guest can do, plus merges a guest cart, checks out, pays with PayPal, and views orders.
- **Admin user**: manages users, products, images, and orders through protected admin routes.

Supporting external systems are **PayPal** for payment capture, **Cloudinary** for image uploads, and **MongoDB** for persistence.

---

## Use Case Diagram

```mermaid
flowchart LR
    Guest([Guest shopper])
    Customer([Authenticated customer])
    Admin([Admin user])
    PayPal([PayPal])
    Cloudinary([Cloudinary])
    MongoDB[(MongoDB)]

    subgraph Rabbit["Rabbit e-commerce platform"]
        UC_Browse((Browse catalog))
        UC_Search((Search/filter/sort products))
        UC_ViewProduct((View product details))
        UC_ViewSimilar((View similar products))
        UC_Subscribe((Subscribe to newsletter))
        UC_Register((Register account))
        UC_Login((Log in))
        UC_GuestCart((Manage guest cart))
        UC_UserCart((Manage customer cart))
        UC_MergeCart((Merge guest cart on login))
        UC_Checkout((Create checkout session))
        UC_Pay((Pay for checkout))
        UC_Finalize((Finalize order))
        UC_ViewOrders((View own orders))
        UC_ViewProfile((View profile))
        UC_AdminUsers((Manage users))
        UC_AdminProducts((Create/update/delete products))
        UC_AdminImages((Upload product images))
        UC_AdminOrders((Manage order fulfillment))
        UC_Protect((Authorize protected routes))
    end

    Guest --> UC_Browse
    Guest --> UC_Search
    Guest --> UC_ViewProduct
    Guest --> UC_ViewSimilar
    Guest --> UC_Subscribe
    Guest --> UC_Register
    Guest --> UC_Login
    Guest --> UC_GuestCart

    Customer --> UC_Browse
    Customer --> UC_Search
    Customer --> UC_ViewProduct
    Customer --> UC_UserCart
    Customer --> UC_MergeCart
    Customer --> UC_Checkout
    Customer --> UC_Pay
    Customer --> UC_Finalize
    Customer --> UC_ViewOrders
    Customer --> UC_ViewProfile

    Admin --> UC_Login
    Admin --> UC_AdminUsers
    Admin --> UC_AdminProducts
    Admin --> UC_AdminImages
    Admin --> UC_AdminOrders

    UC_UserCart -. includes .-> UC_Protect
    UC_MergeCart -. includes .-> UC_Protect
    UC_Checkout -. includes .-> UC_Protect
    UC_Pay -. includes .-> UC_Protect
    UC_Finalize -. includes .-> UC_Protect
    UC_ViewOrders -. includes .-> UC_Protect
    UC_ViewProfile -. includes .-> UC_Protect
    UC_AdminUsers -. includes .-> UC_Protect
    UC_AdminProducts -. includes .-> UC_Protect
    UC_AdminOrders -. includes .-> UC_Protect

    UC_Pay --> PayPal
    UC_AdminImages --> Cloudinary

    UC_Browse --> MongoDB
    UC_Search --> MongoDB
    UC_ViewProduct --> MongoDB
    UC_ViewSimilar --> MongoDB
    UC_Subscribe --> MongoDB
    UC_Register --> MongoDB
    UC_Login --> MongoDB
    UC_GuestCart --> MongoDB
    UC_UserCart --> MongoDB
    UC_MergeCart --> MongoDB
    UC_Checkout --> MongoDB
    UC_Finalize --> MongoDB
    UC_ViewOrders --> MongoDB
    UC_AdminUsers --> MongoDB
    UC_AdminProducts --> MongoDB
    UC_AdminOrders --> MongoDB
```

---

## Sequence Diagrams

### 1. Registration, Login, Protected Access, and Guest Cart Merge

```mermaid
sequenceDiagram
    autonumber
    actor Shopper
    participant React as React app / Redux
    participant API as Express API
    participant Auth as Auth middleware
    participant User as User model
    participant Cart as Cart model
    participant JWT as JWT service

    opt New account
        Shopper->>React: Submit registration form
        React->>API: POST /api/users/register
        API->>User: findOne(email)
        alt Email already exists
            User-->>API: Existing user
            API-->>React: 400 User already exists
        else Email is available
            API->>User: save(name, email, hashed password, customer role)
            API->>JWT: sign({ user: { id, role } }, JWT_SECRET)
            JWT-->>API: token
            API-->>React: 201 user + token
        end
    end

    Shopper->>React: Submit login form
    React->>API: POST /api/users/login
    API->>User: findOne(email)
    alt User missing or password mismatch
        API-->>React: 400 Invalid credentials
    else Credentials valid
        API->>User: matchPassword(password)
        API->>JWT: sign({ user: { id, role } }, JWT_SECRET)
        JWT-->>API: token
        API-->>React: user + token
        React->>API: POST /api/cart/merge with Bearer token + guestId
        API->>Auth: protect
        Auth->>JWT: verify token
        Auth->>User: findById(decoded.user.id).select(-password)
        User-->>Auth: req.user
        Auth-->>API: next()
        API->>Cart: find guestCart and userCart
        alt Guest cart and user cart exist
            API->>Cart: merge matching size/color/product lines
            API->>Cart: recalculate totalPrice and save userCart
            API->>Cart: delete guestCart
            API-->>React: 200 merged userCart
        else Guest cart only
            API->>Cart: assign guest cart to req.user and clear guestId
            API-->>React: 200 assigned cart
        else No guest cart but user cart exists
            API-->>React: 200 userCart
        else No cart exists
            API-->>React: 404 No Cart Found
        end
    end

    Shopper->>React: Open protected profile/admin route
    React->>API: GET protected endpoint with Bearer token
    API->>Auth: protect and optional admin check
    alt Missing/invalid token
        API-->>React: 401 not authorized
    else Non-admin requests admin route
        API-->>React: 403 not authorized as admin
    else Authorized
        API-->>React: Protected data
    end
```

### 2. Catalog Browsing, Product Details, and Cart Management

```mermaid
sequenceDiagram
    autonumber
    actor Shopper
    participant React as React app / Redux
    participant API as Express API
    participant Product as Product model
    participant Cart as Cart model

    Shopper->>React: Visit home, collection, search, or sort/filter view
    React->>API: GET /api/products?collection&category&gender&size&brand&material&color&price&sortBy&limit&search
    API->>Product: Build Mongo query from optional filters
    API->>Product: find(query).sort(sort).limit(limit)
    Product-->>API: Product list
    API-->>React: Product list JSON

    Shopper->>React: Open product details
    React->>API: GET /api/products/:id
    API->>Product: findById(id)
    alt Product found
        Product-->>API: Product document
        API-->>React: Product details
        React->>API: GET /api/products/similar/:id
        API->>Product: find current product
        API->>Product: find same category/gender excluding current id, sort by rating, limit 4
        API-->>React: Similar products
    else Product not found
        API-->>React: 404 Product not found
    end

    Shopper->>React: Add product to cart
    React->>API: POST /api/cart with productId, quantity, size, color, guestId or userId
    API->>Product: findById(productId)
    alt Product missing
        API-->>React: 404 Product not found
    else Product exists
        API->>Cart: find by userId or guestId
        alt Existing cart has same product/size/color
            API->>Cart: increment quantity and recalculate totalPrice
            API-->>React: 200 updated cart
        else Existing cart lacks selected variant
            API->>Cart: push new product line and recalculate totalPrice
            API-->>React: 200 updated cart
        else No existing cart
            API->>Cart: create cart with user or generated guestId
            API-->>React: 201 new cart
        end
    end

    opt Update quantity
        Shopper->>React: Change cart quantity
        React->>API: PUT /api/cart
        API->>Cart: find cart and matching line
        alt Quantity greater than zero
            API->>Cart: set quantity and recalculate totalPrice
        else Quantity zero or lower
            API->>Cart: remove product line and recalculate totalPrice
        end
        API-->>React: Updated cart or 404
    end

    opt Remove item
        Shopper->>React: Remove cart item
        React->>API: DELETE /api/cart
        API->>Cart: remove matching product/size/color line and recalculate totalPrice
        API-->>React: Updated cart or 404
    end
```

### 3. Checkout, PayPal Payment, Order Finalization, and Customer Order Views

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant React as React Checkout UI
    participant Redux as Checkout thunk / axios
    participant API as Express API
    participant Auth as Auth middleware
    participant Checkout as Checkout model
    participant PayPal as PayPal SDK
    participant Order as Order model
    participant Cart as Cart model

    Customer->>React: Open checkout page
    alt Cart missing or empty
        React-->>Customer: Redirect home / show empty cart
    else Cart has products
        Customer->>React: Submit shipping address
        React->>Redux: createCheckout(checkoutItems, shippingAddress, PayPal, totalPrice)
        Redux->>API: POST /api/checkout with Bearer token
        API->>Auth: protect
        Auth-->>API: req.user
        alt No checkout items
            API-->>Redux: 400 No items in checkout
        else Checkout data valid
            API->>Checkout: create pending checkout session
            Checkout-->>API: Checkout document with _id
            API-->>Redux: 201 checkout
            Redux-->>React: checkoutId
        end

        React->>PayPal: Render PayPalButtons with USD amount
        Customer->>PayPal: Approve payment
        PayPal-->>React: Captured payment details
        React->>API: PUT /api/checkout/:id/pay with paymentStatus=paid
        API->>Auth: protect
        Auth-->>API: req.user
        API->>Checkout: findById(id)
        alt Checkout missing
            API-->>React: 404 Checkout not found
        else Status is paid
            API->>Checkout: set isPaid, paymentStatus, paymentDetails, paidAt
            API-->>React: 200 paid checkout
            React->>API: POST /api/checkout/:id/finalize
            API->>Auth: protect
            Auth-->>API: req.user
            API->>Checkout: findById(id)
            alt Checkout paid and not finalized
                API->>Order: create order from checkout items/address/payment
                API->>Checkout: set isFinalized and finalizedAt
                API->>Cart: delete user cart
                API-->>React: 201 final order
                React-->>Customer: Navigate to order confirmation
            else Already finalized
                API-->>React: 400 checkout already finalized
            else Not paid
                API-->>React: 400 checkout is not paid
            end
        else Invalid payment status
            API-->>React: 400 Invalid Payment Status
        end
    end

    Customer->>React: View order list or order details
    React->>API: GET /api/orders/my-orders or /api/orders/:id with Bearer token
    API->>Auth: protect
    Auth-->>API: req.user
    API->>Order: find by authenticated user or order id
    Order-->>API: Order data
    API-->>React: Orders/details JSON
```

### 4. Admin Management and Image Upload

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant React as Admin dashboard
    participant API as Express API
    participant Auth as Auth + admin middleware
    participant User as User model
    participant Product as Product model
    participant Order as Order model
    participant Upload as Multer memory storage
    participant Cloudinary as Cloudinary upload stream

    Admin->>React: Open /admin route
    React->>React: ProtectedRoute requires user.role == admin
    alt Not logged in or wrong role
        React-->>Admin: Redirect to /login
    else Admin role present
        React-->>Admin: Render AdminLayout
    end

    opt Manage users
        Admin->>React: List/create/update/delete users
        React->>API: GET/POST/PUT/DELETE /api/admin/users with Bearer token
        API->>Auth: protect then admin
        Auth-->>API: Authorized admin
        API->>User: query, create, update, or delete user
        API-->>React: User result or error
    end

    opt Manage products
        Admin->>React: List products
        React->>API: GET /api/admin/products with Bearer token
        API->>Auth: protect then admin
        API->>Product: find({})
        API-->>React: Products

        Admin->>React: Create/update/delete product
        React->>API: POST/PUT/DELETE /api/products with Bearer token
        API->>Auth: protect then admin
        API->>Product: save, update fields, or delete product
        API-->>React: Product result or error
    end

    opt Upload image
        Admin->>React: Select image file
        React->>API: POST /api/upload multipart image
        API->>Upload: store file in memory
        alt No file uploaded
            API-->>React: 404 No File Uploaded
        else File present
            API->>Cloudinary: upload_stream(file buffer)
            Cloudinary-->>API: secure_url
            API-->>React: image_url
        end
    end

    opt Manage orders
        Admin->>React: List/update/delete orders
        React->>API: GET/PUT/DELETE /api/admin/orders with Bearer token
        API->>Auth: protect then admin
        API->>Order: find all, set status/deliveredAt, or delete
        API-->>React: Order result or error
    end
```

---

## Activity Diagrams

### 1. Customer Shopping and Checkout Activity

```mermaid
flowchart TD
    Start([Start]) --> Browse[Browse home, collections, best sellers, or new arrivals]
    Browse --> Filter{Apply filters/search/sort?}
    Filter -- Yes --> Query[Build product query from category, gender, size, color, brand, material, price, sort, limit, and search]
    Query --> Results[Display matching products]
    Filter -- No --> Results
    Results --> Details{Open product details?}
    Details -- Yes --> Product[Fetch product by id and similar products]
    Details -- No --> Choose
    Product --> Choose[Choose size/color/quantity]
    Choose --> AddCart[Add item to guest or user cart]
    AddCart --> CartExists{Cart exists?}
    CartExists -- Yes --> VariantExists{Same product, size, and color exists?}
    VariantExists -- Yes --> Increment[Increment quantity]
    VariantExists -- No --> AddLine[Add new cart line]
    CartExists -- No --> NewCart[Create new cart with guestId or user id]
    Increment --> Total[Recalculate total price]
    AddLine --> Total
    NewCart --> Total
    Total --> Continue{Continue shopping?}
    Continue -- Yes --> Browse
    Continue -- No --> Authenticated{Authenticated customer?}
    Authenticated -- No --> LoginOrRegister[Log in or register]
    LoginOrRegister --> Merge[Merge guest cart into user cart]
    Merge --> Checkout
    Authenticated -- Yes --> Checkout[Open checkout]
    Checkout --> CartValid{Cart has items?}
    CartValid -- No --> Home[Redirect home or show empty cart]
    CartValid -- Yes --> Shipping[Enter contact and shipping details]
    Shipping --> CreateCheckout[Create pending checkout session]
    CreateCheckout --> PayPal[Approve/capture PayPal payment]
    PayPal --> Paid{Payment status == paid?}
    Paid -- No --> PaymentError[Show payment error]
    PaymentError --> PayPal
    Paid -- Yes --> MarkPaid[Mark checkout paid]
    MarkPaid --> Finalize{Checkout paid and not finalized?}
    Finalize -- Already finalized --> FinalizedError[Return already finalized error]
    Finalize -- Not paid --> UnpaidError[Return checkout not paid error]
    Finalize -- Yes --> CreateOrder[Create final order from checkout]
    CreateOrder --> ClearCart[Delete customer cart]
    ClearCart --> Confirmation[Show order confirmation]
    Confirmation --> Orders[Customer can view my orders or order details]
    Orders --> End([End])
    Home --> End
```

### 2. Authentication and Authorization Activity

```mermaid
flowchart TD
    Start([Request starts]) --> NeedsAuth{Endpoint requires authentication?}
    NeedsAuth -- No --> PublicHandler[Run public route handler]
    PublicHandler --> PublicResponse[Return route response]
    PublicResponse --> End([End])

    NeedsAuth -- Yes --> HasHeader{Authorization header starts with Bearer?}
    HasHeader -- No --> NoToken[Return 401: no token provided]
    HasHeader -- Yes --> Verify[Verify JWT with JWT_SECRET]
    Verify --> ValidToken{Token valid?}
    ValidToken -- No --> BadToken[Return 401: token failed]
    ValidToken -- Yes --> LoadUser[Load user by decoded user id without password]
    LoadUser --> AdminRequired{Route requires admin?}
    AdminRequired -- No --> PrivateHandler[Run private route handler]
    AdminRequired -- Yes --> IsAdmin{req.user.role == admin?}
    IsAdmin -- No --> Forbidden[Return 403: not authorized as admin]
    IsAdmin -- Yes --> AdminHandler[Run admin route handler]
    PrivateHandler --> Success[Return protected response]
    AdminHandler --> Success
    Success --> End
    NoToken --> End
    BadToken --> End
    Forbidden --> End
```

### 3. Admin Operations Activity

```mermaid
flowchart TD
    Start([Admin starts]) --> ClientGuard{Frontend user exists and role is admin?}
    ClientGuard -- No --> Login[Redirect to login]
    ClientGuard -- Yes --> Dashboard[Render admin dashboard]
    Dashboard --> Operation{Choose operation}

    Operation -- Users --> Users[GET/POST/PUT/DELETE /api/admin/users]
    Users --> UserAuth[Backend protect + admin]
    UserAuth --> UserAction{Action type}
    UserAction -- List --> UserList[Find all users without passwords]
    UserAction -- Create --> UserCreate[Reject duplicate email or create user]
    UserAction -- Update --> UserUpdate[Patch name/email/role]
    UserAction -- Delete --> UserDelete[Delete user]
    UserList --> Done[Return JSON result]
    UserCreate --> Done
    UserUpdate --> Done
    UserDelete --> Done

    Operation -- Products --> Products[Manage /api/admin/products and /api/products]
    Products --> ProductAuth[Backend protect + admin]
    ProductAuth --> ProductAction{Action type}
    ProductAction -- List --> ProductList[Find all products]
    ProductAction -- Create --> ProductCreate[Create product with admin user id]
    ProductAction -- Update --> ProductUpdate[Patch supplied product fields]
    ProductAction -- Delete --> ProductDelete[Delete product]
    ProductList --> Done
    ProductCreate --> Done
    ProductUpdate --> Done
    ProductDelete --> Done

    Operation -- Images --> Images[POST /api/upload]
    Images --> FilePresent{Image file present?}
    FilePresent -- No --> UploadError[Return no file uploaded]
    FilePresent -- Yes --> Stream[Stream memory buffer to Cloudinary]
    Stream --> ImageUrl[Return secure image_url]
    ImageUrl --> Done
    UploadError --> Done

    Operation -- Orders --> Orders[GET/PUT/DELETE /api/admin/orders]
    Orders --> OrderAuth[Backend protect + admin]
    OrderAuth --> OrderAction{Action type}
    OrderAction -- List --> OrderList[Find all orders and populate user name/email]
    OrderAction -- Update --> OrderUpdate[Set status; if Delivered set isDelivered and deliveredAt]
    OrderAction -- Delete --> OrderDelete[Delete order]
    OrderList --> Done
    OrderUpdate --> Done
    OrderDelete --> Done

    Done --> More{Another admin action?}
    More -- Yes --> Operation
    More -- No --> End([End])
    Login --> End
```

---

## Source-to-Diagram Traceability

| Diagram area | Primary code reviewed |
| --- | --- |
| Frontend route map and admin guard | `frontend/src/App.jsx`, `frontend/src/components/Common/ProtectedRoute.jsx` |
| Authentication and authorization | `backend/routes/userRoutes.js`, `backend/Middleware/AuthMiddleware.js`, `backend/models/User.js` |
| Catalog and product management | `backend/routes/productRoutes.js`, `backend/routes/productAdminRoutes.js`, `backend/models/Product.js` |
| Cart behavior and guest merge | `backend/routes/cartRoutes.js`, `backend/models/Cart.js` |
| Checkout, PayPal, and order finalization | `frontend/src/components/Cart/Checkout.jsx`, `frontend/src/components/Cart/PayPalButton.jsx`, `backend/routes/checkoutRoutes.js`, `backend/routes/orderRoutes.js` |
| Admin users/products/orders/uploads | `backend/routes/adminRoutes.js`, `backend/routes/productRoutes.js`, `backend/routes/productAdminRoutes.js`, `backend/routes/adminOrderRoutes.js`, `backend/routes/uploaderRoutes.js` |
| API mounting and system boundary | `backend/server.js` |
