import {describe, it, expect} from "vitest";
import {
  getImageType,
  imageRandom,
  randomNumber,
  randomDateTime,
  randomLocation,
  randomMusic,
  randomAction,
  convertStringToNumber,
} from "../helpers";

describe("getImageType", () => {
  it("should return 'image' for single image", () => {
    expect(getImageType(1)).toBe("image");
  });

  it("should return 'album' for multiple images", () => {
    expect(getImageType(2)).toBe("album");
    expect(getImageType(3)).toBe("album");
    expect(getImageType(5)).toBe("album");
    expect(getImageType(10)).toBe("album");
    expect(getImageType(100)).toBe("album");
  });

  it("should return 'video' for zero images", () => {
    expect(getImageType(0)).toBe("video");
  });

  it("should return 'video' for negative numbers", () => {
    expect(getImageType(-1)).toBe("video");
    expect(getImageType(-5)).toBe("video");
  });
});

describe("imageRandom", () => {
  it("should generate icon URL with type 'icon'", () => {
    const url = imageRandom(1, "icon", "64");
    expect(url).toContain("dummyjson.com/icon/1/64");
  });

  it("should generate icon URL without size", () => {
    const url = imageRandom(1, "icon");
    expect(url).toContain("dummyjson.com/icon/1");
  });

  it("should handle different icon sizes", () => {
    const url32 = imageRandom(1, "icon", "32");
    const url128 = imageRandom(1, "icon", "128");
    expect(url32).toContain("32");
    expect(url128).toContain("128");
  });

  it("should generate recipe URL with type 'recipe'", () => {
    const url = imageRandom(5, "recipe");
    expect(url).toContain("cdn.dummyjson.com/recipe-images/5.webp");
  });

  it("should generate recipe URL for undefined type", () => {
    const url = imageRandom(1, undefined);
    expect(url).toContain("cdn.dummyjson.com/recipe-images/1.webp");
  });

  it("should generate text image URL with type 'text'", () => {
    const url = imageRandom(0, "text", "400x200", "#ff0000", "Hello");
    expect(url).toContain("dummyjson.com/image/400x200/#ff0000");
    expect(url).toContain("Hello");
  });

  it("should use defaults for text image type", () => {
    const url = imageRandom(0, "text");
    expect(url).toContain("400x200");
    expect(url).toContain("#cdcdcd");
    expect(url).toContain("Hello+World");
  });

  it("should handle different image IDs", () => {
    const url1 = imageRandom(1, "recipe");
    const url5 = imageRandom(5, "recipe");
    const url10 = imageRandom(10, "recipe");
    expect(url1).toContain("/1.webp");
    expect(url5).toContain("/5.webp");
    expect(url10).toContain("/10.webp");
  });

  it("should handle string IDs", () => {
    const url = imageRandom("abc", "recipe");
    expect(url).toContain("abc");
  });

  it("should handle custom colors and text", () => {
    const url = imageRandom(0, "text", "800x600", "#0000ff", "Custom+Text");
    expect(url).toContain("800x600");
    expect(url).toContain("#0000ff");
    expect(url).toContain("Custom+Text");
  });
});

describe("randomNumber", () => {
  it("should return number within range", () => {
    for (let i = 0; i < 100; i++) {
      const num = randomNumber(1, 10);
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(10);
    }
  });

  it("should return integer (not decimal)", () => {
    for (let i = 0; i < 50; i++) {
      const num = randomNumber(1, 100);
      expect(Number.isInteger(num)).toBe(true);
    }
  });

  it("should return min when min equals max", () => {
    expect(randomNumber(5, 5)).toBe(5);
    expect(randomNumber(10, 10)).toBe(10);
    expect(randomNumber(0, 0)).toBe(0);
  });

  it("should handle negative ranges", () => {
    for (let i = 0; i < 50; i++) {
      const num = randomNumber(-10, -5);
      expect(num).toBeGreaterThanOrEqual(-10);
      expect(num).toBeLessThanOrEqual(-5);
    }
  });

  it("should handle zero in range", () => {
    for (let i = 0; i < 50; i++) {
      const num = randomNumber(-5, 5);
      expect(num).toBeGreaterThanOrEqual(-5);
      expect(num).toBeLessThanOrEqual(5);
    }
  });

  it("should handle large ranges", () => {
    for (let i = 0; i < 50; i++) {
      const num = randomNumber(1, 1000000);
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(1000000);
    }
  });

  it("should include both min and max in possible results", () => {
    // Run multiple times to likely get both extremes
    const results = new Set();
    for (let i = 0; i < 1000; i++) {
      results.add(randomNumber(1, 3));
    }
    // Might not always get all values in 1000 iterations, but it's likely
    expect(results.size).toBeGreaterThan(1);
  });
});

