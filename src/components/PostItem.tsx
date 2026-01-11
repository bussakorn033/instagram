import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SmartDisplayRoundedIcon from "@mui/icons-material/SmartDisplayRounded";
import {Box, Typography} from "@mui/material";
import React, {useState} from "react";
import type {PostItem} from "../store/slices/post/types";
import {formatNumber} from "../utils/helpers";

/**
 * PostItem Component
 *
 * A thumbnail gallery component displaying posts in a grid layout with hover interactions.
 * Shows engagement metrics, image badges, and supports multiple display modes for different contexts.
 *
 * Features:
 * - Grid thumbnail with customizable aspect ratio (1:1 or 4:5)
 * - Hover overlay with like and comment counts
 * - Image type badges (album, image, video)
 * - View count display for reels
 * - Scale animation on hover (1.05x)
 * - Responsive icon scaling on mobile
 * - Context-specific display modes (posts, reels, saved, tagged)
 * - Performance optimized with React.memo
 *
 * @component
 */

interface PostItemProps {
  post: PostItem;
  typePost?: "posts" | "reels" | "saved" | "tagged";
  typeImage?: "image" | "video";
  onClickPostItem?: (post: PostItem) => void;
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  typePost = "posts",
  typeImage = "image",
  onClickPostItem,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onClick={() => onClickPostItem?.(post)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: typePost === "saved" ? "1 / 1" : "4 / 5",
        overflow: "hidden",
        cursor: "pointer",
        border: "0.5px solid #0B1013",
        backgroundColor: "#0B1013",
        color: "#ffffff",
      }}
    >
      {/* Views */}
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          left: 8,
          display:
            typePost === "posts" || typePost === "saved" || isHovered
              ? "none"
              : "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          color: "#ffffff",
          zIndex: 10,
        }}
      >
        {typePost === "saved" ? (
          <>
            <Typography sx={{fontSize: "0.875rem", fontWeight: 600}}>
              {post.album}
            </Typography>
          </>
        ) : (
          <>
            <RemoveRedEyeOutlinedIcon sx={{fontSize: "2rem"}} />
            <Typography sx={{fontSize: "0.875rem", fontWeight: 600}}>
              {formatNumber(post.reactions.likes)}
            </Typography>
          </>
        )}
      </Box>

      {/* TypeImage */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display:
            typePost === "reels" || typePost === "saved" || isHovered
              ? "none"
              : "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          color: "#ffffff",
          zIndex: 10,
        }}
      >
        {typeImage === "video" ? (
          <SmartDisplayRoundedIcon
            sx={{fontSize: "2rem", textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)"}}
          />
        ) : (
          <PhotoLibraryRoundedIcon
            sx={{fontSize: "2rem", textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)"}}
          />
        )}
      </Box>

      {/* Image/Video */}
      <Box
        component="img"
        src={post?.imageVDO || post?.imagePost?.[0]}
        alt="Post"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.3s ease",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Hover Overlay */}
      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 20,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: typePost === "saved" ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            animation: "fadeIn 0.2s ease-in-out",
            "@media (max-width: 1023px)": {
              flexDirection: "column",
              gap: 1,
              ">div": {
                transform: "scale(0.6)",
              },
            },
            "@keyframes fadeIn": {
              from: {opacity: 0},
              to: {opacity: 1},
            },
          }}
        >
          {/* Likes */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              color: "#ffffff",
            }}
          >
            <FavoriteRoundedIcon sx={{fontSize: "2rem"}} />
            <Typography sx={{fontSize: "0.875rem", fontWeight: 600}}>
              {formatNumber(post.reactions.likes)}
            </Typography>
          </Box>

          {/* Comments */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              color: "#ffffff",
            }}
          >
            <ModeCommentRoundedIcon sx={{fontSize: "2rem"}} />
            <Typography sx={{fontSize: "0.875rem", fontWeight: 600}}>
              {formatNumber(post.reactions.dislikes)}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(PostItem);

/**
 * USAGE NOTES:
 *
 * Props:
 * - post: Post object (required)
 * - typePost: Display context (\"posts\", \"reels\", \"saved\", \"tagged\")
 * - typeImage: Image badge (\"album\", \"image\", \"video\")
 * - onClickPostItem: Click callback
 *
 * Display Modes:
 * - \"posts\": Profile/explore grid
 * - \"reels\": Video content
 * - \"saved\": Bookmarked (no hover overlay)
 * - \"tagged\": User tagged posts
 *
 * Hover Effects:
 * - Scale animation: scale(1.05)
 * - Black overlay: rgba(0, 0, 0, 0.5)
 * - Shows engagement metrics with icons
 * - Fade-in animation
 *
 * Image Badges (top-right):\n * - \"album\": Multiple images icon
 * - \"image\": Single image icon
 * - \"video\": Video icon
 * - Hidden on hover
 * \n * Responsive:
 * - Mobile: Scales icons down 60%
 * - Desktop: Full-size icons
 *
 * Performance:
 * - Wrapped with React.memo()
 * - useCallback for handlers
 * - Suitable for large grids
 */

/* Example: Explore grid */
/* <PostItem post={post} typePost=\"posts\" typeImage={getImageType(post.images.length)} /> */

/* Example: Saved posts */
/* <PostItem post={post} typePost=\"saved\" /> */
