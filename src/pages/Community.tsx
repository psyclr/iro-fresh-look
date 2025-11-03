import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  fetchCommunities,
  getLocalizedField,
  type Community,
} from "@/lib/communities";

const Community = () => {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage || i18n.language || "ru").split("-")[0];
  const navigate = useNavigate();

  const { data: communities = [], isLoading } = useQuery({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  // Get unique city IDs for tabs and sort them
  const cityIds = [...new Set(communities.map((c) => c.id.split("-")[0]))];

  // Sort: Minsk first, then regional centers alphabetically, then other cities alphabetically
  const regionalCenters = ["brest", "vitebsk", "gomel", "grodno", "mogilev"];
  const sortedCityIds = cityIds.sort((a, b) => {
    // Minsk always first
    if (a === "minsk") return -1;
    if (b === "minsk") return 1;

    // Regional centers before other cities
    const aIsRegional = regionalCenters.includes(a);
    const bIsRegional = regionalCenters.includes(b);

    if (aIsRegional && !bIsRegional) return -1;
    if (!aIsRegional && bIsRegional) return 1;

    // Both same category - alphabetical by city name
    const aCommunity = communities.find((c) => c.id.startsWith(`${a}-`));
    const bCommunity = communities.find((c) => c.id.startsWith(`${b}-`));

    if (aCommunity && bCommunity) {
      const aName = getLocalizedField(aCommunity.city, language);
      const bName = getLocalizedField(bCommunity.city, language);
      return aName.localeCompare(bName, language);
    }

    return 0;
  });

  const [selectedCityId, setSelectedCityId] = useState(sortedCityIds[0] || "minsk");

  // Get community for selected city
  const selectedCommunity = communities.find((c) => c.id.startsWith(`${selectedCityId}-`));

  const handleLearnMore = () => {
    if (selectedCommunity) {
      const cityId = selectedCommunity.id.split("-")[0];
      navigate(`/community/${cityId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="sr-only">Loading communities...</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <h1 className="text-4xl font-bold text-primary">{t("community.pageTitle")}</h1>
            <p className="text-lg text-muted-foreground">{t("community.intro")}</p>
          </div>

          {/* Tabs with cities */}
          <Tabs value={selectedCityId} onValueChange={setSelectedCityId} className="space-y-8">
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-white/70 backdrop-blur p-4">
              {sortedCityIds.map((cityId) => {
                const community = communities.find((c) => c.id.startsWith(`${cityId}-`));
                if (!community) return null;

                return (
                  <TabsTrigger
                    key={cityId}
                    value={cityId}
                    className="text-base px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    {getLocalizedField(community.city, language)}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {sortedCityIds.map((cityId) => {
              const community = communities.find((c) => c.id.startsWith(`${cityId}-`));
              if (!community) return null;

              return (
                <TabsContent key={cityId} value={cityId} className="space-y-8">
                  {/* Community Card */}
                  <div className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-soft border border-border space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-primary">
                        {getLocalizedField(community.city, language)}
                      </h2>
                      <p className="text-xl text-muted-foreground">
                        {getLocalizedField(community.communityName, language)}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {getLocalizedField(community.description, language)}
                    </p>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          {t("community.card.leader", { name: "" }).split(":")[0]}
                        </p>
                        <p className="text-lg text-foreground font-semibold">{community.leader}</p>
                      </div>

                      {community.phone && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            {t("community.card.phone", { phone: "" }).split(":")[0]}
                          </p>
                          <a href={`tel:${community.phone}`} className="text-lg text-primary hover:underline font-semibold">
                            {community.phone}
                          </a>
                        </div>
                      )}

                      {community.email && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            {t("community.card.email", { email: "" }).split(":")[0]}
                          </p>
                          <a href={`mailto:${community.email}`} className="text-lg text-primary hover:underline break-all font-semibold">
                            {community.email}
                          </a>
                        </div>
                      )}

                      {community.address && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            {t("community.card.address", { address: "" }).split(":")[0]}
                          </p>
                          <p className="text-lg text-foreground">
                            {getLocalizedField(community.address, language)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Learn More Button */}
                    <div className="pt-4">
                      <button
                        onClick={handleLearnMore}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                      >
                        {t("home.map.learnMore")}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
