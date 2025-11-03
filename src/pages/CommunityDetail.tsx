import { useParams, Navigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Loader2, ArrowLeft, BookOpen, Flame, Calendar, Image, Users, Globe, GraduationCap, Heart, Building, Palette, UserCircle, Clock, User } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchCommunities, getLocalizedField } from "@/lib/communities";

const CommunityDetail = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage || i18n.language || "ru").split("-")[0];

  const { data: communities = [], isLoading } = useQuery({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  // Find the community by cityId (first part of id)
  const community = communities.find((c) => c.id.startsWith(`${cityId}-`));

  // Category icons and colors for programs
  const categoryIcons = {
    education: GraduationCap,
    social: Heart,
    religious: Building,
    cultural: Palette,
    youth: UserCircle,
  };

  const categoryColors = {
    education: "text-blue-600",
    social: "text-rose-600",
    religious: "text-purple-600",
    cultural: "text-amber-600",
    youth: "text-blue-500",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="sr-only">Loading community...</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!community) {
    return <Navigate to="/community" replace />;
  }

  const hasExtendedData = community.history || community.photos || community.shabbatSchedule || community.programs;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <Link
            to="/community"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {t("navigation.back", "Назад к списку общин")}
          </Link>

          {/* Header */}
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl font-bold text-primary">
              {getLocalizedField(community.city, language)}
            </h1>
            <h2 className="text-2xl text-muted-foreground">
              {getLocalizedField(community.communityName, language)}
            </h2>
          </div>

          {/* Basic Info */}
          <div className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-soft border border-border space-y-6 mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {getLocalizedField(community.description, language)}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
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
          </div>

          {/* Extended Information */}
          {hasExtendedData && (
            <div className="space-y-12">
              {/* History Section */}
              {community.history && (
                <section className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-soft border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold text-primary">
                      {t("communityDrawer.history.title")}
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        {t("communityDrawer.history.founded")}
                      </p>
                      <p className="text-2xl font-bold text-foreground">{community.history.founded}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-3">
                        {t("communityDrawer.history.facts")}
                      </p>
                      <ul className="space-y-3">
                        {community.history.facts.map((fact, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="text-primary shrink-0 text-lg">•</span>
                            <span className="text-base text-foreground/90 leading-relaxed">
                              {getLocalizedField(fact, language)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {/* Shabbat Schedule Section */}
              {community.shabbatSchedule && (
                <section className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-soft border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Flame className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold text-primary">
                      {t("communityDrawer.schedule.title")}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-lg font-medium text-muted-foreground">
                        {t("communityDrawer.schedule.candleLighting")}
                      </span>
                      <span className="text-xl font-bold text-primary">
                        {community.shabbatSchedule.candleLighting}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-lg font-medium text-muted-foreground">
                        {t("communityDrawer.schedule.havdalah")}
                      </span>
                      <span className="text-xl font-bold text-primary">
                        {community.shabbatSchedule.havdalah}
                      </span>
                    </div>
                    {community.shabbatSchedule.note && (
                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground italic">
                          {t("communityDrawer.schedule.note")}: {getLocalizedField(community.shabbatSchedule.note, language)}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Programs Section */}
              {community.programs && community.programs.length > 0 && (
                <section className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-soft border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold text-primary">
                      {t("communityDrawer.programs.title")}
                    </h3>
                  </div>
                  <div className="space-y-6">
                    {community.programs.map((program) => {
                      const CategoryIcon = categoryIcons[program.category];
                      const categoryColor = categoryColors[program.category];

                      return (
                        <div key={program.id} className="bg-muted/50 rounded-lg p-6 space-y-3">
                          <div className="flex items-start gap-4">
                            <CategoryIcon className={`w-6 h-6 ${categoryColor} shrink-0 mt-1`} />
                            <div className="flex-1 space-y-2">
                              <h4 className="font-bold text-lg text-foreground">
                                {getLocalizedField(program.name, language)}
                              </h4>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                {t(`communityDrawer.programs.categories.${program.category}`)}
                              </p>
                            </div>
                          </div>
                          <p className="text-base text-foreground/80 leading-relaxed pl-10">
                            {getLocalizedField(program.description, language)}
                          </p>
                          {program.schedule && (
                            <div className="flex items-center gap-2 pl-10 pt-2">
                              <Clock className="w-5 h-5 text-muted-foreground" />
                              <span className="text-base text-muted-foreground">
                                {getLocalizedField(program.schedule, language)}
                              </span>
                            </div>
                          )}
                          {program.contactPerson && (
                            <div className="flex items-center gap-2 pl-10 pt-1">
                              <User className="w-5 h-5 text-muted-foreground" />
                              <span className="text-base text-muted-foreground">
                                {t("communityDrawer.programs.contact")}: {program.contactPerson}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Photos/Gallery Section */}
              {community.photos && (community.photos.building || community.photos.events.length > 0) && (
                <section className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-soft border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Image className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold text-primary">
                      {t("communityDrawer.gallery.title")}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground italic">
                      {t("communityDrawer.gallery.buildingPhoto")} • {t("communityDrawer.gallery.events")}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {community.photos.building && (
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <Image className="w-12 h-12 text-muted-foreground/40" />
                        </div>
                      )}
                      {community.photos.events.slice(0, 5).map((_, index) => (
                        <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <Image className="w-12 h-12 text-muted-foreground/40" />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Additional Info Section */}
              {(community.memberCount || community.languages) && (
                <section className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-soft border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold text-primary">
                      {t("communityDrawer.info.title")}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {community.memberCount && (
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <span className="text-lg text-foreground">
                          <span className="font-bold text-primary text-xl">{community.memberCount}</span>{" "}
                          {t("communityDrawer.info.members")}
                        </span>
                      </div>
                    )}
                    {community.languages && (
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {t("communityDrawer.info.languages")}
                          </p>
                          <p className="text-lg text-foreground">
                            {community.languages.join(", ")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityDetail;
