import {Box, Drawer, IconButton, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch, useInfiniteScroll} from "../hooks";
import type {RootState} from "../store";
import {setUserListSkip} from "../store/slices/user";
import {getUserSearchList} from "../store/slices/user/thunks";
import {randomNumber} from "../utils/helpers";
import AvatarContain from "./AvatarContain";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

/**
 * SearchContain Component
 *
 * A left-anchored drawer for user search with real-time search bar and suggested users.
 * Displays recent searches and provides quick access to searched user profiles.
 *
 * Features:
 * - Responsive drawer (300px width, offset by sidebar)
 * - SearchBar component for user search queries
 * - Recent section with clear all button
 * - Suggested users list (5 items)
 * - AvatarContain for user display
 * - Transparent backdrop
 * - Show/hide suggestions based on search state
 * - Memoized for performance
 *
 * @component
 */

interface SearchContainProps {
  open: boolean;
  onClose?: () => void;
}

interface SearchUser {
  userName: string;
  profileImage: string;
  name?: string;
  isPrivate?: boolean;
  isFinal?: boolean;
  size?: "small" | "medium" | "large" | "free";
  followed?: string[];
  isFriend?: boolean;
}

const SearchContain: React.FC<SearchContainProps> = ({open, onClose}) => {
  const dispatch = useAppDispatch();
  const {postList} = useSelector((state: RootState) => state.post);
  const {userSearchList} = useSelector((state: RootState) => state.user);
  const [searchResults, setSearchResults] = React.useState<string>("");
  const [searchRecent, setSearchRecent] = React.useState<SearchUser[] | null>(
    null
  );

  useEffect(() => {
    if (!searchRecent && [...(postList?.posts || [])]?.length > 0) {
      setSearchRecent(() => {
        return [...Array(randomNumber(1, 5))]?.map(() => {
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
    }
  }, [postList?.posts]);

  const getPostListData = async (search: string = "") => {
    if (!search) return;
    await dispatch(
      getUserSearchList({
        value: searchResults,
        limit: 20,
        skip: userSearchList?.skip || 0,
      })
    );
  };

  useEffect(() => {
    getPostListData(searchResults);
  }, [userSearchList?.skip, searchResults]);

  // Infinite scroll hook for loading more posts
  const {isLoading} = useInfiniteScroll(
    () => {
      // Check if there are more posts to load
      if (
        (userSearchList?.skip || 0) * (userSearchList?.limit || 20) <
        (userSearchList?.total || 0)
      ) {
        console.log("load more posts...");
        dispatch(setUserListSkip((userSearchList?.skip || 0) + 1));
      }
    },
    {
      threshold: 500,
      delay: 500,
      enabled: true,
    }
  );

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
          Search
        </Typography>
        <SearchBar onSearch={(query) => setSearchResults(query)} />
        {!searchResults && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                sx={{fontWeight: 700, color: "#ffffff", fontSize: 16}}
              >
                Recent
              </Typography>
              <IconButton
                onClick={() => {
                  setSearchResults("");
                  setSearchRecent(null);
                }}
                sx={{
                  textAlign: "right",
                  gap: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "#ffffff",
                  borderRadius: 0,
                  ":hover, :focus, :focus-visible": {
                    transform: "scale(1)",
                    backgroundColor: "transparent !important",
                    outline: "none",
                    border: "none",
                  },
                }}
              >
                <Typography sx={{color: "#86A1FF", fontSize: 14}}>
                  Clear all
                </Typography>
              </IconButton>
            </Box>

            {[...(searchRecent || [])]?.map((item, index) => (
              <Box key={`suggest-friend-${index}`} sx={{marginBottom: 2}}>
                <AvatarContain
                  isShowType={searchResults?.toString()?.length <= 0}
                  type="search"
                  data={item}
                  handleAction={(data) => {
                    if (!data) return;
                    setSearchRecent((prev) => {
                      if (!prev) return prev;
                      return prev.filter(
                        (user: SearchUser) => user.userName !== data.userName
                      );
                    });

                    console.log(data);
                  }}
                />
              </Box>
            ))}
          </>
        )}
        {isLoading && <Loading id={`loading-search-page`} />}

        {[...(searchRecent || [])]?.length <= 0 && (
          <Typography
            sx={{color: "#ffffff", fontSize: 14, textAlign: "center"}}
          >
            No results found.
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default React.memo(SearchContain);

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
 * - \"Search\" title
 * - SearchBar for user search
 * - \"Recent\" section with \"Clear all\" button
 * - 5 suggested users (AvatarContain type=\"search\")
 * - Suggested users show/hide based on search state
 *
 * Redux Integration:
 * - SearchBar manages search state
 * - Reads searchResults from Redux
 *
 * Performance:
 * - Wrapped with React.memo()
 * - Child components memoized
 */

/* Example: Sidebar integration */
/* <SearchContain
  open={isShowSearch}
  onClose={() => setIsShowSearch(false)}
/> */
