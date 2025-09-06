import { combineReducers, type UnknownAction } from "@reduxjs/toolkit";
import alertReducer from "./slices/alertSlice.ts";
import authReducer from "./slices/authSlice.ts";
import contentReducer from "./slices/contentSlice.ts";
const appReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  content: contentReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: UnknownAction,
) => {
  if (action.type === "login/logout") {
    localStorage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
