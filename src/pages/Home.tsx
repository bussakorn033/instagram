import {Box, IconButton, Typography} from "@mui/material";
import React from "react";
import AvatarContain from "../components/AvatarContain";
import LayoutContain from "../components/LayoutContain";
import Post from "../components/Post";
import StorySlide from "../components/StorySlide";
import {generateMockPosts} from "../utils/helpers";

const STORY_AVATAR_CONFIG = {
  userID: "username",
  profileImage:
    "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
  isPrivate: false,
  isFinal: false,
  size: "free" as const,
};

const USER_AVATAR_CONFIG = {
  userID: "me",
  name: "me me me me me me me me me me",
  profileImage:
    "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
  isPrivate: false,
  isFinal: false,
  size: "medium" as const,
  followed: Array.from(
    {length: 9},
    (_, i) => `user user user user user ${i + 1}`
  ),
};

const SUGGEST_USER_CONFIG = {
  userID: "username" as string,
  name: "suggested user" as string,
  profileImage:
    "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png" as string,
  isPrivate: undefined,
  isFinal: undefined,
  size: "medium" as const,
  followed: Array.from(
    {length: 9},
    (_, i) => `user user user user user ${i + 1}`
  ),
};

const Home: React.FC = () => {
  const posts = React.useMemo(() => generateMockPosts(10), []);
  const storyAvatars = React.useMemo(
    () => Array.from({length: 20}, () => STORY_AVATAR_CONFIG),
    []
  );
  const suggestedUsers = React.useMemo(
    () => Array.from({length: 5}, () => SUGGEST_USER_CONFIG),
    []
  );

  const handleActionSeeAllFriend = () => {
    console.log("See All Friend");
  };

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
            width: "50%",
            "@media (max-width: 1023px)": {
              width: "90%",
            },
          }}
        >
          <Box sx={{display: "flex", flexDirection: "column", gap: 4}}>
            {/* Stories */}
            <StorySlide
              dataList={storyAvatars}
              handleAction={(isFriend) => {
                console.log("isFriend", isFriend);
              }}
            />
            {/* Stories */}

            {/* Posts */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              {posts.map((post, index) => (
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
              ))}
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
            <AvatarContain type="user" data={USER_AVATAR_CONFIG} />
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
          {suggestedUsers.map((user, index) => (
            <Box key={`suggest-friend-${index}`} sx={{marginBottom: 2}}>
              <AvatarContain data={user} />
            </Box>
          ))}
        </Box>
        {/* Sidebar */}
      </LayoutContain>
    </LayoutContain>
  );
};

export default React.memo(Home);
