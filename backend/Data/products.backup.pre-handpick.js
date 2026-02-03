// product.js:


const products = [
  {
    name: "Classic Oxford Button-Down Shirt",
    description:
      "This classic Oxford shirt is tailored for a polished yet casual look. Crafted from high-quality cotton, it features a button-down collar and a comfortable, slightly relaxed fit. Perfect for both formal and casual occasions, it comes with long sleeves, a button placket, and a yoke at the back. The shirt is finished with a gently rounded hem and adjustable button cuffs.",
    price: 39.99,
    discountPrice: 34.99,
    countInStock: 20,
    sku: "OX-SH-001",
    category: "Top Wear",
    brand: "Urban Threads",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Blue", "Yellow"],
    collections: "Business Casual",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/33544801/pexels-photo-33544801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Classic Oxford Button-Down Shirt Front View",
      },
      {
        url: "https://images.pexels.com/photos/15557047/pexels-photo-15557047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Classic Oxford Button-Down Shirt Back View",
      },
    ],
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Slim-Fit Stretch Shirt",
    description:
      "A versatile slim-fit shirt perfect for business or evening events. Designed with a fitted silhouette, the added stretch provides maximum comfort throughout the day. Features a crisp turn-down collar, button placket, and adjustable cuffs.",
    price: 29.99,
    discountPrice: 24.99,
    countInStock: 35,
    sku: "SLIM-SH-002",
    category: "Top Wear",
    brand: "Modern Fit",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy Blue", "Burgundy"],
    collections: "Formal Wear",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/32414872/pexels-photo-32414872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Slim-Fit Stretch Shirt Front View",
      },
      {
        url: "https://images.pexels.com/photos/12446409/pexels-photo-12446409.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Slim-Fit Stretch Shirt Back View",
      },
    ],
    rating: 4.8,
    numReviews: 15,
  },
  {
    name: "Casual Denim Shirt",
    description:
      "This casual denim shirt is made from lightweight cotton denim. It features a regular fit, snap buttons, and a straight hem. With Western-inspired details, this shirt is perfect for layering or wearing solo.",
    price: 49.99,
    discountPrice: 44.99,
    countInStock: 15,
    sku: "CAS-DEN-003",
    category: "Top Wear",
    brand: "Street Style",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Light Blue", "Dark Wash"],
    collections: "Casual Wear",
    material: "Denim",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/32490940/pexels-photo-32490940.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Casual Denim Shirt Front View",
      },
      {
        url: "https://images.pexels.com/photos/32490938/pexels-photo-32490938.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Casual Denim Shirt Back View",
      },
    ],
    rating: 4.6,
    numReviews: 8,
  },
  {
    name: "Printed Resort Shirt",
    description:
      "Designed for summer, this printed resort shirt is perfect for vacation or weekend getaways. It features a relaxed fit, short sleeves, and a camp collar. The all-over tropical print adds a playful vibe.",
    price: 29.99,
    discountPrice: 22.99,
    countInStock: 25,
    sku: "PRNT-RES-004",
    category: "Top Wear",
    brand: "Beach Breeze",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Tropical Print", "Navy Palms"],
    collections: "Vacation Wear",
    material: "Viscose",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/3290886/pexels-photo-3290886.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Printed Resort Shirt Front View",
      },
      {
        url: "https://images.pexels.com/photos/15258903/pexels-photo-15258903.png?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Printed Resort Shirt Back View",
      },
    ],
    rating: 4.4,
    numReviews: 10,
  },
  {
    name: "Slim-Fit Easy-Iron Shirt",
    description:
      "A slim-fit, easy-iron shirt in woven cotton fabric with a fitted silhouette. Features a turn-down collar, classic button placket, and a yoke at the back. Long sleeves and adjustable button cuffs with a rounded hem.",
    price: 34.99,
    discountPrice: 29.99,
    countInStock: 30,
    sku: "SLIM-EIR-005",
    category: "Top Wear",
    brand: "Urban Chic",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Gray"],
    collections: "Business Wear",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/20418299/pexels-photo-20418299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Slim-Fit Easy-Iron Shirt Front View",
      },
      {
        url: "https://images.pexels.com/photos/33502689/pexels-photo-33502689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Slim-Fit Easy-Iron Shirt Front View",
      },
    ],
    rating: 5,
    numReviews: 14,
  },
  {
    name: "Polo T-Shirt with Ribbed Collar",
    description:
      "A wardrobe classic, this polo t-shirt features a ribbed collar and cuffs. Made from 100% cotton, it offers breathability and comfort throughout the day. Tailored in a slim fit with a button placket at the neckline.",
    price: 24.99,
    discountPrice: 19.99,
    countInStock: 50,
    sku: "POLO-TSH-006",
    category: "Top Wear",
    brand: "Polo Classics",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Navy", "Red"],
    collections: "Casual Wear",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/11100293/pexels-photo-11100293.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Polo T-Shirt Front View",
      },
      {
        url: "https://images.pexels.com/photos/10962177/pexels-photo-10962177.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Polo T-Shirt Back View",
      },
    ],
    rating: 4.3,
    numReviews: 22,
  },
  {
    name: "Oversized Graphic T-Shirt",
    description:
      "An oversized graphic t-shirt that combines comfort with street style. Featuring bold prints across the chest, this relaxed fit tee offers a modern vibe, perfect for pairing with jeans or joggers.",
    price: 19.99,
    discountPrice: 15.99,
    countInStock: 40,
    sku: "OVS-GRF-007",
    category: "Top Wear",
    brand: "Street Vibes",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray"],
    collections: "Streetwear",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/16887216/pexels-photo-16887216.png?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Oversized Graphic T-Shirt Front View",
      },
    ],
    rating: 4.6,
    numReviews: 30,
  },
  {
    name: "Regular-Fit Henley Shirt",
    description:
      "A modern take on the classic Henley shirt, this regular-fit style features a buttoned placket and ribbed cuffs. Made from a soft cotton blend with a touch of elastane for stretch.",
    price: 22.99,
    discountPrice: 18.99,
    countInStock: 35,
    sku: "REG-HEN-008",
    category: "Top Wear",
    brand: "Heritage Wear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Heather Gray", "Olive", "Black"],
    collections: "Casual Wear",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/14622878/pexels-photo-14622878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Regular-Fit Henley Shirt Front View",
      },
    ],
    rating: 4.5,
    numReviews: 25,
  },
  {
    name: "Long-Sleeve Thermal Tee",
    description:
      "Stay warm with this long-sleeve thermal tee, made from soft cotton with a waffle-knit texture. Ideal for layering in cooler months, the slim-fit design ensures a snug yet comfortable fit.",
    price: 27.99,
    discountPrice: 22.99,
    countInStock: 20,
    sku: "LST-THR-009",
    category: "Top Wear",
    brand: "Winter Basics",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Dark Green", "Navy"],
    collections: "Winter Essentials",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/9412754/pexels-photo-9412754.png?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Long-Sleeve Thermal Tee Front View",
      },
    ],
    rating: 4.4,
    numReviews: 18,
  },
  {
    name: "V-Neck Classic T-Shirt",
    description:
      "A classic V-neck t-shirt for everyday wear. This regular-fit tee is made from breathable cotton and features a clean, simple design with a flattering V-neckline. Lightweight fabric and soft texture make it perfect for casual looks.",
    price: 14.99,
    discountPrice: 11.99,
    countInStock: 60,
    sku: "VNECK-CLS-010",
    category: "Top Wear",
    brand: "Everyday Comfort",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy"],
    collections: "Basics",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/11029620/pexels-photo-11029620.png?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "V-Neck Classic T-Shirt Front View",
      },
    ],
    rating: 4.7,
    numReviews: 28,
  },
  {
    name: "Slim Fit Joggers",
    description:
      "Slim-fit joggers with an elasticated drawstring waist. Features ribbed hems and side pockets. Ideal for casual outings or workouts.",
    price: 40,
    discountPrice: 35,
    countInStock: 20,
    sku: "BW-001",
    category: "Bottom Wear",
    brand: "ActiveWear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray", "Navy"],
    collections: "Casual Collection",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/6083916/pexels-photo-6083916.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Slim Fit Joggers Front View",
      },
    ],
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Cargo Joggers",
    description:
      "Relaxed-fit cargo joggers featuring multiple pockets for functionality. Drawstring waist and cuffed hems for a modern look.",
    price: 45,
    discountPrice: 40,
    countInStock: 15,
    sku: "BW-002",
    category: "Bottom Wear",
    brand: "UrbanStyle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Olive", "Black"],
    collections: "Urban Collection",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/5696896/pexels-photo-5696896.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Cargo Joggers Front View",
      },
    ],
    rating: 4.7,
    numReviews: 20,
  },
  {
    name: "Tapered Sweatpants",
    description:
      "Tapered sweatpants designed for comfort. Elastic waistband with adjustable drawstring, perfect for lounging or athletic activities.",
    price: 35,
    discountPrice: 30,
    countInStock: 25,
    sku: "BW-003",
    category: "Bottom Wear",
    brand: "ChillZone",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Charcoal", "Blue"],
    collections: "Lounge Collection",
    material: "Fleece",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/10392342/pexels-photo-10392342.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Tapered Sweatpants Front View",
      },
    ],
    rating: 4.3,
    numReviews: 18,
  },
  {
    name: "Denim Jeans",
    description:
      "Classic slim-fit denim jeans with a slight stretch for comfort. Features a zip fly and five-pocket styling for a timeless look.",
    price: 60,
    discountPrice: 50,
    countInStock: 30,
    sku: "BW-004",
    category: "Bottom Wear",
    brand: "DenimCo",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Dark Blue", "Light Blue"],
    collections: "Denim Collection",
    material: "Denim",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/30710032/pexels-photo-30710032.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Denim Jeans Front View",
      },
    ],
    rating: 4.6,
    numReviews: 22,
  },
  {
    name: "Chino Pants",
    description:
      "Slim-fit chino pants made from stretch cotton twill. Features a button closure and front and back pockets. Ideal for both casual and semi-formal wear.",
    price: 55,
    discountPrice: 48,
    countInStock: 40,
    sku: "BW-005",
    category: "Bottom Wear",
    brand: "CasualLook",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Navy", "Black"],
    collections: "Smart Casual Collection",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/30229903/pexels-photo-30229903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Chino Pants Front View",
      },
    ],
    rating: 4.8,
    numReviews: 15,
  },
  {
    name: "Track Pants",
    description:
      "Comfortable track pants with an elasticated waistband and tapered leg. Features side stripes for a sporty look. Ideal for athletic and casual wear.",
    price: 40,
    discountPrice: 35,
    countInStock: 20,
    sku: "BW-006",
    category: "Bottom Wear",
    brand: "SportX",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Red", "Blue"],
    collections: "Activewear Collection",
    material: "Polyester",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/13958659/pexels-photo-13958659.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Track Pants Front View",
      },
    ],
    rating: 4.2,
    numReviews: 17,
  },
  {
    name: "Slim Fit Trousers",
    description:
      "Tailored slim-fit trousers with belt loops and a hook-and-eye closure. Suitable for formal occasions or smart-casual wear.",
    price: 65,
    discountPrice: 55,
    countInStock: 15,
    sku: "BW-007",
    category: "Bottom Wear",
    brand: "ExecutiveStyle",
    sizes: ["M", "L", "XL"],
    colors: ["Gray", "Black"],
    collections: "Office Wear",
    material: "Polyester",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/2897533/pexels-photo-2897533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Slim Fit Trousers Front View",
      },
    ],
    rating: 4.7,
    numReviews: 10,
  },
  {
    name: "Cargo Pants",
    description:
      "Loose-fit cargo pants with multiple utility pockets. Features adjustable ankle cuffs and a drawstring waist for versatility and comfort.",
    price: 50,
    discountPrice: 45,
    countInStock: 25,
    sku: "BW-008",
    category: "Bottom Wear",
    brand: "StreetWear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Olive", "Brown", "Black"],
    collections: "Street Style Collection",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/11716437/pexels-photo-11716437.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Cargo Pants Front View",
      },
    ],
    rating: 4.5,
    numReviews: 13,
  },
  {
    name: "Relaxed Fit Sweatpants",
    description:
      "Relaxed-fit sweatpants made from soft fleece fabric. Features an elastic waist and adjustable drawstring for a custom fit.",
    price: 35,
    discountPrice: 30,
    countInStock: 35,
    sku: "BW-009",
    category: "Bottom Wear",
    brand: "LoungeWear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Black", "Navy"],
    collections: "Lounge Collection",
    material: "Fleece",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/18393512/pexels-photo-18393512.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Relaxed Fit Sweatpants Front View",
      },
    ],
    rating: 4.3,
    numReviews: 14,
  },
  {
    name: "Formal Dress Pants",
    description:
      "Classic formal dress pants with a slim fit. Made from lightweight, wrinkle-resistant fabric for a polished look at the office or formal events.",
    price: 70,
    discountPrice: 60,
    countInStock: 20,
    sku: "BW-010",
    category: "Bottom Wear",
    brand: "ElegantStyle",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Navy"],
    collections: "Formal Collection",
    material: "Polyester",
    gender: "Men",
    images: [
      {
        url: "https://images.pexels.com/photos/32414873/pexels-photo-32414873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Formal Dress Pants Front View",
      },
    ],
    rating: 4.9,
    numReviews: 8,
  },
  {
    name: "High-Waist Skinny Jeans",
    description:
      "High-waist skinny jeans in stretch denim with a button and zip fly. Features a flattering fit that hugs your curves and enhances your silhouette.",
    price: 50,
    discountPrice: 45,
    countInStock: 30,
    sku: "BW-W-001",
    category: "Bottom Wear",
    brand: "DenimStyle",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Dark Blue", "Black", "Light Blue"],
    collections: "Denim Collection",
    material: "Denim",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/2245035/pexels-photo-2245035.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "High-Waist Skinny Jeans",
      },
    ],
    rating: 4.8,
    numReviews: 20,
  },
  {
    name: "Wide-Leg Trousers",
    description:
      "Flowy, wide-leg trousers with a high waist and side pockets. Perfect for an elegant look that combines comfort and style.",
    price: 60,
    discountPrice: 55,
    countInStock: 25,
    sku: "BW-W-002",
    category: "Bottom Wear",
    brand: "ElegantWear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Black", "White"],
    collections: "Formal Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/17135748/pexels-photo-17135748.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Wide-Leg Trousers Front View",
      },
    ],
    rating: 4.7,
    numReviews: 15,
  },
  {
    name: "Stretch Leggings",
    description:
      "Soft, stretch leggings in a high-rise style. Perfect for lounging, working out, or casual wear, with a smooth fit that flatters your body.",
    price: 25,
    discountPrice: 20,
    countInStock: 40,
    sku: "BW-W-003",
    category: "Bottom Wear",
    brand: "ComfyFit",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray", "Navy"],
    collections: "Activewear Collection",
    material: "Cotton Blend",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/29483985/pexels-photo-29483985.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Stretch Leggings Front View",
      },
    ],
    rating: 4.5,
    numReviews: 30,
  },
  {
    name: "Pleated Midi Skirt",
    description:
      "Elegant pleated midi skirt with a high waistband and soft fabric that drapes beautifully. Ideal for both formal and casual occasions.",
    price: 55,
    discountPrice: 50,
    countInStock: 20,
    sku: "BW-W-004",
    category: "Bottom Wear",
    brand: "ChicStyle",
    sizes: ["S", "M", "L"],
    colors: ["Pink", "Navy", "Black"],
    collections: "Spring Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/34697425/pexels-photo-34697425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Pleated Midi Skirt Front View",
      },
    ],
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: "Flared Palazzo Pants",
    description:
      "High-waist palazzo pants with a loose, flowing fit. Comfortable and stylish, making them perfect for casual outings or beach days.",
    price: 45,
    discountPrice: 40,
    countInStock: 35,
    sku: "BW-W-005",
    category: "Bottom Wear",
    brand: "BreezyVibes",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Beige", "Light Blue"],
    collections: "Summer Collection",
    material: "Linen Blend",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/9168245/pexels-photo-9168245.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Flared Palazzo Pants Front View",
      },
    ],
    rating: 4.4,
    numReviews: 22,
  },
  {
    name: "High-Rise Joggers",
    description:
      "Comfortable high-rise joggers with an elastic waistband and drawstring for a perfect fit. Great for lounging or working out.",
    price: 40,
    discountPrice: 35,
    countInStock: 30,
    sku: "BW-W-006",
    category: "Bottom Wear",
    brand: "ActiveWear",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Gray", "Pink"],
    collections: "Loungewear Collection",
    material: "Cotton Blend",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/32624950/pexels-photo-32624950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "High-Rise Joggers Front View",
      },
    ],
    rating: 4.3,
    numReviews: 25,
  },
  {
    name: "Paperbag Waist Shorts",
    description:
      "Stylish paperbag waist shorts with a belted waist and wide legs. Perfect for summer outings and keeping cool in style.",
    price: 35,
    discountPrice: 30,
    countInStock: 20,
    sku: "BW-W-007",
    category: "Bottom Wear",
    brand: "SunnyStyle",
    sizes: ["S", "M", "L"],
    colors: ["White", "Khaki", "Blue"],
    collections: "Summer Collection",
    material: "Cotton",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/25651197/pexels-photo-25651197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Paperbag Waist Shorts Front View",
      },
    ],
    rating: 4.5,
    numReviews: 19,
  },
  {
    name: "Stretch Denim Shorts",
    description:
      "Comfortable stretch denim shorts with a high-waisted fit and raw hem. Perfect for pairing with your favorite tops during warmer months.",
    price: 40,
    discountPrice: 35,
    countInStock: 25,
    sku: "BW-W-008",
    category: "Bottom Wear",
    brand: "DenimStyle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "White"],
    collections: "Denim Collection",
    material: "Denim",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/17013629/pexels-photo-17013629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Stretch Denim Shorts Front View",
      },
    ],
    rating: 4.7,
    numReviews: 15,
  },
  {
    name: "Culottes",
    description:
      "Wide-leg culottes with a flattering high waist and cropped length. The perfect blend of comfort and style for any casual occasion.",
    price: 50,
    discountPrice: 45,
    countInStock: 30,
    sku: "BW-W-009",
    category: "Bottom Wear",
    brand: "ChicStyle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Olive"],
    collections: "Casual Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/975005/pexels-photo-975005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Culottes Front View",
      },
    ],
    rating: 4.6,
    numReviews: 23,
  },
  {
    name: "Classic Pleated Trousers",
    description:
      "Timeless pleated trousers with a tailored fit. A wardrobe essential for workwear or formal occasions.",
    price: 70,
    discountPrice: 65,
    countInStock: 25,
    sku: "BW-W-010",
    category: "Bottom Wear",
    brand: "ElegantWear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Gray"],
    collections: "Formal Collection",
    material: "Wool Blend",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/19995460/pexels-photo-19995460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Classic Pleated Trousers Front View",
      },
    ],
    rating: 4.8,
    numReviews: 20,
  },
  {
    name: "Knitted Cropped Top",
    description:
      "A stylish knitted cropped top with a flattering fitted silhouette. Perfect for pairing with high-waisted jeans or skirts for a casual look.",
    price: 40,
    discountPrice: 35,
    countInStock: 25,
    sku: "TW-W-001",
    category: "Top Wear",
    brand: "ChicKnit",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "White"],
    collections: "Knits Collection",
    material: "Cotton Blend",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/10664874/pexels-photo-10664874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Knitted Cropped Top",
      },
    ],
    rating: 4.6,
    numReviews: 15,
  },
  {
    name: "Boho Floral Blouse",
    description:
      "Flowy boho blouse with floral patterns, featuring a relaxed fit and balloon sleeves. Ideal for casual summer days.",
    price: 50,
    discountPrice: 45,
    countInStock: 30,
    sku: "TW-W-002",
    category: "Top Wear",
    brand: "BohoVibes",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Pink"],
    collections: "Summer Collection",
    material: "Viscose",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/11588270/pexels-photo-11588270.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Boho Floral Blouse",
      },
    ],
    rating: 4.7,
    numReviews: 20,
  },
  {
    name: "Casual T-Shirt",
    description:
      "A soft, breathable casual t-shirt with a classic fit. Features a round neckline and short sleeves, perfect for everyday wear.",
    price: 25,
    discountPrice: 20,
    countInStock: 50,
    sku: "TW-W-003",
    category: "Top Wear",
    brand: "ComfyTees",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"],
    collections: "Essentials",
    material: "Cotton",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/2562500/pexels-photo-2562500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Casual T-Shirt",
      },
    ],
    rating: 4.5,
    numReviews: 25,
  },
  {
    name: "Off-Shoulder Top",
    description:
      "An elegant off-shoulder top with ruffled sleeves and a flattering fit. Ideal for adding a touch of femininity to your outfit.",
    price: 45,
    discountPrice: 40,
    countInStock: 35,
    sku: "TW-W-004",
    category: "Top Wear",
    brand: "Elegance",
    sizes: ["S", "M", "L"],
    colors: ["Red", "White", "Blue"],
    collections: "Evening Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/18057071/pexels-photo-18057071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Off-Shoulder Top",
      },
    ],
    rating: 4.7,
    numReviews: 18,
  },
  {
    name: "Lace-Trimmed Cami Top",
    description:
      "A delicate cami top with lace trim and adjustable straps. The lightweight fabric makes it perfect for layering or wearing alone during warmer weather.",
    price: 35,
    discountPrice: 30,
    countInStock: 40,
    sku: "TW-W-005",
    category: "Top Wear",
    brand: "DelicateWear",
    sizes: ["S", "M", "L"],
    colors: ["Black", "White"],
    collections: "Lingerie-Inspired",
    material: "Silk Blend",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/8093086/pexels-photo-8093086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Lace-Trimmed Cami Top",
      },
    ],
    rating: 4.8,
    numReviews: 22,
  },
  {
    name: "Graphic Print Tee",
    description:
      "A trendy graphic print tee with a relaxed fit. Pair it with jeans or skirts for a cool and casual look.",
    price: 30,
    discountPrice: 25,
    countInStock: 45,
    sku: "TW-W-006",
    category: "Top Wear",
    brand: "StreetStyle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black"],
    collections: "Urban Collection",
    material: "Cotton",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/18413168/pexels-photo-18413168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Graphic Print Tee",
      },
    ],
    rating: 4.6,
    numReviews: 30,
  },
  {
    name: "Ribbed Long-Sleeve Top",
    description:
      "A cozy ribbed long-sleeve top that offers comfort and style. Perfect for layering during cooler months.",
    price: 55,
    discountPrice: 50,
    countInStock: 30,
    sku: "TW-W-007",
    category: "Top Wear",
    brand: "ComfortFit",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Pink", "Brown"],
    collections: "Fall Collection",
    material: "Cotton Blend",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/10318063/pexels-photo-10318063.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Ribbed Long-Sleeve Top",
      },
    ],
    rating: 4.7,
    numReviews: 26,
  },
  {
    name: "Ruffle-Sleeve Blouse",
    description:
      "A lightweight ruffle-sleeve blouse with a flattering fit. Perfect for a feminine touch to any outfit.",
    price: 45,
    discountPrice: 40,
    countInStock: 20,
    sku: "TW-W-008",
    category: "Top Wear",
    brand: "FeminineWear",
    sizes: ["S", "M", "L"],
    colors: ["White", "Navy", "Lavender"],
    collections: "Summer Collection",
    material: "Viscose",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/11030283/pexels-photo-11030283.png?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Ruffle-Sleeve Blouse",
      },
    ],
    rating: 4.5,
    numReviews: 19,
  },
  {
    name: "Classic Button-Up Shirt",
    description:
      "A versatile button-up shirt that can be dressed up or down. Made from soft fabric with a tailored fit, it's perfect for both casual and formal occasions.",
    price: 60,
    discountPrice: 55,
    countInStock: 25,
    sku: "TW-W-009",
    category: "Top Wear",
    brand: "ClassicStyle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Black"],
    collections: "Office Collection",
    material: "Cotton",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/12206864/pexels-photo-12206864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "Classic Button-Up Shirt",
      },
    ],
    rating: 4.8,
    numReviews: 25,
  },
  {
    name: "V-Neck Wrap Top",
    description:
      "A chic v-neck wrap top with a tie waist. Its elegant style makes it perfect for both casual and semi-formal occasions.",
    price: 50,
    discountPrice: 45,
    countInStock: 30,
    sku: "TW-W-010",
    category: "Top Wear",
    brand: "ChicWrap",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Black", "White"],
    collections: "Evening Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://images.pexels.com/photos/5679148/pexels-photo-5679148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800&fit=crop",
        altText: "V-Neck Wrap Top",
      },
    ],
    rating: 4.7,
    numReviews: 22,
  },
];


  // const newArrivals = [
  //   {
  //     _id: "1",
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=1",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "2",
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=2",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "3",
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=3",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "4",
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=4",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "5",
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=5",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "6",
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=6",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "7",
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=7",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "8",
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=8",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  // ];


