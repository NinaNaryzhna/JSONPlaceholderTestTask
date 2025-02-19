import { APIClient } from "@api-client";
import { ApiEndpoints } from "@api-endpoints";
import { ApplicationUrl } from "@api-helpers";
import { APIRequestContext } from "@playwright/test";

export class PostsApi extends APIClient {

    private postsEndpoint = `${ApplicationUrl.JSON_ORG_API}/${ApiEndpoints.POSTS}`;
    
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        super();
        this.request = request;
    }

    async getAllPosts() {
        return this.get(this.postsEndpoint);
    }

    async getPostById(postId: number) {
        return this.get(`${this.postsEndpoint}/${postId}`);
    }

    async createPost(postData: object) {
        return this.post(this.postsEndpoint,  postData );
    }

    async updatePost(postId: number, postData: object) {
        return this.put(`${this.postsEndpoint}/${postId}`,  postData );
    }

    async deletePost(postId: number) {
        return this.delete(`${this.postsEndpoint}/${postId}`);
    }
}
