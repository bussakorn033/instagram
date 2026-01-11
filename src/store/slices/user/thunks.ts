import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from "../../../services/api";

/* ==================== Async Thunks ==================== */

/** Get user list */
export const getUserList = createAsyncThunk(
  "users/getUserList",
  async (
    {
      limit = 10,
      skip = 0,
    }: {
      limit: number | string;
      skip: number | string;
    },
    {rejectWithValue}
  ) => {
    try {
      const response = await apiClient.get(
        `/users/filter?limit=${limit}&skip=${skip}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to get users"
      );
    }
  }
);

/** Get user list */
export const getUserSearchList = createAsyncThunk(
  "users/getUserSearchList",
  async (
    {
      value = "",
      limit = 10,
      skip = 0,
    }: {
      key?: string;
      value: string;
      limit: number | string;
      skip: number | string;
    },
    {rejectWithValue}
  ) => {
    try {
      const response = await apiClient.get(
        `/users/search?q=${value}&limit=${limit}&skip=${skip}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to get users"
      );
    }
  }
);
