import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, Calendar, Heart } from "lucide-react";
import type { Community } from "@/lib/communities";
import { getLocalizedField } from "@/lib/communities";
import belarusOutline from "@/assets/belarus-outline.png";

interface BelarusMapSchemeProps {
  communities: Community[];
}

// SVG координаты для городов на карте Беларуси
// ViewBox: 0 0 1201 1201 (совпадает с размером PNG)
// Координаты получены через click handler на реальной карте
const cityPositions: Record<string, { x: number; y: number }> = {
  "minsk": { x: 600, y: 600 },       // центр страны (где менорра) ✓
  "brest": { x: 168, y: 854 },       // крайний юго-запад ✓
  "grodno": { x: 172, y: 572 },      // северо-запад ✓
  "gomel": { x: 935, y: 806 },       // юго-восток ✓
  "vitebsk": { x: 950, y: 310 },     // северо-восток ✓
  "mogilev": { x: 923, y: 552 },     // восток (на уровне Минска) ✓
  "orsha": { x: 881, y: 426 },       // между Минском и Витебском ✓
  "polotsk": { x: 706, y: 279 },     // крайний север ✓
  "bobruisk": { x: 774, y: 718 },    // между Минском и Гомелем ✓
};

const BelarusMapScheme = ({ communities }: BelarusMapSchemeProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const language = (i18n.resolvedLanguage || i18n.language || "ru").split("-")[0];
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

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

  const getCityId = (community: Community): string => {
    return community.id.split("-")[0]; // "minsk-beis-isroel" → "minsk"
  };

  const getCityPosition = (community: Community) => {
    const cityId = getCityId(community);
    return cityPositions[cityId] || { x: 300, y: 200 };
  };

  const handleCityClick = (community: Community) => {
    setSelectedCommunity(community);
  };

  const handleLearnMore = () => {
    if (selectedCommunity) {
      navigate(`/community?region=${selectedCommunity.region}`);
    }
  };

  return (
    <section className="pt-2 pb-6 bg-gradient-to-br from-background via-white to-primary/5">
      <div className="container mx-auto px-4 max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left column: Title and stats */}
          <div className="lg:col-span-2 flex flex-col justify-start items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              {t("home.map.title", "Наши общины")}
            </h2>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-3 group"
                >
                  <div className={`p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-7 h-7 ${stat.color}`} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              {t("home.map.subtitle", "Нажмите на город, чтобы узнать подробнее об общине")}
            </p>
          </div>

          {/* Right column: Map */}
          <div className="lg:col-span-3 relative">
          {/* SVG карта Беларуси */}
          <div className="relative scale-[0.80] origin-top -mt-12 -mb-80 -ml-8">
            <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
              {/* SVG карта с контуром и маркерами */}
              <svg
                viewBox="0 0 1201 1201"
                className="w-full h-full"
                role="img"
                aria-label={t("home.map.title")}
              >
                {/* PNG контур Беларуси как SVG image */}
                <image
                  href={belarusOutline}
                  x="0"
                  y="0"
                  width="1201"
                  height="1201"
                  opacity="0.2"
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(220deg) brightness(94%) contrast(87%)'
                  }}
                />

                {/* Маркеры городов */}
                {communities.map((community) => {
                  const pos = getCityPosition(community);
                  const cityId = getCityId(community);
                  const isHovered = hoveredCity === cityId;
                  const isSelected = selectedCommunity?.id === community.id;

                  return (
                    <g key={community.id}>
                      {/* Точка города */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isHovered || isSelected ? 12 : 9}
                        fill="currentColor"
                        className={`cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "text-accent"
                            : isHovered
                            ? "text-primary"
                            : "text-primary/70"
                        }`}
                        onMouseEnter={() => setHoveredCity(cityId)}
                        onMouseLeave={() => setHoveredCity(null)}
                        onClick={() => handleCityClick(community)}
                        role="button"
                        aria-label={`${getLocalizedField(community.city, language)}`}
                      />

                      {/* Пульсирующий эффект при hover */}
                      {isHovered && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-primary animate-ping opacity-75"
                        />
                      )}

                      {/* Название города - всегда видно */}
                      <text
                        x={pos.x}
                        y={pos.y - 25}
                        textAnchor="middle"
                        className={`text-sm font-medium pointer-events-none transition-all duration-200 ${
                          isHovered || isSelected
                            ? "fill-primary"
                            : "fill-primary/60"
                        }`}
                      >
                        {getLocalizedField(community.city, language)}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Popup с информацией о выбранной общине */}
            {selectedCommunity && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 border border-border pointer-events-auto animate-in fade-in zoom-in duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary">
                          {getLocalizedField(selectedCommunity.city, language)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getLocalizedField(selectedCommunity.communityName, language)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCommunity(null)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Close"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground">
                      {getLocalizedField(selectedCommunity.description, language)}
                    </p>

                    <div className="pt-3 border-t border-border space-y-2">
                      <p className="flex items-center text-muted-foreground">
                        <span className="font-medium text-foreground mr-2">
                          {t("community.card.leader", { name: "" }).split(":")[0]}:
                        </span>
                        {selectedCommunity.leader}
                      </p>

                      {selectedCommunity.phone && (
                        <p className="flex items-center text-muted-foreground">
                          <span className="font-medium text-foreground mr-2">
                            {t("community.card.phone", { phone: "" }).split(":")[0]}:
                          </span>
                          <a href={`tel:${selectedCommunity.phone}`} className="hover:text-primary">
                            {selectedCommunity.phone}
                          </a>
                        </p>
                      )}

                      {selectedCommunity.email && (
                        <p className="flex items-center text-muted-foreground">
                          <span className="font-medium text-foreground mr-2">
                            {t("community.card.email", { email: "" }).split(":")[0]}:
                          </span>
                          <a href={`mailto:${selectedCommunity.email}`} className="hover:text-primary">
                            {selectedCommunity.email}
                          </a>
                        </p>
                      )}

                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {t("community.card.address", { address: "" }).split(":")[0]}:
                        </span>{" "}
                        {getLocalizedField(selectedCommunity.address, language)}
                      </p>
                    </div>

                    <button
                      onClick={handleLearnMore}
                      className="w-full mt-4 btn-primary"
                    >
                      {t("home.map.learnMore", "Узнать больше")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BelarusMapScheme;
