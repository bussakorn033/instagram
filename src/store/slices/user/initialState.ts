import type {UserState} from "./types";

/* ==================== Initial State ==================== */
export const initialState: UserState = {
  userList: {
    limit: 10,
    skip: 0,
    total: 0,
    users: [],
  },
  userSearchList: {
    limit: 20,
    skip: 0,
    total: 0,
    users: [],
  },
  status: "idle",
  error: null,
};
