import { useState } from "react";
import { useTranslation } from "react-i18next";
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
    <>
      <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
        {/* SVG карта с контуром и маркерами */}
        <svg
          viewBox="150 100 900 1000"
          className="w-full h-full"
          role="img"
          aria-label={t("home.map.ariaLabel")}
        >
          {/* PNG контур Беларуси как SVG image */}
          <image
            href={belarusOutline}
            x="0"
            y="0"
            width="1201"
            height="1201"
            opacity="0.6"
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
                  r={isHovered || isSelected ? 26 : 20}
                  fill="currentColor"
                  className={`pointer-events-none transition-all duration-200 ${
                    isSelected
                      ? "text-accent"
                      : isHovered
                      ? "text-primary"
                      : "text-primary"
                  }`}
                  style={{
                    filter: isHovered || isSelected
                      ? 'drop-shadow(0 2px 8px rgba(29, 78, 216, 0.3))'
                      : 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.15))'
                  }}
                />

                {/* Название города - под точкой */}
                <text
                  x={pos.x}
                  y={pos.y + 38}
                  textAnchor="middle"
                  className={`text-xl font-semibold pointer-events-none transition-all duration-200 ${
                    isHovered || isSelected ? "fill-primary" : "fill-foreground"
                  }`}
                  style={{
                    paintOrder: 'stroke fill',
                    stroke: 'white',
                    strokeWidth: '3',
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

      {/* SEO spacer - invisible keywords */}
      <div className="hidden opacity-0 select-none pointer-events-none" aria-hidden="true">
        <span>
          еврейская община Беларуси иудаизм синагога Минск Брест Гродно Витебск Гомель Могилев
          Jewish community Belarus synagogue Minsk kosher Judaism Torah Shabbat
          религиозная община традиции праздники культура наследие
        </span>
      </div>

      {/* Community Drawer */}
      <CommunityDrawer
        community={selectedCommunity}
        isOpen={!!selectedCommunity}
        onClose={() => setSelectedCommunity(null)}
      />
    </>
  );
};

export default BelarusMapScheme;
