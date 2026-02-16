import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CandleLighting from '@/components/CandleLighting';
import BelarusMapScheme from '@/components/BelarusMapScheme';
import KeyProjects from '@/components/KeyProjects';
import DonationBanner from '@/components/DonationBanner';
import Footer from '@/components/Footer';
import { useStrapiCommunities, useSettings } from "@/hooks/useStrapi";
import { COMMUNITY_DATA, getLocalizedField } from "@/lib/communities";
import type { StrapiCommunity } from "@/types/strapi";

const Index = () => {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage || i18n.language || 'ru').split('-')[0];
  const { data: strapiCommunities, isLoading } = useStrapiCommunities();
  const { data: settings } = useSettings();

  // Fallback: convert static data to StrapiCommunity format
  const fallbackCommunities = useMemo<StrapiCommunity[]>(() =>
    COMMUNITY_DATA.map((c, idx) => ({
      id: idx + 1,
      documentId: c.id,
      name: getLocalizedField(c.city, language),
      slug: c.id,
      community_name: getLocalizedField(c.communityName, language),
      description: getLocalizedField(c.description, language),
      region: c.region,
      locale: language,
      leader: c.leader,
      phone: c.phone,
      email: c.email,
      address: c.address ? getLocalizedField(c.address, language) : undefined,
      coordinates: c.coordinates,
      website: c.website,
      member_count: c.memberCount,
      languages: c.languages,
      founded_year: c.history?.founded,
      history_facts: c.history?.facts.map(f => getLocalizedField(f, language)),
      shabbat_candle_lighting: c.shabbatSchedule?.candleLighting,
      shabbat_havdalah: c.shabbatSchedule?.havdalah,
      shabbat_note: c.shabbatSchedule?.note ? getLocalizedField(c.shabbatSchedule.note, language) : undefined,
      programs: c.programs?.map((p, i) => ({
        id: i + 1,
        name: getLocalizedField(p.name, language),
        description: getLocalizedField(p.description, language),
        category: p.category,
        schedule: p.schedule ? getLocalizedField(p.schedule, language) : undefined,
        contact_person: p.contactPerson,
      })),
      building_photo: null,
      event_photos: null,
      order: idx,
      publishedAt: new Date().toISOString(),
    })),
  [language]);

  const communities = (strapiCommunities && strapiCommunities.length > 0)
    ? strapiCommunities
    : fallbackCommunities;

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>{t("hero.titleHighlight")} — {t("hero.titleLine3")}</title></Helmet>
      <Header />

      {/* Candle Lighting - wide bar below header */}
      <div className="border-b border-border bg-white relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <CandleLighting compact={false} />
          </div>
        </div>
      </div>

      <main>
        <Hero />

        {/* Map with Stats sidebar */}
        <section className="bg-white">
          <div className="container mx-auto px-4">
            {/* Grid layout: Map on left, Stats on right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0 items-center">

              {/* Map - centered in its column */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-[520px]">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                  ) : (
                    <BelarusMapScheme communities={communities} />
                  )}
                </div>
              </div>

              {/* Stats - right sidebar */}
              <div className="py-6 lg:py-0">
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">
                      {t("home.map.title", "Наши общины")}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t("home.map.subtitle")}
                    </p>
                  </div>

                  {/* Stats vertical */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          {settings?.stats_communities_label || t("home.stats.communities")}
                        </p>
                        <p className="text-3xl font-bold text-primary">{settings?.stats_communities_value || "15+"}</p>
                      </div>
                    </div>

                    <div className="h-px bg-border"></div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          {settings?.stats_regions_label || t("home.stats.regions")}
                        </p>
                        <p className="text-3xl font-bold text-primary">{settings?.stats_regions_value || "6"}</p>
                      </div>
                    </div>

                    <div className="h-px bg-border"></div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          {settings?.stats_founded_label || t("home.stats.since")}
                        </p>
                        <p className="text-3xl font-bold text-primary">{settings?.stats_founded_value || "1990"}</p>
                      </div>
                    </div>

                    <div className="h-px bg-border"></div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          {settings?.stats_events_label || t("home.stats.events")}
                        </p>
                        <p className="text-3xl font-bold text-primary">{settings?.stats_events_value || "100+"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        <KeyProjects />
        <DonationBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
