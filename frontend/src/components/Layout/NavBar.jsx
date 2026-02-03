import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiBars3BottomRight,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi2";
import SearchBar from "../Common/SearchBar";
import CartDrawer from "./CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const { cart } = useSelector((state) => state.cart);
  const cartItemsCount = cart?.products?.reduce(
    (total, product) => total + product.quantity,
    0 || 0,
  );

  return (
    <>
      {/* NAVBAR */}

      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left -Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>

        {/* Center - Navigations Links */}
        <div className="hidden md:flex space-x-6 ">
          <Link
            to="/collections/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            women
          </Link>
          <Link
            to="/collections/all?type=Top Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            top wear
          </Link>
          <Link
            to="/collections/all?type=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            bottom wear
          </Link>
        </div>

        {/* Right -Icons */}
        <div className="flex items-center space-x-4">
          {/* admin  */}
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black text-white rounded text-sm"
            >
              Admin
            </Link>
          )}

          {/* Profile  */}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          {/* Cart icon */}
          <button
            onClick={toggleCartDrawer}
            className="sticky left-3 top-3 hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemsCount > 0 && (
              <span
                className="absolute -top-1 text-xs bg-rabbit-red text-white 
                rounded-full px-2 py-0.5"
              >
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Search Icon */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          {/* Hamburger Menu Icon */}
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      {/* NavBar */}

      {/* Cart Drwaer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Bar */}
      <div
        className={`fixed top-0 left-0 sm:w-1/2 md:w-1/3 w-3/4 h-full bg-white shadow-lg 
      transform transition-transform duration-300 z-50 ${
        navDrawerOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Menu */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black "
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black "
            >
              Women
            </Link>
            <Link
              to="/collections/all?type=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black "
            >
              Top wear
            </Link>
            <Link
              to="/collections/all?type=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black "
            >
              Bottom wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
