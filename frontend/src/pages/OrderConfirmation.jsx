import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const calculateEstimatedDelivery = (createdAt) => {
  const orderDate = new Date(createdAt);
  console.log(orderDate + " " + orderDate.getDate());
  orderDate.setDate(orderDate.getDate() + 10);
  return orderDate.toLocaleDateString();
};

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);
  // console.log(checkout);
  // Clear the cart when the order is confirmed
  useEffect(()=>{
    if(checkout&&checkout._id){
      dispatch(clearCart());
      localStorage.removeItem("cart");
    }else{
      navigate("/my-orders");
    }
  },[checkout,dispatch,navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-emerald-500 text-4xl text-center mb-8 font-bold">
        Thank You for Your Order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Order Id and and Date */}
            <div>
              <h2 className="text-xl font-semibold">
                Order Id: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Ordered Items */}
          <div>
            {checkout.checkoutItems.map((product) => (
              <div key={product.productId} className="flex items-center mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div className="w-3/4">
                  <h4 className="text-md font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-500">
                    {product.color}|{product.size}
                  </p>
                </div>
                <div className="text-right ml-auto">
                  <p className="text-md">${product.price}</p>
                  <p className="text-sm text-gray-500">
                    Qty:{product.qauntity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Payment and Delivery Info */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment Info */}
            <div>
              <h4 className="">Payment</h4>
              <p>PayPal</p>
            </div>
            {/* Delivery Info */}
            <div>
              <h4 className="text-lg">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
          {/* hgvjbkl */}
        </div>
      )}
      {/* jbhn,m */}
    </div>
  );
};

export default OrderConfirmation;
