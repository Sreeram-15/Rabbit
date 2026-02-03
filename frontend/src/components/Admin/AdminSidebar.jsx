import React from "react";
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slices/cartSlice";
import { logout } from "../../redux/Slices/authSlice";

const AdminSidebar = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          Rabbit
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin DashBoard</h2>
      <nav>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 flex items-center rounded space-x-2"
              : "hover:bg-gray-700 text-gray-300 py-3 px-4 flex items-center rounded space-x-2 hover:text-white"
          }
        >
          <FaUser />
          <span> Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 flex items-center rounded space-x-2"
              : "hover:bg-gray-700 text-gray-300 py-3 px-4 flex items-center rounded space-x-2 hover:text-white"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 flex items-center rounded space-x-2"
              : "hover:bg-gray-700 text-gray-300 py-3 px-4 flex items-center rounded space-x-2 hover:text-white"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 flex items-center rounded space-x-2"
              : "hover:bg-gray-700 text-gray-300 py-3 px-4 flex items-center rounded space-x-2 hover:text-white"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex
          items-center justify-center"
        >
            <FaSignOutAlt/>
          <span>Logout</span>
        </button>
      </div>
      {/* AdminSidebar */}
    </div>
  );
};

export default AdminSidebar;
