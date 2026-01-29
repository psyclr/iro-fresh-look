import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "@/assets/iro-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Organization Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={logo} alt="IRO Logo" className="w-10 h-10 object-contain brightness-0 invert" />
              </div>
              <div>
                <h3 className="font-bold">{t("hero.titleHighlight")}</h3>
                <p className="text-sm text-white/80">{t("hero.titleLine3")}</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/community" className="text-white/80 hover:text-accent-light transition-colors">
                  {t("navigation.menu.community")}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-white/80 hover:text-accent-light transition-colors">
                  {t("navigation.menu.events")}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-white/80 hover:text-accent-light transition-colors">
                  {t("navigation.menu.projects")}
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-white/80 hover:text-accent-light transition-colors">
                  {t("navigation.menu.contacts")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.contactTitle")}</h4>
            <div className="space-y-2 text-sm text-white/80">
              <p>{t("contact.info.addressValue")}</p>
              <p>{t("community.card.email", { email: t("contact.info.emailValue") })}</p>
              <p>{t("community.card.phone", { phone: t("contact.info.phoneValue") })}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">{t("footer.rights")}</p>
          <div className="flex items-center gap-6">
            <div className="flex space-x-4">
              <span className="text-xs text-white/40">{t("footer.madeWith")}</span>
              <span className="text-accent-light text-xs">❤️</span>
              <span className="text-xs text-white/40">{t("footer.forCommunity")}</span>
            </div>
            <span className="text-white/20">•</span>
            <a
              href="https://www.hebcal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/60 hover:text-white/80 transition-colors"
            >
              {t("candleLighting.powered", "Данные")}: Hebcal.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;