import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();

  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);
  // console.log(orders);

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  // console.log(products);
  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchAdminProducts());
  }, [dispatch]);
  return (
    <div className=" mx-auto max-w-7xl p-6">
      <h1 className="font-bold text-3xl mb-6">Admin Dashboard</h1>

      {productsLoading || ordersLoading ? (
        <p>loading...</p>
      ) : productsError ? (
        <p className="text-red-500">
          Error fetching Products:- {productsError}
        </p>
      ) : ordersError ? (
        <p className="text-red-500">Error fetching Orders:- {ordersError}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="shadow-md rounded-lg p-4">
            <h1 className="font-semibold text-xl">Revenue</h1>
            <p className="text-2xl">${totalSales.toFixed(2)}</p>
          </div>
          <div className="shadow-md rounded-lg p-4">
            <h1 className="font-semibold text-xl">Total orders</h1>
            <p className="text-2xl">{totalOrders}</p>
            <Link to="/admin/orders" className="text-blue-500 hover:underline">
              Manage Orders
            </Link>
          </div>
          <div className="shadow-md rounded-lg p-4">
            <h1 className="font-semibold text-xl">Total Products</h1>
            <p className="text-2xl">{products.length}</p>
            <Link
              to="/admin/products"
              className="text-blue-500 hover:underline"
            >
              Manage Products
            </Link>
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="text-gray-500 min-w-full text-left">
            <thead className="text-gray-700 bg-gray-100 uppercase text-xs">
              <tr>
                <th className="py-3 px-4">order id</th>
                <th className="py-3 px-4">user</th>
                <th className="py-3 px-4">total Price</th>
                <th className="py-3 px-4">status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 border-b cursor-pointer"
                  >
                    <td className="p-4">{item._id}</td>
                    <td className="p-4">{item.user?.name}</td>
                    <td className="p-4">{item.totalPrice}</td>
                    <td className="p-4">{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-gray-500 p-4 text-center">
                    No Recenr Orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* AdminHomePage */}
    </div>
  );
};

export default AdminHomePage;
