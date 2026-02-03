import React, { useEffect, useState } from "react";
import register from "../assets/register.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const location = useLocation();
  const navigate = useNavigate();
  // get redirect parameter if it is checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user }));
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, cart, guestId, isCheckoutRedirect, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex ">
      <div className="w-full  flex flex-col items-center justify-center md:w-1/2 p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md rounded-lg border shadow-sm"
        >
          <div className=" flex justify-center mb-6">
            <h2 className="text-xl font-medium ">Rabbit</h2>
          </div>

          <h2 className="text-center font-bold  mb-6 text-2xl">Hey There👋🏻</h2>
          <p className="text-center mb-6">
            Enter Your username and password to Register
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter your name"
              className="p-2 border w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block  text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your password"
              className="p-2 border w-full rounded"
            />
          </div>

          <div>
            <label className="block  text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
              className="p-2 border w-full rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white text-center p-2 font-semibold rounded-lg
                hover:bg-gray-800 transition text-2xl"
          >
            {loading?"loading":"Sign Up"}
          </button>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex items-center flex-col justify-center">
          <img
            src={register}
            alt="Login to Account"
            className="w-full h-[600px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