// const placeholderProducts=[
//   {
//     _id: 1,
//     name: "High-waist Skinny Jeans",
//     price: 50,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=1",
//         altText: "High-waist Skinny Jeans",
//       }
//     ]
//   },
//   {
//     _id: 2,
//     name: "Wide-Leg Trousers",
//     price: 60,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=2",
//         altText: "Wide-Leg Trousers",
//       }
//     ]
//   },
//   {
//     _id: 3,
//     name: "Stretch Leggins",
//     price: 25,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=3",
//         altText: "Stretch Leggins",
//       }
//     ]
//   },
//   {
//     _id: 4,
//     name: "Pleated Midi Skirt",
//     price: 55,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=4",
//         altText: "Pleated Midi Skirt",
//       }
//     ]
//   },
//   {
//     _id: 5,
//     name: "Flared Plazzo Pants",
//     price: 45,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=5",
//         altText: "Flared Plazzo Pants",
//       }
//     ]
//   },
//   {
//     _id: 6,
//     name: "High-Rise Joggers",
//     price: 40,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=6",
//         altText: "High Rise Joggers",
//       }
//     ]
//   },
//   {
//     _id: 7,
//     name: "Paper bag waist Shorts",
//     price: 35,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=7",
//         altText: "Paper bag waist Shorts",
//       }
//     ]
//   },
//   {
//     _id: 4,
//     name: "Stretch Denim Shorts",
//     price: 40,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=8",
//         altText: "Stretch Denim Shorts",
//       }
//     ]
//   },]


