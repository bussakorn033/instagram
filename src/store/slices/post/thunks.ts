import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from "../../../services/api";

/* ==================== Async Thunks ==================== */

/** Get post list */
export const getPostList = createAsyncThunk(
  "posts/getPostList",
  async (
    {limit = 10, skip = 0}: {limit: number | string; skip: number | string},
    {rejectWithValue}
  ) => {
    try {
      const response = await apiClient.get(
        `/posts?limit=${limit}&skip=${skip}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to get posts"
      );
    }
  }
);

export const getPostByIdList = createAsyncThunk(
  "posts/getPostByIdList",
  async (
    {
      id,
      limit = 10,
      skip = 0,
    }: {id: number | string; limit: number | string; skip: number | string},
    {rejectWithValue}
  ) => {
    try {
      const response = await apiClient.get(
        `/posts/user/${id}?limit=${limit}&skip=${skip}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to get posts"
      );
    }
  }
);
