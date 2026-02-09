import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CandleLighting from '@/components/CandleLighting';
import BelarusMapScheme from '@/components/BelarusMapScheme';
import KeyProjects from '@/components/KeyProjects';
import DonationBanner from '@/components/DonationBanner';
import Footer from '@/components/Footer';
import { fetchCommunities } from "@/lib/communities";

const Index = () => {
  const { t } = useTranslation();
  const { data: communities = [], isLoading } = useQuery({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  return (
    <div className="min-h-screen bg-background">
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
                          {t("home.stats.communities")}
                        </p>
                        <p className="text-3xl font-bold text-primary">15+</p>
                      </div>
                    </div>

                    <div className="h-px bg-border"></div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t("home.stats.regions")}
                        </p>
                        <p className="text-3xl font-bold text-primary">6</p>
                      </div>
                    </div>

                    <div className="h-px bg-border"></div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t("home.stats.since")}
                        </p>
                        <p className="text-3xl font-bold text-primary">1990</p>
                      </div>
                    </div>

                    <div className="h-px bg-border"></div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t("home.stats.events")}
                        </p>
                        <p className="text-3xl font-bold text-primary">100+</p>
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
