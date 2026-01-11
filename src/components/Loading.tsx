import {Box, CircularProgress} from "@mui/material";
import React from "react";

/**
 * Loading Component
 *
 * Displays a circular progress spinner with gradient stroke animation.
 * Used for loading states throughout the application.
 *
 * Features:
 * - Gradient SVG stroke (pink to blue)
 * - Centered layout
 * - Smooth animation
 * - Customizable size via sx prop
 *
 * @component
 * @example
 * <Loading />
 *
 * @example
 * <Loading sx={{ my: 4 }} />
 */

interface LoadingProps {
  sx?: Record<string, any>;
  id?: string;
}

const Loading: React.FC<LoadingProps> = ({sx, id}) => {
  return (
    <Box
      id={id}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        py: 4,
        ...sx,
      }}
    >
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{
            "svg circle": {
              stroke: "url(#my_gradient)",
            },
          }}
        />
      </React.Fragment>
    </Box>
  );
};

export default Loading;
