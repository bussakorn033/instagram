import {Avatar, Box} from "@mui/material";
import React from "react";

/**
 * AvatarUI Component
 *
 * Base avatar component that displays a circular profile image with optional status indicators.
 * Includes colorful gradient borders for stories (private/verified accounts).
 * Foundation component used by AvatarStory, AvatarPost, AvatarContain.
 *
 * @component
 * @example
 * // Simple avatar
 * <AvatarUI
 *   profileImage="https://example.com/avatar.jpg"
 *   size="medium"
 * />
 */

interface AvatarUIProps {
  profileImage: string;
  isPrivate?: boolean;
  isFinal?: boolean;
  size?: "small" | "medium" | "large" | "free";
}

const AvatarUI: React.FC<AvatarUIProps> = ({
  profileImage,
  isPrivate,
  isFinal,
  size,
}) => {
  return (
    <Box
      sx={{
        aspectRatio: "1 / 1",
        position: "relative",
        minWidth: 35,
        minHeight: 35,
        width:
          size === "free"
            ? "100%"
            : size === "large"
            ? 100
            : size === "medium"
            ? 55
            : 50,
        height:
          size === "free"
            ? "100%"
            : size === "large"
            ? 100
            : size === "medium"
            ? 55
            : 50,
        borderRadius: "50%",
        padding:
          isPrivate === undefined && isFinal === undefined
            ? 0
            : size === "large"
            ? "4px"
            : "2px",
        background:
          isPrivate === undefined && isFinal === undefined
            ? "transparent"
            : isFinal
            ? "#ededed90"
            : isPrivate
            ? "#0f0"
            : "conic-gradient(from 180deg at 50% 50%, #DE0046 0deg, #F7A34B 120deg, #FFDC80 180deg, #4CAF50 240deg, #3B82F6 300deg, #DE0046 360deg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        src={profileImage}
        alt="avatar"
        sx={{
          aspectRatio: "1 / 1",
          minWidth: 28,
          minHeight: 28,
          width:
            isPrivate === undefined && isFinal === undefined
              ? "inherit"
              : size === "free"
              ? "98%"
              : size === "large"
              ? 92
              : size === "medium"
              ? 50
              : 46,
          height:
            isPrivate === undefined && isFinal === undefined
              ? "inherit"
              : size === "free"
              ? "98%"
              : size === "large"
              ? 92
              : size === "medium"
              ? 50
              : 46,
          borderRadius: "50%",
          border:
            size === "free"
              ? "4px solid #080808"
              : size === "large" || size === "medium"
              ? "3.5px solid #080808"
              : "3px solid #080808",
          backgroundColor: "#c4c4c4",
          "@media (max-width: 1023px)": {
            border:
              isPrivate === undefined && isFinal === undefined
                ? "none"
                : "4px solid #080808",
          },
        }}
      />
    </Box>
  );
};

export default React.memo(AvatarUI);

/**
 * USAGE NOTES:
 *
 * Props:
 * - profileImage: User's profile image URL (required)
 * - isPrivate: Show private account border (green #0f0)
 * - isFinal: Show verified/final account border (gray #ededed90)
 * - size: Avatar dimensions
 *
 * Border Indicators:
 * - No indicators: Regular user (both undefined/false)
 * - Rainbow gradient: Story with gradient border (used in carousels)
 * - Green border: Private account (isPrivate=true)
 * - Gray border: Verified/final account (isFinal=true)
 *
 * Avatar Sizes & Pixel Dimensions:
 * - "small": 50px (default, for dense layouts, lists)
 * - "medium": 55px (for comments, replies, suggestions)
 * - "large": 100px (for profile headers, featured views)
 * - "free": Responsive (100% width/height, for flexible containers)
 *
 * Border & Frame:
 * - Black solid frame around all avatars
 * - Frame thickness: 2-4px depending on size
 * - Padding inside border: 2-4px depending on size
 * - Rainbow gradient: Conic gradient from red through all colors
 *
 * Performance:
 * - Memoized with React.memo() - prevents unnecessary re-renders
 * - No external dependencies beyond MUI
 * - Suitable for high-frequency list rendering
 */

/* Example: Simple Avatar */
/* <AvatarUI
  profileImage="https://example.com/profile.jpg"
  size="small"
/> */

/* Example: Story Avatar with Gradient Border */
/* <AvatarUI
  profileImage="https://example.com/profile.jpg"
  isPrivate={false}
  isFinal={false}
  size="large"
/> */

/* Example: Verified Account (Gray Border) */
/* <AvatarUI
  profileImage="https://example.com/profile.jpg"
  isFinal={true}
  size="medium"
/> */

/* Example: Private Account (Green Border) */
/* <AvatarUI
  profileImage="https://example.com/profile.jpg"
  isPrivate={true}
  size="large"
/> */

/* Example: Different Size Variants */
/* <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
  <AvatarUI profileImage="url" size="small" />
  <AvatarUI profileImage="url" size="medium" />
  <AvatarUI profileImage="url" size="large" />
  <Box sx={{width: "100px", height: "100px"}}>
    <AvatarUI profileImage="url" size="free" />
  </Box>
</Box> */
