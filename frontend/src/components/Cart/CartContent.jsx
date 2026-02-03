import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  const cartItemCount = cart?.products?.reduce((acc,item)=>acc+item.quantity,0);
  const CartProducts=cart?.products;
  // Handle adding or substracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          size,
          color,
          userId,
          guestId,
        }),
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, size, color, userId, guestId }));
  };
  // console.log(cart);
  return (
    <div>
      Cart Content
      {CartProducts &&
        CartProducts.length > 0 &&
        CartProducts.map((product, index) => (
          <div
            key={index}
            className="flex items-start justify-between py-4 border-b"
          >
            <div className="flex items-center">
              <img
                className="w-20 h-24 object-cover mr-4 rounded"
                src={product.image}
                alt={product.name}
              />

              <div>
                <h3>{product.name}</h3>
                <p className="">
                  Size:{product.size}|color:{product.color}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                        product.color,
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-medium"
                  >
                    -
                  </button>
                  <span className="mx-4">{product.quantity}</span>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                        product.color,
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-medium"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p>${product.price.toLocaleString()}</p>
              <button 
              onClick={()=>handleRemoveFromCart(product.productId,product.size,product.color)}
              >
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CartContent;
