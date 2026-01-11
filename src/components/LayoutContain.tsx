import {Box, type SxProps} from "@mui/material";
import React from "react";

/**
 * LayoutContain Component
 *
 * A flexible full-height layout wrapper that provides a vertical flex container.
 * Serves as the base layout for pages and modal content with customizable styling.
 *
 * Features:
 * - Full viewport height (100vh minimum)
 * - Vertical flex layout for content stacking
 * - Custom styling via MUI sx prop
 * - Responsive and lightweight
 * - Performance optimized with React.memo
 *
 * @component
 */

interface LayoutContainProps {
  children: React.ReactNode;
  sx?: React.CSSProperties | SxProps;
}

const LayoutContain: React.FC<LayoutContainProps> = ({children, sx}) => {
  return (
    <Box
      sx={{
        maxWidth: 1500,
        margin: "auto",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default React.memo(LayoutContain);

/**
 * USAGE NOTES:
 *
 * Props:
 * - children: Content to render
 * - sx: MUI sx prop for custom styling
 *
 * Default Styles:
 * - minHeight: \"100vh\"
 * - width: \"100%\"
 * - display: \"flex\"
 * - flexDirection: \"column\"
 *
 * Custom Styling:
 * - sx prop merges with defaults
 * - Can override: padding, backgroundColor, gap
 * - Uses MUI sx syntax
 *
 * Performance:
 * - Wrapped with React.memo()
 * - Minimal overhead
 *
 * Common Use Cases:
 * - Page wrappers
 * - Modal content
 * - Form layouts
 * - Vertical stacks
 */

/* Example: Basic page layout */
/* <LayoutContain>
  <Header />
  <Content />
</LayoutContain> */

/* Example: With custom background */
/* <LayoutContain sx={{backgroundColor: \"#f5f5f5\", padding: 2}}>
  <Content />
</LayoutContain> */
