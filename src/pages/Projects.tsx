import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Projects = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">{t('projectsPage.title')}</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              {t('projectsPage.intro')}
            </p>

            <div className="space-y-8">
              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">{t('projectsPage.newspaperTitle')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('projectsPage.newspaperP1')}
                </p>
                <p className="text-muted-foreground">
                  {t('projectsPage.newspaperP2')}
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">{t('projectsPage.lapidariumTitle')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('projectsPage.lapidariumP1')}
                </p>
                <p className="text-muted-foreground">
                  {t('projectsPage.lapidariumP2')}
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">{t('projectsPage.centerTitle')}</h2>
                <p className="text-muted-foreground">
                  {t('projectsPage.centerDesc')}
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">{t('projectsPage.aidTitle')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('projectsPage.aidP1')}
                </p>
                <p className="text-muted-foreground">
                  {t('projectsPage.aidP2')}
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">{t('projectsPage.archivesTitle')}</h2>
                <p className="text-muted-foreground">
                  {t('projectsPage.archivesDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
