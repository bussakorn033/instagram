import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import {Box, Drawer, IconButton, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../store";
import {randomAction, randomNumber} from "../utils/helpers";
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

interface NotificationsUser {
  userName: string;
  profileImage: string;
  name: string;
  isFriend: boolean;
  isPrivate: undefined;
  isFinal: undefined;
  size: "medium";
  followed: string[];
}

const NotificationsContain: React.FC<NotificationsContainProps> = ({
  open,
  onClose,
}) => {
  const {postList} = useSelector((state: RootState) => state.post);
  const [notificationsFollowRequests, setNotificationsFollowRequests] =
    React.useState<NotificationsUser[] | null>(null);
  const [notificationsToday, setNotificationsToday] = React.useState<
    NotificationsUser[] | null
  >(null);
  const [notificationsThisWeek, setNotificationsThisWeek] = React.useState<
    NotificationsUser[] | null
  >(null);
  const [notificationsThisMonth, setNotificationsThisMonth] = React.useState<
    NotificationsUser[] | null
  >(null);

  useEffect(() => {
    if (
      !notificationsFollowRequests &&
      !notificationsToday &&
      !notificationsThisWeek &&
      !notificationsThisMonth &&
      [...(postList?.posts || [])]?.length > 0
    ) {
      setNotificationsFollowRequests(() => {
        return [...Array(1)]?.map(() => {
          const randomIndex = randomNumber(
            0,
            (postList?.posts?.length || 1) - 1
          );
          const post = postList?.posts?.[randomIndex];
          return {
            userName: post?.userName || "",
            profileImage: post?.imageProfile || "",
            name: post?.userName || "",
            isFriend: false,
            isPrivate: undefined,
            isFinal: undefined,
            size: "medium" as const,
            followed: [...Array(10)]?.map(
              () => `User ${randomNumber(1, 1000)}`
            ),
          };
        });
      });
      setNotificationsToday(() => {
        return [...Array(randomNumber(0, 10))]?.map(() => {
          const randomIndex = randomNumber(
            0,
            (postList?.posts?.length || 1) - 1
          );
          const post = postList?.posts?.[randomIndex];
          const actionPost = randomAction();
          return {
            userName: post?.userName || "",
            profileImage: actionPost?.includes("following")
              ? ""
              : post?.imageProfile || "",
            name: actionPost || "",
            isFriend: false,
            isPrivate: undefined,
            isFinal: undefined,
            size: "medium" as const,
            followed: [...Array(10)]?.map(
              () => `User ${randomNumber(1, 1000)}`
            ),
          };
        });
      });
      setNotificationsThisWeek(() => {
        return [...Array(randomNumber(0, 10))]?.map(() => {
          const randomIndex = randomNumber(
            0,
            (postList?.posts?.length || 1) - 1
          );
          const post = postList?.posts?.[randomIndex];
          const actionPost = randomAction();
          return {
            userName: post?.userName || "",
            profileImage: actionPost?.includes("start following")
              ? ""
              : post?.imageProfile || "",
            name: actionPost || "",
            isFriend: false,
            isPrivate: undefined,
            isFinal: undefined,
            size: "medium" as const,
            followed: [...Array(10)]?.map(
              () => `User ${randomNumber(1, 1000)}`
            ),
          };
        });
      });
      setNotificationsThisMonth(() => {
        return [...Array(randomNumber(0, 10))]?.map(() => {
          const randomIndex = randomNumber(
            0,
            (postList?.posts?.length || 1) - 1
          );
          const post = postList?.posts?.[randomIndex];
          const actionPost = randomAction();
          return {
            userName: post?.userName || "",
            profileImage: actionPost?.includes("start following")
              ? ""
              : post?.imageProfile || "",
            name: actionPost || "",
            isFriend: false,
            isPrivate: undefined,
            isFinal: undefined,
            size: "medium" as const,
            followed: [...Array(10)]?.map(
              () => `User ${randomNumber(1, 1000)}`
            ),
          };
        });
      });
    }
  }, [postList?.posts]);

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
          width: 300,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#0B1013",
          opacity: 1,
          padding: 2,
          position: "fixed",
          overflowY: "auto",
          "::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
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
            {[...(notificationsFollowRequests || [])]?.map((post, index) => {
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
                  <Box sx={{display: "flex", gap: 2}}>
                    <AvatarUI
                      profileImage={post.profileImage}
                      isFinal={false}
                      isPrivate={false}
                      size={"small"}
                    />
                    <Box
                      sx={{
                        width: "65%",
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
                        {post.followed?.slice(0, 3).join(", ")} +{" "}
                        {randomNumber(1, 100)} others
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

          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              py: 2,
            }}
          >
            {[
              notificationsToday && {label: "Today", data: notificationsToday},
              notificationsThisWeek && {
                label: "This Week",
                data: notificationsThisWeek,
              },
              notificationsThisMonth && {
                label: "This Month",
                data: notificationsThisMonth,
              },
            ]?.map((section, sectionIndex) => (
              <Box
                key={`noti-section-${sectionIndex}`}
                sx={{display: "flex", flexDirection: "column", gap: 2}}
              >
                <Divider
                  orientation="horizontal"
                  flexItem
                  sx={{
                    ml: -2,
                    width: "calc(100% + 32px)",
                  }}
                />
                {section?.data && section?.data.length > 0 && (
                  <>
                    <Typography sx={{fontWeight: 700, color: "#ffffff"}}>
                      {section?.label}
                    </Typography>
                    {[...(section?.data || [])]?.map((post, index) => {
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
                              profileImage={post.profileImage}
                              isFinal={false}
                              isPrivate={false}
                              size={"small"}
                            />
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#ffffff",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: post.profileImage ? "50%" : "80%",
                              }}
                            >
                              <strong>{post.userName}</strong> {post.name}
                            </Typography>
                          </>
                          {post.profileImage && (
                            <Box
                              component="img"
                              src={post.profileImage}
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
                  </>
                )}
              </Box>
            ))}
          </Box>
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
