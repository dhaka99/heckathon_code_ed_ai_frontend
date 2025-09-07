export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  LOGIN: "/login",
  CONTENT_SUMMARIZATION: "/api/v1/content/summarization",
  CONTENT: "/api/v1/content",
  SUMMARY_LIST: "/api/v1/content/summary-list",
  QUIZ_LIST: "/api/v1/content/quiz-list",
  CONTENT_DETAILS: "/api/v1/content/:id",
  QUIZ_DETAILS: "/api/v1/content/quiz/:id",
  QUIZ_GENERATE: "/api/v1/content/quiz/generate",
};
