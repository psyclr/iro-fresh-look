import type {
  Article,
  News,
  Event,
  Page,
  NewspaperIssue,
  PosterEvent,
  StrapiCommunity,
  StrapiProject,
  RabbiQA,
  RabbiQuestionPayload,
  StrapiTradition,
  StrapiSettings,
  StrapiResponse,
  StrapiSingleResponse,
} from '@/types/strapi';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

if (!STRAPI_URL) {
  console.warn('VITE_STRAPI_URL is not defined in environment variables');
}

if (!STRAPI_TOKEN) {
  console.warn('VITE_STRAPI_TOKEN is not defined in environment variables');
}

// Base fetch function with authentication
async function fetchStrapi<T>(endpoint: string): Promise<T> {
  const url = `${STRAPI_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add authorization header only if token is provided
  if (STRAPI_TOKEN && STRAPI_TOKEN !== 'REPLACE_WITH_YOUR_TOKEN_FROM_STRAPI_ADMIN') {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Articles (Blog Posts)
export async function fetchArticles(locale: string): Promise<Article[]> {
  const response = await fetchStrapi<StrapiResponse<Article>>(
    `/api/articles?locale=${locale}&populate=*&sort=publishedAt:desc`
  );
  return response.data;
}

export async function fetchArticleBySlug(
  slug: string,
  locale: string
): Promise<Article | null> {
  const response = await fetchStrapi<StrapiResponse<Article>>(
    `/api/articles?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`
  );

  return response.data[0] || null;
}

export async function fetchFeaturedArticles(locale: string, limit = 3): Promise<Article[]> {
  const response = await fetchStrapi<StrapiResponse<Article>>(
    `/api/articles?locale=${locale}&populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`
  );
  return response.data;
}

// News
export async function fetchNews(locale: string): Promise<News[]> {
  const response = await fetchStrapi<StrapiResponse<News>>(
    `/api/news?locale=${locale}&populate=*&sort=date:desc`
  );
  return response.data;
}

export async function fetchFeaturedNews(locale: string, limit = 5): Promise<News[]> {
  const response = await fetchStrapi<StrapiResponse<News>>(
    `/api/news?locale=${locale}&populate=*&filters[is_featured][$eq]=true&sort=date:desc&pagination[limit]=${limit}`
  );
  return response.data;
}

// Events
export async function fetchEvents(locale: string): Promise<Event[]> {
  const response = await fetchStrapi<StrapiResponse<Event>>(
    `/api/events?locale=${locale}&populate=*&sort=date:asc`
  );
  return response.data;
}

export async function fetchUpcomingEvents(locale: string, limit = 5): Promise<Event[]> {
  const now = new Date().toISOString();
  const response = await fetchStrapi<StrapiResponse<Event>>(
    `/api/events?locale=${locale}&populate=*&filters[date][$gte]=${now}&sort=date:asc&pagination[limit]=${limit}`
  );
  return response.data;
}

// Pages (Static Pages)
export async function fetchPageBySlug(
  slug: string,
  locale: string
): Promise<Page | null> {
  const response = await fetchStrapi<StrapiResponse<Page>>(
    `/api/pages?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`
  );

  return response.data[0] || null;
}

// Newspaper Issues
export async function fetchNewspaperIssues(locale: string): Promise<NewspaperIssue[]> {
  const response = await fetchStrapi<StrapiResponse<NewspaperIssue>>(
    `/api/newspaper-issues?locale=${locale}&populate=*&sort=date:desc`
  );
  return response.data;
}

// Poster Events
export async function fetchPosterEvents(locale: string): Promise<PosterEvent[]> {
  const response = await fetchStrapi<StrapiResponse<PosterEvent>>(
    `/api/poster-events?locale=${locale}&populate=*&sort=date:asc`
  );
  return response.data;
}

// Communities
export async function fetchStrapiCommunities(locale: string): Promise<StrapiCommunity[]> {
  const response = await fetchStrapi<StrapiResponse<StrapiCommunity>>(
    `/api/communities?locale=${locale}&populate=*&sort=order:asc`
  );
  return response.data;
}

// Projects
export async function fetchProjects(locale: string): Promise<StrapiProject[]> {
  const response = await fetchStrapi<StrapiResponse<StrapiProject>>(
    `/api/projects?locale=${locale}&populate=*&sort=order:asc`
  );
  return response.data;
}

// Rabbi Q&A
export async function fetchRabbiQAs(locale: string): Promise<RabbiQA[]> {
  const response = await fetchStrapi<StrapiResponse<RabbiQA>>(
    `/api/rabbi-qas?locale=${locale}&sort=order:asc`
  );
  return response.data;
}

// Traditions
export async function fetchTraditions(locale: string): Promise<StrapiTradition[]> {
  const response = await fetchStrapi<StrapiResponse<StrapiTradition>>(
    `/api/traditions?locale=${locale}&sort=order:asc`
  );
  return response.data;
}

// Settings (single type, localized)
export async function fetchSettings(locale: string): Promise<StrapiSettings | null> {
  try {
    const response = await fetchStrapi<StrapiSingleResponse<StrapiSettings>>(
      `/api/setting?locale=${locale}`
    );
    return response.data;
  } catch {
    return null;
  }
}

// Submit Rabbi Question (POST)
export async function submitRabbiQuestion(data: RabbiQuestionPayload): Promise<void> {
  const url = `${STRAPI_URL}/api/rabbi-questions`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN && STRAPI_TOKEN !== 'REPLACE_WITH_YOUR_TOKEN_FROM_STRAPI_ADMIN') {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit question: ${response.status} ${response.statusText}`);
  }
}

// Hebcal Holidays (external API)
export interface HebcalResponse {
  items: Array<{
    title: string;
    date: string;
    hebrew?: string;
    category: string;
    yomtov?: boolean;
  }>;
}

export async function fetchHebcalHolidays(): Promise<HebcalResponse> {
  const response = await fetch(
    'https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&year=now&month=x'
  );

  if (!response.ok) {
    throw new Error(`Hebcal API error: ${response.status}`);
  }

  return response.json();
}

// Search
export async function searchContent(
  query: string,
  locale: string
): Promise<{ articles: Article[]; news: News[]; events: Event[] }> {
  const [articles, news, events] = await Promise.all([
    fetchStrapi<StrapiResponse<Article>>(
      `/api/articles?locale=${locale}&populate=*&filters[$or][0][title][$containsi]=${query}&filters[$or][1][content][$containsi]=${query}`
    ),
    fetchStrapi<StrapiResponse<News>>(
      `/api/news?locale=${locale}&populate=*&filters[$or][0][title][$containsi]=${query}&filters[$or][1][content][$containsi]=${query}`
    ),
    fetchStrapi<StrapiResponse<Event>>(
      `/api/events?locale=${locale}&populate=*&filters[$or][0][title][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}`
    ),
  ]);

  return {
    articles: articles.data,
    news: news.data,
    events: events.data,
  };
}
