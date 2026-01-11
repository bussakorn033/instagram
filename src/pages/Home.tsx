import {Box, IconButton, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import AvatarContain from "../components/AvatarContain";
import LayoutContain from "../components/LayoutContain";
import Loading from "../components/Loading";
import Post from "../components/Post";
import StorySlide from "../components/StorySlide";
import {USER_ID} from "../constants";
import {useAppDispatch, useInfiniteScroll} from "../hooks";
import type {RootState} from "../store";
import {setPostListSkip} from "../store/slices/post";
import {getPostList} from "../store/slices/post/thunks";
import type {PostItem} from "../store/slices/post/types";
import {
  convertStringToNumber,
  imageRandom,
  randomNumber,
} from "../utils/helpers";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const {postList} = useSelector((state: RootState) => state.post);

  const handleActionSeeAllFriend = () => {
    console.log("See All Friend");
  };

  const getPostListData = async () => {
    await dispatch(
      getPostList({
        limit: 10,
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
      } else {
        // console.log("no more posts to load");
        dispatch(setPostListSkip(0));
      }
    },
    {
      threshold: 500,
      delay: 500,
      enabled: true,
    }
  );

  return (
    <LayoutContain sx={{paddingY: 2}}>
      <LayoutContain
        sx={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* Feed */}
        <Box
          sx={{
            position: "relative",
            width: "50%",
            "@media (max-width: 1023px)": {
              width: "90%",
            },
            color: "#ffffff",
          }}
        >
          <Box sx={{display: "flex", flexDirection: "column", gap: 4}}>
            {/* Stories */}
            <StorySlide
              dataList={
                [...(postList?.posts?.slice(0, 39) || [])]?.map((post) => ({
                  userName: post.userName || "",
                  profileImage: post.imageProfile || "",
                  isPrivate: false,
                  isFinal: false,
                  size: "free",
                })) || []
              }
              handleAction={(data: {
                userName: string;
                profileImage: string;
                isPrivate?: boolean;
                isFinal?: boolean;
                size?: "small" | "medium" | "large" | "free";
              }) => {
                navigation(
                  `/profile/${convertStringToNumber(
                    data?.userName?.toString()
                  )}`
                );
              }}
            />
            {/* Stories */}
            {/* Posts */}
            <Box
              id="container-post-home-page"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              {[...(postList?.posts || [])]?.map(
                (post: PostItem, index: any) => (
                  <Box
                    key={`post-box-${index}`}
                    sx={{
                      width: "80%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Post post={post} />
                  </Box>
                )
              )}
              {isLoading && <Loading id={`loading-home-page`} />}
            </Box>
            {/* Posts */}
          </Box>
        </Box>
        {/* Feed */}

        {/* Sidebar - Suggestions */}
        <Box
          sx={{
            mt: 2,
            gap: 2,
            justifyContent: "flex-start",
            width: "30%",
            "@media (max-width: 1023px)": {
              display: "none",
            },
          }}
        >
          {/* Current User */}
          <Box>
            <AvatarContain
              type="user"
              data={{
                userName: `User ${USER_ID}`,
                profileImage: imageRandom(USER_ID, "icon"),
                name: `My name ${USER_ID}`,
                size: "medium" as const,
                isFinal: false,
                followed: [...Array(10)]?.map(
                  () => `User ${randomNumber(1, 1000)}`
                ),
              }}
            />
          </Box>

          {/* Suggestions Header */}
          <Box
            sx={{
              gap: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#A8A8A8",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Suggestions For You
            </Typography>
            <IconButton
              onClick={handleActionSeeAllFriend}
              sx={{
                textAlign: "right",
                gap: 1,
                display: "flex",
                justifyContent: "flex-start",
                color: "#ffffff",
                borderRadius: 0,
              }}
            >
              <Typography
                noWrap={true}
                variant="caption"
                sx={{
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                See All
              </Typography>
            </IconButton>
          </Box>

          {/* Suggested Users */}
          {[...(postList?.posts || [])]?.splice(1, 5)?.map((post, index) => (
            <Box key={`suggest-friend-${index}`} sx={{marginBottom: 2}}>
              <AvatarContain
                data={{
                  userName: post.userName || "",
                  profileImage: post.imageProfile || "",
                  name: post.userName || "",
                  isFriend: false,
                  isPrivate: undefined,
                  isFinal: undefined,
                  size: "medium" as const,
                  followed: [...Array(10)]?.map(
                    () => `User ${randomNumber(1, 1000)}`
                  ),
                }}
              />
            </Box>
          ))}
        </Box>
        {/* Sidebar */}
      </LayoutContain>
    </LayoutContain>
  );
};

export default React.memo(Home);
