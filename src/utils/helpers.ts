/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return past.toLocaleDateString();
};

/**
 * Format number to shortened format (e.g., 1.5K, 2.3M)
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

/**
 * Generate mock author user
 */
export const generateMockAuthor = (userId: string = "user1") => ({
  id: userId,
  username: "john_doe",
  email: "john@example.com",
  profileImage:
    "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
  bio: "Photography enthusiast",
  followersCount: 250,
  followingCount: 120,
  postsCount: 45,
  isFollowing: false,
});

/**
 * Generate mock post
 */
export const generateMockPost = (index: number = 0) => ({
  id: `post-${index}`,
  userId: `user-${index}`,
  author: generateMockAuthor(`user-${index}`),
  caption: "Enjoying the sunny day at the beach!",
  images: [
    "https://thumb.izcene.com/mcneto/image/96dd0e4929d3cca4ae2168a973669c33.png",
  ],
  likes: 150,
  comments: 25,
  isLiked: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

/**
 * Generate multiple mock posts
 */
export const generateMockPosts = (count: number = 10) =>
  Array.from({length: count}, (_, i) => generateMockPost(i));

/**
 * Determine image type based on number of images
 */
export const getImageType = (
  imagesCount: number
): "album" | "image" | "video" => {
  if (imagesCount > 1) return "album";
  if (imagesCount === 1) return "image";
  return "video";
};
