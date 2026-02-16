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
  content: BlocksContent;
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

// Newspaper Issue
export interface NewspaperIssue {
  id: number;
  documentId: string;
  title: string;
  issue_number?: number;
  date: string;
  description?: string;
  publishedAt: string;
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
  pdf_file: null | {
    id: number;
    url: string;
    name: string;
    size: number;
  };
}

// Poster Event
export interface PosterEvent {
  id: number;
  documentId: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  publishedAt: string;
  image: null | {
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
}

// Community Region
export type CommunityRegion = 'minsk' | 'brest' | 'grodno' | 'vitebsk' | 'gomel' | 'mogilev';

// Community Program (Strapi component)
export interface StrapiCommunityProgram {
  id: number;
  name: string;
  description?: string;
  category: 'education' | 'social' | 'religious' | 'cultural' | 'youth';
  schedule?: string;
  contact_person?: string;
}

// Community
export interface StrapiCommunity {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  community_name: string;
  description?: string;
  region: CommunityRegion;
  locale?: string;
  leader?: string;
  phone?: string;
  email?: string;
  address?: string;
  coordinates: [number, number];
  website?: string;
  member_count?: number;
  languages?: string[];
  founded_year?: number;
  history_facts?: string[];
  shabbat_candle_lighting?: string;
  shabbat_havdalah?: string;
  shabbat_note?: string;
  programs?: StrapiCommunityProgram[];
  building_photo?: StrapiImage | null;
  event_photos?: StrapiImage[] | null;
  order: number;
  publishedAt: string;
}

// Rabbi Q&A (published answers)
export interface RabbiQA {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  rabbi_name?: string;
  locale?: string;
  order: number;
  publishedAt: string;
}

// Rabbi Question (form submission payload)
export interface RabbiQuestionPayload {
  name: string;
  email: string;
  question: string;
  community?: string;
}

// Tradition
export interface StrapiTradition {
  id: number;
  documentId: string;
  title: string;
  description: string;
  related_holiday?: string;
  locale?: string;
  order: number;
  publishedAt: string;
}

// Hebcal Holiday
export interface HebcalHoliday {
  title: string;
  date: string;
  hebrew?: string;
  category: string;
  yomtov?: boolean;
}

// Project
export interface StrapiProject {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  icon?: string;
  images?: StrapiImage[] | null;
  external_link?: string;
  order: number;
  locale?: string;
  publishedAt: string;
}

// Settings (single type, localized)
export interface StrapiSettings {
  id: number;
  documentId: string;
  site_name?: string;
  site_description?: string;
  hero_title?: string;
  hero_subtitle?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  social_media?: Record<string, string>;
  footer_text?: string;
  communities_title?: string;
  communities_description?: string;
  projects_title?: string;
  projects_description?: string;
  stats_communities_value?: string;
  stats_communities_label?: string;
  stats_regions_value?: string;
  stats_regions_label?: string;
  stats_founded_value?: string;
  stats_founded_label?: string;
  stats_events_value?: string;
  stats_events_label?: string;
  locale?: string;
  publishedAt: string;
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
