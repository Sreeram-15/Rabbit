import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilters } from "../../redux/slices/productSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isOpen, setOpen] = useState(false);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSearchToggle = () => {
    setOpen(!isOpen);
  };

  const handleSearch=(e)=>{
    e.preventDefault();
    // console.log("Search Term:- ",searchTerm);
    dispatch(setFilters({search:searchTerm}));
    dispatch(fetchProductsByFilters({search:searchTerm}));
    navigate(`/collections/all?search=${searchTerm}`);
    setOpen(false);
  }

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300
        ${
          isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
        }`}
    >

      {isOpen ? (
        <form 
        onSubmit={handleSearch}
        className="relative flex justify-center items-center w-full">

          <div className="w-1/2 relative ">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={e=>setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 focus:outline-none rounded-lg w-full
              placeholder:text-grey-700"
            />

            {/* Search icon */}

            <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600
             hover:text-gray-800 ">
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>

          </div>

          {/* Close Button */}

          <button 
          type="button"
          onClick={handleSearchToggle}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 
           text-gray-600 hover:text-gray-800 ">
            <HiMiniXMark className="h-6 w-6" />
          </button>

        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
