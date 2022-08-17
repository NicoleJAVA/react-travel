import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../helper/apiHelper";

interface ProductDetailState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  data: null,
  // 這裏 loading 初始值寫 false 會有問題，
  // 會導致 DetailPage.tsx 的 useEffect 不會被呼叫
  loading: true,
  error: null,
};

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId: string, thunkAPI) => {
    const { data } = await axios.get(
      `${API_BASE}/api/touristRoutes/${touristRouteId}`
    );

    return data;
  }
);

export const productDetailSlice = createSlice({
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
