import AddRoundedIcon from "@mui/icons-material/AddRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import GridOnRoundedIcon from "@mui/icons-material/GridOnRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import AvatarUI from "../components/AvatarUI";
import LayoutContain from "../components/LayoutContain";
import PostItem from "../components/PostItem";
import StorySlide from "../components/StorySlide";
import {useAppDispatch} from "../hooks";
import {formatNumber} from "../utils/helpers";

const Profile: React.FC = () => {
  const {userId} = useParams();
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState("posts");
  const [isNewCollection, setIsNewCollection] = useState(false);
  console.log(`---- ~ Profile ~ isNewCollection:`, isNewCollection);

  useEffect(() => {
    if (userId) {
    }
  }, [userId, dispatch]);

  // if (!currentProfile) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         minHeight: "100vh",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  const handleFollow = () => {};

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(`---- ~ handleTabChange ~ event:`, event);
    setTabValue(newValue);
  };

  return (
    <LayoutContain
      sx={{
        paddingY: 4,
        width: "80%",
        "@media (max-width: 2012px)": {
          width: "70%",
        },
        "@media (max-width: 1023px)": {
          width: "90%",
        },
      }}
    >
      {/* Profile Header */}
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          borderRadius: 2,
          "@media (max-width: 1023px)": {
            padding: 1,
          },
          "@media (max-width: 767px)": {
            padding: 1,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            "@media (max-width: 1023px)": {
              gap: 2,
            },
            "@media (max-width: 767px)": {
              gap: 2,
              zoom: 0.8,
            },
          }}
        >
          {/* Avatar */}
          <Box
            sx={{
              paddingX: 4,
              "@media (max-width: 1023px)": {
                paddingX: 0,
              },
              "@media (max-width: 767px)": {
                paddingX: 0,
              },
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                flexShrink: 0,
                maxHeight: 165,
                maxWidth: 165,
                minHeight: 100,
                minWidth: 100,
                "@media (max-width: 1023px)": {
                  minHeight: 80,
                  minWidth: 80,
                },
                "@media (max-width: 767px)": {
                  minHeight: 80,
                  minWidth: 80,
                },
              }}
            >
              <AvatarUI
                profileImage={
                  "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png"
                }
                isPrivate={false}
                isFinal={false}
                size="free"
              />
            </Box>
          </Box>
          {/* Avatar */}

          {/* Profile Info */}
          <Box sx={{display: "flex", flexDirection: "column", flex: 1, gap: 2}}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginBottom: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography noWrap={true} sx={{color: "#ffffff", fontSize: 20}}>
                {"username"}
              </Typography>

              <Box sx={{display: "flex", gap: 1}}>
                <Button
                  variant={"contained"}
                  onClick={handleFollow}
                  sx={{
                    backgroundColor: "#25292F",
                    ":hover": {
                      backgroundColor: "#363C44",
                      boxShadow: "none",
                    },
                    textTransform: "none",
                    fontWeight: 700,
                    minWidth: "unset",
                    minHeight: "32px",
                    py: 0.5,
                    px: 2,
                    ":hover, :focus, :focus-visible": {
                      transform: "scale(1)",
                      outline: "none",
                      border: "none",
                    },
                  }}
                >
                  {true ? "Following" : "Follow"}
                </Button>

                <Button
                  variant={"contained"}
                  onClick={handleFollow}
                  sx={{
                    backgroundColor: "#25292F",
                    ":hover": {
                      backgroundColor: "#363C44",
                      boxShadow: "none",
                    },
                    textTransform: "none",
                    fontWeight: 700,
                    minWidth: "unset",
                    minHeight: "32px",
                    py: 0.5,
                    px: 2,
                    ":hover, :focus, :focus-visible": {
                      transform: "scale(1)",
                      outline: "none",
                      border: "none",
                    },
                  }}
                >
                  Message
                </Button>

                <Button
                  variant={"contained"}
                  startIcon={true ? <PersonRemoveIcon /> : <PersonAddIcon />}
                  onClick={handleFollow}
                  sx={{
                    backgroundColor: "#25292F",
                    ":hover": {
                      backgroundColor: "#363C44",
                      boxShadow: "none",
                    },
                    textTransform: "none",
                    fontWeight: 700,
                    aspectRatio: "1 / 1",
                    minWidth: "unset",
                    minHeight: "32px",
                    width: "100%",
                    height: "100%",
                    p: 0.5,
                    span: {
                      m: 0,
                    },
                    ":hover, :focus, :focus-visible": {
                      transform: "scale(1)",
                      outline: "none",
                      border: "none",
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Stats */}
            <Box sx={{display: "flex", gap: 4}}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography
                  noWrap={true}
                  sx={{fontSize: 16, fontWeight: 700, color: "#ffffff"}}
                >
                  {formatNumber(0)}
                </Typography>
                <Typography noWrap={true} sx={{fontSize: 16, color: "#ffffff"}}>
                  Posts
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography
                  noWrap={true}
                  sx={{fontSize: 16, fontWeight: 700, color: "#ffffff"}}
                >
                  {formatNumber(0)}
                </Typography>
                <Typography noWrap={true} sx={{fontSize: 16, color: "#ffffff"}}>
                  Followers
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography
                  noWrap={true}
                  sx={{fontSize: 16, fontWeight: 700, color: "#ffffff"}}
                >
                  {formatNumber(0)}
                </Typography>
                <Typography noWrap={true} sx={{fontSize: 16, color: "#ffffff"}}>
                  Following
                </Typography>
              </Box>
            </Box>
            {/* Stats */}

            {/* Bio */}
            <Box sx={{display: "flex", gap: 4}}>
              <Typography noWrap={true} sx={{color: "#ffffff"}}>
                {"No bio yet"}
              </Typography>
            </Box>
            {/* Bio */}

            {/* Followed */}
            <Box sx={{display: "flex", gap: 4}}>
              <Typography noWrap={true} sx={{color: "#ffffff"}}>
                {"No followed yet"}
              </Typography>
            </Box>
            {/* Followed */}
          </Box>
          {/* Profile Info */}
        </Box>
      </Paper>

      {/* Story Recommend */}
      <Box
        sx={{
          mt: 4,
          padding: 4,
          "@media (max-width: 1023px)": {
            padding: 0,
          },
        }}
      >
        <StorySlide
          spaceBetween={2}
          dataList={[...Array(20)]?.map(() => ({
            userID: "username",
            profileImage:
              "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
            isPrivate: false,
            isFinal: false,
            size: "free",
          }))}
          handleAction={(isFriend) => {
            console.log("isFriend", isFriend);
          }}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesPerRow: 7,
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
          ]}
        />
      </Box>
      {/* Story Recommend */}

      {/* Tab List */}
      <Box
        sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          allowScrollButtonsMobile={true}
          scrollButtons="auto"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& .MuiTab-root": {
              color: "#A0A0A0",
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#ffffff !important",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#ffffff",
            },
            button: {
              minWidth: "50px !important",
              maxWidth: "50px !important",
              mx: 8,
              "@media (max-width: 1023px)": {
                mx: 1,
              },
            },
            "button:focus, button:focus-visible, button:hover": {
              backgroundColor: "transparent",
              outline: "none",
              border: "none",
            },
          }}
        >
          {[
            {label: "posts", icon: <GridOnRoundedIcon />},
            {label: "reels", icon: <OndemandVideoRoundedIcon />},
            {label: "saved", icon: <BookmarkBorderRoundedIcon />},
            {label: "tagged", icon: <PortraitRoundedIcon />},
          ].map((tab, index) => (
            <Tab
              key={`tab-profile-${index}`}
              icon={tab.icon}
              aria-label={tab.label}
              value={tab.label}
            />
          ))}
        </Tabs>
      </Box>
      {/* Tab List */}

      {/* Posts */}
      <Box>
        <>
          {tabValue === "saved" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >
              <Typography sx={{color: "#a8a8a8", fontSize: 12}}>
                Only you can see what you've saved
              </Typography>
              <IconButton
                onClick={() => setIsNewCollection(true)}
                sx={{
                  textAlign: "right",
                  gap: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                  borderRadius: 0,
                  fontWeight: 700,
                  color: "#86A1FF",
                  fontSize: 14,
                  ":focus, :focus-visible, :hover": {
                    transform: "scale(1)",
                    backgroundColor: "transparent",
                    outline: "none",
                    border: "none",
                  },
                }}
              >
                {/* <Typography
                  sx={{fontWeight: 700, color: "#86A1FF", fontSize: 14}}
                > */}
                <AddRoundedIcon sx={{color: "#86A1FF"}} /> New Collection
                {/* </Typography> */}
              </IconButton>
            </Box>
          )}
          {/* Posts */}
          <Box
            sx={{
              display: "grid",
              gap: tabValue === "saved" ? 2 : 0,
              gridTemplateColumns: {
                xs:
                  tabValue === "posts" ||
                  tabValue === "saved" ||
                  tabValue === "tagged"
                    ? "repeat(3, 1fr)"
                    : "repeat(4, 1fr)",
                sm:
                  tabValue === "posts" ||
                  tabValue === "saved" ||
                  tabValue === "tagged"
                    ? "repeat(3, 1fr)"
                    : "repeat(4, 1fr)",
                md:
                  tabValue === "posts" ||
                  tabValue === "saved" ||
                  tabValue === "tagged"
                    ? "repeat(3, 1fr)"
                    : "repeat(4, 1fr)",
              },
            }}
          >
            {[...Array(10)]
              ?.map((_, index) => {
                return {
                  id: `post-${index}`,
                  userId: `user-${index}`,
                  author: {
                    id: `user-${index}`,
                    username: "john_doe",
                    email: "john@example.com",
                    profileImage:
                      "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
                    bio: "Photography enthusiast",
                    followersCount: 250,
                    followingCount: 120,
                    postsCount: 45,
                    isFollowing: false,
                  },
                  album: "Summer Vacation",
                  caption: "Enjoying the sunny day at the beach!",
                  images: [
                    "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
                  ],
                  likes: 150,
                  comments: 25,
                  isLiked: false,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                };
              })
              ?.map((item, index) => (
                <Box key={`post-item-box-${index}`}>
                  <PostItem
                    post={item}
                    typePost={
                      tabValue === "posts" || tabValue === "tagged"
                        ? "posts"
                        : tabValue === "reels"
                        ? "reels"
                        : "saved"
                    }
                    typeImage={
                      item?.images?.length > 1
                        ? "album"
                        : item?.images?.length === 1
                        ? "image"
                        : "video"
                    }
                  />
                </Box>
              ))}
          </Box>
          {/* Posts */}
        </>
      </Box>
    </LayoutContain>
  );
};

export default Profile;
