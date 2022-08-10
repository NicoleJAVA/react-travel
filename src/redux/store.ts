import { createStore, applyMiddleware } from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductReducer from "./recommendProduct/recommendProductReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
import { searchSlice } from "./search/slice";
import { userSlice } from "./user/slice";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProduct: recommendProductReducer,
  productDetail: productDetailSlice.reducer,
  search: searchSlice.reducer,
  user: userSlice.reducer,
});

// 使用 createAsyncThunk 以前的寫法:
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
// 使用 createAsyncThunk 以後的寫法:
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionLog),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
