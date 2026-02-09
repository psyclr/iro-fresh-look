import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Judaism = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">{t('judaismPage.title')}</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              {t('judaismPage.intro')}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg border text-center">
                <h3 className="text-xl font-semibold mb-3 text-primary">{t('judaismPage.rabbiTitle')}</h3>
                <p className="text-muted-foreground">{t('judaismPage.rabbiDesc')}</p>
              </div>

              <div className="bg-card p-6 rounded-lg border text-center">
                <h3 className="text-xl font-semibold mb-3 text-primary">{t('judaismPage.holidaysTitle')}</h3>
                <p className="text-muted-foreground">{t('judaismPage.holidaysDesc')}</p>
              </div>

              <div className="bg-card p-6 rounded-lg border text-center">
                <h3 className="text-xl font-semibold mb-3 text-primary">{t('judaismPage.traditionsTitle')}</h3>
                <p className="text-muted-foreground">{t('judaismPage.traditionsDesc')}</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">{t('judaismPage.faithTitle')}</h2>
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-4">
                  {t('judaismPage.faithP1')}
                </p>
                <p className="text-muted-foreground">
                  {t('judaismPage.faithP2')}
                </p>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('judaismPage.lifeTitle')}</h3>
              <p className="text-muted-foreground">
                {t('judaismPage.lifeDesc')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Judaism;
