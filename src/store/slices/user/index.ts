import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {
  imageRandom,
  randomDateTime,
  randomLocation,
  randomMusic,
  randomNumber,
} from "../../../utils/helpers";
import {initialState} from "./initialState";
import {getUserList, getUserSearchList} from "./thunks";
import type {User, UserItem} from "./types";

/* ==================== Slice ==================== */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /** Manually set user list */
    setUserList: (state, action: PayloadAction<User | null>) => {
      state.userList = action.payload;
    },
    /** Manually set userListSkip */
    setUserListSkip: (state, action: PayloadAction<number>) => {
      if (state.userList) {
        state.userList.skip = action.payload;
      }
    },

    /** Manually set userSearchList */
    setUserSearchList: (state, action: PayloadAction<User | null>) => {
      state.userSearchList = action.payload;
    },
    /** Manually set userSearchListSkip */
    setUserSearchListSkip: (state, action: PayloadAction<number>) => {
      if (state.userSearchList) {
        state.userSearchList.skip = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    /* ===== GET POST LIST ===== */
    builder
      .addCase(getUserList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userList = {
          ...action.payload,
          users: [
            ...(state.userList?.users || []),
            ...action.payload.users?.map((user: UserItem) => ({
              ...user,
              userName: `user${user.userId}`,
              name: `User ${user.userId}`,
              imageProfile: imageRandom(`user${user.userId}`, "icon"),
              imageUser:
                user?.userId % 2 === 0
                  ? [...Array(randomNumber(1, 10)).keys()].map(() =>
                      imageRandom(randomNumber(1, 50), "recipe")
                    )
                  : undefined,
              imageVDO:
                user?.userId % 2 !== 0
                  ? imageRandom(randomNumber(1, 50), "recipe")
                  : undefined,
              atDate: randomDateTime(),
              location:
                user?.userId % randomNumber(1, 3) === 0
                  ? randomLocation()
                  : undefined,
              music:
                user?.userId % randomNumber(1, 3) === 0
                  ? randomMusic()
                  : undefined,
              album:
                user?.userId % 2 === 0 ? `Album ${user.userId}` : undefined,
              albumImages:
                user?.userId % 2 === 0
                  ? [...Array(randomNumber(2, 10)).keys()].map(() =>
                      imageRandom(randomNumber(1, 50), "recipe")
                    )
                  : undefined,
            })),
          ],
        };
        state.error = null;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    /* ==== GET POST BY ID LIST ===== */
    builder
      .addCase(getUserSearchList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserSearchList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userSearchList = {
          users: [
            ...(state.userSearchList?.users || []),
            ...action.payload.users,
          ],
          ...action.payload,
        };
        state.error = null;
      })
      .addCase(getUserSearchList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

/* ==================== Exports ==================== */
export const {
  setUserList,
  setUserListSkip,
  setUserSearchList,
  setUserSearchListSkip,
} = userSlice.actions;
export default userSlice.reducer;
