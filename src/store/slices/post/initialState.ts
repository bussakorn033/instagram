import type {PostState} from "./types";

/* ==================== Initial State ==================== */
export const initialState: PostState = {
  postList: {
    limit: 10,
    skip: 0,
    total: 0,
    posts: [],
  },
  postByIdList: {
    limit: 24,
    skip: 0,
    total: 0,
    posts: [],
  },
  commentByIdList: {
    limit: 10,
    skip: 0,
    total: 0,
    comments: [],
  },
  status: "idle",
  error: null,
};
