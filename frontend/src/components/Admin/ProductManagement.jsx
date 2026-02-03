import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, fetchAdminProducts } from "../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  // const products = [
  //   {
  //     _id: 12312,
  //     name: "Slim fit Stretch Shirt",
  //     price: 29.99,
  //     sku: "slim-sh-002",
  //   },
  //   {
  //     _id: 12323,
  //     name: "Casual Denim Shirt",
  //     price: 49.99,
  //     sku: "slim-sh-002",
  //   },
  //   {
  //     _id: 23123,
  //     name: "Printed Resort Shirt",
  //     price: 34.99,
  //     sku: "slim-sh-002",
  //   },
  // ];
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.auth);
  const {products,loading,error}=useSelector((state)=>state.adminProducts);
  useEffect(()=>{
    if(!user||user.role!=="admin"){
      navigate("/");
    }else{
      dispatch(fetchAdminProducts());
    }
  },[user,dispatch,navigate]);
  const handleEditProduct=(productId)=>{
    if(user&&user.role=='admin')navigate(`${productId}/edit`);
    else navigate("/");
  }

  const handleDeleteProduct =(productId) => {
    if (window.confirm("Are you sure want to delete product?")) {
      dispatch(deleteProduct(productId));
      // console.log("deleted product with id:-", productId);
    }
  };
  if(loading)return <p>loading...</p>
  if(error)return <p>Error:-{error}</p>
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    ${product.price}
                  </td>
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.sku}
                  </td>
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    <div>
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="px-2 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                        onClick={()=>handleEditProduct(product._id)}
                      >
                        edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-500 text-white rounded mr-2 px-2 py-1 hover:bg-red-600"
                      >
                        delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">No Products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
