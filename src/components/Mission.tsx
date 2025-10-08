import { useTranslation } from "react-i18next";

const Mission = () => {
  const { t } = useTranslation();

  return (
    <section id="mission" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title text-center">{t("mission.title")}</h2>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-medium mb-16">
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">{t("mission.lead")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-enhanced p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{t("mission.pillars.publication.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("mission.pillars.publication.description")}</p>
            </div>

            <div className="card-enhanced p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{t("mission.pillars.lapidary.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("mission.pillars.lapidary.description")}</p>
            </div>

            <div className="card-enhanced p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{t("mission.pillars.heritage.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("mission.pillars.heritage.description")}</p>
            </div>

            <div className="card-enhanced p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{t("mission.pillars.support.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("mission.pillars.support.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;