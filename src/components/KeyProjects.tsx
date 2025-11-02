import { useTranslation } from "react-i18next";
import { Newspaper, Landmark, GraduationCap, HandHeart } from "lucide-react";

const KeyProjects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      icon: Newspaper,
      title: t("mission.pillars.publication.title"),
      description: t("mission.pillars.publication.description"),
      gradient: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600"
    },
    {
      icon: Landmark,
      title: t("mission.pillars.lapidary.title"),
      description: t("mission.pillars.lapidary.description"),
      gradient: "from-amber-500/10 to-amber-600/5",
      iconColor: "text-amber-600"
    },
    {
      icon: GraduationCap,
      title: t("mission.pillars.heritage.title"),
      description: t("mission.pillars.heritage.description"),
      gradient: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-600"
    },
    {
      icon: HandHeart,
      title: t("mission.pillars.support.title"),
      description: t("mission.pillars.support.description"),
      gradient: "from-rose-500/10 to-rose-600/5",
      iconColor: "text-rose-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            {t("home.projects.title", "Наши проекты")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("home.projects.subtitle", "Мы развиваем культурные, образовательные и благотворительные инициативы")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              <div className="relative z-10 flex flex-col h-full space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <project.icon className={`w-6 h-6 ${project.iconColor}`} strokeWidth={2} />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyProjects;