// const placeholderProducts=[
//   {
//     _id: 1,
//     name: "High-waist Skinny Jeans",
//     price: 50,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=1",
//         altText: "High-waist Skinny Jeans",
//       }
//     ]
//   },
//   {
//     _id: 2,
//     name: "Wide-Leg Trousers",
//     price: 60,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=2",
//         altText: "Wide-Leg Trousers",
//       }
//     ]
//   },
//   {
//     _id: 3,
//     name: "Stretch Leggins",
//     price: 25,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=3",
//         altText: "Stretch Leggins",
//       }
//     ]
//   },
//   {
//     _id: 4,
//     name: "Pleated Midi Skirt",
//     price: 55,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=4",
//         altText: "Pleated Midi Skirt",
//       }
//     ]
//   },
//   {
//     _id: 5,
//     name: "Flared Plazzo Pants",
//     price: 45,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=5",
//         altText: "Flared Plazzo Pants",
//       }
//     ]
//   },
//   {
//     _id: 6,
//     name: "High-Rise Joggers",
//     price: 40,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=6",
//         altText: "High Rise Joggers",
//       }
//     ]
//   },
//   {
//     _id: 7,
//     name: "Paper bag waist Shorts",
//     price: 35,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=7",
//         altText: "Paper bag waist Shorts",
//       }
//     ]
//   },
//   {
//     _id: 4,
//     name: "Stretch Denim Shorts",
//     price: 40,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=8",
//         altText: "Stretch Denim Shorts",
//       }
//     ]
//   },]

module.exports = products;