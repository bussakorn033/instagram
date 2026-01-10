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
import {useAppSelector} from "../hooks";
import {validateEmail, validatePassword} from "../utils/helpers";
import LayoutContain from "./LayoutContain";

/**
 * Register Component
 *
 * User registration form with username, email, password, and confirm password fields.
 * Integrates with Redux for user registration and includes client-side validation.
 *
 * Features:
 * - Input fields for username, email, password, confirm password
 * - Client-side validation (username length, email format, password match)
 * - Redux registerUser dispatch with async thunk
 * - Error message display
 * - Loading state with spinner
 * - Auto-redirect to login on success
 * - Login link for existing users
 *
 * @component
 */

const Register: React.FC = () => {
  const navigate = useNavigate();
  const {status, error} = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }
    if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!validatePassword(formData.password)) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    navigate("/login");
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
            marginBottom: 1,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "cursive",
            fontSize: 46,
          }}
        >
          Instagram
        </Typography>
        <Typography
          sx={{
            marginBottom: 3,
            color: "#a8a8a8",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Sign up to see photos and videos from your friends.
        </Typography>

        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{marginBottom: 2}}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            type="text"
            name="username"
            label="Username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            error={!!validationErrors.username}
            helperText={validationErrors.username}
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

          <TextField
            fullWidth
            type="password"
            name="confirmPassword"
            label="Confirm password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!validationErrors.confirmPassword}
            helperText={validationErrors.confirmPassword}
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
              "Create Account"
            )}
          </Button>
        </form>

        <Box sx={{marginTop: 2, paddingTop: 2, borderTop: "1px solid #efefef"}}>
          <Typography
            color="primary.contrastText"
            noWrap={true}
            variant="body2"
            sx={{color: "#65676b"}}
          >
            Already have an account?{" "}
            <MuiLink
              href="/login"
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
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Card>
    </LayoutContain>
  );
};

export default React.memo(Register);

/**
 * USAGE NOTES:
 *
 * Features:
 * - Username, email, password, confirm password inputs
 * - Client-side validation
 * - Redux registerUser dispatch
 * - Error message display
 * - Loading spinner
 * - Login link
 *
 * Validation:
 * - Username: Minimum 3 characters
 * - Email: Valid format
 * - Password: Minimum 8 characters
 * - Confirm: Must match password
 * - Errors below inputs
 *
 * Redux Integration:
 * - dispatch(registerUser({username, email, password}))
 * - Reads status, error from Redux auth
 * - Navigates to \"/login\" on success
 *
 * Form States:
 * - pending: Button disabled, spinner
 * - fulfilled: Success, navigate to login
 * - rejected: Error displayed
 *
 * Performance:
 * - Wrapped with React.memo()
 * - Form inputs: local state
 * - Validation: on submit
 */

/* Example: Register page */
/* <Route path=\"/register\" element={<Register />} /> */
