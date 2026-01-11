import SendIcon from "@mui/icons-material/Send";
import {Box, IconButton, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {imageRandom, randomNumber} from "../utils/helpers";
import AvatarUI from "./AvatarUI";
import Responsive from "./Responsive";

/**
 * MessageContain Component
 *
 * Floating messages button anchored to bottom-right corner.
 * Shows message icon with conversation preview and user avatars.
 * Responsive design: pill-shaped on desktop, circle on mobile.
 *
 * Features:
 * - Fixed bottom-right floating button
 * - SendRoundedIcon for visual identity
 * - Desktop: Shows "Messages" label with avatar stack
 * - Mobile: Circle icon only
 * - 3 overlapping avatars showing recent contacts
 * - zIndex 1000 to float above content
 *
 * @component
 */

const MessageContain: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1000,
        "@media (max-width: 767px)": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "260px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#212328",
          position: "fixed",
          right: "2rem",
          bottom: "2rem",
          gap: 1,
          borderRadius: "100px",
          "@media (max-width: 1023px)": {
            borderRadius: "100%",
            aspectRatio: "1 / 1",
            button: {
              padding: 1,
            },
          },
          "*": {
            color: "#ffffff",
          },
        }}
      >
        <IconButton
          onClick={() => navigate("/messages")}
          sx={{
            display: "flex",
            gap: 1,
            borderRadius: 50,
            justifyContent: "center",
            px: 2,
            outline: "none",
            border: "none",
            ":hover, :focus, :focus-visible": {
              transform: "scale(1)",
              outline: "none",
              border: "none",
            },
          }}
        >
          <SendIcon />
          <Responsive
            desktop={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography sx={{fontWeight: 700}}>Messages</Typography>
                <Box sx={{position: "relative", display: "flex"}}>
                  {[
                    imageRandom(randomNumber(10, 100), "icon"),
                    imageRandom(randomNumber(10, 100), "icon"),
                    imageRandom(randomNumber(10, 100), "icon"),
                  ]?.map((img, index) => {
                    return (
                      <Box
                        key={`msg-avatar-${index}`}
                        sx={{
                          mr: "-10px",
                          position: "relative",
                          zIndex: 10 - index,
                          width: "40px",

                          ".MuiAvatar-circular": {
                            borderColor: "#212328 !important",
                          },
                        }}
                      >
                        <AvatarUI profileImage={img} size={"free"} />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            }
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default React.memo(MessageContain);

/**
 * USAGE NOTES:
 *
 * Layout:
 * - Fixed position: bottom-right
 * - Position: right 2rem, bottom 2rem
 * - zIndex: 1000 (floats above content)
 * - Desktop: 260px width, pill-shaped
 * - Mobile: Circle (100% aspect ratio)
 *
 * Content:
 * - SendRoundedIcon
 * - \"Messages\" text (desktop only)
 * - 3 overlapping avatars
 *
 * Avatar Stack:
 * - 40px width each
 * - -10px margin (overlap effect)
 * - zIndex stacking
 *
 * Responsive:
 * - Desktop: Rounded rectangle (borderRadius: 100px)
 * - Mobile: Circle (borderRadius: 100%)
 *
 * Performance:
 * - Wrapped with React.memo()
 * - Child components memoized
 *
 * Common Use Cases:
 * - Floating message button
 * - Quick access to messages
 * - Conversation preview
 */

/* Example: Main layout */
/* <Box>
  <MainContent />
  <MessageContain />
</Box> */
