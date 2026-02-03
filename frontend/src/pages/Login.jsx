import React, { useEffect, useState } from "react";
import login from "../assets/login.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  // console.log(auth);

  // Get redirect parameter and check if it's checkout or something
  // const params=new URLSearchParams(location);
  // console.log(params);
  const redirect= new URLSearchParams(location.search).get("redirect")||"/";
  // console.log(redirect);
  const isCheckoutRedirect=redirect.includes('checkout');

  useEffect(()=>{
    if(user){
      if(cart?.products?.length>0&&guestId){
        dispatch(mergeCart({user,guestId})).then(()=>{
          navigate(isCheckoutRedirect?"/checkout":"/");
        });
      }else{
        navigate(isCheckoutRedirect?"/checkout":"/");
      }
    }
  },[user,cart,guestId,dispatch,navigate,isCheckoutRedirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(loginUser({ email, password }));
    // try {
      // const response=await dispatch(loginUser({ email, password })).unwrap();
      // console.log(response);
      // navigate(`/`);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="flex ">
      <div className="w-full  flex flex-col items-center justify-center md:w-1/2 p-8 md:p-12">
        {/* kjjds */}
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md rounded-lg border shadow-sm"
        >
          <div className=" flex justify-center mb-6">
            <h2 className="text-xl font-medium ">Rabbit</h2>
            {/* lkdscm */}
          </div>

          <h2 className="text-center font-bold  mb-6 text-2xl">Hey There👋🏻</h2>
          <p className="text-center mb-6">
            Enter Your username and password to Login
          </p>

          <div className="mb-4">
            {/* kjsad */}
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

          <div className="mb-4">
            {/* kjsad */}
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
            {loading?"loading...":"Sign In"}
          </button>
          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex items-center flex-col justify-center">
          <img
            src={login}
            alt="Login to Account"
            className="w-full h-[500px]   object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
