import { request } from "@playwright/test";

export class APIClient {
  async get(endpoint: string) {
    const apiRequest = await request.newContext();
    return apiRequest.get(endpoint);
  }

  async post(endpoint: string, body: object) {
    const apiRequest = await request.newContext();
    return apiRequest.post(endpoint, { data: body });
  }

  async put(endpoint: string, body: object) {
    const apiRequest = await request.newContext();
    return apiRequest.put(endpoint, { data: body });
  }

  async delete(endpoint: string) {
    const apiRequest = await request.newContext();
    return apiRequest.delete(endpoint);
  }
}