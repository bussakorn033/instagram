import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#86A1FF", // Instagram blue
      light: "#e0f7ff",
      dark: "#0076c3",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ed4956", // Instagram red/pink
      light: "#fff0f2",
      dark: "#bd081c",
      contrastText: "#ffffff",
    },
    success: {
      main: "#31a24c",
    },
    warning: {
      main: "#f59e0b",
    },
    error: {
      main: "#ef4444",
    },
    background: {
      default: "#0B1013",
      //   default: "#fafafa",
      paper: "transparent",
    },
    text: {
      primary: "#0B1013",
      secondary: "#65676b",
      disabled: "#a0a0a0",
    },
    divider: "#efefef",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.015em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "-0.005em",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "0.95rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#262626", // สี divider default
          borderWidth: "0.25px",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        popper: {
          zIndex: 9999,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 700,
          padding: "8px 24px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-1px) scale(1)",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 149, 246, 0.3)",
          },
        },
        outlined: {
          borderColor: "#dbdbdb",
          "&:hover": {
            backgroundColor: "#fafafa",
            borderColor: "#a0a0a0",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            backgroundColor: "#fafafa",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            "&.Mui-focused": {
              backgroundColor: "#ffffff",
              "& fieldset": {
                borderColor: "#86A1FF",
                borderWidth: 2,
              },
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 14px",
            fontSize: "0.875rem",
            "&::placeholder": {
              color: "#a0a0a0",
              opacity: 1,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          border: "1px solid #3b3b3b",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        elevation1: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          //     backgroundColor: "#ffffff",
          //   color: "#0B1013",
          backgroundColor: "#0B1013",
          color: "#ffffff",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid #efefef",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontSize: "0.8rem",
          fontWeight: 500,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
      },
    },
  },
});
