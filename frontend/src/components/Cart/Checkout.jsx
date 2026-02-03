import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createCheckout } from "../../redux/slices/checkoutSlice";
// const user=cart.user;
const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const userEmailId = user.email||"";
  // console.log(cart);
  // console.log(user);
  // console.log(userEmailId);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
    phone: "",
  });

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const [checkoutId, setcheckoutId] = useState(null);

  // const newCheckout = await Checkout.create({
  //   user: req.user._id,
  //   checkoutItems: checkoutItems,
  //   shippingAddress,
  //   paymentMethod,
  //   totalPrice,
  //   paymentStatus: "Pending",
  //   isPaid: false,
  // });

  const handleCreateCheckOut = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "PayPal",
          totalPrice: cart.totalPrice,
        }),
      );
      // setcheckoutId(res.data);
      // console.log(res);
      // console.log(typeof res);
      if (res.payload && res.payload._id) {
        setcheckoutId(res.payload._id); //set checkoutId if checkout was successful
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      await handleFinalizeCheckout(checkoutId); // Finalize checkout if payment is successful
    } catch (error) {
      console.error(error);
    }
    console.log("Payment Successful", details);
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      navigate(`/order-confirmation`);
    } catch (error) {
      console.error(error);
    }
  };

  if(loading)return <p>loading...</p>
  if(error)return <p>Error:- {error}</p>
  if(!cart||!cart.products||cart.products.length===0){
    return <p>Your cart is empty ...</p>
  }

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 
     tracking-tighter"
    >
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl mb-6 uppercase">Checkout</h2>
        <form onSubmit={handleCreateCheckOut}>
          {/* Contact Details */}
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            {/* Email */}
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              value={userEmailId}
              className="w-full p-2 rounded border"
              disabled
            />
          </div>
          {/* Delivery */}
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              {/* First Name */}
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                placeholder="Admin"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 rounded border"
                required
              />
            </div>

            <div>
              {/* Last Name */}
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                placeholder="guy"
                className="w-full p-2 rounded border"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="mb-4">
            {/* Address */}
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              placeholder="klsnxskjn"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 rounded border"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              {/* City */}
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                placeholder="alaska"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 rounded border"
                required
              />
            </div>

            <div>
              {/* Postal Code */}
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                placeholder="518300"
                className="w-full p-2 rounded border"
                value={shippingAddress.postalcode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalcode: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="mb-4">
            {/* Country */}
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              placeholder="USA"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 rounded border"
              required
            />
          </div>

          <div className="mb-4">
            {/* Phone */}
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              placeholder="123456789"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 rounded border"
              required
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                {loading ? "loading" : "Continue to Payment"}
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                {/* Paypal Component */}
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Payment Failed. Try Again.")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {/* sdfgnhg */}
          {cart?.products?.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />

                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">size:{product.size}</p>
                  <p className="text-gray-500">color:{product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart?.totalPrice?.toLocaleString()}</p>
        </div>
        {/* jmbh */}
      </div>
      {/* Checkout */}
    </div>
  );
};

export default Checkout;
