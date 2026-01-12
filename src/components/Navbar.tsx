import ExploreIcon from "@mui/icons-material/Explore";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SendIcon from "@mui/icons-material/Send";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {AppBar, Box, Button, Tooltip} from "@mui/material";
import React, {useMemo, useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import {USER_ID} from "../constants";
import {useAppDispatch, useAppSelector} from "../hooks";
import {clearAuthToken} from "../store/slices/auth";
import {imageRandom} from "../utils/helpers";
import AvatarUI from "./AvatarUI";
import NotificationsContain from "./NotificationsContain";

/**
 * Navbar Component
 *
 * Primary navigation Navbar with logo, auth controls, and navigation menu.
 * Responsive layout: narrow (70px) on mobile, wide (250px) on desktop.
 * Manages Search and Notifications drawer states.
 *
 * Features:
 * - Instagram logo (desktop) or camera icon (mobile)
 * - Navigation menu (Home, Search, Explore, Messages, Notifications, Profile)
 * - Search drawer (SearchContain) for user search
 * - Notifications drawer (NotificationsContain) for alerts
 * - Login/Logout toggle based on auth state
 * - Active tab indication
 * - Full-height sticky AppBar
 *
 * @component
 */

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const IMAGE_PROFILE = useMemo(() => imageRandom(Number(USER_ID), "icon"), []);
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
  const [isShowNotifications, setIsShowNotifications] =
    useState<boolean>(false);
  const {isAuthenticated} = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearAuthToken());
  };

  const navIcons = [
    {
      to: "/",
      icon: <HomeIcon />,
      iconOutLine: <HomeOutlinedIcon />,
      label: "Home",
    },
    {
      to: undefined,
      icon: <SearchRoundedIcon />,
      iconOutLine: <SearchRoundedIcon />,
      label: "Search",
    },
    {
      to: "/explore",
      icon: <ExploreIcon />,
      iconOutLine: <ExploreOutlinedIcon />,
      label: "Explore",
    },
    {
      to: "/messages",
      icon: <SendIcon />,
      iconOutLine: <SendOutlinedIcon />,
      label: "Messages",
    },
    {
      to: undefined,
      icon: <FavoriteOutlinedIcon />,
      iconOutLine: <FavoriteBorderOutlinedIcon />,
      label: "Notifications",
    },
    {
      to: `/profile/${USER_ID}`,
      icon: (
        <Box
          sx={{
            width: "1.75rem",
            height: "35px",
            aspectRatio: "1 / 1",
            "@media (max-width: 767px)": {
              width: "auto",
            },
          }}
        >
          <AvatarUI profileImage={IMAGE_PROFILE} size={"free"} />
        </Box>
      ),
      label: "Profile",
    },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        left: 0,
        p: 1,
        display: "none",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: "100vh",
        minHeight: "100vh",
        borderRadius: 0,
        border: "0.25px",
        borderRight: "1px solid #262626",
        width: "70px",
        "@media (min-width: 1024px)": {
          width: "250px",
        },

        "@media (max-width: 767px)": {
          display: "flex",
          height: "55px",
          minHeight: "55px",
          maxHeight: "55px",
          width: "100%",
          borderBottom: "1px solid #262626",
          padding: 0,
          justifyContent: "space-between",
          flexDirection: "row",
        },
        ".MuiAppBar-root": {
          zIndex: 8990,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: "100%",
          paddingY: 2,
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          "&:hover": {
            textDecoration: "none",
          },
          "@media (max-width: 767px)": {
            paddingY: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
      >
        <>
          <NotificationsContain
            open={isShowNotifications}
            onClose={() => {
              setIsShowNotifications(false);
            }}
          />
          <Box
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "2rem",
              fontFamily: "cursive",
              paddingX: 2,
            }}
          >
            Instagram
          </Box>
        </>
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 2,
        }}
      >
        {isAuthenticated && (
          <>
            <Box
              sx={{
                height: "100%",
                width: "fit-content",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                "@media (min-width: 1024px)": {
                  alignItems: "flex-start",
                },
              }}
            >
              {navIcons.map((item, index) => {
                return (
                  <Box
                    key={`nav-icon-${index}`}
                    sx={{
                      width: "100%",
                      "@media (max-width: 767px)": {
                        display:
                          item.label === "Notifications" ? "flex" : "none",
                      },
                    }}
                  >
                    <Tooltip
                      key={`nav-icon-${index}`}
                      title={item?.label}
                      placement="right"
                      arrow
                    >
                      <Button
                        onClick={() =>
                          item?.to === undefined && item?.label === "Search"
                            ? (setIsShowSearch(true),
                              setIsShowNotifications(false))
                            : item?.to === undefined &&
                              item?.label === "Notifications"
                            ? (setIsShowNotifications(true),
                              setIsShowSearch(false))
                            : (setActiveTab?.(item?.label),
                              setIsShowSearch(false),
                              setIsShowNotifications(false))
                        }
                        component={item?.to !== undefined ? RouterLink : "div"}
                        to={item?.to}
                        sx={{
                          gap: 1,
                          display: "flex",
                          justifyContent: "flex-start",
                          width: "100%",
                          color: "#ffffff",
                          borderRadius: 0,
                          padding: 0,
                          "&:hover": {
                            color: "#86A1FF",
                          },
                          "@media (max-width: 767px)": {
                            justifyContent: "center",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            fontSize: "1rem",
                            svg: {fontSize: "1.75rem"},
                            gap: 2,
                            "@media (max-width: 767px)": {
                              gap: 0,
                              justifyContent: "center",
                            },

                            fontWeight:
                              (activeTab === item?.label &&
                                !isShowSearch &&
                                !isShowNotifications) ||
                              (isShowSearch && item?.label === "Search") ||
                              (isShowNotifications &&
                                item?.label === "Notifications")
                                ? "bold"
                                : "normal",
                          }}
                        >
                          {activeTab === item?.label ||
                          item?.label === "Profile" ||
                          (isShowSearch && item?.label === "Search") ||
                          (isShowNotifications &&
                            item?.label === "Notifications")
                            ? item?.icon
                            : item?.iconOutLine}
                          <Box
                            sx={{
                              "@media (max-width: 1023px)": {display: "none"},
                              "@media (max-width: 767px)": {display: "none"},
                            }}
                          >
                            {item?.label}
                          </Box>
                        </Box>
                      </Button>
                    </Tooltip>
                  </Box>
                );
              })}
            </Box>
          </>
        )}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Tooltip
            title={isAuthenticated ? "Logout" : "Login"}
            placement="right"
            arrow
          >
            <Button
              onClick={isAuthenticated ? handleLogout : undefined}
              sx={{
                width: "fit-content",
                gap: 1,
                display: "flex",
                justifyContent: "flex-start",
                color: "#ffffff",
                borderRadius: 0,
                padding: 0,
                ":hover, :focus, :focus-visible, &:hover": {
                  color: "#86A1FF",
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                },
                "@media (max-width: 767px)": {
                  justifyContent: "center",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  fontSize: "1rem",
                  svg: {fontSize: "1.75rem"},

                  "@media (min-width: 1024px)": {
                    justifyContent: "flex-start",
                  },
                  "@media (max-width: 1023px)": {
                    justifyContent: "flex-start",
                  },
                  "@media (max-width: 767px)": {
                    justifyContent: "center",
                  },
                }}
              >
                {isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    "@media (max-width: 1023px)": {
                      display: "none",
                    },
                    "@media (max-width: 767px)": {
                      display: "none",
                    },
                  }}
                >
                  {isAuthenticated ? "Logout" : "Login"}
                </Box>
              </Box>
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </AppBar>
  );
};

