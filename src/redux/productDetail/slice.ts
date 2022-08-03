import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface ProductDetailState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  data: null,
  loading: true,
  error: null,
};

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8089/api/touristRoutes/${touristRouteId}`
    );

    return data;
  }
);

export const ProductDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      // 以前的寫法是 return {...state, loading: true}
      // 但現在只要用鏈式結構 state.loading 就可以直接賦值修改資料
      // immer 會自動幫我們轉成 immutable
      state.loading = true;
    }, // fetchStart 對映其真正的 reducer
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    [getProductDetail.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
