import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BASE = import.meta.env.BASE_URL;

interface GalleryImage {
  src: string;
  alt: string;
}

const lapidariumImages: GalleryImage[] = [
  { src: `${BASE}images/lapidarium/lapid-main.webp`, alt: "Лапидарий в Бресте — общий вид" },
  { src: `${BASE}images/lapidarium/lap1.jpg`, alt: "Надгробия в лапидарии" },
  { src: `${BASE}images/lapidarium/lap2.jpg`, alt: "Исторические надгробия" },
  { src: `${BASE}images/lapidarium/lap3.jpg`, alt: "Памятники еврейской культуры" },
  { src: `${BASE}images/lapidarium/lap4.jpg`, alt: "Фрагменты надгробий" },
  { src: `${BASE}images/lapidarium/nadgrobiya.jpg`, alt: "Надгробные камни" },
  { src: `${BASE}images/lapidarium/dorozhka.jpg`, alt: "Дорожка лапидария" },
  { src: `${BASE}images/lapidarium/proekt.jpg`, alt: "Проект лапидария" },
];

const heritageImages: GalleryImage[] = [
  { src: `${BASE}images/heritage/yama-minsk.jpg`, alt: "Мемориал «Яма» в Минске" },
  { src: `${BASE}images/heritage/synagogue-gorodok.jpg`, alt: "Синагога в Городке" },
  { src: `${BASE}images/heritage/mill-gorodok.jpg`, alt: "Мельница в Городке" },
  { src: `${BASE}images/heritage/shtetl.jpg`, alt: "Еврейское местечко — штетл" },
  { src: `${BASE}images/heritage/stalag342-1.jpg`, alt: "Мемориал Шталаг 342" },
];

const Gallery = () => {
  const { t } = useTranslation();
  const [lightbox, setLightbox] = useState<string | null>(null);

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

            <div className="space-y-12">
              {/* Lapidarium Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-2 text-primary">{t('galleryPage.lapidariumTitle')}</h2>
                <p className="text-muted-foreground mb-6">{t('galleryPage.lapidariumDesc')}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {lapidariumImages.map((img) => (
                    <button
                      key={img.src}
                      onClick={() => setLightbox(img.src)}
                      className="group relative aspect-square overflow-hidden rounded-lg border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </section>

              {/* Heritage Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-2 text-primary">{t('galleryPage.historyTitle')}</h2>
                <p className="text-muted-foreground mb-6">{t('galleryPage.memorialDesc')}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {heritageImages.map((img) => (
                    <button
                      key={img.src}
                      onClick={() => setLightbox(img.src)}
                      className="group relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </section>

              {/* Share CTA */}
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{t('galleryPage.shareTitle')}</h3>
                <p className="text-muted-foreground">
                  {t('galleryPage.shareDesc')}
                </p>
              </div>
            </div>
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
