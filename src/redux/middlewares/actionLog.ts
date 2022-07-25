import { Middleware } from "redux";

export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log("目前 store 狀態", store.getState());
  console.log("要派發的 action ", action);
  next(action);
  console.log("更新後的 store 狀態", store.getState());
};
