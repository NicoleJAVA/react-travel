import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const ProductDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    fetchStart: (state) => {
      // 以前的寫法是 return {...state, loading: true}
      // 但現在只要用鏈式結構 state.loading 就可以直接賦值修改資料
      // immer 會自動幫我們轉成 immutable
      state.loading = true;
    }, // fetchStart 對映其真正的 reducer
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
