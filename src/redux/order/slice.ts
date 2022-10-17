import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../helper/apiHelper";
import { createListenerMiddleware } from "@reduxjs/toolkit";

interface OrderState {
  currentOrder: any;
  orderMeta: any;
  orderUser: any;
  orderId: string;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  orderMeta: null,
  orderUser: null,
  orderId: "",
  loading: false,
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

// HEXO version
export const checkout = createAsyncThunk(
  "order/checkout",
  async (parameters: { order: any }, thunkAPI) => {
    const { data } = await axios.post(
      `${API_BASE}/order`,
      { data: parameters.order }
    );

    return data;
  }
);

// HEXO 
export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (parameters: { orderId: string | undefined }, thunkAPI) => {
    const { data } = await axios.get(
      `${API_BASE}/order/${parameters.orderId}`
    );

    return data;
  }
);

// HEXO 
export const payOrder = createAsyncThunk(
  "order/payOrder",
  async (parameters: { orderId: string | undefined }, thunkAPI) => {
    const { data } = await axios.post(
      `${API_BASE}/pay/${parameters.orderId}`
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
    // HEXO version - checkout:
    [checkout.pending.type]: (state) => {
      state.loading = true;
      state.orderId = "";
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderId = action.payload.orderId;
      state.error = null;

    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // HEXO - getOrder:
    [getOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderMeta = action.payload;
      if (action.payload.order) {
        state.currentOrder = action.payload.order.products;
        state.orderUser = action.payload.order.user;
      }
      state.error = null;
    },
    [getOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // HEXO - payOrder:
    [payOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [payOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [payOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});


export const payOrderMiddleware = createListenerMiddleware();

payOrderMiddleware.startListening({
  actionCreator: payOrder.fulfilled,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as any;
    listenerApi.dispatch(getOrder({ orderId: state.order.orderId }));
  },
});

