import { createSlice } from "@reduxjs/toolkit";
import type { AlertState } from "../../types/common-types";

export const initialState: AlertState = {
  show: false,
  title: "",
  message: "",
  type: "info",
  alertExpirationonTime: null,
};
const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    hideAlert: () => {
      return initialState;
    },
  },
});
export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
