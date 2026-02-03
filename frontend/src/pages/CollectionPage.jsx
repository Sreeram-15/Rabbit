import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  // console.log(useParams());
  const [searchParams] = useSearchParams();
  // console.log(searchParams);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  // console.log(queryParams);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({collection, ...queryParams}));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // Close sidebar if clicked outside
    // console.log(sidebarRef);
    // console.log(sidebarRef.current);
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    // if (!isSidebarOpen) return;
    // Add Event Listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    // Clean Event Listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 
  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden border p-2 flex items-center justify-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                fixed inset-y-0 z-50 left-0 bg-white w-64 overflow-y-auto transition-transform 
                duration-300 md:static md:inset-auto md:z-auto md:translate-x-0 md:transform-none 
                md:w-64 md:min-w-[16rem] md:max-w-[16rem] md:flex-none`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className='text-2xl uppercase mb-4'>Filter</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Products grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      {/* CollectionPage */}
    </div>
  );
};

export default CollectionPage;
