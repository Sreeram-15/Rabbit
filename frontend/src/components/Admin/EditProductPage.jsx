import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import axios from "axios";
import { updateProduct } from "../../redux/slices/adminProductSlice";

const EditProductPage = () => {
  const initialState = {
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: ["S", "M", "L", "XL"],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    uploadImage: "",
    images: [
      {
        url: "https://picsum.photos/150?random=1",
        altText: "",
      },
      {
        url: "https://picsum.photos/150?random=2",
        altText: "",
      },
    ],
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products,
  );
  // console.log(id);
  // console.log(typeof id);
  const [isUploading, setUploading] = useState(false);
  const [productData, setProductData] = useState(initialState);
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  // console.log(selectedProduct);
  // console.log(initialState);
  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
      // console.log(productData);
    }
  }, [selectedProduct]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    // console.log(import.meta.env);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(data.image_url);
      setProductData((prevData) => ({
        ...prevData,
        images: [
          ...prevData.images,
          {
            url: data.image_url,
            altText: "",
          },
        ],
      }));
      e.preventDefault();
      productData.images;
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
    // useEffect(() => {
    //   console.log(productData.images);
    // }, [productData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    // console.log()
    navigate("/admin/products");
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error:- {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300"
            value={productData.name}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 rounded-md p-2"
            value={productData.description}
            onChange={(e) => handleChange(e)}
            rows={4}
            required
          />
        </div>
        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            className="w-full border border-gray-300 rounded-md p-2"
            value={productData.price}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {/* Count in Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in stock</label>
          <input
            type="number"
            name="countInStock"
            className="w-full border border-gray-300"
            value={productData.countInStock}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="SKU"
            className="w-full border border-gray-300"
            value={productData.sku}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-seperated)
          </label>
          <input
            type="text"
            name="sizes"
            className="w-full border border-gray-300"
            value={productData?.sizes?.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            required
          />
        </div>
        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-seperated)
          </label>
          <input
            type="text"
            name="colors"
            className="w-full border border-gray-300"
            value={productData.colors.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            required
          />
        </div>
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            name="images"
            // className="w-full border border-gray-300"
            // value={productData.sizes.join(",")}
            onChange={handleImageUpload}
            
          />
          {isUploading&& <p>uploading image....</p>}
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image?.url}
                  alt={image?.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-2 py-1 border bg-green-500 text-white text-lg rounded-md
           hover:bg-green-600  transition-colors"
        >
          Update Product
        </button>
      </form>
      {/* EditProductPage */}
    </div>
  );
};

export default EditProductPage;
