import {Box, Paper} from "@mui/material";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import LayoutContain from "../components/LayoutContain";
import Loading from "../components/Loading";
import PostItem from "../components/PostItem";
import {useAppDispatch, useInfiniteScroll} from "../hooks";
import type {RootState} from "../store";
import {setPostListSkip} from "../store/slices/post";
import {getPostList} from "../store/slices/post/thunks";

const Explore: React.FC = () => {
  const dispatch = useAppDispatch();
  const {postList} = useSelector((state: RootState) => state.post);

  const getPostListData = async () => {
    await dispatch(
      getPostList({
        limit: 12,
        skip: postList?.skip || 0,
      })
    );
  };

  useEffect(() => {
    getPostListData();
  }, [postList?.skip]);

  // Infinite scroll hook for loading more posts
  const {isLoading} = useInfiniteScroll(
    () => {
      // Check if there are more posts to load
      if (
        (postList?.skip || 0) * (postList?.limit || 10) <
        (postList?.total || 0)
      ) {
        console.log("load more posts...");
        dispatch(setPostListSkip((postList?.skip || 0) + 1));
      }
    },
    {
      threshold: 500,
      delay: 500,
      enabled: true,
    }
  );

  return (
    <LayoutContain
      sx={{
        paddingY: 4,
        width: "80%",
        "@media (max-width: 2012px)": {
          width: "70%",
        },
        "@media (max-width: 1023px)": {
          width: "90%",
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          textAlign: "center",
        }}
      >
        {/* Posts Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 1,
          }}
        >
          {postList?.posts.map((post) => (
            <Box key={`explore-post-item-${post.id}`}>
              <PostItem
                post={post}
                typePost="posts"
                typeImage={post?.imageVDO ? "video" : "image"}
              />
            </Box>
          ))}
        </Box>
        {/* Posts Grid */}
        {isLoading && <Loading id={`loading-explore-page`} />}
      </Paper>
    </LayoutContain>
  );
};

export default React.memo(Explore);
