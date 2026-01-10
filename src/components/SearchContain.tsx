import {Box, Drawer, IconButton, Typography} from "@mui/material";
import React from "react";
import AvatarContain from "./AvatarContain";
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

const SearchContain: React.FC<SearchContainProps> = ({open, onClose}) => {
  const [searchResults, setSearchResults] = React.useState<string>("");

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
          Search
        </Typography>
        <SearchBar onSearch={(query) => setSearchResults(query)} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography sx={{fontWeight: 700, color: "#ffffff", fontSize: 16}}>
            Recent
          </Typography>
          <IconButton
            onClick={() => setSearchResults("")}
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

        {[...Array(5)]
          ?.map(() => ({
            userID: "username" as string,
            name: "suggested user" as string,
            profileImage:
              "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png" as string,
            isPrivate: undefined,
            isFinal: undefined,
            size: "medium" as const,
            followed: [
              "user user user user user 1",
              "user user user user user 2",
              "user user user user user 3",
              "user user user user user 4",
              "user user user user user 5",
              "user user user user user 6",
              "user user user user user 7",
              "user user user user user 8",
              "user user user user user 9",
            ] as string[],
          }))
          ?.map((item, index) => (
            <Box key={`suggest-friend-${index}`} sx={{marginBottom: 2}}>
              <AvatarContain
                isShowType={searchResults?.toString()?.length <= 0}
                type="search"
                data={item}
              />
            </Box>
          ))}

        {/* {searchResults?.toString()?.length <= 0 && (
          <Typography
            sx={{color: "#ffffff", fontSize: 14, textAlign: "center"}}
          >
            No results found.
          </Typography>
        )} */}
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
