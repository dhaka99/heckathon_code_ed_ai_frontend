import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  contentSummarization,
  createContent,
  createQuiz,
  getContentDetails,
  getContentList,
  getQuizDetails,
  getQuizList,
  getSummaryList,
} from "../../services/ContentService";
import { showAlert } from "./alertSlice";
import { AxiosError } from "axios";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    contentLoading: {
      contentSummarization: "idle",
      getContentList: "idle",
      getSummaryList: "idle",
      getQuizList: "idle",
      getContentDetails: "idle",
      getQuizDetails: "idle",
      createQuiz: "idle",
    },
    contentList: {},
    summaryList: {},
    quizList: {},
    contentDetails: {},
    quizDetails: {},
  },
  reducers: {},
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

    builder.addCase(getContentListAction.pending, (state) => {
        state.contentLoading.getContentList = "pending";
      });
      builder.addCase(getContentListAction.fulfilled, (state, action) => {
        state.contentLoading.getContentList = "succeeded";
        state.contentList = action.payload;
      });
      builder.addCase(getContentListAction.rejected, (state) => {
        state.contentLoading.getContentList = "failed";
      });

    builder.addCase(getSummaryListAction.pending, (state) => {
      state.contentLoading.getSummaryList = "pending";
    });
    builder.addCase(getSummaryListAction.fulfilled, (state, action) => {
      state.contentLoading.getSummaryList = "succeeded";
      state.summaryList = action.payload?.data;
    });
    builder.addCase(getSummaryListAction.rejected, (state) => {
      state.contentLoading.getSummaryList = "failed";
    });

    builder.addCase(getQuizListAction.pending, (state) => {
      state.contentLoading.getQuizList = "pending";
    });
    builder.addCase(getQuizListAction.fulfilled, (state, action) => {
      state.contentLoading.getQuizList = "succeeded";
      state.quizList = action.payload;
    });
    builder.addCase(getQuizListAction.rejected, (state) => {
      state.contentLoading.getQuizList = "failed";
    });
    builder.addCase(getContentDetailsAction.pending, (state) => {
      state.contentLoading.getContentDetails = "pending";
    });
    builder.addCase(getContentDetailsAction.fulfilled, (state, action) => {
      state.contentLoading.getContentDetails = "succeeded";
      state.contentDetails = action.payload?.data;
    });
    builder.addCase(getContentDetailsAction.rejected, (state) => {
      state.contentLoading.getContentDetails = "failed";
    });
    builder.addCase(getQuizDetailsAction.pending, (state) => {
      state.contentLoading.getQuizDetails = "pending";
    });
    builder.addCase(getQuizDetailsAction.fulfilled, (state, action) => {
      state.contentLoading.getQuizDetails = "succeeded";
      state.quizDetails = action.payload?.data;
    });
    builder.addCase(getQuizDetailsAction.rejected, (state) => {
      state.contentLoading.getQuizDetails = "failed";
    });
    builder.addCase(createQuizAction.pending, (state) => {
      state.contentLoading.createQuiz = "pending";
    });
    builder.addCase(createQuizAction.fulfilled, (state) => {
      state.contentLoading.createQuiz = "succeeded";
    });
    builder.addCase(createQuizAction.rejected, (state) => {
      state.contentLoading.createQuiz = "failed";
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
        })
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
          })
        );
        return rejectWithValue(
          error?.response?.data?.message ||
            error.message ||
            "Failed to generate content"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createContentAction = createAsyncThunk(
  "content/contentSummarization",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const data = await createContent(payload);
      dispatch(
        showAlert({
          message: data?.message || "Successfully content created",
          type: "success",
          show: true,
        })
      );
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(
          showAlert({
            message:
              error?.response?.data?.message ||
              error.message ||
              "Failed to create content",
            type: "error",
            show: true,
          })
        );
        return rejectWithValue(
          error?.response?.data?.message ||
            error.message ||
            "Failed to create content"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const getContentListAction = createAsyncThunk(
    "content/getContentList",
    async (payload, { dispatch, rejectWithValue }) => {
      try {
        const data = await getContentList(payload);
        dispatch(
          showAlert({
            message: data?.message || "Successfully get content list",
            type: "success",
            show: true,
          })
        );
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          dispatch(
            showAlert({
              message:
                error?.response?.data?.message ||
                error.message ||
                "Failed to get content list",
              type: "error",
              show: true,
            })
          );
          return rejectWithValue(
            error?.response?.data?.message ||
              error.message ||
              "Failed to get content list"
          );
        }
        return rejectWithValue("An unknown error occurred");
      }
    }
  );


  export const getSummaryListAction = createAsyncThunk(
    "content/getSummaryList",
    async (payload, { dispatch, rejectWithValue }) => {
      try {
        const data = await getSummaryList(payload);
        dispatch(
          showAlert({
            message: data?.message || "Successfully get summary list",
            type: "success",
            show: true,
          })
        );
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          dispatch(
            showAlert({
              message:
                error?.response?.data?.message ||
                error.message ||
                "Failed to get summary list",
              type: "error",
              show: true,
            })
          );
          return rejectWithValue(
            error?.response?.data?.message ||
              error.message ||
              "Failed to get summary list"
          );
        }
        return rejectWithValue("An unknown error occurred");
      }
    }
  );

  export const getQuizListAction = createAsyncThunk(
    "content/getQuizList",
    async (payload, { dispatch, rejectWithValue }) => {
      try {
        const data = await getQuizList(payload);
        dispatch(
          showAlert({
            message: data?.message || "Successfully get quiz list",
            type: "success",
            show: true,
          })
        );
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          dispatch(
            showAlert({
              message:
                error?.response?.data?.message ||
                error.message ||
                "Failed to get quiz list",
              type: "error",
              show: true,
            })
          );
          return rejectWithValue(
            error?.response?.data?.message ||
              error.message ||
              "Failed to get quiz list"
          );
        }
        return rejectWithValue("An unknown error occurred");
      }
    }
  );

  export const getContentDetailsAction = createAsyncThunk(
    "content/getContentDetails",
    async (payload, { dispatch, rejectWithValue }) => {
      try {
        const data = await getContentDetails(payload);
        dispatch(
          showAlert({
            message: data?.message || "Successfully get content details",
            type: "success",
            show: true,
          })
        );
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          dispatch(
            showAlert({
              message:
                error?.response?.data?.message ||
                error.message ||
                "Failed to get content details",
              type: "error",
              show: true,
            })
          );
          return rejectWithValue(
            error?.response?.data?.message ||
              error.message ||
              "Failed to get content details"
          );
        }
        return rejectWithValue("An unknown error occurred");
      }
    }
  );

  export const getQuizDetailsAction = createAsyncThunk(
    "content/getQuizDetails",
    async (payload, { dispatch, rejectWithValue }) => {
      try {
        const data = await getQuizDetails(payload);
        dispatch(
          showAlert({
            message: data?.message || "Successfully get quiz details",
            type: "success",
            show: true,
          })
        );
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          dispatch(
            showAlert({
              message:
                error?.response?.data?.message ||
                error.message ||
                "Failed to get quiz details",    
              type: "error",
              show: true,
            })
          );
          return rejectWithValue(
            error?.response?.data?.message ||
              error.message ||
              "Failed to get quiz details"
          );
        }
        return rejectWithValue("An unknown error occurred");
      }
    }
  );


  export const createQuizAction = createAsyncThunk(
    "content/createQuiz",
    async (payload, { dispatch, rejectWithValue }) => {
      try {
        const data = await createQuiz(payload);
        dispatch(
          showAlert({
            message: data?.message || "Successfully create quiz",
            type: "success",
            show: true,
          })
        );
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          dispatch(
            showAlert({
              message:
                error?.response?.data?.message ||
                error.message ||
                "Failed to create quiz",    
              type: "error",
              show: true,
            })
          );
          return rejectWithValue(
            error?.response?.data?.message ||
              error.message ||
              "Failed to create quiz"
          );
        }
        return rejectWithValue("An unknown error occurred");
      }
    }
  );
export const {} = contentSlice.actions;
export default contentSlice.reducer;
