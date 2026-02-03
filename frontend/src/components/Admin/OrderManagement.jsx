import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  updateOrder,
} from "../../redux/slices/adminOrderSlice";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);
  // console.log({ orders, loading, error });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrder({ id: orderId, status }));
    // console.log({ id: orderId, status });
  };
  if (loading) return <p>loading ...</p>;
  if (error) return <p>Error:- {error}</p>;
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="font-bold text-2xl mb-6">Order Management</h2>
      {}
      <div className="overflow-x-auto">
        <table className="min-w-full text-gray-500 text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Order Id</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-4 px-4 font-medium whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-4">{order.user?.name}</td>
                  <td className="p-4">{order.totalPrice}</td>
                  <td className="py-4 px-4 font-medium whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                      rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 p-4">
                  No Orders Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* OrderManagement */}
    </div>
  );
};

export default OrderManagement;
