import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  fetchAllUsers,
  updateUser,
} from "../../redux/slices/adminSlice";
import { useNavigate } from "react-router-dom";

const UserManagment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);
  useEffect(() => {
    // dispatch(fetchAllUsers());
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchAllUsers());
    }
  }, [user, dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));

    // Reset Form Data
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
    // users.push(formData);
    // console.log(e);
  };

  const handleRoleChange = (userId, newRole) => {
    // console.log({ id: userId, role: newRole });
    dispatch(updateUser({ id: userId, role: newRole }));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete the user")) {
      // console.log("Deleting user with user id:-", userId);
      dispatch(deleteUser(userId));
    }
  };
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error {error}</p>;
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="mb-6 font-bold text-2xl">User Managment</h2>
      {/* Add New User */}
      <div className="mb-6 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded border"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-whitep rounded py-2 px-4"
          >
            Add User
          </button>
        </form>
      </div>
      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log(users)} */}
            {users &&
              users.map((user) => (
                <tr className="border-b hover:bg-gray-50" key={user._id}>
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <select
                      className="rounded border p-2"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="customer">Customer</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      UserManagment
    </div>
  );
};

export default UserManagment;
