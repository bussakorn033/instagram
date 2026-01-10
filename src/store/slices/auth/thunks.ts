import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from "../../../services/api";
import type {User, ApiResponse} from "../../../types";
import type {LoginPayload, RegisterPayload, LoginResponse} from "./types";

/* ==================== Async Thunks ==================== */

/** Login user with email and password */
export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, {rejectWithValue}) => {
    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        payload
      );
      if (response.data.success && response.data.data) {
        const {token, user} = response.data.data;
        localStorage.setItem("authToken", token);
        return {token, user};
      }
      return rejectWithValue(response.data.error || "Login failed");
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

/** Register new user */
export const register = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, {rejectWithValue}) => {
    try {
      const response = await apiClient.post<ApiResponse<User>>(
        "/auth/register",
        payload
      );
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return rejectWithValue(response.data.error || "Registration failed");
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Registration failed"
      );
    }
  }
);

/** Fetch current authenticated user */
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiClient.get<ApiResponse<User>>("/auth/me");
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return rejectWithValue(response.data.error || "Failed to get user");
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to get user"
      );
    }
  }
);

/** Logout user */
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, {rejectWithValue}) => {
    try {
      await apiClient.post("/auth/logout");
      localStorage.removeItem("authToken");
      return null;
    } catch (error: any) {
      localStorage.removeItem("authToken");
      return rejectWithValue(error.response?.data?.error || "Logout failed");
    }
  }
);
