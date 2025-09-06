import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "../../constants/local-storage-keys";
import { AxiosError } from "axios";
import { showAlert } from "./alertSlice";
import type { User } from "../../types/auth";
import type { AsyncStatusType } from "../../types/common-types";
import { login } from "../../services/auth.api";

interface State {
  user: Partial<User> | null;
  status: AsyncStatusType;
}

const initialState: State = {
  user: { firstName: "", email: "" },
  status: "idle",
};
interface LoginPayload {
  username: string;
  password: string;
}

export const loginAction = createAsyncThunk(
  "login",
  async (
    { username, password }: LoginPayload,
    { dispatch, rejectWithValue },
  ) => {
    try {
      const data = await login(username, password);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(
          showAlert({
            message:
              error?.response?.data?.message || error.message || "Login failed",
            type: "error",
            show: true,
          }),
        );
        return rejectWithValue(
          error?.response?.data?.message || error.message || "Login failed",
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.data.user;
    });

    builder.addCase(loginAction.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
