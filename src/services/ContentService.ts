import { API_ENDPOINTS, BASE_URL } from "../constants/api-endpoints";
import APIService from "./ApiService";

export const ContenteService = new APIService(BASE_URL);

export const contentSummarization = ({content, language, length, generateThumbnail}: {content: string, language: string, length: number, generateThumbnail: boolean}) =>
  ContenteService.post(API_ENDPOINTS.CONTENT_SUMMARIZATION, { content , language, length,generateThumbnail});