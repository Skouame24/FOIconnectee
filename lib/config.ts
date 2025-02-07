// Configuration de base pour les appels API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9200/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  TESTIMONIES: {
    BASE: '/testimonies',
    COMMENTS: (testimonyId: string) => `/testimonies/${testimonyId}/comments`,
    REACTIONS: (testimonyId: string) => `/testimonies/${testimonyId}/reactions`,
  },
  BIBLE: {
    BOOKS: '/bible/books',
    CHAPTER: (bookId: string, chapter: number) => `/bible/books/${bookId}/chapters/${chapter}`,
    VERSE: (verseId: string) => `/bible/verses/${verseId}`,
    SEARCH: '/bible/search',
  },
  LIBRARY: {
    BASE: '/library',
    FAVORITES: (bookId: string) => `/library/${bookId}/favorites`,
  },
  READING_PLANS: {
    BASE: '/reading-plans',
    USER: '/reading-plans/user',
    PROGRESS: (planId: string) => `/reading-plans/${planId}/progress`,
  },
  NOTES: {
    BASE: '/notes',
  },
  HIGHLIGHTS: {
    BASE: '/highlights',
  },
}