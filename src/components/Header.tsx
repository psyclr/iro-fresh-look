import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "@/assets/iro-logo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

interface MenuItem {
  key: string;
  href: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    { key: "judaism", href: "/judaism" },
    { key: "projects", href: "/projects" },
    { key: "poster", href: "/poster" },
    { key: "news", href: "/news" },
    { key: "gallery", href: "/gallery" },
    { key: "contacts", href: "/contacts" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-5 md:py-6">
          {/* Логотип ИРО */}
            <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
              <div className="flex-shrink-0">
                <img src={logo} alt="IRO Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
              </div>
              <div className="hidden sm:block min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary leading-tight">
                  {t("hero.titleHighlight")}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">{t("hero.titleLine3")}</p>
              </div>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-base font-medium transition-colors",
                    "hover:bg-accent/50 hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    isActive && "text-accent"
                  )}
                >
                  {t(`navigation.menu.${item.key}`)}
                </Link>
              );
            })}
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-primary hover:text-accent transition-colors"
            aria-label={isMenuOpen ? t("navigation.menu.close", "Close menu") : t("navigation.menu.open", "Open menu")}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-border mt-4" role="navigation" aria-label={t("navigation.menu.main", "Main navigation")}>
            <div className="flex flex-col space-y-2 pt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className="px-4 py-3 text-base text-primary hover:text-accent hover:bg-accent/5 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`navigation.menu.${item.key}`)}
                </Link>
              ))}
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
