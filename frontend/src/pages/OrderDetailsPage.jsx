import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const orders = [];

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchOrderDetails(id));
  },[dispatch,id]);
  const {orderDetails,loading,error}=useSelector((state)=>state.orders);
  // const [orderDetails, setOrderDetails] = useState(null);

  // useEffect(() => {
  //   const mockOrderDetails = {
  //     _id: id,
  //     createdAt: new Date(),
  //     isPaid: true,
  //     isDelivered: false,
  //     paymentMethod: "PayPal",
  //     shippingMethod: "Standard",
  //     shippingAddress: { city: "New York", country: "USA" },
  //     orderItems: [
  //       {
  //         productId: 1,
  //         name: "T-shirt",
  //         size: "M",
  //         color: "Red",
  //         quantity: 1,
  //         price: 15,
  //         image: "https://picsum.photos/200?random=1",
  //       },
  //       {
  //         productId: 2,
  //         name: "Jeans",
  //         size: "L",
  //         color: "Blue",
  //         quantity: 1,
  //         price: 25,
  //         image: "https://picsum.photos/200?random=2",
  //       },
  //     ],
  //   };
  //   setOrderDetails(mockOrderDetails);
  // }, [id]);

  // console.log(orderDetails);
  if(loading)return <p>loading...</p>;
  if(error)return <p>Error:- {error}</p>
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl mb-6 md:text-3xl">Order Details</h2>
      {!orderDetails ? (
        <p>No order details found</p>
      ) : (
        <div className="border p-4">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold md:text-xl">
                Order id: #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }px-3 py-1 rounded-full mb-2 text-sm font-medium`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }px-3 py-1 rounded-full mb-2 text-sm font-medium`}
              >
                {orderDetails.isDelivered ? "Approved" : "Pending"}
              </span>
            </div>
          </div>
          {/* Customer, Payment, Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "UnPaid"}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Shipping Info</h4>
              <p>Shipping Method</p>
              <p>
                Address:{orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.country}
              </p>
            </div>
          </div>
          {/* Product list */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 mb-4 border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th>Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border">
                    <td className="py-2 px-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`product/${item.productId}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">${item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back to Orders Link */}
          <Link to="/my-orders" className="text-blue-500 hover:underline">
            Back To My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
