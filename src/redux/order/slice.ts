import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../helper/apiHelper";
import { checkout } from "../shoppingCart/slice";

interface OrderState {
  currentOrder: any;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  loading: true,
  error: null,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (parameters: { jwt: string; orderId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `${API_BASE}/api/orders/${parameters.orderId}/placeOrder`,
      null,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );

    return data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    // placeOrder:
    [placeOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.error = null;
    },
    [placeOrder.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    // checkout:
    [checkout.pending.type]: (state) => {
      state.loading = true;
    },
    [checkout.fulfilled.type]: (state, action) => {
      console.log("測試: checkout B");
      state.loading = false;
      state.currentOrder = action.payload;
      state.error = null;
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
