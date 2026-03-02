import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { X, Loader2, ImageOff } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useGalleries } from '@/hooks/useStrapi';
import type { StrapiImage } from '@/types/strapi';

const Gallery = () => {
  const { t } = useTranslation();
  const { data: albums, isLoading, error } = useGalleries();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const getImageUrl = (image: StrapiImage) => {
    const strapiUrl = import.meta.env.VITE_STRAPI_URL || '';
    return image.url.startsWith('http') ? image.url : `${strapiUrl}${image.url}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>{t('galleryPage.title')} — {t('hero.titleHighlight')}</title></Helmet>
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">{t('galleryPage.title')}</h1>
          <div className="max-w-5xl mx-auto">
            <p className="text-lg text-muted-foreground mb-12 text-center">
              {t('galleryPage.intro')}
            </p>

            {isLoading && (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {error && (
              <div className="text-center py-20 text-muted-foreground">
                <ImageOff className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t('galleryPage.loadError', 'Failed to load gallery')}</p>
              </div>
            )}

            {!isLoading && !error && albums && albums.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <ImageOff className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t('galleryPage.empty', 'No albums yet')}</p>
              </div>
            )}

            {albums && albums.length > 0 && (
              <div className="space-y-12">
                {albums.map((album) => (
                  <section key={album.id}>
                    <h2 className="text-2xl font-semibold mb-2 text-primary">{album.title}</h2>
                    {album.description && (
                      <p className="text-muted-foreground mb-6">{album.description}</p>
                    )}
                    {album.images && album.images.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {album.images.map((image) => {
                          const url = getImageUrl(image);
                          return (
                            <button
                              key={image.id}
                              onClick={() => setLightbox(url)}
                              className="group relative aspect-square overflow-hidden rounded-lg border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <img
                                src={url}
                                alt={image.alternativeText || album.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm italic">
                        {t('galleryPage.noPhotos', 'No photos in this album')}
                      </p>
                    )}
                  </section>
                ))}

                {/* Share CTA */}
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">{t('galleryPage.shareTitle')}</h3>
                  <p className="text-muted-foreground">
                    {t('galleryPage.shareDesc')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t('galleryPage.title')}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
