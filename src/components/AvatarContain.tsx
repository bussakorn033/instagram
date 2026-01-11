import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {Box, IconButton, Typography} from "@mui/material";
import React from "react";
import AvatarUI from "./AvatarUI";

/**
 * AvatarContain Component
 *
 * A comprehensive user profile container component that displays user avatar, username,
 * and contextual information with different layout modes.
 *
 * @component
 * @example
 * // Display as user profile type
 * <AvatarContain
 *   type="user"
 *   data={{
 *     userName: "john_doe",
 *     profileImage: "https://example.com/avatar.jpg",
 *     name: "John Doe",
 *     isPrivate: false,
 *     isFinal: false,
 *     size: "medium"
 *   }}
 *   handleAction={(data) => console.log(data)}
 * />
 *
 * @example
 * // Display as friend suggestion type
 * <AvatarContain
 *   type="friend"
 *   isShowType={true}
 *   data={{
 *     userName: "jane_smith",
 *     profileImage: "https://example.com/avatar.jpg",
 *     isFriend: true,
 *     followed: ["John", "Sarah", "Mike"],
 *     size: "large"
 *   }}
 *   handleAction={(data) => handleFollowUser(data)}
 * />
 */

interface AvatarContainProps {
  /** Toggle display of type/status information */
  isShowType?: boolean;
  /** Display mode: "user" (profile info), "friend" (suggestions), "search" (search results) */
  type?: "user" | "friend" | "search";
  /** User data containing profile information */
  data: {
    userName: string;
    profileImage: string;
    name?: string;
    isPrivate?: boolean;
    isFinal?: boolean;
    size?: "small" | "medium" | "large" | "free";
    followed?: string[];
    isFriend?: boolean;
  };
  /** Callback function triggered when user interacts with the component */
  handleAction?: (data?: {
    userName: string;
    profileImage: string;
    name?: string;
    isPrivate?: boolean;
    isFinal?: boolean;
    size?: "small" | "medium" | "large" | "free";
    followed?: string[];
    isFriend?: boolean;
    type?: "user" | "friend" | "search";
  }) => void;
}

const AvatarContain: React.FC<AvatarContainProps> = ({
  isShowType = true,
  type = "friend",
  data,
  handleAction,
}) => {
  const {
    profileImage = "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
    userName,
    name,
    isPrivate,
    isFinal,
    size,
    followed = [],
    isFriend,
  } = data;
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: "calc(100% - 100px)",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <AvatarUI
              profileImage={profileImage}
              isPrivate={isPrivate}
              isFinal={isFinal}
              size={size}
            />
          </Box>
          <Box
            sx={{
              width: isShowType ? "60%" : "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              "@media (max-width: 1023px)": {
                width: isShowType ? "calc(60% - 30px)" : "100%",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 0.5,
              }}
            >
              <Typography
                noWrap={true}
                variant="caption"
                sx={{
                  width: "100%",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {userName}
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 0.5,
              }}
            >
              <Typography
                noWrap={true}
                variant="caption"
                sx={{
                  width: "100%",
                  color: "#d1cfcf",
                  fontSize: 12,
                }}
              >
                {type === "user"
                  ? name
                  : !isFriend
                  ? followed?.map((item) => item).join(", ")
                  : ""}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100px",
            position: "relative",
            display: isShowType ? "flex" : "none",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <IconButton
            onClick={() => handleAction?.({...data, type: type})}
            sx={{
              textAlign: "right",
              gap: 1,
              display: "flex",
              justifyContent: "flex-start",
              color: "#ffffff",
              borderRadius: 0,
              ":hover, :focus, :focus-visible": {
                transform: "scale(1)",
                backgroundColor: "transparent !important",
                outline: "none",
                border: "none",
              },
            }}
          >
            <Typography
              noWrap={true}
              variant="caption"
              sx={{
                color: "#86A1FF",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {type === "search" ? (
                <CloseRoundedIcon sx={{color: "#ffffff"}} />
              ) : type === "user" ? (
                "Switch"
              ) : isFriend ? (
                "Following"
              ) : (
                "Follow"
              )}
            </Typography>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(AvatarContain);

/**
 * USAGE NOTES:
 *
 * Props:
 * - isShowType: Show/hide type or status information (follow button, followed count, etc.)
 * - type: Display mode for different contexts (user profile, friend suggestions, search results)
 * - data: User profile data object
 * - handleAction: Callback for action buttons (follow, unfollow, close)
 *
 * Display Types:
 * - "user": Shows user profile with name and followed users count
 * - "friend": Shows suggested friend with follow button
 * - "search": Shows search result with follow/unfollow button
 *
 * Size Options:
 * - "small": 50px avatar (default)
 * - "medium": 55px avatar
 * - "large": 100px avatar
 * - "free": Responsive size (100% width/height)
 *
 * Examples:
 */

/* User Profile Display */
/* <AvatarContain
  type="user"
  isShowType={true}
  data={{
    userName: "john_doe",
    profileImage: "https://example.com/profile.jpg",
    name: "John Doe",
    isPrivate: false,
    isFinal: false,
    size: "large"
  }}
  handleAction={(data) => handleProfileClick(data)}
/> */

/* Friend Suggestion with Followed Users */
/* <AvatarContain
  type="friend"
  isShowType={true}
  data={{
    userName: "jane_smith",
    profileImage: "https://example.com/profile.jpg",
    isFriend: true,
    followed: ["Alice Johnson", "Bob Smith", "Charlie Brown"],
    size: "medium"
  }}
  handleAction={(isFriend) => handleFollowAction(isFriend)}
/> */

/* Search Result Display */
/* <AvatarContain
  type="search"
  isShowType={true}
  data={{
    userName: "user_search_result",
    profileImage: "https://example.com/profile.jpg",
    name: "Search Result User",
    isFriend: false,
    size: "free"
  }}
/> */

/* Minimal Display Without Type Info */
/* <AvatarContain
  type="friend"
  isShowType={false}
  data={{
    userName: "username",
    profileImage: "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
    isPrivate: false,
    isFinal: false,
    size: "free",
    followed: [
      "user 1",
      "user 2",
      "user 3",
      "user 4",
      "user 5",
      "user 6",
      "user 7",
      "user 8",
      "user 9",
    ],
  }}
/> */
