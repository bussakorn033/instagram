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
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import AvatarUI from "../components/AvatarUI";
import LayoutContain from "../components/LayoutContain";
import Loading from "../components/Loading";
import PostItem from "../components/PostItem";
import StorySlide from "../components/StorySlide";
import {USER_ID} from "../constants";
import {useAppDispatch, useInfiniteScroll} from "../hooks";
import type {RootState} from "../store"; // or wherever your store is configured
import {setPostByIdListSkip} from "../store/slices/post";
import {getPostByIdList} from "../store/slices/post/thunks";
import {
  formatNumber,
  imageRandom,
  randomDateTime,
  randomLocation,
  randomMusic,
  randomNumber,
} from "../utils/helpers";

const Profile: React.FC = () => {
  const {userId} = useParams();
  const dispatch = useAppDispatch();
  const {postByIdList} = useSelector((state: RootState) => state.post);
  const [tabValue, setTabValue] = useState("posts");
  const [isLiked, setIsLiked] = useState(false);
  const IMAGE_PROFILE = useMemo(() => imageRandom(Number(userId), "icon"), []);
  const PROFILE = useMemo(() => {
    return {
      storyList: [...Array(randomNumber(0, 39) || 0)]?.map((_, index) => ({
        userName: `Album${index}`,
        profileImage: imageRandom(randomNumber(1, 50), "recipe"),
      })),
      tabPostsList: [...Array(randomNumber(0, 39) || 0)]?.map((_, index) => ({
        userName: `Album${index}`,
        profileImage: imageRandom(randomNumber(1, 50), "recipe"),
      })),
      tabReelsList: [...Array(randomNumber(0, 39) || 0)]?.map((_, index) => ({
        userName: `Album${index}`,
        profileImage: imageRandom(randomNumber(1, 50), "recipe"),
      })),
      tabSavedList: [...Array(randomNumber(0, 39) || 0)]?.map((_, index) => ({
        userName: `Album${index}`,
        profileImage: imageRandom(randomNumber(1, 50), "recipe"),
      })),
      tabTaggedList: [...Array(randomNumber(0, 39) || 0)]?.map((_, index) => ({
        userName: `Album${index}`,
        profileImage: imageRandom(randomNumber(1, 50), "recipe"),
      })),
      postsCount: randomNumber(0, 9000),
      followersCount: randomNumber(0, 9000),
      followingCount: randomNumber(0, 9000),
    };
  }, []);

  const TAB_LIST: Array<{
    label: string;
    icon: React.ReactElement;
    list: Array<{userName: string; profileImage: string}>;
  }> = [
    {label: "posts", icon: <GridOnRoundedIcon />, list: PROFILE.tabPostsList},
    {
      label: "reels",
      icon: <OndemandVideoRoundedIcon />,
      list: PROFILE.tabReelsList,
    },
    {
      label: "saved",
      icon: <BookmarkBorderRoundedIcon />,
      list: PROFILE.tabSavedList,
    },
    {
      label: "tagged",
      icon: <PortraitRoundedIcon />,
      list: PROFILE.tabTaggedList,
    },
  ];

  const handleFollow = () => {};
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const getPostByIdListData = async () => {
    await dispatch(
      getPostByIdList({
        id: userId || "",
        limit: postByIdList?.limit || 24,
        skip: postByIdList?.skip || 0,
      })
    );
  };

  useEffect(() => {
    getPostByIdListData();
  }, [postByIdList?.skip, userId]);

  // Infinite scroll hook for loading more posts
  const {isLoading} = useInfiniteScroll(
    () => {
      // Check if there are more posts to load
      if (
        (postByIdList?.skip || 0) * (postByIdList?.limit || 10) <
        (postByIdList?.total || 0)
      ) {
        console.log("load more posts...");
        dispatch(setPostByIdListSkip((postByIdList?.skip || 0) + 1));
      }
    },
    {
      threshold: 500,
      delay: 500,
      enabled: true,
    }
  );

  useEffect(() => {
    if (
      ((postByIdList?.posts?.[0]?.reactions?.likes ?? 0) >= 50 &&
        (postByIdList?.posts?.[0]?.reactions?.likes ?? 0) <= 100) ||
      ((postByIdList?.posts?.[0]?.reactions?.likes ?? 0) >= 300 &&
        (postByIdList?.posts?.[0]?.reactions?.likes ?? 0) <= 400) ||
      ((postByIdList?.posts?.[0]?.reactions?.likes ?? 0) >= 600 &&
        (postByIdList?.posts?.[0]?.reactions?.likes ?? 0) <= 700)
    ) {
      setIsLiked(true);
    }
  }, [postByIdList?.posts?.length]);

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
                profileImage={IMAGE_PROFILE}
                isPrivate={false}
                isFinal={false}
                size="free"
              />
            </Box>
          </Box>
          {/* Avatar */}

          {/* Profile Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 2,
              width: "50%",
              "@media (max-width: 767px)": {
                zoom: 0.8,
              },
            }}
          >
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
                User {userId || "Unknown"}
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
                    textWrapMode: "nowrap",
                    ":hover, :focus, :focus-visible": {
                      transform: "scale(1)",
                      outline: "none",
                      border: "none",
                    },
                  }}
                >
                  {Number(userId) === USER_ID
                    ? "Edit profile"
                    : isLiked
                    ? "Following"
                    : "Follow"}
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
                    textWrapMode: "nowrap",
                    ":hover, :focus, :focus-visible": {
                      transform: "scale(1)",
                      outline: "none",
                      border: "none",
                    },
                  }}
                >
                  {Number(userId) === USER_ID ? "View archive" : "Message"}
                </Button>

                <Button
                  variant={"contained"}
                  startIcon={isLiked ? <PersonRemoveIcon /> : <PersonAddIcon />}
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
                  {formatNumber(PROFILE.postsCount || 0)}
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
                  {formatNumber(PROFILE.followersCount || 0)}
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
                  {formatNumber(PROFILE.followingCount || 0)}
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
                {postByIdList?.posts?.[0]?.body
                  ? postByIdList?.posts?.[0]?.body
                  : "No bio yet"}
              </Typography>
            </Box>
            {/* Bio */}

            {/* Followed */}
            <Box sx={{display: "flex", gap: 4}}>
              <Typography noWrap={true} sx={{color: "#ffffff"}}>
                {(postByIdList?.posts?.[0]?.tags || []).length > 0 ? (
                  <>
                    <strong>Followed by</strong>{" "}
                    {postByIdList?.posts?.[0]?.tags?.join(", ")}
                  </>
                ) : (
                  "No followed yet"
                )}
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
          padding: 4,
          "@media (max-width: 1023px)": {
            padding: "2rem 0rem",
          },
        }}
      >
        <StorySlide
          spaceBetween={2}
          dataList={[...PROFILE.storyList]?.map((item) => ({
            userName: item.userName,
            profileImage: item.profileImage,
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
              mx: 5,

              "@media (max-width: 1023px)": {
                mx: 5,
              },
              "@media (max-width: 767px)": {
                mx: 2,
              },
            },
            "button:focus, button:focus-visible, button:hover": {
              backgroundColor: "transparent",
              outline: "none",
              border: "none",
            },
          }}
        >
          {[...(TAB_LIST || [])].map((tab, index) => (
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
                // onClick={() => setIsNewCollection(true)}
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
                <AddRoundedIcon sx={{color: "#86A1FF"}} /> New Collection
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
            {TAB_LIST.filter((item) => item.label === tabValue)?.[0]
              ?.list?.map((post, index) => {
                return {
                  id: randomNumber(0, 100000),
                  title: "",
                  body: "",
                  tags: [""],
                  reactions: {
                    likes: randomNumber(0, 100000),
                    dislikes: randomNumber(0, 100000),
                  },
                  views: randomNumber(0, 100000),
                  userId: randomNumber(0, 100000),
                  userName: "",
                  name: "",
                  imageProfile: IMAGE_PROFILE,
                  imagePost: index % 2 === 0 ? [post.profileImage] : undefined,
                  imageVDO: index % 2 !== 0 ? post.profileImage : undefined,
                  atDate: randomDateTime(),
                  location:
                    index % randomNumber(1, 3) === 0
                      ? randomLocation()
                      : undefined,
                  music:
                    index % randomNumber(1, 3) === 0
                      ? randomMusic()
                      : undefined,
                  album:
                    index % randomNumber(1, 3) === 0
                      ? `Album ${randomNumber(1, 3)}`
                      : undefined,
                  albumImages:
                    index % randomNumber(1, 3) === 0
                      ? [...Array(randomNumber(1, 5))].map(() =>
                          imageRandom(
                            randomNumber(1, 50),
                            "text",
                            undefined,
                            undefined,
                            index.toString()
                          )
                        )
                      : undefined,
                };
              })
              ?.map((item, index) => {
                return (
                  <Box key={`post-item-${tabValue}-${index}`}>
                    <PostItem
                      post={item}
                      typePost={
                        tabValue === "posts" || tabValue === "tagged"
                          ? "posts"
                          : tabValue === "reels"
                          ? "reels"
                          : "saved"
                      }
                      typeImage={item?.imageVDO ? "video" : "image"}
                    />
                  </Box>
                );
              })}
          </Box>
          {/* Posts */}
        </>
        {isLoading && <Loading id={`loading-profile-page`} />}
      </Box>
    </LayoutContain>
  );
};

export default Profile;
