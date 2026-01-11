import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import {Box} from "@mui/material";
import {Carousel} from "antd";
import React from "react";
import AvatarStory from "./AvatarStory";

/**
 * StorySlide Component
 *
 * A responsive carousel component for displaying user stories with navigation arrows.
 * Integrates Ant Design Carousel with AvatarStory components and custom arrow buttons.
 *
 * Features:
 * - Horizontal carousel with swipe support
 * - Custom navigation arrows with shadow effects
 * - Responsive breakpoints (6 slides desktop, 4 slides mobile)
 * - Arrow buttons hidden at carousel boundaries
 * - Draggable and touchscreen support
 * - Configurable spacing between items
 * - Custom responsive breakpoints
 * - Memoized for performance
 *
 * @component
 */

interface StorySlideProps {
  dataList: Array<{
    userName: string;
    profileImage: string;
    isPrivate?: boolean;
    isFinal?: boolean;
    size?: "small" | "medium" | "large" | "free";
  }>;
  responsive?: Array<{
    breakpoint: number;
    settings: {slidesPerRow?: number};
  }>;
  spaceBetween?: number;
  handleAction?: (data: {
    userName: string;
    profileImage: string;
    isPrivate?: boolean;
    isFinal?: boolean;
    size?: "small" | "medium" | "large" | "free";
  }) => void;
}

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  currentSlide?: number;
  slideCount?: number;
  onClick?: () => void;
};

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
      opacity: 1,
      top: "35%",
      left: 6,
      zIndex: 1,
      transform: "rotate(90deg)",
      backgroundColor: "#262626",
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
      opacity: 1,
      top: "35%",
      right: -2,
      zIndex: 1,
      transform: "rotate(270deg) translateY(-50%)",
      backgroundColor: "#262626",
    }}
    onClick={onClick}
  >
    <ExpandCircleDownRoundedIcon />
  </div>
);

const StorySlide: React.FC<StorySlideProps> = ({
  dataList,
  responsive = undefined,
  spaceBetween = undefined,
  handleAction,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Carousel
        rows={1}
        vertical={false}
        infinite={false}
        dots={false}
        swipe={true}
        swipeToSlide={true}
        draggable={true}
        arrows={true}
        slidesPerRow={responsive?.[0]?.settings?.slidesPerRow || 6}
        responsive={
          responsive || [
            {
              breakpoint: 1024,
              settings: {
                slidesPerRow: 6,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesPerRow: 5,
              },
            },
            {
              breakpoint: 320,
              settings: {
                slidesPerRow: 4,
              },
            },
          ]
        }
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
      >
        {dataList?.map((data, index) => (
          <Box
            key={`story-slide-${index}`}
            onClick={() => handleAction?.(data)}
            sx={{
              position: "relative",
              height: "100%",
              color: "#ffffff",
              paddingX: spaceBetween || 0.5,
            }}
          >
            <AvatarStory data={data} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default React.memo(StorySlide);

/**
 * USAGE NOTES:
 *
 * Props:
 * - dataList: Array of story users (required)
 * - responsive: Custom breakpoints (optional)
 * - spaceBetween: Gap between items (optional)
 * - handleAction: Click callback (optional)
 *
 * Carousel Config:
 * - rows: 1
 * - vertical: false
 * - infinite: false
 * - dots: false
 * - swipe: true
 * - draggable: true
 * - arrows: true
 *
 * Default Breakpoints:
 * - 1024px+: 6 slides per row
 * - 768px+: 6 slides per row
 * - 320px+: 4 slides per row
 *
 * Arrow Buttons:
 * - Hidden at start/end
 * - Background: #262626
 * - Rotated 90°/270°
 * - Shadow effect
 *
 * Performance:
 * - Wrapped with React.memo()
 * - AvatarStory children memoized
 * - Suitable for large lists
 */

/* Example: Home story carousel */
/* <StorySlide
  dataList={storyUsers}
  handleAction={(data) => openStory(data)}
/> */
