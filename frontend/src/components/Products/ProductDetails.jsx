import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

// const selectedProduct={
//   name :"Slim-Fit Easy-Iron Shirt",
//   price: 34.99,
//   originalPrice: 85,
//   description : "A slim-fit, easy-iron shirt in wollen cotton fabric with a fitted silhouette",
//   availableColours:"",
//   brand:"Urban Chic",
//   Material: "cotton",
//   sizes:["S","M","L","XL"],
//   colors: ["red","black"],
//   images: [
//     {
//       url: "https://picsum.photos/500?random=1",
//       altText: "Slim-Fit Easy-Iron Shirt 1"
//     },
//     {
//       url: "https://picsum.photos/500?random=2",
//       altText: "Slim-Fit Easy-Iron Shirt  2"
//     }
//   ],
//   Quantity: 2,
// }

// const similarProducts=[
//   {
//     _id: 1,
//     name: "Slim-Fit Stretch Shirt",
//     price: 29.99,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=3",
//         altText: "Slim-Fit Stretch Shirt",
//       }
//     ]
//   },
//   {
//     _id: 2,
//     name: "Casual Denim Shirt",
//     price: 49.99,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=4",
//         altText: "Casual Denim Shirt",
//       }
//     ]
//   },
//   {
//     _id: 3,
//     name: "Printed Resort Shirt",
//     price: 29.99,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=5",
//         altText: "Printed Resort Shirt",
//       }
//     ]
//   },
//   {
//     _id: 4,
//     name: "Polo T-Shirt with Ribbed Collar",
//     price: 24.99,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=6",
//         altText: "Polo T-Shirt with Ribbed Collar",
//       }
//     ]
//   },
// ];

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products,
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const productFecthId = productId || id;

  useEffect(() => {
    dispatch(fetchProductDetails(productFecthId));
    dispatch(fetchSimilarProducts(productFecthId));
  }, [dispatch, productFecthId]);

  const [mainImage, setMainImage] = useState();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and a color before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);
    dispatch(
      addToCart({
        productId: productFecthId,
        size: selectedSize,
        quantity: selectedQuantity,
        color: selectedColor,
        userId: user?._id,
        guestId,
      }),
    )
      .then(() => {
        toast.success("Product Added to cart", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error: {error}</p>;
  }

  const handleQuantityChange = (sign) => {
    if (sign === "minus" && selectedQuantity > 1)
      setSelectedQuantity((prev) => prev - 1);
    if (sign === "plus") setSelectedQuantity((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      {selectedProduct&&(
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `ThumbNail {$index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                    ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main product"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `ThumbNail {$index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                    ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Right Side */}
          <div className=" md:w-1/2 md:ml-10">
            <h1 className="underline text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice &&
                `${selectedProduct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              ${selectedProduct.price}
            </p>
            <p className="text-gray-500 mb-4">{selectedProduct.description}</p>

            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 flex-row mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 flex-row mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded
                        ${selectedSize === size ? "bg-black text-white" : ""}
                        `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">Quantity: </p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-2 py-1 text-lg bg-gray-200 border rounded "
                  onClick={() => handleQuantityChange("minus")}
                >
                  -
                </button>
                <span className="text-lg">{selectedQuantity}</span>
                <button
                  className="px-2 py-1 text-lg bg-gray-200 border rounded "
                  onClick={() => handleQuantityChange("plus")}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className={`bg-black text-white w-full py-2 px-6 rounded mb-4 ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-700"
              }`}
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Adding..." : "Add To Cart"}
            </button>

            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characterstics:</h3>
              <table className="w-full text-left text-sm text-grey-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-center mb-4 text-2xl font-medium ">
            You May Also Like
          </h2>
          <ProductGrid products={similarProducts} loading={loading} error={error} />
        </div>
      </div>)}
      {/* ProductDetails */}
    </div>
  );
};

export default ProductDetails;
