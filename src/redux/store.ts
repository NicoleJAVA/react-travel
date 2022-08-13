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
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProduct: recommendProductReducer,
  productDetail: productDetailSlice.reducer,
  search: searchSlice.reducer,
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 使用 createAsyncThunk 以前的寫法:
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
// 使用 createAsyncThunk 以後的寫法:
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionLog),
  devTools: true,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default { store, persistor };
