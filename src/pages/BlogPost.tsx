import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, ArrowLeft, User, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StrapiContent from '@/components/StrapiContent';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useArticleBySlug, useFeaturedArticles } from '@/hooks/useStrapi';
import { getStrapiUrl } from '@/types/strapi';
import { Card, CardHeader } from '@/components/ui/card';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { data: article, isLoading, error } = useArticleBySlug(slug!);
  const { data: relatedArticles } = useFeaturedArticles(3);

  const locale = i18n.resolvedLanguage === 'en' ? enUS : ru;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center" role="status" aria-live="polite">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <span className="sr-only">{t('common.loading')}</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <Alert variant="destructive">
            <AlertTitle>{t('news.articleNotFound')}</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : t('news.articleNotFoundDescription')}
            </AlertDescription>
          </Alert>
          <div className="mt-6">
            <Button onClick={() => navigate('/news')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('news.backToList')}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Strapi v5 flat format — no .attributes wrapper
  const coverImage = article.cover_image;
  const coverImageUrl = coverImage?.formats?.large?.url || coverImage?.url;
  const publishedDate = new Date(article.publishedAt);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button onClick={() => navigate('/news')} variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('news.backToList')}
          </Button>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Cover Image */}
          {coverImageUrl && (
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src={getStrapiUrl(coverImageUrl)}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.publishedAt}>
                  {format(publishedDate, 'dd MMMM yyyy', { locale })}
                </time>
              </div>

              {article.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-xl text-muted-foreground">
                {article.excerpt}
              </p>
            )}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <StrapiContent content={article.content} />
          </div>

          {/* Divider */}
          <div className="border-t my-12" />

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('news.relatedArticles')}</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedArticles
                  .filter((related) => related.id !== article.id)
                  .slice(0, 3)
                  .map((related) => {
                    const relatedCover = related.cover_image;
                    const relatedImageUrl = relatedCover?.formats?.small?.url || relatedCover?.url;

                    return (
                      <Link
                        key={related.id}
                        to={`/news/${related.slug}`}
                        className="group"
                      >
                        <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                          {relatedImageUrl && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={getStrapiUrl(relatedImageUrl)}
                                alt={related.title}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                              {related.title}
                            </h3>
                            {related.excerpt && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {related.excerpt}
                              </p>
                            )}
                          </CardHeader>
                        </Card>
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
