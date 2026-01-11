import {describe, it, expect} from "vitest";
import {formatRelativeTime} from "../helpers";

describe("formatRelativeTime", () => {
  it("should return 'just now' for times less than 60 seconds ago", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 30 * 1000);
    expect(formatRelativeTime(past.toISOString())).toBe("just now");
  });

  it("should return 'just now' for exactly 59 seconds ago", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 59 * 1000);
    expect(formatRelativeTime(past.toISOString())).toBe("just now");
  });

  it("should return minutes ago for times between 1-59 minutes", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 15 * 60 * 1000);
    expect(formatRelativeTime(past.toISOString())).toBe("15m ago");
  });

  it("should return 1m ago for 1 minute", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 1 * 60 * 1000);
    expect(formatRelativeTime(past.toISOString())).toBe("1m ago");
  });

  it("should return 59m ago for 59 minutes", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 59 * 60 * 1000);
    expect(formatRelativeTime(past.toISOString())).toBe("59m ago");
  });

  it("should return hours ago for times between 1-23 hours", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 5 * 60 * 60 * 1000);
    expect(formatRelativeTime(past.toISOString())).toBe("5h ago");
  });

  it("should return 1h ago for 1 hour", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 1 * 60 * 60 * 1000);
    expect(formatRelativeTime(past.toISOString())).toBe("1h ago");
  });

  it("should return 23h ago for 23 hours", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 23 * 60 * 60 * 1000);
    expect(formatRelativeTime(past.toISOString())).toBe("23h ago");
  });

  it("should return days ago for times between 1-6 days", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(past.toISOString())).toBe("3d ago");
  });

  it("should return 1d ago for 1 day", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(past.toISOString())).toBe("1d ago");
  });

  it("should return 6d ago for 6 days", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(past.toISOString())).toBe("6d ago");
  });

  it("should return local date string for times older than 7 days", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    const result = formatRelativeTime(past.toISOString());
    expect(result).not.toMatch(/ago$/);
    expect(result).toBeTruthy();
  });

  it("should return local date string for exactly 7 days", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const result = formatRelativeTime(past.toISOString());
    expect(result).not.toMatch(/ago$/);
  });
});
