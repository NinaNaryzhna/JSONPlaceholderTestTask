import { test as base } from '@playwright/test';
import { PostsApi } from "repo/entities/posts/PostApi";

type ApiEntities = {
  postsApi: PostsApi;
};

export const test = base.extend<ApiEntities>({
  postsApi: async ({ request }, use) => {
    await use(new PostsApi(request));
  }
});
