import {describe, it, expect} from "vitest";
import {truncateText} from "../helpers";

describe("truncateText", () => {
  // Text shorter than limit
  it("should not truncate text shorter than limit", () => {
    expect(truncateText("Hello", 10)).toBe("Hello");
    expect(truncateText("World", 5)).toBe("World");
    expect(truncateText("Test", 10)).toBe("Test");
  });

  it("should not truncate text equal to limit", () => {
    expect(truncateText("Hello", 5)).toBe("Hello");
    expect(truncateText("Testing", 7)).toBe("Testing");
  });

  // Text longer than limit
  it("should truncate text longer than limit and add ellipsis", () => {
    expect(truncateText("Hello World", 5)).toBe("Hello...");
    expect(truncateText("JavaScript", 6)).toBe("JavaSc...");
    expect(truncateText("Programming", 4)).toBe("Prog...");
  });

  it("should truncate to specified length", () => {
    expect(truncateText("Hello World", 3)).toBe("Hel...");
    expect(truncateText("Test String", 4)).toBe("Test...");
    expect(truncateText("Truncate me please", 8)).toBe("Truncate...");
  });

  // Edge cases
  it("should handle empty string", () => {
    expect(truncateText("", 5)).toBe("");
    expect(truncateText("", 0)).toBe("");
  });

  it("should handle single character", () => {
    expect(truncateText("A", 1)).toBe("A");
    expect(truncateText("A", 5)).toBe("A");
    expect(truncateText("A", 0)).toBe("...");
  });

  it("should handle length of 1", () => {
    expect(truncateText("Hello", 1)).toBe("H...");
  });

  it("should handle length of 0", () => {
    expect(truncateText("Hello", 0)).toBe("...");
    expect(truncateText("Test", 0)).toBe("...");
  });

  it("should handle text with special characters", () => {
    expect(truncateText("Hello@World#Test", 5)).toBe("Hello...");
    expect(truncateText("!!!???", 2)).toBe("!!...");
  });

  it("should handle text with numbers", () => {
    expect(truncateText("12345678", 3)).toBe("123...");
    expect(truncateText("Hello123", 5)).toBe("Hello...");
  });

  it("should handle text with spaces", () => {
    expect(truncateText("Hello World Test", 5)).toBe("Hello...");
    expect(truncateText("Multiple   Spaces", 8)).toBe("Multiple...");
  });

  it("should handle very long text", () => {
    const longText = "a".repeat(1000);
    expect(truncateText(longText, 10)).toBe("aaaaaaaaaa...");
  });

  it("should handle unicode characters", () => {
    expect(truncateText("Hello世界", 5)).toBe("Hello...");
    expect(truncateText("😀😁😂😃😄", 2)).toBe("😀😁...");
  });
});
