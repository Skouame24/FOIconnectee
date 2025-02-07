import apiClient from '../api-client';
import { API_ENDPOINTS } from '../config';

export interface ProgressUpdate {
  verseId: string;
  userId: string;
}

export const readingPlansApi = {
  getUserPlans: async () => {
    const response = await apiClient.get(API_ENDPOINTS.READING_PLANS.USER);
    return response.data;
  },

  updateProgress: async (planId: string, data: ProgressUpdate) => {
    const response = await apiClient.post(
      API_ENDPOINTS.READING_PLANS.PROGRESS(planId),
      data
    );
    return response.data;
  },
};