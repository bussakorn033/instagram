import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import {Box, Drawer, IconButton, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import React from "react";
import AvatarUI from "./AvatarUI";

/**
 * NotificationsContain Component
 *
 * A left-anchored drawer displaying user notifications with two sections:
 * follow requests and today's activities. Responsive design adapts to mobile and desktop layouts.
 *
 * Features:
 * - Follow requests section with action buttons
 * - Today's activities with notification details
 * - Transparent backdrop overlay
 * - Responsive left positioning (250px desktop, 70px mobile)
 * - Avatar display with notification preview
 * - Divider between sections
 * - Performance optimized with React.memo
 *
 * @component
 */

interface NotificationsContainProps {
  open: boolean;
  onClose?: () => void;
}

const NotificationsContain: React.FC<NotificationsContainProps> = ({
  open,
  onClose,
}) => {
  return (
    <Drawer
      onClose={onClose}
      open={open}
      anchor="left"
      sx={{
        ".MuiModal-backdrop": {
          backgroundColor: "transparent",
        },
        ".MuiDrawer-paper": {
          left: 250,
          "@media (max-width: 1023px)": {
            left: 70,
          },
        },
      }}
    >
      <Box
        sx={{
          //   maxWidth: 300,
          //   minWidth: 300,
          width: 300,
          //   width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#0B1013",
          opacity: 1,
          padding: 2,
        }}
      >
        <Typography sx={{fontWeight: 700, color: "#ffffff", fontSize: 24}}>
          Notifications
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          {/* Follow requests */}
          <Box
            sx={{
              width: "100%",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {[...Array(1)]?.map((_, index) => {
              return (
                <Box
                  key={`noti-item-${index}`}
                  sx={{
                    width: "100%",
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Box sx={{display: "flex", gap: 2}}>
                    <AvatarUI
                      profileImage={
                        "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png"
                      }
                      isFinal={false}
                      isPrivate={false}
                      size={"small"}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "#ffffff",
                          fontWeight: 700,
                          width: "100%",
                        }}
                      >
                        Follow requests
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#ffffff",
                          width: "100%",
                        }}
                      >
                        Follow requests
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={() => null}
                    sx={{
                      ":hover, :focus, :focus-visible": {
                        transform: "scale(1)",
                        backgroundColor: "transparent !important",
                        outline: "none",
                        border: "none",
                      },
                    }}
                  >
                    <KeyboardArrowRightRoundedIcon sx={{color: "#ffffff"}} />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
          {/* Follow requests */}

          {/* Today */}
          <Divider
            orientation="horizontal"
            flexItem
            sx={{
              ml: -2,
              width: "calc(100% + 32px)",
            }}
          />
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography sx={{fontWeight: 700, color: "#ffffff"}}>
              Today
            </Typography>
            {[...Array(3)]?.map((_, index) => {
              return (
                <Box
                  key={`noti-item-${index}`}
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <>
                    <AvatarUI
                      profileImage={
                        "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png"
                      }
                      isFinal={false}
                      isPrivate={false}
                      size={"small"}
                    />
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#ffffff",
                        display: "-webkit-box",
                        WebkitLineClamp: 2, // 👈 จำนวนบรรทัด
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "50%",
                      }}
                    >
                      <strong>username</strong> liked your photo. Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit. Sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Typography>
                  </>
                  {true && (
                    <Box
                      component="img"
                      src={
                        "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png"
                      }
                      alt="Post"
                      sx={{
                        width: "20%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
          {/* Today */}
        </Box>
      </Box>
    </Drawer>
  );
};

export default React.memo(NotificationsContain);

/**
 * USAGE NOTES:
 *
 * Props:
 * - open: Boolean to control drawer visibility
 * - onClose: Callback when drawer closed
 *
 * Layout:
 * - Drawer anchored left
 * - Width: 300px
 * - Height: 100vh
 * - Left offset: 250px (desktop) / 70px (mobile)
 * - Background: #0B1013
 *
 * Content:
 * - \"Notifications\" title
 * - Follow requests section (1 item)
 * - Divider line
 * - \"Today\" section (3 items)
 * - Each item: avatar, action buttons
 *
 * Notification Types:
 * - Follow requests: Pending approvals
 * - Today: Recent activities
 * - Actions: Accept/Decline
 *
 * Performance:
 * - Wrapped with React.memo()
 * - Hardcoded items (consider Redux/API)
 */

/* Example: Sidebar integration */
/* <NotificationsContain
  open={isShowNotifications}
  onClose={() => setIsShowNotifications(false)}
/> */
