import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contentSummarization } from "../../services/ContentService";
import { showAlert } from "./alertSlice";
import { AxiosError } from "axios";


const contentSlice = createSlice({
  name: "content",
  initialState: {
    contentLoading:{
        contentSummarization: "idle",
    }
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    
    builder.addCase(contentSummarizationAction.pending, (state) => {
        state.contentLoading.contentSummarization = "pending";
      });
      builder.addCase(contentSummarizationAction.fulfilled, (state) => {
        state.contentLoading.contentSummarization = "succeeded";
      });
      builder.addCase(contentSummarizationAction.rejected, (state) => {
        state.contentLoading.contentSummarization = "failed";
      });
  },
});

export const contentSummarizationAction = createAsyncThunk(
    "content/contentSummarization",
    async (payload, { dispatch, rejectWithValue }) => {
      try {
        const data = await contentSummarization(payload);
        dispatch(
          showAlert({
            message: data?.message || "Successfully content generated",
            type: "success",
            show: true,
          }),
        );
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          dispatch(
            showAlert({
              message:
                error?.response?.data?.message ||
                error.message ||
                "Failed to generate content",
              type: "error",
              show: true,
            }),
          );
          return rejectWithValue(
            error?.response?.data?.message ||error.message || "Failed to generate content",
          );
        }
        return rejectWithValue("An unknown error occurred");
      }
    },
  );
export const {  } = contentSlice.actions;
export default contentSlice.reducer;
