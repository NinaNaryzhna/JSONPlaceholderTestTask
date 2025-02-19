import { test, StatusCode } from "@api-helpers";
import { expect } from "@playwright/test";
import { ApiEndpoints } from "@api-endpoints";
import { ApplicationUrl } from "@api-helpers";

test.describe("JSONPlaceholder API Tests for Posts", () => {

  test("GET /posts - Validate response status and data", async ({ postsApi }) => {

    const response = await postsApi.getAllPosts();

    // Ensure the response status is 200 OK
    expect(response.status()).toBe(StatusCode.OK);

    const body = await response.json();

    //Validate response is JSON and an array
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test("GET /posts - Validate response contract", async ({ postsApi }) => {

    const response = await postsApi.getAllPosts();
    const body = await response.json();
    const samplePost = body[0];

    // Validate the structure of the first post
    expect(samplePost).toHaveProperty("userId");
    expect(samplePost).toHaveProperty("id");
    expect(samplePost).toHaveProperty("title");
    expect(samplePost).toHaveProperty("body");

    // Validate correct data types
    expect(typeof samplePost.userId).toBe("number");
    expect(typeof samplePost.id).toBe("number");
    expect(typeof samplePost.title).toBe("string");
    expect(typeof samplePost.body).toBe("string");
  });


  test("GET /posts/1 - Validate specific post data", async ({ postsApi }) => {

    const response = await postsApi.getPostById(1);

    // Ensure response status is 200 OK
    expect(response.status()).toBe(StatusCode.OK);

    const body = await response.json();

    // Validate strings are not empty
    expect(Array.isArray(body)).toBeFalsy();
    expect(body).not.toBeNull();
  });

  test("GET /posts/1 - Try to retrieve a non-existent post", async ({ postsApi }) => {

    const response = await postsApi.getPostById(111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111);

    expect(response.status()).toBe(StatusCode.NOT_FOUND);
  });

  test("GET /posts/{id} - Validate response for an invalid ID", async ({ request }) => {
    const response = await request.get(`${ApplicationUrl.JSON_ORG_API}/${ApiEndpoints.POSTS}/incorrectId`);

    expect(response.status()).toBe(404);
  });


  test("GET /posts/1 - Validate response contract", async ({ postsApi }) => {

    const response = await postsApi.getPostById(1);

    const body = await response.json();

    // Validate response structure
    expect(body).toHaveProperty("id", 1);
    expect(body).toHaveProperty("title");
    expect(body).toHaveProperty("body");
    expect(body).toHaveProperty("userId");

    // Validate correct data types
    expect(typeof body.userId).toBe("number");
    expect(typeof body.id).toBe("number");
    expect(typeof body.title).toBe("string");
    expect(typeof body.body).toBe("string");
  });

  test("POST /posts - Create a new post and validate response status is 201 with correct payload", async ({ postsApi }) => {
    const newPost = { title: "Test Post", body: "Test content", userId: 1 };

    const response = await postsApi.createPost(newPost);

    // Ensure the response status is 201 Created  
    expect(response.status()).toBe(StatusCode.CREATED);

    const body = await response.json();
    expect(body).toMatchObject(newPost);
  });

  test("POST /posts - Validate create post response contract", async ({ postsApi }) => {
    const newPost = { title: "Test Post", body: "Test content", userId: 1 };

    const response = await postsApi.createPost(newPost);

    const body = await response.json();
    expect(body).toMatchObject(newPost);

    // Ensure the response contains the correct fields
    expect(body).toHaveProperty("title", newPost.title);
    expect(body).toHaveProperty("body", newPost.body);
    expect(body).toHaveProperty("userId", newPost.userId);
    expect(body).toHaveProperty("id");

    // Validate correct data types
    expect(typeof body.userId).toBe("number");
    expect(typeof body.id).toBe("number");
    expect(typeof body.title).toBe("string");
    expect(typeof body.body).toBe("string");
  });

  const invalidPosts = [
    { caseName: "Missing title", payload: { body: "Test Body", userId: 1 } },
    { caseName: "Missing body", payload: { title: "Test Title", userId: 1 } },
    { caseName: "Missing userId", payload: { title: "Test Title", body: "Test Body" } },
    { caseName: "Empty request body", payload: { } }
  ];

  invalidPosts.forEach(({ caseName, payload }) => {
    test(`POST /posts - ${caseName} should return 400 Bad Request`, async ({ postsApi }) => {
      const response = await postsApi.createPost(payload);

      // Expect 400 Bad Request for missing required fields
      expect(response.status()).toBe(StatusCode.BAD_REQUEST);
    });
  });

  test("PUT /posts/1 - Update an existing post", async ({postsApi}) => {
    const updatedPost = { title: "Updated Title", userId: 1 };
    const response = await postsApi.updatePost(1, updatedPost);

    //Validate that updating an existing post returns 200 OK.
    expect(response.status()).toBe(StatusCode.OK);
    const body = await response.json();

    //Ensure the response contains correct updated data
    expect(body).toMatchObject(updatedPost);
  });

  test("PUT /posts/1 - Validate update post response contract", async ({ postsApi }) => {
    const newPost = { title: "Test Post", body: "Test content", userId: 1 };

    const response = await postsApi.updatePost(1, newPost);

    const body = await response.json();
    expect(body).toMatchObject(newPost);

    // Ensure the response contains the correct fields
    expect(body).toHaveProperty("title", newPost.title);
    expect(body).toHaveProperty("body", newPost.body);
    expect(body).toHaveProperty("userId", newPost.userId);
    expect(body).toHaveProperty("id");

    // Validate correct data types
    expect(typeof body.userId).toBe("number");
    expect(typeof body.id).toBe("number");
    expect(typeof body.title).toBe("string");
    expect(typeof body.body).toBe("string");
  });

  const invalidUpdatePosts = [
    { caseName: "Missing title", payload: { body: "Test Body", userId: 1 } },
    { caseName: "Missing body", payload: { title: "Test Title", userId: 1 } },
    { caseName: "Missing userId", payload: { title: "Test Title", body: "Test Body" } },
    { caseName: "Empty request body", payload: { } }
  ];

  invalidUpdatePosts.forEach(({ caseName, payload }) => {
    test(`PUT /posts/1 - ${caseName} should return 400 Bad Request`, async ({ postsApi }) => {
      const response = await postsApi.updatePost(1, payload);

      // Expect 400 Bad Request for missing required fields
      expect(response.status()).toBe(StatusCode.BAD_REQUEST);
    });
  });

  test("PUT /posts/1 - Try to retrieve a non-existent post", async ({ postsApi }) => {

    const newPost = { title: "Test Post", body: "Test content", userId: 1 };

    const response = await postsApi.updatePost(111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111, newPost);

    //Verify that updating a non-existent post
    expect(response.status()).toBe(StatusCode.SERVER_ERROR);
  });

  test("DELETE /posts/1 - Delete a post", async ({postsApi}) => {
    const response = await postsApi.deletePost(1);
    
    // Validate that deleting an existing post returns 200 OK.
    expect(response.status()).toBe(StatusCode.OK);
  });

  test("DELETE /posts/1 - Try to retrieve a non-existent post", async ({ postsApi }) => {

    const newPost = { title: "Test Post", body: "Test content", userId: 1 };

    const response = await postsApi.deletePost(111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111);

    //Verify that updating a non-existent post
    expect(response.status()).toBe(StatusCode.NOT_FOUND);
  });
});