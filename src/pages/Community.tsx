import { useMemo, useState } from "react";
import type { LatLngExpression } from "leaflet";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommunityMap from "@/components/CommunityMap";
import {
  COMMUNITY_REGIONS,
  fetchCommunities,
  getLocalizedField,
  type CommunityRegion,
} from "@/lib/communities";

const DEFAULT_CENTER: LatLngExpression = [53.709807, 27.953389];

type RegionFilter = CommunityRegion | "all";

const Community = () => {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage || i18n.language || "ru").split("-")[0];
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>("all");

  const { data: communities = [], isLoading } = useQuery({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  const filteredCommunities = useMemo(() => {
    if (selectedRegion === "all") {
      return communities;
    }
    return communities.filter((community) => community.region === selectedRegion);
  }, [communities, selectedRegion]);

  const mapCenter = useMemo<LatLngExpression>(() => {
    if (!filteredCommunities.length) {
      return DEFAULT_CENTER;
    }

    const [lat, lng] = filteredCommunities.reduce(
      (acc, community) => {
        acc[0] += community.coordinates[0];
        acc[1] += community.coordinates[1];
        return acc;
      },
      [0, 0] as [number, number],
    );

    return [lat / filteredCommunities.length, lng / filteredCommunities.length];
  }, [filteredCommunities]);

  const regionOptions = useMemo(
    () => [
      { value: "all" as RegionFilter, label: t("community.filters.all") },
      ...COMMUNITY_REGIONS.map((region) => ({
        value: region as RegionFilter,
        label: t(`community.filters.${region}`),
      })),
    ],
    [t],
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold text-primary">{t("community.pageTitle")}</h1>
            <p className="text-lg text-muted-foreground">{t("community.intro")}</p>
          </div>

          <section className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-soft border border-border">
            <div className="flex flex-wrap items-center gap-3">
              {regionOptions.map((option) => {
                const isActive = option.value === selectedRegion;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedRegion(option.value)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isActive
                        ? "bg-primary text-white focus-visible:ring-primary"
                        : "bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-primary/40"
                    }`}
                    aria-pressed={isActive}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="grid gap-8 xl:grid-cols-[1.2fr,1fr]">
            <div className="order-2 xl:order-1 space-y-6">
              <h2 className="text-2xl font-semibold text-primary">{t("community.listTitle")}</h2>

              {isLoading ? (
                <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="sr-only">Loading communities...</span>
                </div>
              ) : filteredCommunities.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border bg-card/50 p-6 text-center text-muted-foreground">
                  {t("community.empty")}
                </p>
              ) : (
                <div className="grid gap-6 lg:grid-cols-2">
                  {filteredCommunities.map((community) => (
                    <article key={community.id} className="rounded-xl border border-border bg-card/80 p-6 shadow-soft">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-primary">
                              {getLocalizedField(community.city, language)}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {getLocalizedField(community.communityName, language)}
                            </p>
                          </div>
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
                            {t(`community.filters.${community.region}`)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {getLocalizedField(community.description, language)}
                        </p>
                        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                          <p>{t("community.card.leader", { name: community.leader })}</p>
                          {community.phone && <p>{t("community.card.phone", { phone: community.phone })}</p>}
                          {community.email && <p>{t("community.card.email", { email: community.email })}</p>}
                          <p>
                            {t("community.card.address", {
                              address: getLocalizedField(community.address, language),
                            })}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="order-1 xl:order-2 space-y-4">
              <h2 className="text-2xl font-semibold text-primary">{t("community.mapTitle")}</h2>
              <CommunityMap
                communities={filteredCommunities.length ? filteredCommunities : communities}
                center={mapCenter}
                language={language}
                label={t("community.mapTitle")}
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
