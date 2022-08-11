import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../helper/apiHelper";

interface UserState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (
    params: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    const { data } = await axios.post(`${API_BASE}/auth/login`, {
      email: params.email,
      password: params.password,
    });

    return data.token;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      // 以前的寫法是 return {...state, loading: true}
      // 但現在只要用鏈式結構 state.loading 就可以直接賦值修改資料
      // immer 會自動幫我們轉成 immutable
      state.loading = true;
    },
    [login.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
    },
    [login.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
