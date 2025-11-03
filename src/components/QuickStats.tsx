import { useTranslation } from "react-i18next";
import { Users, MapPin, Calendar, Heart } from "lucide-react";

const QuickStats = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Users,
      value: "15+",
      label: t("home.stats.communities", "Общин по всей стране"),
      color: "text-primary"
    },
    {
      icon: MapPin,
      value: "6",
      label: t("home.stats.regions", "Регионов Беларуси"),
      color: "text-accent"
    },
    {
      icon: Calendar,
      value: "1990",
      label: t("home.stats.since", "Год основания"),
      color: "text-primary"
    },
    {
      icon: Heart,
      value: "100+",
      label: t("home.stats.events", "Мероприятий в год"),
      color: "text-accent"
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3 group"
            >
              <div className={`p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground leading-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickStats;
