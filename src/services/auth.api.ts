import { BASE_URL } from "../constants/api-endpoints.ts";
import type { LoginApiResponse } from "../types/auth";
import APIService from "./ApiService.ts";

export const authService = new APIService(`${BASE_URL}/auth`);

export const login = (username: string, password: string) =>
  authService.post<LoginApiResponse>("/login", { username, password });
