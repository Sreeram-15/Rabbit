import { useDispatch, useSelector } from "react-redux";
import MyOrdersPage from "./MyOrdersPage";
import { useEffect } from "react";
import { generateNewGuestId, logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const Profile = () => {
  const dispatch = useDispatch();
  // dispatch()
  const { user, guestId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=profile");
    }
  }, [user, navigate]);

  // console.log(user);
  const username = user?.name||"Guest";
  const userEmail = user?.email||"guest@rabbit.com";
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    // if (!guestId) dispatch(generateNewGuestId);
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className=" w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {" "}
              {username}{" "}
            </h1>
            <p className="text-lg mb-4 text-gray-600">{userEmail}</p>
            <button
              className="bg-red-500 w-full mb-6 rounded text-white px-4 py-2
                     hover:bg-red-600"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
          {/* Right Section: Orders Table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
      {/* <div>awckjbs</div>
      Profile */}
    </div>
  );
};

export default Profile;
