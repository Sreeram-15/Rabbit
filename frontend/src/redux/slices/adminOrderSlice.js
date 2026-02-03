import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const userToken = `Bearer ${localStorage.getItem("userToken")}`;
// console.log(userToken);
// Fetch all orders (Admin Only)
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: userToken,
          },
        },
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// update order delivery status
export const updateOrder = createAsyncThunk(
  "adminOrders/updateOrder",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: userToken,
          },
        },
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
        headers: {
          Authorization: userToken,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    loading: false,
    error: null,
    orders: [],
    totalOrders: 0,
    totalSales: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = state.orders.length;
        // console.log(action.payload);
        // calculate total sales
        state.totalSales = state.orders.reduce(
          (acc, curr) => acc + curr.totalPrice,
          0,
        );
        state.error = null;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        // console.error(action.payload.message);
        state.error = action.payload.message;
        // console.log(state.error);
      })
      //   Update order status
      .addCase(updateOrder.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id,
        );
        // console.log(index);
        if (index > -1) state.orders[index] = updatedOrder;
        else state.error="Cannot Update Order";
        state.error = null;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        console.error(state.error);
      })
      //   delete order
      .addCase(deleteOrder.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload._id,
        );

        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      });
  },
});

export default adminOrderSlice.reducer;
