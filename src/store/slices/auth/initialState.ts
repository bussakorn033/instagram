import type {AuthState} from "./types";

/* ==================== Initial State ==================== */
export const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  status: "idle",
  error: null,
  isAuthenticated: !!localStorage.getItem("authToken"),
};
