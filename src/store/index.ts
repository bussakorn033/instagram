import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import postReducer from "./slices/post";
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
