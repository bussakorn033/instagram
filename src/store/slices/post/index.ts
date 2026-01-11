import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {
  imageRandom,
  randomDateTime,
  randomLocation,
  randomMusic,
  randomNumber,
} from "../../../utils/helpers";
import {initialState} from "./initialState";
import {getPostByIdList, getPostList} from "./thunks";
import type {Post, PostItem} from "./types";

/* ==================== Slice ==================== */
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    /** Manually set post list */
    setPostList: (state, action: PayloadAction<Post | null>) => {
      state.postList = action.payload;
    },
    /** Manually set postListSkip */
    setPostListSkip: (state, action: PayloadAction<number>) => {
      if (state.postList) {
        state.postList.skip = action.payload;
      }
    },

    /** Manually set postByIdList */
    setPostByIdList: (state, action: PayloadAction<Post | null>) => {
      state.postByIdList = action.payload;
    },
    /** Manually set postByIdListSkip */
    setPostByIdListSkip: (state, action: PayloadAction<number>) => {
      if (state.postByIdList) {
        state.postByIdList.skip = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    /* ===== GET POST LIST ===== */
    builder
      .addCase(getPostList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPostList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postList = {
          ...action.payload,
          posts: [
            ...(state.postList?.posts || []),
            ...action.payload.posts?.map((post: PostItem) => ({
              ...post,
              userName: `user${post.userId}`,
              name: `User ${post.userId}`,
              imageProfile: imageRandom(`user${post.userId}`, "icon"),
              imagePost:
                post?.userId % 2 === 0
                  ? [...Array(randomNumber(1, 10)).keys()].map(() =>
                      imageRandom(randomNumber(1, 50), "recipe")
                    )
                  : undefined,
              imageVDO:
                post?.userId % 2 !== 0
                  ? imageRandom(randomNumber(1, 50), "recipe")
                  : undefined,
              atDate: randomDateTime(),
              location:
                post?.userId % randomNumber(1, 3) === 0
                  ? randomLocation()
                  : undefined,
              music:
                post?.userId % randomNumber(1, 3) === 0
                  ? randomMusic()
                  : undefined,
              album:
                post?.userId % 2 === 0 ? `Album ${post.userId}` : undefined,
              albumImages:
                post?.userId % 2 === 0
                  ? [...Array(randomNumber(2, 10)).keys()].map(() =>
                      imageRandom(randomNumber(1, 50), "recipe")
                    )
                  : undefined,
            })),
          ],
        };
        state.error = null;
      })
      .addCase(getPostList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    /* ==== GET POST BY ID LIST ===== */
    builder
      .addCase(getPostByIdList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPostByIdList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postByIdList = {
          ...action.payload,
          posts: [
            ...(state.postByIdList?.posts || []),
            ...action.payload.posts?.map((post: PostItem) => ({
              ...post,
              userName: `user${post.userId}`,
              name: `User ${post.userId}`,
              imageProfile: imageRandom(`user${post.userId}`, "icon"),
              imagePost:
                post?.userId % 2 === 0
                  ? [...Array(randomNumber(1, 10)).keys()].map(() =>
                      imageRandom(randomNumber(1, 50), "recipe")
                    )
                  : undefined,
              imageVDO:
                post?.userId % 2 !== 0
                  ? imageRandom(randomNumber(1, 50), "recipe")
                  : undefined,
              atDate: randomDateTime(),
              location:
                post?.userId % randomNumber(1, 3) === 0
                  ? randomLocation()
                  : undefined,
              music:
                post?.userId % randomNumber(1, 3) === 0
                  ? randomMusic()
                  : undefined,
              album:
                post?.userId % 2 === 0 ? `Album ${post.userId}` : undefined,
              albumImages:
                post?.userId % 2 === 0
                  ? [...Array(randomNumber(2, 10)).keys()].map(() =>
                      imageRandom(randomNumber(1, 50), "recipe")
                    )
                  : undefined,
            })),
          ],
        };
        state.error = null;
      })
      .addCase(getPostByIdList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

/* ==================== Exports ==================== */
export const {
  setPostList,
  setPostListSkip,
  setPostByIdList,
  setPostByIdListSkip,
} = postSlice.actions;
export default postSlice.reducer;
