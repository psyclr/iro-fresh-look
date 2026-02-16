import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Newspaper, Landmark, GraduationCap, HandHeart, Archive, Map, Cross, ExternalLink } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProjects } from '@/hooks/useStrapi';
import { getStrapiUrl } from '@/types/strapi';
import type { StrapiProject } from '@/types/strapi';

const Projects = () => {
  const { t } = useTranslation();
  const { data: strapiProjects } = useProjects();

  const hasStrapiProjects = strapiProjects && strapiProjects.length > 0;

  const smoothScrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const navCards = [
    {
      icon: Newspaper,
      titleKey: 'projectsPage.newspaperTitle',
      descKey: 'projectsPage.newspaperShort',
      gradient: 'from-blue-500/10 to-blue-600/5',
      iconColor: 'text-blue-600',
      href: '/news#archive',
      isLink: true,
    },
    {
      icon: Landmark,
      titleKey: 'projectsPage.lapidariumTitle',
      descKey: 'projectsPage.lapidariumShort',
      gradient: 'from-amber-500/10 to-amber-600/5',
      iconColor: 'text-amber-600',
      anchor: 'lapidarium',
      isLink: false,
    },
    {
      icon: GraduationCap,
      titleKey: 'projectsPage.centerTitle',
      descKey: 'projectsPage.centerShort',
      gradient: 'from-purple-500/10 to-purple-600/5',
      iconColor: 'text-purple-600',
      anchor: 'center',
      isLink: false,
    },
    {
      icon: HandHeart,
      titleKey: 'projectsPage.aidTitle',
      descKey: 'projectsPage.aidShort',
      gradient: 'from-rose-500/10 to-rose-600/5',
      iconColor: 'text-rose-600',
      anchor: 'humanitarian',
      isLink: false,
    },
    {
      icon: Archive,
      titleKey: 'projectsPage.archivesTitle',
      descKey: 'projectsPage.archivesShort',
      gradient: 'from-emerald-500/10 to-emerald-600/5',
      iconColor: 'text-emerald-600',
      anchor: 'archives',
      isLink: false,
    },
    {
      icon: Map,
      titleKey: 'heritagePage.toursTitle',
      descKey: 'heritagePage.toursShort',
      gradient: 'from-cyan-500/10 to-cyan-600/5',
      iconColor: 'text-cyan-600',
      anchor: 'tours',
      isLink: false,
    },
    {
      icon: Cross,
      titleKey: 'heritagePage.cemeteriesTitle',
      descKey: 'heritagePage.cemeteriesShort',
      gradient: 'from-slate-500/10 to-slate-600/5',
      iconColor: 'text-slate-600',
      anchor: 'cemeteries',
      isLink: false,
    },
  ];

  const cardClassName = "group relative bg-white rounded-2xl p-5 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-left cursor-pointer";

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>{t('projectsPage.title')} — {t('hero.titleHighlight')}</title></Helmet>
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">{t('projectsPage.title')}</h1>
          <div className="max-w-5xl mx-auto">
            <p className="text-lg text-muted-foreground mb-10 text-center">
              {t('projectsPage.intro')}
            </p>

            {/* Navigation card grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
              {navCards.map((card) => {
                const inner = (
                  <>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative z-10 flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <card.icon className={`w-5 h-5 ${card.iconColor}`} strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-primary group-hover:text-accent transition-colors mb-1">
                          {t(card.titleKey)}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {t(card.descKey)}
                        </p>
                      </div>
                    </div>
                  </>
                );

                if (card.isLink) {
                  return (
                    <Link key={card.titleKey} to={card.href!} className={cardClassName}>
                      {inner}
                    </Link>
                  );
                }

                return (
                  <button
                    key={card.titleKey}
                    onClick={() => smoothScrollTo(card.anchor!)}
                    className={cardClassName}
                  >
                    {inner}
                  </button>
                );
              })}
            </div>

            {/* Detailed sections — Strapi-driven or i18n fallback */}
            <div className="space-y-8">
              {hasStrapiProjects ? (
                strapiProjects.map((project: StrapiProject) => (
                  <StrapiProjectSection key={project.id} project={project} />
                ))
              ) : (
                <FallbackSections />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const StrapiProjectSection = ({ project }: { project: StrapiProject }) => {
  const images = project.images?.filter(Boolean) ?? [];

  return (
    <div id={project.slug} className="bg-card p-8 rounded-lg border scroll-mt-24">
      <h2 className="text-2xl font-semibold mb-4 text-primary">{project.title}</h2>

      {project.description && (
        <p className="text-muted-foreground mb-4">{project.description}</p>
      )}

      {project.content && (
        <div
          className="prose prose-sm max-w-none text-muted-foreground mb-4"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      )}

      {images.length > 0 && (
        <div className={`grid gap-4 mb-4 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'}`}>
          {images.map((img) => (
            <div key={img.id} className="aspect-video overflow-hidden rounded-lg">
              <img
                src={getStrapiUrl(img.url)}
                alt={img.alternativeText || project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {project.external_link && (
        <a
          href={project.external_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          {project.external_link}
        </a>
      )}
    </div>
  );
};

const FallbackSections = () => {
  const { t } = useTranslation();

  return (
    <>
      <div id="lapidarium" className="bg-card p-8 rounded-lg border scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('projectsPage.lapidariumTitle')}</h2>
        <p className="text-muted-foreground mb-4">{t('projectsPage.lapidariumP1')}</p>
        <p className="text-muted-foreground">{t('projectsPage.lapidariumP2')}</p>
      </div>

      <div id="center" className="bg-card p-8 rounded-lg border scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('projectsPage.centerTitle')}</h2>
        <p className="text-muted-foreground">{t('projectsPage.centerDesc')}</p>
      </div>

      <div id="humanitarian" className="bg-card p-8 rounded-lg border scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('projectsPage.aidTitle')}</h2>
        <p className="text-muted-foreground mb-4">{t('projectsPage.aidP1')}</p>
        <p className="text-muted-foreground">{t('projectsPage.aidP2')}</p>
      </div>

      <div id="archives" className="bg-card p-8 rounded-lg border scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('projectsPage.archivesTitle')}</h2>
        <p className="text-muted-foreground">{t('projectsPage.archivesDesc')}</p>
      </div>

      <div id="tours" className="bg-card p-8 rounded-lg border scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('heritagePage.toursTitle')}</h2>
        <p className="text-muted-foreground">{t('heritagePage.toursDesc')}</p>
      </div>

      <div id="cemeteries" className="bg-card p-8 rounded-lg border scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('heritagePage.cemeteriesTitle')}</h2>
        <p className="text-muted-foreground mb-4">{t('heritagePage.cemeteriesP1')}</p>
        <p className="text-muted-foreground">{t('heritagePage.cemeteriesP2')}</p>
      </div>
    </>
  );
};

export default Projects;
