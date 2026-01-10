import {Box} from "@mui/material";
import React from "react";

/**
 * Responsive Component
 *
 * A simple utility component for conditionally rendering different content based on screen size.
 * Uses CSS media queries to display mobile or desktop content without re-rendering.
 *
 * Features:
 * - Breakpoint at 1024px (lg breakpoint)
 * - Mobile view: max-width 1023px
 * - Desktop view: min-width 1024px
 * - Pure CSS-based visibility toggle
 * - Both children render, display toggled
 * - Lightweight performance
 * - Memoized for optimization
 *
 * @component
 */

interface ResponsiveProps {
  mobile?: React.ReactNode;
  desktop?: React.ReactNode;
}

const Responsive: React.FC<ResponsiveProps> = ({mobile, desktop}) => {
  return (
    <>
      <Box
        sx={{
          display: mobile ? "block" : "none",
          "@media (min-width: 1024px)": {
            display: "none",
          },
        }}
      >
        {mobile}
      </Box>
      <Box
        sx={{
          display: desktop ? "block" : "none",
          "@media (max-width: 1023px)": {
            display: "none",
          },
        }}
      >
        {desktop}
      </Box>
    </>
  );
};

export default React.memo(Responsive);

/**
 * USAGE NOTES:
 *
 * Props:
 * - mobile: ReactNode for mobile (max-width: 1023px)
 * - desktop: ReactNode for desktop (min-width: 1024px)
 *
 * Breakpoints:
 * - Mobile: max-width: 1023px
 * - Desktop: min-width: 1024px
 *
 * Behavior:
 * - Only one child rendered at a time
 * - Both in DOM, display toggled with CSS
 * - Pure CSS media queries (no JS listeners)
 *
 * Performance:
 * - Memoized with React.memo()
 * - Both children always rendered
 * - Good for navigation, sidebars
 *
 * Common Use Cases:
 * - Navigation bar (mobile icon vs text)
 * - Sidebar toggle
 * - Image carousel vs grid
 * - Header responsive layout
 */

/* Example: Navigation */
/* <Responsive
  mobile={<MobileNav />}
  desktop={<DesktopNav />}
/> */

/* Example: Sidebar */
/* <Responsive
  mobile={<Box>Menu</Box>}
  desktop={<FullSidebar />}
/> */
