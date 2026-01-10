import type {User} from "../../../types";

/* ==================== Types ==================== */
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface AuthState {
  user: User | null;
  token: string | null;
  status: RequestStatus;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
