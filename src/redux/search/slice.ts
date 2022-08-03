import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../helper/apiHelper";

interface SearchState {
  data: any;
  loading: boolean;
  error: string | null;
  pagination: any;
}

const initialState: SearchState = {
  data: null,
  loading: true,
  error: null,
  pagination: null,
};

export const searchProduct = createAsyncThunk(
  "search/searchProduct",
  async (
    parameters: {
      keyword: string;
      nextPage: number | string;
      pageSize: number | string;
    },
    thunkAPI
  ) => {
    let url = `${API_BASE}/api/touristRoutes?pageNumber=${parameters.nextPage}&pageSize=${parameters.pageSize}`;
    if (parameters.keyword) {
      url += `&keyword=${parameters.keyword}`;
    }
    const response = await axios.get(url);

    return {
      data: response.data,
      pagination: JSON.parse(response.headers["x-pagination"]),
    };
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      state.loading = true;
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.error = null;
    },
    [searchProduct.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
