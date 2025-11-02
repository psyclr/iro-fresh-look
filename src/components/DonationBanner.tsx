import { useTranslation } from "react-i18next";
import { Heart } from "lucide-react";

const DonationBanner = () => {
  const { t } = useTranslation();

  const handleDonateClick = () => {
    // В будущем здесь будет переход на страницу донейшенов или открытие формы
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-border shadow-soft">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" strokeWidth={2} fill="currentColor" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {t("home.donation.title", "Поддержите наши проекты")}
                </h3>
                <p className="text-muted-foreground">
                  {t("home.donation.description", "Ваша помощь позволяет нам развивать общины, проводить мероприятия и поддерживать традиции")}
                </p>
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={handleDonateClick}
                  className="btn-primary whitespace-nowrap"
                >
                  {t("home.donation.cta", "Помочь")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationBanner;
