import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../helper/apiHelper";
import { API_SOURCE, UDEMY } from '../../helpers/constants';
import { createListenerMiddleware } from "@reduxjs/toolkit";

const isUdemy = API_SOURCE === UDEMY;
interface ShoppingCartState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ShoppingCartState = {
  items: [],
  loading: false,
  error: null,
};

export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (jwt: string, thunkAPI) => {
    const api = isUdemy ? `${API_BASE}/api/shoppingCart` : `${API_BASE}/cart`;
    const { data } = await axios.get(api, {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    });

    if (isUdemy) {
      return data.shoppingCartItems;
    } else {
      return data.data;
    }
  }
);

export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async (parameters: { jwt: string; touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `${API_BASE}/api/shoppingCart/items`,
      {
        // body 內容:
        touristRouteId: parameters.touristRouteId,
      },
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );

    return data.shoppingCartItems;
  }
);

export const updateCart = createAsyncThunk(
  "shoppingCart/updateCart",
  async (parameters: { cartId: string, productId: string; qty: number }, thunkAPI) => {
    const { data } = await axios.put(
      `${API_BASE}/cart/${parameters.cartId}`,
      {
        data: {
          product_id: parameters.productId,
          qty: parameters.qty,
        },
      },
    );

    return data;
  }
);

export const deleteShoppingCartItems = createAsyncThunk(
  "shoppingCart/deleteShoppingCartItems",
  async (params: { jwt: string; itemIds: number[] }, thunkAPI) => {
    // 此 API 是返回 204 (no content), 所以直接 return axios 請求
    return await axios.delete(
      `${API_BASE}/api/shoppingCart/items/(${params.itemIds.join(",")})`,
      {
        headers: {
          Authorization: `bearer ${params.jwt}`,
        },
      }
    );
  }
);

// Udemy version
// export const checkout = createAsyncThunk(
//   "shoppingCart/checkout",
//   async (jwt: string, thunkAPI) => {
//     const { data } = await axios.post(
//       `${API_BASE}/api/shoppingCart/checkout`,
//       null, // body 內容
//       {
//         headers: {
//           Authorization: `bearer ${jwt}`,
//         },
//       }
//     );

//     return data;
//   }
// );

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: {
    // get shopping cart:
    [getShoppingCart.pending.type]: (state) => {
      state.loading = true;
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    [getShoppingCart.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add shopping cart item:
    [addShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    [addShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete shopping cart items:
    [deleteShoppingCartItems.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteShoppingCartItems.fulfilled.type]: (state) => {
      state.loading = false;
      state.items = []; // 刪除成功後，清空 items 列表
      state.error = null;
    },
    [deleteShoppingCartItems.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    // // checkout:
    // [checkout.pending.type]: (state) => {
    //   state.loading = true;
    // },
    // [checkout.fulfilled.type]: (state, action) => {
    //   state.loading = false;
    //   state.items = [];
    //   state.error = null;
    // },
    // [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },

    // update shopping cart:
    [updateCart.pending.type]: (state) => {
      state.loading = true;
    },
    [updateCart.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateCart.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const updateCartMiddleware = createListenerMiddleware();

updateCartMiddleware.startListening({
  actionCreator: updateCart.fulfilled,
  effect: (_, { dispatch, unsubscribe }) => {
    dispatch(getShoppingCart(""));
  },
});

