import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Calendar, ArrowRight, Loader2, FileText, Download } from 'lucide-react';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useArticles, useNewspaperIssues } from '@/hooks/useStrapi';
import { getStrapiUrl } from '@/types/strapi';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const { data: articles, isLoading, error } = useArticles();
  const { data: issues, isLoading: issuesLoading } = useNewspaperIssues();

  const locale = i18n.resolvedLanguage === 'en' ? enUS : ru;

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>{t('news.title')} — {t('hero.titleHighlight')}</title></Helmet>
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('news.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>

        {/* Articles Section */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20" role="status" aria-live="polite">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <span className="sr-only">{t('common.loading')}</span>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mb-8">
            <AlertTitle>{t('common.error')}</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : t('common.errorOccurred')}
            </AlertDescription>
          </Alert>
        ) : !articles || articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">{t('news.noArticles')}</p>
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
                  to={`/news/${article.slug}`}
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
                        {t('news.readMore')}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {/* Newspaper Archive */}
        <div id="archive" className="mt-20 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            {t('newspaperPage.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            {t('newspaperPage.intro')}
          </p>

          <h3 className="text-xl font-semibold mb-6 text-primary">
            {t('newspaperPage.archiveTitle')}
          </h3>

          {issuesLoading ? (
            <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <span className="sr-only">{t('common.loading')}</span>
            </div>
          ) : !issues || issues.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground">
                {t('newspaperPage.noIssues')}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {issues.map((issue) => {
                const coverUrl = issue.cover_image?.formats?.medium?.url || issue.cover_image?.url;

                return (
                  <Card key={issue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {coverUrl && (
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={getStrapiUrl(coverUrl)}
                          alt={issue.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <h3 className="text-lg font-semibold">{issue.title}</h3>
                      {issue.issue_number && (
                        <p className="text-sm text-muted-foreground">
                          {t('newspaperPage.issueNumber', { number: issue.issue_number })}
                        </p>
                      )}
                      {issue.date && (
                        <p className="text-sm text-muted-foreground">
                          {new Date(issue.date).toLocaleDateString()}
                        </p>
                      )}
                    </CardHeader>
                    {issue.pdf_file?.url && (
                      <CardContent>
                        <Button asChild variant="outline" className="w-full">
                          <a
                            href={getStrapiUrl(issue.pdf_file.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            {t('newspaperPage.viewPdf')}
                          </a>
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
