import {describe, it, expect} from "vitest";
import {validateEmail} from "../helpers";

describe("validateEmail", () => {
  // Valid emails
  it("should validate correct email formats", () => {
    expect(validateEmail("user@example.com")).toBe(true);
    expect(validateEmail("john.doe@company.co.uk")).toBe(true);
    expect(validateEmail("test123@domain.com")).toBe(true);
    expect(validateEmail("a@b.c")).toBe(true);
    expect(validateEmail("first.last@example.com")).toBe(true);
  });

  it("should validate emails with numbers", () => {
    expect(validateEmail("user123@test.com")).toBe(true);
    expect(validateEmail("123@test.com")).toBe(true);
  });

  it("should validate emails with multiple dots", () => {
    expect(validateEmail("user.name.test@example.co.uk")).toBe(true);
    expect(validateEmail("a.b.c@d.e.f")).toBe(true);
  });

  it("should validate emails with underscores and hyphens", () => {
    expect(validateEmail("user_name@example.com")).toBe(true);
    expect(validateEmail("user-name@example.com")).toBe(true);
  });

  // Invalid emails - missing @ symbol
  it("should reject emails without @ symbol", () => {
    expect(validateEmail("invalid.email.com")).toBe(false);
    expect(validateEmail("invalidemail")).toBe(false);
    expect(validateEmail("user.example.com")).toBe(false);
  });

  // Invalid emails - missing domain extension
  it("should reject emails without domain extension", () => {
    expect(validateEmail("user@example")).toBe(false);
    expect(validateEmail("test@domain")).toBe(false);
  });

  // Invalid emails - spaces
  it("should reject emails with spaces", () => {
    expect(validateEmail("user @example.com")).toBe(false);
    expect(validateEmail("user@ example.com")).toBe(false);
    expect(validateEmail("user @ example.com")).toBe(false);
    expect(validateEmail(" user@example.com")).toBe(false);
  });

  // Invalid emails - multiple @ symbols
  it("should reject emails with multiple @ symbols", () => {
    expect(validateEmail("user@@example.com")).toBe(false);
    expect(validateEmail("user@exam@ple.com")).toBe(false);
  });

  // Invalid emails - empty or malformed
  it("should reject empty or invalid formats", () => {
    expect(validateEmail("")).toBe(false);
    expect(validateEmail("@@")).toBe(false);
    expect(validateEmail("@")).toBe(false);
    expect(validateEmail("@example.com")).toBe(false);
    expect(validateEmail("user@")).toBe(false);
  });

  // Invalid emails - special characters
  it("should reject emails with invalid special characters", () => {
    expect(validateEmail("user#name@example.com")).toBe(false);
    expect(validateEmail("user$name@example.com")).toBe(false);
  });

  // Edge cases
  it("should handle very long emails", () => {
    expect(validateEmail("a".repeat(100) + "@example.com")).toBe(true);
  });

  it("should handle emails with consecutive dots", () => {
    expect(validateEmail("user..name@example.com")).toBe(true); // RFC allows this
  });
});
