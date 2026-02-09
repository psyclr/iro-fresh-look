import type {
  Article,
  News,
  Event,
  Page,
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
