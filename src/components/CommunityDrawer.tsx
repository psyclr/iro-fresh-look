import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Community } from "@/lib/communities";
import { getLocalizedField } from "@/lib/communities";
import { ArrowRight } from "lucide-react";

interface CommunityDrawerProps {
  community: Community | null;
  isOpen: boolean;
  onClose: () => void;
}

const CommunityDrawer = ({ community, isOpen, onClose }: CommunityDrawerProps) => {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage || i18n.language || "ru").split("-")[0];

  if (!community) return null;

  // Extract cityId from community.id (e.g., "minsk-beis-isroel" -> "minsk")
  const cityId = community.id.split("-")[0];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-primary text-2xl">
            {getLocalizedField(community.city, language)}
          </SheetTitle>
          <SheetDescription className="text-base text-foreground/80">
            {getLocalizedField(community.communityName, language)}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <p className="text-base text-muted-foreground leading-relaxed">
              {getLocalizedField(community.description, language)}
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("community.card.leader", { name: "" }).split(":")[0]}
                </p>
                <p className="text-base text-foreground font-medium">{community.leader}</p>
              </div>

              {community.phone && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t("community.card.phone", { phone: "" }).split(":")[0]}
                  </p>
                  <a href={`tel:${community.phone}`} className="text-base text-primary hover:underline font-medium">
                    {community.phone}
                  </a>
                </div>
              )}

              {community.email && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t("community.card.email", { email: "" }).split(":")[0]}
                  </p>
                  <a href={`mailto:${community.email}`} className="text-base text-primary hover:underline break-all font-medium">
                    {community.email}
                  </a>
                </div>
              )}

              {community.address && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t("community.card.address", { address: "" }).split(":")[0]}
                  </p>
                  <p className="text-base text-foreground">
                    {getLocalizedField(community.address, language)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Learn More Button */}
          <div className="pt-4 border-t border-border">
            <Link
              to={`/community/${cityId}`}
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {t("home.map.learnMore")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommunityDrawer;
