import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import {
  fetchArticles,
  fetchArticleBySlug,
  fetchFeaturedArticles,
  fetchNews,
  fetchFeaturedNews,
  fetchEvents,
  fetchUpcomingEvents,
  fetchPageBySlug,
  searchContent,
} from '@/lib/strapi';
import type { Article, News, Event, Page } from '@/types/strapi';

// Articles (Blog)
export const useArticles = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['articles', locale],
    queryFn: () => fetchArticles(locale),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};

export const useArticleBySlug = (slug: string) => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['article', slug, locale],
    queryFn: () => fetchArticleBySlug(slug, locale),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedArticles = (limit = 3) => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['featured-articles', locale, limit],
    queryFn: () => fetchFeaturedArticles(locale, limit),
    staleTime: 10 * 60 * 1000, // 10 минут
  });
};

// News
export const useNews = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['news', locale],
    queryFn: () => fetchNews(locale),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedNews = (limit = 5) => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['featured-news', locale, limit],
    queryFn: () => fetchFeaturedNews(locale, limit),
    staleTime: 5 * 60 * 1000,
  });
};

// Events
export const useEvents = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['events', locale],
    queryFn: () => fetchEvents(locale),
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpcomingEvents = (limit = 5) => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['upcoming-events', locale, limit],
    queryFn: () => fetchUpcomingEvents(locale, limit),
    staleTime: 5 * 60 * 1000,
  });
};

// Pages
export const usePageBySlug = (slug: string) => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['page', slug, locale],
    queryFn: () => fetchPageBySlug(slug, locale),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};

// Search
export const useSearch = (query: string) => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['search', query, locale],
    queryFn: () => searchContent(query, locale),
    enabled: query.length >= 3, // Минимум 3 символа для поиска
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
};
