import apiClient from '../api-client';
import { API_ENDPOINTS } from '../config';

export interface User {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Testimony {
  id: string;
  userId: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
  _count: {
    comments: number;
    reactions: number;
  };
  comments?: Comment[];
  reactions?: {
    count: number;
    hasReacted: boolean;
  };
}

export const testimoniesApi = {
  create: async (testimony: Pick<Testimony, 'title' | 'content' | 'isPublished'>) => {
    const response = await apiClient.post(API_ENDPOINTS.TESTIMONIES.BASE, testimony);
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINTS.TESTIMONIES.BASE);
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await apiClient.get(`${API_ENDPOINTS.TESTIMONIES.BASE}/${id}`);
    return response.data;
  },

  addComment: async (testimonyId: string, content: string) => {
    const response = await apiClient.post(
      `${API_ENDPOINTS.TESTIMONIES.BASE}/${testimonyId}/comments`,
      { content }
    );
    return response.data;
  },

  getComments: async (testimonyId: string) => {
    const response = await apiClient.get(
      `${API_ENDPOINTS.TESTIMONIES.BASE}/${testimonyId}/comments`
    );
    return response.data;
  },

  addReaction: async (testimonyId: string) => {
    const response = await apiClient.post(
      `${API_ENDPOINTS.TESTIMONIES.BASE}/${testimonyId}/reactions`,
      { type: "LIKE" }
    );
    return response.data;
  },

  removeReaction: async (testimonyId: string) => {
    const response = await apiClient.delete(
      `${API_ENDPOINTS.TESTIMONIES.BASE}/${testimonyId}/reactions`
    );
    return response.data;
  },

  getReactions: async (testimonyId: string) => {
    const response = await apiClient.get(
      `${API_ENDPOINTS.TESTIMONIES.BASE}/${testimonyId}/reactions`
    );
    return response.data;
  }
};