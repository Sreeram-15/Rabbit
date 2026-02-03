import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Products/FeaturedSection";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import axios from "axios";

// const placeholderProducts=[
//   {
//     _id: 1,
//     name: "High-waist Skinny Jeans",
//     price: 50,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=1",
//         altText: "High-waist Skinny Jeans",
//       }
//     ]
//   },
//   {
//     _id: 2,
//     name: "Wide-Leg Trousers",
//     price: 60,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=2",
//         altText: "Wide-Leg Trousers",
//       }
//     ]
//   },
//   {
//     _id: 3,
//     name: "Stretch Leggins",
//     price: 25,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=3",
//         altText: "Stretch Leggins",
//       }
//     ]
//   },
//   {
//     _id: 4,
//     name: "Pleated Midi Skirt",
//     price: 55,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=4",
//         altText: "Pleated Midi Skirt",
//       }
//     ]
//   },
//   {
//     _id: 5,
//     name: "Flared Plazzo Pants",
//     price: 45,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=5",
//         altText: "Flared Plazzo Pants",
//       }
//     ]
//   },
//   {
//     _id: 6,
//     name: "High-Rise Joggers",
//     price: 40,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=6",
//         altText: "High Rise Joggers",
//       }
//     ]
//   },
//   {
//     _id: 7,
//     name: "Paper bag waist Shorts",
//     price: 35,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=7",
//         altText: "Paper bag waist Shorts",
//       }
//     ]
//   },
//   {
//     _id: 4,
//     name: "Stretch Denim Shorts",
//     price: 40,
//     images: [
//       {
//         url: "https://picsum.photos/500?random=8",
//         altText: "Stretch Denim Shorts",
//       }
//     ]
//   },]

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      }),
    );
    // Fetch Best Seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
        // setBestSellerProduct(null);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Gender Collection Section */}
      <GenderCollectionSection />

      {/* New Arrival */}
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      { bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p>Loading best seller Product ....</p>
      )}

      {/* Top Wears for women */}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />

      <FeaturedSection />
      {/* Home */}
    </div>
  );
};

export default Home;
