// App Constants
export const APP_NAME = "Instagram Clone";
export const APP_VERSION = "1.0.0";

// Image Constraints
export const MAX_IMAGE_SIZE = 5242880; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGES_PER_POST = 10;

// Pagination
export const DEFAULT_PAGE_LIMIT = 10;
export const POSTS_PAGE_LIMIT = 12;
export const COMMENTS_PAGE_LIMIT = 5;

// Validation Rules
export const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,30}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MIN_LENGTH = 8;

// Time Constants
export const STORY_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours
export const DEBOUNCE_DELAY = 300;

// Status
export const RequestStatus = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error",
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  EXPLORE: "/explore",
  MESSAGES: "/messages",
  NOTIFICATIONS: "/notifications",
  PROFILE: "/profile/:userId",
  EDIT_PROFILE: "/edit-profile",
  CREATE_POST: "/create-post",
  LOGIN: "/login",
  REGISTER: "/register",
  NOT_FOUND: "/404",
};
