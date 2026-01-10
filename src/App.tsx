import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline, Box, CircularProgress} from "@mui/material";
import {store} from "./store";
import {useAppDispatch, useAppSelector} from "./hooks";
import {theme} from "./theme/theme";

// Components
import Sidebar from "./components/SideBar";
import Login from "./components/Login";
import Register from "./components/Register";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import MessageContain from "./components/MessageContain";

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Main App Component
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const {isAuthenticated, status} = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Try to fetch current user on app load
    if (localStorage.getItem("authToken")) {
    }
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Router>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          "@media (max-width: 767px)": {
            flexDirection: "column-reverse",
          },
        }}
      >
        {isAuthenticated && <Sidebar />}
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // "@media (max-width: 767px)": {
            //   minHeight: "calc(100vh - 48px)",
            // },
          }}
        >
          <MessageContain />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Explore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
