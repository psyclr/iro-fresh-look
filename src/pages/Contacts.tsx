import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">{t('contactsPage.title')}</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              {t('contactsPage.intro')}
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 text-primary">{t('contactsPage.officeTitle')}</h3>
                <p className="text-muted-foreground mb-2"><strong>{t('contactsPage.addressLabel')}</strong></p>
                <p className="text-muted-foreground mb-4">{t('contactsPage.addressValue')}</p>
                <p className="text-muted-foreground mb-2"><strong>{t('contactsPage.contactsLabel')}</strong></p>
                <p className="text-muted-foreground">Email: iro13b@gmail.com</p>
                <p className="text-muted-foreground">{t('contactsPage.phoneLabel')} +375 (44) 555-06-83</p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 text-primary">{t('contactsPage.hoursTitle')}</h3>
                <p className="text-muted-foreground mb-2">{t('contactsPage.weekdays')}</p>
                <p className="text-muted-foreground mb-2">{t('contactsPage.saturday')}</p>
                <p className="text-muted-foreground mb-4">{t('contactsPage.sunday')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('contactsPage.hoursNote')}
                </p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border mt-8">
              <h2 className="text-2xl font-semibold mb-6 text-primary">{t('contactsPage.regionsTitle')}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">{t('community.filters.minsk', 'Минск')}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{t('community.filters.minsk', 'Минск') === 'Минск' ? "Община «Бейс Исроэль»" : "Beis Yisroel community"}</p>
                  <p className="text-sm text-muted-foreground mb-1">{t('contactsPage.chairman')} Игорь Карпелев</p>
                  <p className="text-sm text-primary">+375 (29) 158-57-02</p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">{t('community.filters.brest', 'Брест')}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{t('community.filters.brest', 'Брест') === 'Брест' ? "Община «Эмуна»" : "Emuna community"}</p>
                  <p className="text-sm text-muted-foreground mb-1">{t('contactsPage.chairman')} Борис Брук</p>
                  <p className="text-sm text-primary">+375 (29) 635-51-53</p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">{t('community.filters.vitebsk', 'Орша')}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{t('community.filters.vitebsk', 'Орша') === 'Орша' ? "Община «Хевра Тегелим»" : "Hevra Tehilim community"}</p>
                  <p className="text-sm text-muted-foreground mb-1">{t('contactsPage.chairman')} Александр Розенберг</p>
                  <p className="text-sm text-primary">+375 (33) 322-96-90</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>{t('contactsPage.noteLabel')}</strong> {t('contactsPage.noteText')}
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

export default Contacts;
