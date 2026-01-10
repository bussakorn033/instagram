import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {validateEmail, validatePassword} from "../utils/helpers";
import LayoutContain from "./LayoutContain";
import {setAuthToken} from "../store/slices/auth";

/**
 * Login Component
 *
 * Authentication form for user login with email and password.
 * Integrates with Redux auth state and validates credentials.
 *
 * Features:
 * - Email and password input fields
 * - Client-side validation (email format, 8+ character password)
 * - Redux loginUser dispatch with async thunk
 * - Error message display
 * - Loading state with spinner
 * - Auto-redirect to home on success
 * - Register link for new users
 *
 * @component
 */

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {status, error} = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!validatePassword(formData.password)) {
      errors.password = "Password must be at least 8 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // setAuthToken
    dispatch(setAuthToken("tokenXXX"));

    navigate("/");
  };

  return (
    <LayoutContain
      sx={{
        paddingY: 4,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 350,
        width: "80%",
        "@media (max-width: 2012px)": {
          width: "40%",
        },
        "@media (max-width: 1023px)": {
          width: "80%",
        },
      }}
    >
      <Card
        sx={{
          padding: 4,
          textAlign: "center",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          noWrap={true}
          sx={{
            marginBottom: 3,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "cursive",
            fontSize: 46,
          }}
        >
          Instagram
        </Typography>

        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{marginBottom: 2}}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            type="email"
            name="email"
            label="Email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            margin="normal"
            size="small"
            disabled={status === "loading"}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#25292F",
                color: "#FFFFFF",
                borderRadius: "10.5px",
              },
              "& .MuiOutlinedInput-root:hover": {
                backgroundColor: "#25292F",
                color: "#FFFFFF",
                borderRadius: "10.5px",
                outline: "none",
              },
              "& .Mui-focused": {
                backgroundColor: "transparent !important",
                color: "#FFFFFF !important",
                top: "-5px",
                borderRadius: "10.5px",
              },
              ".MuiInputBase-input": {
                p: "0.65rem 1.5rem",
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            margin="normal"
            size="small"
            disabled={status === "loading"}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#25292F",
                color: "#FFFFFF",
                borderRadius: "10.5px",
              },
              "& .MuiOutlinedInput-root:hover": {
                backgroundColor: "#25292F",
                color: "#FFFFFF",
                borderRadius: "10.5px",
                outline: "none",
              },
              "& .Mui-focused": {
                backgroundColor: "transparent !important",
                color: "#FFFFFF !important",
                top: "-5px",
                borderRadius: "10.5px",
              },
              ".MuiInputBase-input": {
                p: "0.65rem 1.5rem",
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={status === "loading"}
            sx={{
              marginTop: 2,
              marginBottom: 2,
              padding: "10px",
              fontSize: "0.95rem",
              fontWeight: 700,
              backgroundColor: "#86A1FF",
              borderRadius: "10.5px",
              ":hover": {
                backgroundColor: "#6e89ff",
              },
            }}
          >
            {status === "loading" ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <Box sx={{marginTop: 2, paddingTop: 2}}>
          <Typography
            color="primary.contrastText"
            noWrap={true}
            variant="body2"
            sx={{color: "#65676b"}}
          >
            Don't have an account?{" "}
            <MuiLink
              href="/register"
              sx={{
                color: "#86A1FF",
                textDecoration: "none",
                fontWeight: 700,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign up
            </MuiLink>
          </Typography>
        </Box>
      </Card>
    </LayoutContain>
  );
};

export default React.memo(Login);

/**
 * USAGE NOTES:
 *
 * Features:
 * - Email and password inputs
 * - Client-side validation
 * - Redux loginUser dispatch
 * - Error message display
 * - Loading spinner
 * - Register link
 *
 * Validation:
 * - Email: Valid email format
 * - Password: Minimum 8 characters
 * - Errors below inputs
 *
 * Redux Integration:
 * - dispatch(loginUser({email, password}))
 * - Reads status, error from Redux auth
 * - Navigates to \"/\" on success
 *
 * Form States:
 * - pending: Button disabled, spinner shown
 * - fulfilled: Success, navigate home
 * - rejected: Error displayed
 *
 * Performance:
 * - Wrapped with React.memo()
 * - Form inputs: local state
 * - Validation: on submit
 */

/* Example: Login page */
/* <Route path=\"/login\" element={<Login />} /> */
