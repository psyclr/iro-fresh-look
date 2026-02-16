import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>{t('contactsPage.title')} — {t('hero.titleHighlight')}</title></Helmet>
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
                <p className="text-muted-foreground">
                  Email:{" "}
                  <a href="mailto:iro13b@gmail.com" className="text-primary hover:underline">
                    iro13b@gmail.com
                  </a>
                </p>
                <p className="text-muted-foreground">
                  {t('contactsPage.phoneLabel')}{" "}
                  <a href="tel:+375173615612" className="text-primary hover:underline">
                    +375 17 361-56-12
                  </a>
                </p>
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
                  <h4 className="font-semibold mb-2">{t('community.filters.minsk')}</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('community.filters.minsk') === 'Минская область' ? "Община «Бейс Исроэль»" : "Beis Yisroel community"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">{t('contactsPage.chairman')} Игорь Карпелев</p>
                  <p className="text-sm">
                    <a href="tel:+375291585702" className="text-primary hover:underline">+375 (29) 158-57-02</a>
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">{t('community.filters.brest')}</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('community.filters.brest') === 'Брестская область' ? "Община «Эмуна»" : "Emuna community"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">{t('contactsPage.chairman')} Борис Брук</p>
                  <p className="text-sm">
                    <a href="tel:+375296355153" className="text-primary hover:underline">+375 (29) 635-51-53</a>
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">{t('community.filters.vitebsk')}</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('community.filters.vitebsk') === 'Витебская область' ? "Община «Хевра Тегелим»" : "Hevra Tehilim community"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">{t('contactsPage.chairman')} Александр Розенберг</p>
                  <p className="text-sm">
                    <a href="tel:+375333229690" className="text-primary hover:underline">+375 (33) 322-96-90</a>
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">{t('community.filters.gomel')}</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('community.filters.gomel') === 'Гомельская область' ? "Гомельская еврейская община" : "Gomel Jewish community"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">{t('contactsPage.chairman')} Анна Коган</p>
                  <p className="text-sm">
                    <a href="tel:+375255671120" className="text-primary hover:underline">+375 (25) 567-11-20</a>
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">{t('community.filters.mogilev')}</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('community.filters.mogilev') === 'Могилёвская область' ? "Могилёвская община" : "Mogilev community"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">{t('contactsPage.chairman')} Роман Лурье</p>
                  <p className="text-sm">
                    <a href="tel:+375297771234" className="text-primary hover:underline">+375 (29) 777-12-34</a>
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">{t('community.filters.grodno')}</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('community.filters.grodno') === 'Гродненская область' ? "Гродненская община" : "Grodno community"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">{t('contactsPage.chairman')} Мария Левина</p>
                  <p className="text-sm">
                    <a href="tel:+375291234567" className="text-primary hover:underline">+375 (29) 123-45-67</a>
                  </p>
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
