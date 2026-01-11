import {describe, it, expect} from "vitest";
import {
  generateMockAuthor,
  generateMockPost,
  generateMockPosts,
} from "../helpers";

describe("generateMockAuthor", () => {
  it("should generate mock author with default userId", () => {
    const author = generateMockAuthor();
    expect(author.id).toBe("user1");
    expect(author.username).toBe("john_doe");
    expect(author.email).toBe("john@example.com");
  });

  it("should generate mock author with custom userId", () => {
    const author = generateMockAuthor("custom_user");
    expect(author.id).toBe("custom_user");
    expect(author.username).toBe("john_doe");
    expect(author.email).toBe("john@example.com");
  });

  it("should have all required properties", () => {
    const author = generateMockAuthor();
    expect(author).toHaveProperty("id");
    expect(author).toHaveProperty("username");
    expect(author).toHaveProperty("email");
    expect(author).toHaveProperty("profileImage");
    expect(author).toHaveProperty("bio");
    expect(author).toHaveProperty("followersCount");
    expect(author).toHaveProperty("followingCount");
    expect(author).toHaveProperty("postsCount");
    expect(author).toHaveProperty("isFollowing");
  });

  it("should have correct property types", () => {
    const author = generateMockAuthor("user123");
    expect(typeof author.id).toBe("string");
    expect(typeof author.username).toBe("string");
    expect(typeof author.email).toBe("string");
    expect(typeof author.profileImage).toBe("string");
    expect(typeof author.bio).toBe("string");
    expect(typeof author.followersCount).toBe("number");
    expect(typeof author.followingCount).toBe("number");
    expect(typeof author.postsCount).toBe("number");
    expect(typeof author.isFollowing).toBe("boolean");
  });

  it("should have positive numbers for counts", () => {
    const author = generateMockAuthor();
    expect(author.followersCount).toBeGreaterThan(0);
    expect(author.followingCount).toBeGreaterThan(0);
    expect(author.postsCount).toBeGreaterThan(0);
  });

  it("should have isFollowing as false by default", () => {
    const author = generateMockAuthor();
    expect(author.isFollowing).toBe(false);
  });

  it("should have valid profile image URL", () => {
    const author = generateMockAuthor();
    expect(author.profileImage).toContain("http");
  });
});

describe("generateMockPost", () => {
  it("should generate mock post with default index", () => {
    const post = generateMockPost();
    expect(post.id).toBe("post-0");
    expect(post.userId).toBe("user-0");
  });

  it("should generate mock post with custom index", () => {
    const post = generateMockPost(5);
    expect(post.id).toBe("post-5");
    expect(post.userId).toBe("user-5");
  });

  it("should have all required properties", () => {
    const post = generateMockPost();
    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("userId");
    expect(post).toHaveProperty("author");
    expect(post).toHaveProperty("caption");
    expect(post).toHaveProperty("images");
    expect(post).toHaveProperty("comments");
    expect(post).toHaveProperty("isLiked");
    expect(post).toHaveProperty("createdAt");
    expect(post).toHaveProperty("updatedAt");
  });

  it("should have valid timestamps", () => {
    const post = generateMockPost();
    expect(new Date(post.createdAt)).toBeInstanceOf(Date);
    expect(new Date(post.updatedAt)).toBeInstanceOf(Date);
    expect(!isNaN(new Date(post.createdAt).getTime())).toBe(true);
  });

  it("should have author object", () => {
    const post = generateMockPost();
    expect(post.author).toBeDefined();
    expect(post.author.id).toBe("user-0");
    expect(post.author.username).toBe("john_doe");
  });

  it("should have images array", () => {
    const post = generateMockPost();
    expect(Array.isArray(post.images)).toBe(true);
    expect(post.images.length).toBeGreaterThan(0);
  });

  it("should have isLiked as false by default", () => {
    const post = generateMockPost();
    expect(post.isLiked).toBe(false);
  });

  it("should have positive comments count", () => {
    const post = generateMockPost();
    expect(post.comments).toBeGreaterThanOrEqual(0);
  });

  it("should handle multiple indices", () => {
    for (let i = 0; i < 10; i++) {
      const post = generateMockPost(i);
      expect(post.id).toBe(`post-${i}`);
      expect(post.userId).toBe(`user-${i}`);
    }
  });
});

describe("generateMockPosts", () => {
  it("should generate default 10 posts", () => {
    const posts = generateMockPosts();
    expect(posts).toHaveLength(10);
  });

  it("should generate specified number of posts", () => {
    expect(generateMockPosts(5)).toHaveLength(5);
    expect(generateMockPosts(20)).toHaveLength(20);
    expect(generateMockPosts(100)).toHaveLength(100);
  });

  it("should generate posts with unique IDs", () => {
    const posts = generateMockPosts(5);
    const ids = posts.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should generate posts with sequential indices", () => {
    const posts = generateMockPosts(5);
    posts.forEach((post, index) => {
      expect(post.id).toBe(`post-${index}`);
      expect(post.userId).toBe(`user-${index}`);
    });
  });

  it("should handle edge case of 0 posts", () => {
    expect(generateMockPosts(0)).toHaveLength(0);
  });

  it("should handle large number of posts", () => {
    const posts = generateMockPosts(1000);
    expect(posts).toHaveLength(1000);
    expect(posts[999].id).toBe("post-999");
  });

  it("should generate posts with all required properties", () => {
    const posts = generateMockPosts(3);
    posts.forEach((post) => {
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("userId");
      expect(post).toHaveProperty("author");
      expect(post).toHaveProperty("caption");
      expect(post).toHaveProperty("images");
      expect(post).toHaveProperty("comments");
      expect(post).toHaveProperty("isLiked");
      expect(post).toHaveProperty("createdAt");
      expect(post).toHaveProperty("updatedAt");
    });
  });

  it("should generate distinct post objects", () => {
    const posts = generateMockPosts(3);
    // While content is same, they should be different object instances
    expect(posts[0]).not.toBe(posts[1]);
    expect(posts[1]).not.toBe(posts[2]);
  });
});
