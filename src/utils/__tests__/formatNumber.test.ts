import {describe, it, expect} from "vitest";
import {formatNumber} from "../helpers";

describe("formatNumber", () => {
  // Numbers less than 1000
  it("should return number as string for values less than 1000", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(1)).toBe("1");
    expect(formatNumber(100)).toBe("100");
    expect(formatNumber(500)).toBe("500");
    expect(formatNumber(999)).toBe("999");
  });

  // Thousands (K)
  it("should format exactly 1000 as 1.0K", () => {
    expect(formatNumber(1000)).toBe("1.0K");
  });

  it("should format numbers with K suffix correctly", () => {
    expect(formatNumber(1500)).toBe("1.5K");
    expect(formatNumber(2000)).toBe("2.0K");
    expect(formatNumber(5500)).toBe("5.5K");
    expect(formatNumber(10000)).toBe("10.0K");
    expect(formatNumber(50000)).toBe("50.0K");
    expect(formatNumber(999000)).toBe("999.0K");
    expect(formatNumber(999999)).toBe("1000.0K");
  });

  // Millions (M)
  it("should format exactly 1000000 as 1.0M", () => {
    expect(formatNumber(1000000)).toBe("1.0M");
  });

  it("should format numbers with M suffix correctly", () => {
    expect(formatNumber(1500000)).toBe("1.5M");
    expect(formatNumber(2000000)).toBe("2.0M");
    expect(formatNumber(2500000)).toBe("2.5M");
    expect(formatNumber(10000000)).toBe("10.0M");
    expect(formatNumber(100000000)).toBe("100.0M");
  });

  // Default parameter
  it("should handle default parameter (undefined)", () => {
    expect(formatNumber()).toBe("0");
  });

  // Negative numbers
  it("should handle negative numbers", () => {
    expect(formatNumber(-100)).toBe("-100");
    expect(formatNumber(-1000)).toBe("-1.0K");
    expect(formatNumber(-1500)).toBe("-1.5K");
    expect(formatNumber(-1000000)).toBe("-1.0M");
    expect(formatNumber(-2500000)).toBe("-2.5M");
  });

  // Edge cases
  it("should handle very large numbers", () => {
    expect(formatNumber(1000000000)).toBe("1000.0M");
    expect(formatNumber(999999999)).toBe("1000.0M");
  });

  it("should round to one decimal place", () => {
    expect(formatNumber(1234)).toBe("1.2K");
    expect(formatNumber(1567)).toBe("1.6K");
    expect(formatNumber(1999)).toBe("2.0K");
  });
});
