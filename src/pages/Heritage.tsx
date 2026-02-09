import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Heritage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">{t('heritagePage.title')}</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              {t('heritagePage.intro')}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">{t('heritagePage.toursTitle')}</h3>
                <p className="text-muted-foreground">
                  {t('heritagePage.toursDesc')}
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">{t('heritagePage.projectTitle')}</h3>
                <p className="text-muted-foreground">
                  {t('heritagePage.projectDesc')}
                </p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">{t('heritagePage.cemeteriesTitle')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('heritagePage.cemeteriesP1')}
              </p>
              <p className="text-muted-foreground">
                {t('heritagePage.cemeteriesP2')}
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">{t('heritagePage.lapidariumTitle')}</h2>
              <p className="text-muted-foreground">
                {t('heritagePage.lapidariumDesc')}
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('heritagePage.centerTitle')}</h3>
              <p className="text-muted-foreground">
                {t('heritagePage.centerDesc')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Heritage;
