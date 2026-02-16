import { useQuery, useMutation } from '@tanstack/react-query';
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
  fetchNewspaperIssues,
  fetchPosterEvents,
  fetchStrapiCommunities,
  fetchProjects,
  fetchRabbiQAs,
  fetchTraditions,
  submitRabbiQuestion,
  fetchHebcalHolidays,
  fetchSettings,
} from '@/lib/strapi';
import type { RabbiQuestionPayload } from '@/types/strapi';

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

// Newspaper Issues
export const useNewspaperIssues = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['newspaper-issues', locale],
    queryFn: () => fetchNewspaperIssues(locale),
    staleTime: 10 * 60 * 1000,
  });
};

// Poster Events
export const usePosterEvents = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['poster-events', locale],
    queryFn: () => fetchPosterEvents(locale),
    staleTime: 5 * 60 * 1000,
  });
};

// Communities
export const useStrapiCommunities = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['communities', locale],
    queryFn: () => fetchStrapiCommunities(locale),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Projects
export const useProjects = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['projects', locale],
    queryFn: () => fetchProjects(locale),
    staleTime: 10 * 60 * 1000,
  });
};

// Rabbi Q&A
export const useRabbiQAs = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['rabbi-qas', locale],
    queryFn: () => fetchRabbiQAs(locale),
    staleTime: 10 * 60 * 1000,
  });
};

// Traditions
export const useTraditions = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['traditions', locale],
    queryFn: () => fetchTraditions(locale),
    staleTime: 10 * 60 * 1000,
  });
};

// Settings
export const useSettings = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || i18n.language || 'ru';

  return useQuery({
    queryKey: ['settings', locale],
    queryFn: () => fetchSettings(locale),
    staleTime: 10 * 60 * 1000,
  });
};

// Submit Rabbi Question
export const useSubmitRabbiQuestion = () => {
  return useMutation({
    mutationFn: (data: RabbiQuestionPayload) => submitRabbiQuestion(data),
  });
};

// Hebcal Holidays (no locale dependency - external API)
export const useHebcalHolidays = () => {
  return useQuery({
    queryKey: ['hebcal-holidays'],
    queryFn: fetchHebcalHolidays,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
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
