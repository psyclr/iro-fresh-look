import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { StrapiCommunity, CommunityRegion } from "@/types/strapi";
import belarusOutline from "@/assets/belarus-outline.png";
import { MapPin, Phone, Mail, User, Users, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BelarusMapSchemeProps {
  communities: StrapiCommunity[];
}

// SVG coordinates for regions on the map
// ViewBox: 0 0 1201 1201 (matches PNG dimensions)
const regionPositions: Record<CommunityRegion, { x: number; y: number }> = {
  minsk: { x: 600, y: 600 },
  brest: { x: 168, y: 854 },
  grodno: { x: 172, y: 572 },
  vitebsk: { x: 760, y: 310 },
  gomel: { x: 935, y: 806 },
  mogilev: { x: 923, y: 552 },
};

const BelarusMapScheme = ({ communities }: BelarusMapSchemeProps) => {
  const { t } = useTranslation();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<CommunityRegion | null>(null);

  const getCommunitiesByRegion = (region: CommunityRegion) => {
    return communities.filter(c => c.region === region);
  };

  const handleRegionClick = (region: CommunityRegion) => {
    setSelectedRegion(region);
  };

  const handleKeyDown = (e: React.KeyboardEvent, region: CommunityRegion) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRegionClick(region);
    }
  };

  const regions: CommunityRegion[] = ["minsk", "brest", "grodno", "vitebsk", "gomel", "mogilev"];

  return (
    <>
      <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
        <svg
          viewBox="0 0 1201 1201"
          className="w-full h-full"
          role="img"
          aria-label={t("home.map.ariaLabel")}
        >
          {/* PNG outline of Belarus */}
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

          {/* Region markers */}
          {regions.map((region) => {
            const pos = regionPositions[region];
            const regionCommunities = getCommunitiesByRegion(region);
            const communityCount = regionCommunities.length;
            const isHovered = hoveredRegion === region;
            const isSelected = selectedRegion === region;
            const regionName = t(`home.map.regions.${region}`);

            return (
              <g key={region}>
                {/* Invisible hit area */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={50}
                  fill="transparent"
                  className="cursor-pointer focus:outline-none"
                  onMouseEnter={() => setHoveredRegion(region)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => handleRegionClick(region)}
                  onKeyDown={(e) => handleKeyDown(e, region)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${regionName} — ${communityCount} ${communityCount === 1 ? 'община' : 'общин'}`}
                  aria-pressed={isSelected}
                />

                {/* Region circle marker */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isHovered || isSelected ? 35 : 30}
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
                      ? 'drop-shadow(0 3px 10px rgba(29, 78, 216, 0.4))'
                      : 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.15))'
                  }}
                />

                {/* Community count inside circle */}
                <text
                  x={pos.x}
                  y={pos.y + 6}
                  textAnchor="middle"
                  className="pointer-events-none fill-white text-xl font-bold"
                >
                  {communityCount}
                </text>

                {/* Region name to the right of circle */}
                <text
                  x={pos.x + 42}
                  y={pos.y + 8}
                  textAnchor="start"
                  className={`text-lg font-bold pointer-events-none transition-all duration-200 ${
                    isHovered || isSelected ? "fill-primary" : "fill-foreground"
                  }`}
                  style={{
                    paintOrder: 'stroke fill',
                    stroke: 'white',
                    strokeWidth: '4',
                    strokeLinejoin: 'round',
                    strokeLinecap: 'round'
                  }}
                >
                  {regionName}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Region Communities Dialog */}
      <Dialog open={!!selectedRegion} onOpenChange={() => setSelectedRegion(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedRegion && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {t(`community.filters.${selectedRegion}`)}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                {getCommunitiesByRegion(selectedRegion).map((community) => (
                  <div
                    key={community.id}
                    className="rounded-xl border bg-card p-6 space-y-4"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        {community.community_name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {community.name}
                      </p>
                    </div>

                    {community.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {community.description}
                      </p>
                    )}

                    {/* Contact info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {community.leader && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary shrink-0" />
                          <span>{community.leader}</span>
                        </div>
                      )}
                      {community.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span>{community.address}</span>
                        </div>
                      )}
                      {community.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary shrink-0" />
                          <a href={`tel:${community.phone}`} className="text-primary hover:underline">
                            {community.phone}
                          </a>
                        </div>
                      )}
                      {community.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary shrink-0" />
                          <a href={`mailto:${community.email}`} className="text-primary hover:underline break-all">
                            {community.email}
                          </a>
                        </div>
                      )}
                      {community.member_count && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary shrink-0" />
                          <span>{community.member_count} {t('communityDrawer.info.members')}</span>
                        </div>
                      )}
                      {community.languages && community.languages.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-primary shrink-0" />
                          <span>{community.languages.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Programs */}
                    {community.programs && community.programs.length > 0 && (
                      <div className="pt-2 border-t">
                        <h4 className="text-sm font-semibold mb-2">{t('communityDrawer.programs.title')}</h4>
                        <div className="space-y-2">
                          {community.programs.map((program) => (
                            <div key={program.id} className="bg-muted/50 rounded-lg p-3">
                              <p className="font-medium text-sm">{program.name}</p>
                              {program.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {program.description}
                                </p>
                              )}
                              {program.schedule && (
                                <p className="text-xs text-primary mt-1">
                                  {program.schedule}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {getCommunitiesByRegion(selectedRegion).length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    {t('community.empty')}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BelarusMapScheme;
