import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./initialState";
import {getCurrentUser, login, logout, register} from "./thunks";

/* ==================== Slice ==================== */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /** Manually set auth token */
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
      state.isAuthenticated = true;
    },

    /** Clear all auth data */
    clearAuthToken: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
      state.isAuthenticated = false;
      state.error = null;
    },

    /** Clear error message */
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* ===== LOGIN ===== */
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    /* ===== REGISTER ===== */
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    /* ===== GET CURRENT USER ===== */
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.token = null;
        localStorage.removeItem("authToken");
      });

    /* ===== LOGOUT ===== */
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

/* ==================== Exports ==================== */
export const {setAuthToken, clearAuthToken, clearError} = authSlice.actions;
export default authSlice.reducer;
