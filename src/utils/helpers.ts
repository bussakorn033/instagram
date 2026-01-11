import {ACTIONS_POST} from "../constants";

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
export const formatNumber = (num: number = 0): string => {
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  if (absNum >= 1000000) {
    return (isNegative ? "-" : "") + (absNum / 1000000).toFixed(1) + "M";
  }
  if (absNum >= 1000) {
    return (isNegative ? "-" : "") + (absNum / 1000).toFixed(1) + "K";
  }
  return (isNegative ? "-" : "") + absNum.toString();
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/;
  return regex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): boolean => {
  if (password.length < 8) return false;
  // Reject if space has non-space characters on both sides
  const trimmed = password.trim();
  return !trimmed.includes(" ");
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, length: number): string => {
  const chars = Array.from(text);
  return chars.length > length ? chars.slice(0, length).join("") + "..." : text;
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

/** Generate random image URL
 * @param id - The ID of the image
 * @param typeImage - The type of image (icon, recipe, text)
 * @param size - The size of the image
 * @param color - The color of the image
 * @param text - The text to display on the image
 * @return The generated image URL
 * @example
 * const imageUrl = imageRandom(1, "icon", "64", "#ff0000", "Sample+Text");
 * console.log(imageUrl); // https://dummyjson.com/icon/1/64
 * const recipeImageUrl = imageRandom(5, "recipe");
 * console.log(recipeImageUrl); // https://cdn.dummyjson.com/recipe-images/5.webp
 * const textImageUrl = imageRandom(0, "text", "400x200", "#00ff00", "Hello+World");
 * console.log(textImageUrl); // https://dummyjson.com/image/400x200/#00ff00?fontFamily=pacifico&text=Hello+World
 */
export const imageRandom = (
  id: number | string = 1,
  typeImage: "icon" | "recipe" | "text" | undefined = undefined,
  size: string | undefined = "400x200",
  color: string | undefined = "#cdcdcd",
  text: string | undefined = "Hello+World"
) => {
  switch (typeImage) {
    case "icon":
      return `https://dummyjson.com/icon/${id}${size ? `/${size}` : ""}`;
    case "recipe":
      return `https://cdn.dummyjson.com/recipe-images/${id || 1}.webp`;
    case "text":
      return `https://dummyjson.com/image/${size}/${color}?fontFamily=pacifico&text=${text}`;
    default:
      return `https://cdn.dummyjson.com/recipe-images/${id || 1}.webp`;
  }
};

/** Generate random number between min and max (inclusive)
 * @param min - The minimum number
 * @param max - The maximum number
 * @return A random number between min and max
 * @example
 * const randomNum = randomNumber(1, 10);
 * console.log(randomNum); // e.g., 7
 */
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomDateTime = (): string => {
  const type = randomNumber(1, 4);

  switch (type) {
    case 1: {
      const minutes = randomNumber(1, 59);
      return `${minutes} minutes ago`;
    }

    case 2: {
      const days = randomNumber(1, 30);
      return `${days} days ago`;
    }

    case 3: {
      const months = randomNumber(1, 12);
      return `${months} months ago`;
    }

    case 4: {
      const years = randomNumber(1, 5);
      return `${years} years ago`;
    }

    default:
      return "just now";
  }
};

/** Generate random location from predefined list
 * @return A random location string
 * @example
 * const location = randomLocation();
 * console.log(location); // e.g., "Tokyo, Japan"
 */
export const randomLocation = (): string => {
  const locations = [
    "New York, USA",
    "London, UK",
    "Tokyo, Japan",
    "Paris, France",
    "Sydney, Australia",
    "Berlin, Germany",
    "Toronto, Canada",
    "Rome, Italy",
    "Barcelona, Spain",
    "Amsterdam, Netherlands",
    "Bangkok, Thailand",
    "Chiang Mai, Thailand",
    "Phuket, Thailand",
    "Pattaya, Thailand",
    "Ayutthaya, Thailand",
    "Hua Hin, Thailand",
    "Krabi, Thailand",
    "Koh Samui, Thailand",
    "Sukhothai, Thailand",
    "Nakhon Ratchasima, Thailand",
    "Udon Thani, Thailand",
    "Khon Kaen, Thailand",
    "Surat Thani, Thailand",
    "Trang, Thailand",
    "Chonburi, Thailand",
    "Nakhon Si Thammarat, Thailand",
    "Lampang, Thailand",
    "Phayao, Thailand",
    "Mae Hong Son, Thailand",
    "Nan, Thailand",
    "Loei, Thailand",
    "Ubon Ratchathani, Thailand",
    "Yala, Thailand",
    "Satun, Thailand",
    "Ranong, Thailand",
    "Chumphon, Thailand",
    "Phitsanulok, Thailand",
    "Sakon Nakhon, Thailand",
    "Buriram, Thailand",
    "Nong Khai, Thailand",
    "Kalasin, Thailand",
    "Phetchabun, Thailand",
    "Ratchaburi, Thailand",
    "Samut Prakan, Thailand",
    "Samut Sakhon, Thailand",
    "Pathum Thani, Thailand",
    "Nonthaburi, Thailand",
    "Chiang Rai, Thailand",
    "Uttaradit, Thailand",
    "Phrae, Thailand",
    "Kamphaeng Phet, Thailand",
    "Tak, Thailand",
  ];

  const index = randomNumber(0, locations.length - 1);
  return locations[index];
};

/** Generate random music from predefined list
 * @return A random music string
 * @example
 * const music = randomMusic();
 * console.log(music); // e.g., "Blinding Lights - The Weeknd"
 */
export const randomMusic = (): string => {
  const musics = [
    "04:00 - The TOYS",
    "As It Was - Harry Styles",
    "Bad Habits - Ed Sheeran",
    "Black Tie - Jeff Satur",
    "Blinding Lights - The Weeknd",
    "Dum Dum - Jeff Satur",
    "Fade - Jeff Satur",
    "Ghost - Jeff Satur",
    "Heat Waves - Glass Animals",
    "Levitating - Dua Lipa",
    "Loop - Jeff Satur",
    "MONTERO (Call Me By Your Name) - Lil Nas X",
    "OK Not To Be OK - Marshmello & Demi Lovato",
    "Peaches - Justin Bieber feat. Daniel Caesar & Giveon",
    "Ride or Die - Jeff Satur",
    "STAY - The Kid LAROI & Justin Bieber",
    "Save Your Tears - The Weeknd",
    "Someone You Loved - Lewis Capaldi",
    "Time Flies - นนท์ ธนนท์ feat. Jeff Satur",
    "Until I Found You - Stephen Sanchez",
    "Watermelon Sugar - Harry Styles",
    "Why Don’t You Stay - Jeff Satur",
    "good 4 u - Olivia Rodrigo",

    "ก่อนฤดูฝน - Polycat",
    "ก่อนฤดูฝน - The TOYS",
    "กินข้าวกันไหม - สิงโต นำโชค",
    "คำถามซึ่งไร้คนตอบ - Bodyslam",
    "คิด(แต่ไม่)ถึง - สิงโต นำโชค",
    "ดาว - Lula",
    "ถ้าเราเจอกันอีก - Tilly Birds",
    "ทราบแล้วเปลี่ยน - Bowkylion",
    "นีออน - Palmy",
    "บานปลาย - Bowkylion",
    "ปล่อย - Lula",
    "พัก - Polycat",
    "เพื่อนเล่น ไม่เล่นเพื่อน - Tilly Birds",
    "ฝนตกไหม - Bowkylion",
    "รอยยิ้ม - Cocktail",
    "รักติดไซเรน - ไอซ์ พาริส & แพรวา",
    "รักไม่ต้องการเวลา - KLEAR",
    "ลาลาลอย - The TOYS",
    "วิงวอน - Bowkylion",
    "ส่วนต่าง - Bowkylion",
    "ซ่อนไม่หา - Jeff Satur",
    "ยินดีที่ไม่รู้จัก - The TOYS",
    "ยังไม่เคย - The TOYS",
    "ฤดูที่ฉันเหงา - Atom ชนกันต์",
    "หน้าหนาวที่แล้ว - The TOYS",
    "อยากจะกอดเธอนาน ๆ - BLVCKHEART",
    "อยากอยู่ตรงนี้นาน ๆ - Potato",
    "แค่คุณ - Musketeers",
    "แค่เธอรักฉัน - Ink Waruntorn",
    "แอบ - Ink Waruntorn",
    "เธอมีฉัน ฉันมีใคร - Cocktail",
    "เกินต้าน - Jeff Satur",
    "ของขวัญปีใหม่ - Jeff Satur",
    "จำนน - นนท์ ธนนท์",
    "ลืมไปแล้วว่าลืมยังไง - Jeff Satur",
  ];

  const index = randomNumber(0, musics.length - 1);
  return musics[index];
};

export type ActionType = (typeof ACTIONS_POST)[number];

/** Generate random action from ACTIONS_POST
 * @return A random action string
 * @example
 * const action = randomAction();
 * console.log(action); // e.g., "liked your post"
 */
export const randomAction = (): ActionType => {
  const index = randomNumber(0, ACTIONS_POST.length - 1);
  return ACTIONS_POST[index];
};

/** Convert string with non-digit characters to number
 * @param value - The input string
 * @return The converted number
 * @example
 * const num = convertStringToNumber("$1,234.56");
 * console.log(num); // 123456
 */
export const convertStringToNumber = (value: string = ""): number => {
  return Number(value.replace(/\D/g, ""));
};
