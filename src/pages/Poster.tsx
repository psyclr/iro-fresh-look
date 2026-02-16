import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Loader2, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePosterEvents } from '@/hooks/useStrapi';
import { getStrapiUrl } from '@/types/strapi';

const Poster = () => {
  const { t, i18n } = useTranslation();
  const { data: events, isLoading } = usePosterEvents();
  const locale = i18n.resolvedLanguage === 'en' ? enUS : ru;

  const now = new Date();
  const upcoming = events?.filter(e => new Date(e.date) >= now) || [];
  const past = events?.filter(e => new Date(e.date) < now) || [];

  const renderEventCard = (event: NonNullable<typeof events>[number]) => {
    const imageUrl = event.image?.formats?.medium?.url || event.image?.url;
    const eventDate = new Date(event.date);

    return (
      <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
        {imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={getStrapiUrl(imageUrl)}
              alt={event.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={event.date}>
              {format(eventDate, 'dd MMMM yyyy, HH:mm', { locale })}
            </time>
          </div>
          <h3 className="text-xl font-semibold">{event.title}</h3>
        </CardHeader>
        <CardContent>
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
          {event.description && (
            <p className="text-muted-foreground text-sm line-clamp-3">
              {event.description}
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>{t('posterPage.title')} — {t('hero.titleHighlight')}</title></Helmet>
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            {t('posterPage.title')}
          </h1>
          <div className="max-w-5xl mx-auto">
            <p className="text-lg text-muted-foreground mb-12 text-center">
              {t('posterPage.intro')}
            </p>

            {isLoading ? (
              <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <span className="sr-only">{t('common.loading')}</span>
              </div>
            ) : !events || events.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-lg text-muted-foreground">
                  {t('posterPage.noEvents')}
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {upcoming.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-2xl font-semibold text-primary">
                        {t('posterPage.upcoming')}
                      </h2>
                      <Badge variant="default">{upcoming.length}</Badge>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {upcoming.map(renderEventCard)}
                    </div>
                  </section>
                )}

                {past.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold text-muted-foreground mb-6">
                      {t('posterPage.past')}
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-75">
                      {past.map(renderEventCard)}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Poster;
