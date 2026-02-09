// Strapi API Response Types
import type { BlocksContent } from '@strapi/blocks-react-renderer';

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface StrapiMedia {
  data: {
    id: number;
    attributes: StrapiImage;
  } | null;
}

export interface LocalizedField {
  ru: string;
  en: string;
}

// Article (Blog Post)
export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  locale?: string;
  cover_image: null | {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  author?: string;
}

// News
export interface News {
  id: number;
  attributes: {
    title: string;
    content: BlocksContent;
    date: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    image: StrapiMedia;
    is_featured: boolean;
    localizations?: {
      data: Array<{
        id: number;
        attributes: {
          locale: string;
        };
      }>;
    };
  };
}

// Event
export interface Event {
  id: number;
  attributes: {
    title: string;
    description: BlocksContent;
    date: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    image: StrapiMedia;
    registration_link?: string;
    localizations?: {
      data: Array<{
        id: number;
        attributes: {
          locale: string;
        };
      }>;
    };
  };
}

// Page (Static Pages)
export interface Page {
  id: number;
  attributes: {
    slug: string;
    title: string;
    content: BlocksContent;
    seo_description?: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    localizations?: {
      data: Array<{
        id: number;
        attributes: {
          locale: string;
        };
      }>;
    };
  };
}

// Strapi Collection Response
export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Strapi Single Response
export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

// Helper function to get image URL
export const getStrapiImageUrl = (media: StrapiMedia | undefined, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'original'): string | null => {
  if (!media?.data?.attributes) return null;

  const attributes = media.data.attributes;

  if (size === 'original') {
    return attributes.url;
  }

  return attributes.formats?.[size]?.url || attributes.url;
};

// Helper function to get full Strapi URL
export const getStrapiUrl = (path: string): string => {
  const baseUrl = import.meta.env.VITE_STRAPI_URL || '';
  return `${baseUrl}${path}`;
};
