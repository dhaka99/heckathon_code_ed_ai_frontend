import { API_ENDPOINTS, BASE_URL } from "../constants/api-endpoints";
import APIService from "./ApiService";

export const ContenteService = new APIService(BASE_URL);

export const contentSummarization = (payload) =>
  ContenteService.post(API_ENDPOINTS.CONTENT_SUMMARIZATION, payload);

export const createContent = (payload: any) =>
  ContenteService.post(API_ENDPOINTS.CONTENT, payload.file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getContentList = (payload: any) =>
  ContenteService.get(API_ENDPOINTS.CONTENT);

export const getContentDetails = (id: string) =>
  ContenteService.get(API_ENDPOINTS.CONTENT_DETAILS.replace(":id", id));

export const getSummaryList = (payload: any) =>
  ContenteService.get(API_ENDPOINTS.SUMMARY_LIST, payload);

export const getQuizList = (payload: any) =>
  ContenteService.get(API_ENDPOINTS.QUIZ_LIST, payload);

export const getQuizDetails = (id: string) =>
  ContenteService.get(API_ENDPOINTS.QUIZ_DETAILS.replace(":id", id));

export const createQuiz = (payload: any) =>
  ContenteService.post(API_ENDPOINTS.QUIZ_GENERATE, payload);