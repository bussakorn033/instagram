import {Box, Typography} from "@mui/material";
import React from "react";
import AvatarUI from "./AvatarUI";

/**
 * AvatarStory Component
 *
 * Displays a story avatar with username below. Used in story carousels and story tray.
 * Compact vertical layout perfect for story lists and story browsing.
 *
 * @component
 * @example
 * // Basic story avatar
 * <AvatarStory
 *   data={{
 *     userName: "john_doe",
 *     profileImage: "https://example.com/avatar.jpg",
 *     size: "medium"
 *   }}
 * />
 */

interface AvatarStoryProps {
  data: {
    profileImage: string;
    userName: string;
    isPrivate?: boolean;
    isFinal?: boolean;
    size?: "small" | "medium" | "large" | "free";
  };
}

const AvatarStory: React.FC<AvatarStoryProps> = ({data}) => {
  const {
    profileImage = "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
    userName,
    isPrivate,
    isFinal,
    size,
  } = data;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AvatarUI
        profileImage={profileImage}
        isPrivate={isPrivate}
        isFinal={isFinal}
        size={size}
      />
      <Typography
        noWrap={true}
        variant="caption"
        sx={{color: "#ffffff", fontSize: 14}}
      >
        {userName}
      </Typography>
    </Box>
  );
};

export default React.memo(AvatarStory);

/**
 * USAGE NOTES:
 *
 * Props:
 * - data.profileImage: User's avatar image URL
 * - data.userName: Username to display below avatar
 * - data.isPrivate: Show private account indicator (green border)
 * - data.isFinal: Show verified account indicator (gray border)
 * - data.size: Avatar size (small, medium, large, or free)
 *
 * Avatar Sizes:
 * - "small": 50px (for dense lists)
 * - "medium": 55px (recommended for story carousel)
 * - "large": 100px (for featured/highlighted stories)
 * - "free": Responsive (fills 100% of container)
 *
 * Display Behavior:
 * - Username truncates with ellipsis if longer than space
 * - Vertical flexbox layout (avatar on top, username below)
 * - Fixed width layout for grid displays
 *
 * Common Use Cases:
 * - Instagram stories carousel (top of screen)
 * - Story tray in sidebar
 * - Story browsing page
 * - User suggestions with story badge
 */

/* Example: Story Carousel Item */
/* <AvatarStory
  data={{
    userName: "john_doe",
    profileImage: "https://example.com/profile.jpg",
    size: "medium"
  }}
/> */

/* Example: Verified Story Creator */
/* <AvatarStory
  data={{
    userName: "celebrity_user",
    profileImage: "https://example.com/profile.jpg",
    isFinal: true,
    size: "large"
  }}
/> */
