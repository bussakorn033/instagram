import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  keyframes,
} from "@mui/material";
import {Carousel} from "antd";
import React, {useEffect, useState} from "react";
import type {PostItem} from "../store/slices/post/types";
import {formatNumber} from "../utils/helpers";
import AvatarPost from "./AvatarPost";
import FloatingHearts from "./FloatingHearts";

// Like button animation keyframes
const globalBounce = keyframes`
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

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
  post: PostItem;
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  currentSlide?: number;
  slideCount?: number;
  onClick?: () => void;
}

const PrevArrow = ({
  className,
  style,
  onClick,
  currentSlide = 0,
}: ArrowProps) => (
  <div
    className={className}
    style={{
      ...style,
      display: currentSlide === 0 ? "none" : "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      opacity: 0.8,
      top: "50%",
      left: 12,
      zIndex: 1,
      transform: "rotate(90deg)",
      backgroundColor: "#262626",
      zoom: 1.2,
    }}
    onClick={onClick}
  >
    <ExpandCircleDownRoundedIcon />
  </div>
);

const NextArrow = ({
  className,
  style,
  onClick,
  currentSlide = 0,
  slideCount = 0,
}: ArrowProps) => (
  <div
    className={className}
    style={{
      ...style,
      display: currentSlide + 1 === slideCount ? "none" : "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      opacity: 0.8,
      top: "50%",
      right: 5,
      zIndex: 1,
      transform: "rotate(270deg) translateY(-50%)",
      backgroundColor: "#262626",
      zoom: 1.2,
    }}
    onClick={onClick}
  >
    <ExpandCircleDownRoundedIcon />
  </div>
);

const Post: React.FC<PostProps> = ({post}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isAnimateLike, setIsAnimateLike] = useState(false);
  const [isAnimateDoubleLike, setIsAnimateDoubleLiked] = useState(false);
  const [animateSave, setAnimateSave] = useState(false);

  useEffect(() => {
    if (
      (post?.reactions?.likes >= 50 && post?.reactions?.likes <= 100) ||
      (post?.reactions?.likes >= 300 && post?.reactions?.likes <= 400) ||
      (post?.reactions?.likes >= 600 && post?.reactions?.likes <= 700)
    ) {
      setIsLiked(true);
    }
  }, [post?.reactions?.likes]);

  const handleLike = () => {
    setIsAnimateLike(true);
    setIsLiked(!isLiked);
    // Reset animation after it completes
    setTimeout(() => setIsAnimateLike(false), 500);
  };

  const handleDoubleLike = (isLike?: boolean) => {
    setIsAnimateDoubleLiked(true);
    setIsLiked(isLike !== undefined ? isLike : !isLiked);
    // Reset animation after it completes
    setTimeout(() => setIsAnimateDoubleLiked(false), 500);
  };

  const handleSave = () => {
    setAnimateSave(true);
    setIsSaved(!isSaved);
    // Reset animation after it completes
    setTimeout(() => setAnimateSave(false), 500);
  };

  return (
    <Card
      sx={{
        width: "100%",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        border: "none",

        ".slick-dots > li, .slick-dots > li > button , slick-dots > li.slick-active":
          {
            width: "10px !important",
            height: "10px !important",
            aspectRatio: "1 / 1",
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            opacity: 0.5,
          },
        ".slick-active": {
          opacity: "1 !important",
        },
      }}
    >
      {/* Post Header */}
      <AvatarPost
        data={{
          userName: post?.userName?.toString() as string,
          profileImage: post?.imageProfile as string,
          isPrivate: false,
          isFinal: false,
          size: "small",
          atDate: post?.atDate,
          location: post?.location,
          music: post?.music,
        }}
        handleAction={(isFriend) => {
          console.log("isFriend", isFriend);
        }}
      />

      {/* Post Images */}
      {[...(post?.imagePost || [])]?.length > 0 ? (
        <>
          <Carousel
            rows={1}
            vertical={false}
            infinite={true}
            dots={true}
            swipe={true}
            swipeToSlide={true}
            draggable={true}
            arrows={true}
            slidesPerRow={1}
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
          >
            {post?.imagePost?.map((image, index) => (
              <Box
                key={`post-image-${index}`}
                sx={{
                  position: "relative",
                  height: "100%",
                  color: "#ffffff",
                  paddingX: 0.5,
                }}
              >
                <CardMedia
                  onDoubleClick={() => {
                    handleDoubleLike(true);
                  }}
                  component="img"
                  height="500"
                  image={image}
                  alt={`Post Image ${index + 1}`}
                  sx={{
                    objectFit: "cover",
                    aspectRatio: "1 / 1",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <FloatingHearts isActive={isAnimateDoubleLike} />
              </Box>
            ))}
          </Carousel>
        </>
      ) : (
        <Box sx={{position: "relative"}}>
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: "#ffffff",
            }}
          >
            <VideoLibraryRoundedIcon
              sx={{
                fontSize: {xs: "1rem", sm: "1.5rem", md: "2rem"},
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                cursor: "pointer",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <CardMedia
              onDoubleClick={() => {
                handleDoubleLike(true);
              }}
              component="img"
              height="500"
              image={post?.imageVDO}
              alt="Post"
              sx={{
                objectFit: "cover",
                aspectRatio: "1 / 1",
                width: "100%",
                height: "100%",
                borderRadius: 1,
              }}
            />
            <FloatingHearts isActive={isAnimateDoubleLike} />
          </Box>
        </Box>
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
                  color: isLiked ? "#ef4444" : "#ffffff",
                  transition: "color 0.2s ease",
                  animation: isAnimateLike
                    ? `${globalBounce} 0.5s ease-in-out`
                    : "none",
                  ":hover, :focus, :focus-visible": {
                    transform: "scale(1)",
                    outline: "none",
                    border: "none",
                  },
                }}
              >
                {isLiked ? (
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
                {formatNumber(post?.reactions?.likes + (isLiked ? 1 : 0))}
              </Typography>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
              <IconButton
                sx={{
                  color: "#ffffff",
                  ":hover, :focus, :focus-visible": {
                    transform: "scale(1)",
                    outline: "none",
                    border: "none",
                  },
                }}
              >
                <ModeCommentOutlinedIcon sx={{fontSize: "1.5rem"}} />
              </IconButton>
              <Typography
                noWrap={true}
                variant="body2"
                sx={{fontWeight: 700, color: "#ffffff"}}
              >
                {formatNumber(post?.reactions?.dislikes)}
              </Typography>
            </Box>
            <IconButton
              sx={{
                color: "#ffffff",
                ":hover, :focus, :focus-visible": {
                  transform: "scale(1)",
                  outline: "none",
                  border: "none",
                },
              }}
            >
              <SendOutlinedIcon sx={{fontSize: "1.5rem"}} />
            </IconButton>
          </Box>

          <Box sx={{display: "flex", gap: 1}}>
            <IconButton
              onClick={handleSave}
              sx={{
                color: "#ffffff",
                transition: "color 0.2s ease",
                animation: animateSave
                  ? `${globalBounce} 0.5s ease-in-out`
                  : "none",
                ":hover, :focus, :focus-visible": {
                  transform: "scale(1)",
                  outline: "none",
                  border: "none",
                },
              }}
            >
              {isSaved ? (
                <TurnedInOutlinedIcon sx={{fontSize: "1.5rem"}} />
              ) : (
                <TurnedInNotOutlinedIcon sx={{fontSize: "1.5rem"}} />
              )}
            </IconButton>
          </Box>
        </Box>
      </CardActions>

      {/* Likes Count */}
      <CardContent sx={{p: 1}}>
        <Typography color="primary.contrastText" noWrap={true} variant="body2">
          <strong>{post.userName}</strong> {post.body}
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
 * - author: User object (userName, username, profileImage)
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
