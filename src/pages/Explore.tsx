import {Box, Paper} from "@mui/material";
import React from "react";
import LayoutContain from "../components/LayoutContain";
import PostItem from "../components/PostItem";
import {generateMockPosts, getImageType} from "../utils/helpers";

const Explore: React.FC = () => {
  const posts = React.useMemo(() => generateMockPosts(10), []);

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
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          textAlign: "center",
        }}
      >
        {/* Posts Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 1,
          }}
        >
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              typePost="posts"
              typeImage={getImageType(post.images.length)}
            />
          ))}
        </Box>
        {/* Posts Grid */}
      </Paper>
    </LayoutContain>
  );
};

export default React.memo(Explore);
