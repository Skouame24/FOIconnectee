import apiClient from '../api-client';
import { API_ENDPOINTS } from '../config';

export interface Book {
  id: string;
  name: string;
  testament: string;
  chapters: number;
}

export interface Chapter {
  id: string;
  bookId: string;
  number: number;
  verses: Verse[];
}

export interface Verse {
  id: string;
  number: number;
  text: string;
}

export interface Note {
  id: string;
  verseId: string;
  content: string;
  createdAt: string;
}

export interface Highlight {
  id: string;
  verseId: string;
  color: string;
  createdAt: string;
}

export const bibleApi = {
  getBooks: async () => {
    const response = await apiClient.get(API_ENDPOINTS.BIBLE.BOOKS);
    return response.data;
  },

  getChapter: async (bookId: string, chapter: number) => {
    const response = await apiClient.get(API_ENDPOINTS.BIBLE.CHAPTER(bookId, chapter));
    return response.data;
  },

  getVerse: async (verseId: string) => {
    const response = await apiClient.get(API_ENDPOINTS.BIBLE.VERSE(verseId));
    return response.data;
  },

  search: async (query: string) => {
    const response = await apiClient.get(API_ENDPOINTS.BIBLE.SEARCH, {
      params: { q: query },
    });
    return response.data;
  },

  // Notes
  createNote: async (verseId: string, content: string): Promise<Note> => {
    const response = await apiClient.post(API_ENDPOINTS.NOTES.BASE, {
      verseId,
      content,
    });
    return response.data;
  },

  getNotes: async (): Promise<Note[]> => {
    const response = await apiClient.get(API_ENDPOINTS.NOTES.BASE);
    return response.data;
  },

  // Surlignages
  createHighlight: async (verseId: string, color: string): Promise<Highlight> => {
    const response = await apiClient.post(API_ENDPOINTS.HIGHLIGHTS.BASE, {
      verseId,
      color,
    });
    return response.data;
  },

  getHighlights: async (): Promise<Highlight[]> => {
    const response = await apiClient.get(API_ENDPOINTS.HIGHLIGHTS.BASE);
    return response.data;
  },
};

export default bibleApi;