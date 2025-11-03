import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Users, Calendar, Heart, MousePointer2 } from "lucide-react";
import type { Community } from "@/lib/communities";
import { getLocalizedField } from "@/lib/communities";
import belarusOutline from "@/assets/belarus-outline.png";
import CommunityDrawer from "@/components/CommunityDrawer";

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

  const handleKeyDown = (e: React.KeyboardEvent, community: Community) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCityClick(community);
    }
  };

  return (
    <section className="py-8 bg-gradient-to-br from-background via-white to-primary/5 overflow-visible">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Title centered across full width */}
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
          {t("home.map.title", "Наши общины")}
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center relative">
          {/* Left column: Stats only */}
          <div className="lg:w-1/3 flex flex-col justify-start items-center text-center lg:mt-16">
            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 w-full max-w-md mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-3"
                >
                  <div className={`p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <p className="text-base text-muted-foreground leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 max-w-md mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-4 py-2.5 text-base text-foreground font-medium shadow-sm">
                <MousePointer2 className="w-5 h-5 text-primary" />
                <span>{t("home.map.subtitle", "Нажмите на город, чтобы узнать подробнее об общине")}</span>
              </div>
            </div>
          </div>

          {/* SEO spacer - invisible keywords */}
          <div className="hidden lg:block w-px opacity-0 select-none pointer-events-none" aria-hidden="true">
            <span>
              еврейская община Беларуси иудаизм синагога Минск Брест Гродно Витебск Гомель Могилев
              Jewish community Belarus synagogue Minsk kosher Judaism Torah Shabbat
              религиозная община традиции праздники культура наследие
            </span>
          </div>

          {/* Right column: Map */}
          <div className="lg:w-2/3 lg:flex-1 relative lg:-mt-12">
            {/* SVG карта Беларуси */}
            <div className="relative scale-100 origin-center" style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08))' }}>
              <div className="relative w-full max-w-2xl mx-auto" style={{ aspectRatio: '1/1' }}>
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
                    opacity="0.35"
                    style={{
                      mixBlendMode: 'multiply',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(220deg) brightness(94%) contrast(87%) contrast(150%)'
                    }}
                  />

                  {/* Маркеры городов */}
                  {communities.map((community, index) => {
                    const pos = getCityPosition(community);
                    const cityId = getCityId(community);
                    const isHovered = hoveredCity === cityId;
                    const isSelected = selectedCommunity?.id === community.id;

                    return (
                      <g key={community.id}>
                        {/* Невидимая увеличенная область для клика (hit area) */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={40}
                          fill="transparent"
                          className="cursor-pointer focus:outline-none"
                          onMouseEnter={() => setHoveredCity(cityId)}
                          onMouseLeave={() => setHoveredCity(null)}
                          onClick={() => handleCityClick(community)}
                          onKeyDown={(e) => handleKeyDown(e, community)}
                          tabIndex={0}
                          role="button"
                          aria-label={`${getLocalizedField(community.city, language)} - ${getLocalizedField(community.communityName, language)}`}
                          aria-pressed={selectedCommunity?.id === community.id}
                        />

                        {/* Точка города с улучшенной интерактивностью */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isHovered || isSelected ? 30 : 22}
                          fill="currentColor"
                          className={`pointer-events-none transition-all duration-300 ${
                            isSelected
                              ? "text-accent"
                              : isHovered
                              ? "text-primary"
                              : "text-primary"
                          }`}
                          style={{
                            filter: isHovered || isSelected
                              ? 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 0 4px rgba(29, 78, 216, 0.3))'
                              : 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25))'
                          }}
                        />

                        {/* Название города - под точкой */}
                        <text
                          x={pos.x}
                          y={pos.y + 35}
                          textAnchor="middle"
                          className={`text-2xl font-bold pointer-events-none ${
                            isHovered || isSelected ? "fill-primary" : "fill-primary"
                          }`}
                          style={{
                            paintOrder: 'stroke fill',
                            stroke: 'white',
                            strokeWidth: '5',
                            strokeLinejoin: 'round',
                            strokeLinecap: 'round'
                          }}
                        >
                          {getLocalizedField(community.city, language)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Community Drawer */}
      <CommunityDrawer
        community={selectedCommunity}
        isOpen={!!selectedCommunity}
        onClose={() => setSelectedCommunity(null)}
      />
    </section>
  );
};

export default BelarusMapScheme;
