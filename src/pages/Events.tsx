import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Events = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">{t('eventsPage.title')}</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              {t('eventsPage.intro')}
            </p>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">{t('eventsPage.regularTitle')}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="font-medium">{t('eventsPage.shabbatServices')}</span>
                    <span className="text-sm text-muted-foreground">{t('eventsPage.shabbatSchedule')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="font-medium">{t('eventsPage.seminars')}</span>
                    <span className="text-sm text-muted-foreground">{t('eventsPage.seminarsSchedule')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="font-medium">{t('eventsPage.torahStudy')}</span>
                    <span className="text-sm text-muted-foreground">{t('eventsPage.torahSchedule')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">{t('eventsPage.calendarTitle')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('eventsPage.calendarDesc')}
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>{t('eventsPage.hanukkah')}</strong> {t('eventsPage.hanukkahDesc')}
                  </p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">{t('eventsPage.specialTitle')}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t('eventsPage.conferencesTitle')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('eventsPage.conferencesDesc')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('eventsPage.booksTitle')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('eventsPage.booksDesc')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('eventsPage.memorialTitle')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('eventsPage.memorialDesc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{t('eventsPage.joinTitle')}</h3>
                <p className="text-muted-foreground">
                  {t('eventsPage.joinDesc')}
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

export default Events;
