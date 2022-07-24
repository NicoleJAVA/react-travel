import { createStore, combineReducers } from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductReducer from "./recommendProduct/recommendProductReducer";

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProduct: recommendProductReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;
