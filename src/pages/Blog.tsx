import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useArticles } from '@/hooks/useStrapi';
import { getStrapiUrl } from '@/types/strapi';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const { data: articles, isLoading, error } = useArticles();

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

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <Alert variant="destructive">
            <AlertTitle>{t('common.error')}</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : t('common.errorOccurred')}
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('blog.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Articles Grid */}
        {!articles || articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">{t('blog.noArticles')}</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const coverImage = article.cover_image;
              const coverImageUrl = coverImage?.formats?.medium?.url || coverImage?.url;
              const publishedDate = new Date(article.publishedAt);

              return (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="group"
                >
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                    {coverImageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={getStrapiUrl(coverImageUrl)}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <time dateTime={article.publishedAt}>
                            {format(publishedDate, 'dd MMMM yyyy', { locale })}
                          </time>
                        </div>

                        {article.author && (
                          <Badge variant="secondary">
                            {article.author}
                          </Badge>
                        )}
                      </div>

                      <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>

                      {article.excerpt && (
                        <p className="text-muted-foreground line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                        {t('blog.readMore')}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