export default React.memo(Navbar);

/**
 * USAGE NOTES:
 *
 * Navigation Menu:
 * - Home: \"/\" route
 * - Search: Opens SearchContain drawer
 * - Explore: \"/explore\" route
 * - Messages: \"/messages\" route
 * - Notifications: Opens NotificationsContain drawer
 * - Profile: \"/profile/1\" route
 *
 * Layout Responsive:
 * - Mobile (max-width: 1023px): 70px width, icons only
 * - Desktop (min-width: 1024px): 250px width, icons + labels
 *
 * Logo Display:
 * - Mobile: CameraAltOutlinedIcon
 * - Desktop: \"Instagram\" text (cursive font)
 *
 * Auth State:
 * - Authenticated: Shows logout button, all nav items visible
 * - Not authenticated: Shows login button, nav items disabled
 *
 * State Management:
 * - activeTab: Current active navigation item
 * - isShowSearch: Controls SearchContain drawer
 * - isShowNotifications: Controls NotificationsContain drawer
 * - isAuthenticated: From Redux auth state
 *
 * Styling:
 * - AppBar: sticky position, full height (100vh)
 * - Background: Inherits theme (dark #0B1013)
 * - Border: 1px solid #262626 right edge
 * - Icons: 1.75rem size, white color
 *
 * Performance:
 * - Wrapped with React.memo()
 * - Child components memoized
 * - Redux selectors optimized
 */

/* Example: App root layout */
/* <Box sx={{display: \"flex\"}}>
  <Navbar />
  <Box sx={{flex: 1}}>
    <Routes>
      <Route path=\"/\" element={<Home />} />
      <Route path=\"/explore\" element={<Explore />} />
    </Routes>
  </Box>
</Box> */