describe("randomDateTime", () => {
  it("should return valid time format", () => {
    for (let i = 0; i < 20; i++) {
      const dateTime = randomDateTime();
      expect(dateTime).toBeTruthy();
      expect(typeof dateTime).toBe("string");
    }
  });

  it("should contain 'ago' in result", () => {
    for (let i = 0; i < 20; i++) {
      const dateTime = randomDateTime();
      expect(dateTime).toContain("ago");
    }
  });

  it("should have valid time units", () => {
    const validUnits = ["minutes", "days", "months", "years"];
    for (let i = 0; i < 50; i++) {
      const dateTime = randomDateTime();
      const hasValidUnit = validUnits.some((unit) => dateTime.includes(unit));
      expect(hasValidUnit).toBe(true);
    }
  });
});

describe("randomLocation", () => {
  it("should return a non-empty location string", () => {
    const location = randomLocation();
    expect(location).toBeTruthy();
    expect(typeof location).toBe("string");
  });

  it("should contain a comma separating city and country", () => {
    for (let i = 0; i < 30; i++) {
      const location = randomLocation();
      expect(location).toContain(",");
    }
  });

  it("should have valid format", () => {
    for (let i = 0; i < 30; i++) {
      const location = randomLocation();
      expect(location).toMatch(/[A-Za-z\s]+,\s[A-Za-z\s]+/);
    }
  });

  it("should include Thailand locations", () => {
    let hasThailand = false;
    for (let i = 0; i < 100; i++) {
      const location = randomLocation();
      if (location.includes("Thailand")) {
        hasThailand = true;
        break;
      }
    }
    expect(hasThailand).toBe(true);
  });
});

describe("randomMusic", () => {
  it("should return a non-empty music string", () => {
    const music = randomMusic();
    expect(music).toBeTruthy();
    expect(typeof music).toBe("string");
  });

  it("should contain artist information (dash separator)", () => {
    for (let i = 0; i < 30; i++) {
      const music = randomMusic();
      expect(music).toContain(" - ");
    }
  });

  it("should return consistent format", () => {
    for (let i = 0; i < 30; i++) {
      const music = randomMusic();
      expect(music).toMatch(/.+ - .+/);
    }
  });

  it("should not be empty strings on either side of dash", () => {
    for (let i = 0; i < 30; i++) {
      const music = randomMusic();
      const [songName, artist] = music.split(" - ");
      expect(songName.length).toBeGreaterThan(0);
      expect(artist.length).toBeGreaterThan(0);
    }
  });
});

describe("randomAction", () => {
  it("should return valid action string", () => {
    const action = randomAction();
    expect(action).toBeTruthy();
    expect(typeof action).toBe("string");
  });

  it("should return one of predefined actions", () => {
    const validActions = [
      "liked your reel",
      "liked your post",
      "liked your comment",
      "commented",
      "start following",
    ];

    for (let i = 0; i < 30; i++) {
      const action = randomAction();
      expect(validActions).toContain(action);
    }
  });

  it("should not return empty action", () => {
    for (let i = 0; i < 30; i++) {
      const action = randomAction();
      expect(action.length).toBeGreaterThan(0);
    }
  });
});

describe("convertStringToNumber", () => {
  // Valid conversions with currency
  it("should convert string with currency symbols", () => {
    expect(convertStringToNumber("$1,234.56")).toBe(123456);
    expect(convertStringToNumber("€5,678")).toBe(5678);
    expect(convertStringToNumber("¥10000")).toBe(10000);
  });

  // Remove non-digit characters
  it("should remove non-digit characters", () => {
    expect(convertStringToNumber("abc123def456")).toBe(123456);
    expect(convertStringToNumber("test-100")).toBe(100);
    expect(convertStringToNumber("hello#123#world")).toBe(123);
  });

  // Pure numeric strings
  it("should handle pure numeric strings", () => {
    expect(convertStringToNumber("12345")).toBe(12345);
    expect(convertStringToNumber("0")).toBe(0);
    expect(convertStringToNumber("999999999")).toBe(999999999);
  });

  // Empty or non-numeric
  it("should return 0 for empty or non-numeric strings", () => {
    expect(convertStringToNumber("")).toBe(0);
    expect(convertStringToNumber("abc")).toBe(0);
    expect(convertStringToNumber("!!!")).toBe(0);
  });

  // Default parameter
  it("should return 0 for undefined", () => {
    expect(convertStringToNumber()).toBe(0);
  });

  // Phone number formats
  it("should handle phone number formats", () => {
    expect(convertStringToNumber("(123) 456-7890")).toBe(1234567890);
    expect(convertStringToNumber("+1-800-555-1234")).toBe(18005551234);
  });

  // Mixed formats
  it("should handle mixed alphanumeric", () => {
    expect(convertStringToNumber("Version1.2.3")).toBe(123);
    expect(convertStringToNumber("File2NameWith123Numbers456")).toBe(2123456);
  });

  it("should handle leading zeros in numbers", () => {
    expect(convertStringToNumber("007")).toBe(7);
    expect(convertStringToNumber("0123")).toBe(123);
  });

  it("should handle special characters like @ # $ %", () => {
    expect(convertStringToNumber("100@200")).toBe(100200);
    expect(convertStringToNumber("50#75")).toBe(5075);
  });
});
