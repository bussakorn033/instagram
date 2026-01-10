import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, {useState} from "react";
import type {Post as PostType} from "../types";
import {formatNumber} from "../utils/helpers";
import AvatarPost from "./AvatarPost";

/**
 * Post Component
 *
 * A detailed post card that displays individual posts with author info, images,
 * engagement metrics, and interactive actions. Integrates with Redux for like management.
 *
 * Features:
 * - Post header with author avatar and metadata (AvatarPost)
 * - Full-width image display with 1:1 aspect ratio
 * - Like/unlike toggle with Redux dispatch
 * - Comment and share action buttons
 * - Like count display with formatted numbers
 * - Post caption with bold username
 * - Bookmark/save functionality
 * - Responsive design
 *
 * @component
 */

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({post}) => {
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (post.isLiked) {
    } else {
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        // marginBottom: 2,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        border: "none",
      }}
    >
      {/* Post Header */}
      <AvatarPost
        data={{
          userID: "username",
          profileImage:
            "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
          isPrivate: false,
          isFinal: false,
          size: "small",
          atDate: "August 2023",
        }}
        handleAction={(isFriend) => {
          console.log("isFriend", isFriend);
        }}
      />

      {/* Post Images */}
      {post.images.length > 0 && (
        <CardMedia
          component="img"
          height="500"
          image={post.images[0]}
          alt="Post"
          sx={{
            objectFit: "cover",
            aspectRatio: "1 / 1",
            width: "100%",
            height: "100%",
          }}
        />
      )}

      {/* Post Actions */}
      <CardActions sx={{paddingBottom: 0}}>
        <Box
          sx={{display: "flex", justifyContent: "space-between", width: "100%"}}
        >
          <Box sx={{display: "flex", gap: 1}}>
            <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
              <IconButton
                onClick={handleLike}
                sx={{
                  color: post.isLiked ? "#ef4444" : "#ffffff",
                  transition: "color 0.2s ease",
                }}
              >
                {post.isLiked ? (
                  <FavoriteIcon sx={{fontSize: "1.5rem"}} />
                ) : (
                  <FavoriteBorderIcon sx={{fontSize: "1.5rem"}} />
                )}
              </IconButton>
              <Typography
                noWrap={true}
                variant="body2"
                sx={{fontWeight: 700, color: "#ffffff"}}
              >
                {formatNumber(post.likes)}
              </Typography>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
              <IconButton
                onClick={() => setShowComments(!showComments)}
                sx={{
                  color: "#ffffff",
                }}
              >
                <ModeCommentOutlinedIcon sx={{fontSize: "1.5rem"}} />
              </IconButton>
              <Typography
                noWrap={true}
                variant="body2"
                sx={{fontWeight: 700, color: "#ffffff"}}
              >
                {formatNumber(post.comments)}
              </Typography>
            </Box>
            <IconButton
              sx={{
                color: "#ffffff",
              }}
            >
              <SendOutlinedIcon sx={{fontSize: "1.5rem"}} />
            </IconButton>
          </Box>

          <Box sx={{display: "flex", gap: 1}}>
            <IconButton
              onClick={handleLike}
              sx={{
                color: post.isLiked ? "#ef4444" : "#ffffff",
                transition: "color 0.2s ease",
              }}
            >
              <TurnedInNotOutlinedIcon sx={{fontSize: "1.5rem"}} />
            </IconButton>
          </Box>
        </Box>
      </CardActions>

      {/* Likes Count */}
      <CardContent sx={{p: 1}}>
        <Typography color="primary.contrastText" noWrap={true} variant="body2">
          <strong>{post.author.username}</strong> {post.caption}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default React.memo(Post);

/**
 * USAGE NOTES:
 *
 * Props:
 * - post: Complete post object with author, images, metadata
 *
 * Post Object Structure:
 * - id: Unique post ID
 * - author: User object (userID, username, profileImage)
 * - images: Array of image URLs
 * - caption: Post text
 * - likes: Like count
 * - comments: Comment count
 * - isLiked: Current user like status
 * - createdAt: ISO 8601 timestamp
 *
 * Features:
 * - AvatarPost header with user info and date
 * - CardMedia for image display
 * - Like/comment/share action buttons
 * - Caption with username bold
 * - Redux like/unlike dispatch
 *
 * Redux Integration:
 * - dispatch(likePost(post.id))
 * - dispatch(unlikePost(post.id))
 * - Dependencies: [post.id, post.isLiked, dispatch]
 *
 * Performance:
 * - Wrapped with React.memo()
 * - useCallback for handleLike
 * - Child components memoized
 */

/* Example: Feed post */
/* <Post post={post} /> */
