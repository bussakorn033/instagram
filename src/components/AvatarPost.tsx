import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {Box, IconButton, Typography} from "@mui/material";
import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {convertStringToNumber} from "../utils/helpers";
import AvatarUI from "./AvatarUI";

/**
 * AvatarPost Component
 *
 * Displays a post header with user avatar, username, and metadata (date, location, music).
 * Used at the top of post cards to show author information and post details.
 *
 * @component
 * @example
 * // Basic post header
 * <AvatarPost
 *   data={{\n *     userName: "john_doe",
 *     profileImage: "https://example.com/avatar.jpg",
 *     atDate: "2 hours ago",
 *     location: "Bangkok, Thailand",
 *     size: "small"
 *   }}
 *   handleAction={(isFriend) => console.log(isFriend)}
 * />
 */

interface AvatarPostProps {
  data: {
    userName: string;
    profileImage: string;
    isPrivate?: boolean;
    isFinal?: boolean;
    size?: "small" | "medium" | "large" | "free";
    isFriend?: boolean;
    atDate?: string;
    location?: string;
    music?: string;
  };
  handleAction?: (isFriend?: boolean) => void;
}

const AvatarPost: React.FC<AvatarPostProps> = ({data, handleAction}) => {
  const {
    profileImage = "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
    userName,
    isPrivate,
    isFinal,
    size,
    isFriend,
    atDate = "",
    location = "",
    music = "",
  } = data;
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: 1,
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
            width: "90%",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            component={RouterLink}
            to={`/profile/${convertStringToNumber(userName)}`}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              "@media (max-width: 1023px)": {
                maxWidth: "100px",
              },
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
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              "@media (max-width: 1023px)": {
                width: "calc(90% - 30px)",
              },
            }}
          >
            <Box
              component={RouterLink}
              to={`/profile/${convertStringToNumber(userName)}`}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 0.5,
                "&:hover": {textDecoration: "none"},
              }}
            >
              <Typography
                noWrap={true}
                variant="caption"
                sx={{
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {userName}
              </Typography>
              <Typography
                noWrap={true}
                variant="caption"
                sx={{
                  color: "#6a6a6a",
                  fontSize: 16,
                }}
              >
                {userName && <span>•</span>} {atDate}
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
                  color: "#ffffff",
                  fontSize: 16,
                }}
              >
                {location} {location && music && " • "} {music}
              </Typography>
            </Box>
          </Box>
        </Box>
        <IconButton
          onClick={() => handleAction?.(isFriend)}
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
              color: "#ffffff",
              fontSize: 16,
              aspectRatio: "1 / 1",
            }}
          >
            <MoreHorizOutlinedIcon />
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
};

export default React.memo(AvatarPost);

/**
 * USAGE NOTES:
 *
 * Props:
 * - data.userName: Username identifier
 * - data.profileImage: Avatar image URL
 * - data.isPrivate: Show private account badge
 * - data.isFinal: Show verified account badge
 * - data.atDate: When post was made (e.g., "2 hours ago", "August 15, 2023")
 * - data.location: Post location (e.g., "Bangkok, Thailand")
 * - data.music: Music credit (e.g., "Summer Vibes - Artist")
 * - handleAction: Callback for more options (⋮) button
 *
 * Avatar Sizes:
 * - "small": 50px (for feed posts)
 * - "medium": 55px (for comments, replies)
 * - "large": 100px (for profile, detailed views)
 * - "free": Responsive (100% width/height)
 *
 * Common Use Cases:
 * - Post cards in feed (with date, location)
 * - Story headers (with location, music)
 * - Notification items (with date)
 * - Comment author display (with date)
 */

/* Example: Post Card Header */
/* <AvatarPost
  data={{
    userName: "@john_doe",
    profileImage: "https://example.com/profile.jpg",
    isPrivate: false,
    isFinal: true,
    atDate: "2 hours ago",
    location: "Bangkok, Thailand",
    size: "small"
  }}
  handleAction={(isFriend) => handleMoreOptions()}
/> */

/* Example: Story Header with Music */
/* <AvatarPost
  data={{
    userName: "@jane_smith",
    profileImage: "https://example.com/profile.jpg",
    atDate: "Just now",
    location: "Phuket Beach",
    music: "Summer Vibes - The Weeknd",
    size: "medium"
  }}
/> */
