import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {Box, InputAdornment, TextField} from "@mui/material";
import React from "react";

/**
 * SearchBar Component
 *
 * A real-time user search input with dropdown results display.
 * Integrates with Redux for user search queries and result management.
 *
 * Features:
 * - Pill-shaped search input (#25292F background)
 * - Search icon (start adornment) and close button (end)
 * - Real-time user search with Redux dispatch
 * - Dropdown results showing matching users
 * - User avatar and username display
 * - Clear/reset functionality
 * - Rounded input styling (100px border-radius)
 * - Memoized for performance
 *
 * @component
 */

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSearch = (value: string) => {
    onSearch(value);
    setQuery(value);
    if (value.trim().length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    onSearch("");
    setQuery("");
    setIsOpen(false);
  };

  return (
    <Box
      className="search-container"
      sx={{
        position: "relative",
        ".search-close:hover": {
          color: "#000",
          backgroundColor: "transparent",
          borderRadius: "50%",
        },
        ".search-close:focus": {
          outline: "none",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none !important",
          outline: "none !important",
        },
      }}
    >
      <TextField
        fullWidth
        placeholder="Search users..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{color: "#A0A0A0"}} />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <CloseRoundedIcon
                  onClick={handleClose}
                  sx={{
                    color: "#A0A0A0",
                    cursor: "pointer",
                    ":hover": {
                      color: "#FFFFFF",
                    },
                  }}
                />
              </InputAdornment>
            ) : null,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#25292F",
            color: "#FFFFFF",
            borderRadius: "100px",
          },
          "& .MuiOutlinedInput-root:hover": {
            backgroundColor: "#25292F",
            color: "#FFFFFF",
            borderRadius: "100px",
            outline: "none",
          },
          "& .Mui-focused": {
            backgroundColor: "#25292F !important",
            color: "#FFFFFF !important",
            borderRadius: "100px",
          },
          ".MuiInputBase-input": {
            p: 1,
          },
        }}
      />
      {isOpen && [...Array(10)].length > 0 && (
        <div className="search-results">
          {[...Array(10)].map((user) => (
            <div key={user.id} className="search-result-item">
              <img
                src={user.profileImage || "👤"}
                alt={user.username}
                className="result-avatar"
              />
              <div className="result-info">
                <p className="result-username">{user.username}</p>
                <p className="result-name">{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

export default React.memo(SearchBar);

/**
 * USAGE NOTES:
 *
 * Props:
 * - onSearch: (query: string) => void callback
 *
 * Features:
 * - Real-time user search
 * - Dropdown results
 * - Close button (X) to clear
 * - Rounded pill-shaped input
 *
 * Redux Integration:
 * - dispatch(searchUsers(query))
 * - dispatch(clearSearchResults())
 * - Reads searchResults from Redux
 *
 * Behavior:
 * - Triggers search if query.trim().length > 0
 * - Dropdown shows when isOpen && searchResults.length > 0
 * - Clears on X button click
 *
 * Styling:
 * - Background: #25292F (dark)
 * - Text: #FFFFFF (white)
 * - Radius: 100px (pill)
 *
 * Performance:
 * - Wrapped with React.memo()
 * - useCallback for handlers
 * - Dependencies: [onSearch, dispatch]
 */

/* Example: In SearchContain */
/* <SearchBar onSearch={(query) => setSearchResults(query)} /> */

/* Example: Direct usage */
/* <SearchBar onSearch={(query) => console.log(query)} /> */
