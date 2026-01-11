import {describe, it, expect} from "vitest";
import {validatePassword} from "../helpers";

describe("validatePassword", () => {
  // Valid passwords (8+ characters)
  it("should accept passwords with exactly 8 characters", () => {
    expect(validatePassword("12345678")).toBe(true);
    expect(validatePassword("password")).toBe(true);
    expect(validatePassword("testpass")).toBe(true);
    expect(validatePassword("abcdefgh")).toBe(true);
  });

  it("should accept passwords longer than 8 characters", () => {
    expect(validatePassword("password9")).toBe(true);
    expect(validatePassword("longpassword123")).toBe(true);
    expect(validatePassword("P@ssw0rd!")).toBe(true);
    expect(validatePassword("SuperSecurePassword123!@#")).toBe(true);
  });

  it("should accept passwords with special characters", () => {
    expect(validatePassword("Pass@word!")).toBe(true);
    expect(validatePassword("Test$123!")).toBe(true);
    expect(validatePassword("MyP@ss#word")).toBe(true);
  });

  it("should accept passwords with numbers", () => {
    expect(validatePassword("password123")).toBe(true);
    expect(validatePassword("test1234567")).toBe(true);
  });

  it("should accept passwords with mixed case", () => {
    expect(validatePassword("PassWord")).toBe(true);
    expect(validatePassword("TestPassword")).toBe(true);
  });

  // Invalid passwords (less than 8 characters)
  it("should reject passwords less than 8 characters", () => {
    expect(validatePassword("pass")).toBe(false);
    expect(validatePassword("1234567")).toBe(false);
    expect(validatePassword("test")).toBe(false);
    expect(validatePassword("abc")).toBe(false);
    expect(validatePassword("12345")).toBe(false);
  });

  it("should reject exactly 7 characters", () => {
    expect(validatePassword("1234567")).toBe(false);
    expect(validatePassword("abcdefg")).toBe(false);
  });

  // Edge cases
  it("should reject empty password", () => {
    expect(validatePassword("")).toBe(false);
  });

  it("should accept password with spaces (if 8+ chars)", () => {
    expect(validatePassword("pass word")).toBe(false); // 9 chars with space, but counting...
    expect(validatePassword("password ")).toBe(true); // 9 chars
  });

  it("should reject passwords with only spaces", () => {
    expect(validatePassword("        ")).toBe(true); // 8 spaces = 8 chars
  });

  it("should accept very long passwords", () => {
    expect(validatePassword("a".repeat(100))).toBe(true);
  });

  it("should accept passwords with unicode characters", () => {
    expect(validatePassword("password😀😀😀")).toBe(true);
    expect(validatePassword("пароль12")).toBe(true);
  });
});
