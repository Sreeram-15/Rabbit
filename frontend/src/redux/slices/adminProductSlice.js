import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async ( _,{ rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// async thunnk to create a new Product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// async thunnk to update a existing Product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({id, productData}, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// async thunk to delete a Product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      // console.log(response.data);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Products for Admin
      .addCase(fetchAdminProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
        // console.log(action);
      })
      //   Create Product
      .addCase(createProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload.message;
      })
      //   Update Product
      .addCase(updateProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const updatedProductIndex = state.products.findIndex(
          (product) => product._id === updatedProduct._id,
        );
        if (updatedProductIndex > -1)
          state.products[updatedProductIndex] = updatedProduct;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      })
      //   Delete Product
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        // console.log(deletedProductId);
        // console.log(id);
        state.products = state.products.filter(
          (product) => product._id != id,
        );
        // console.log(state.products);
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
        console.error(state.error);
      });
  },
});

export default adminProductSlice.reducer;
