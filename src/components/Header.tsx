import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "@/assets/iro-logo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { key: "community", href: "/community" },
    { key: "judaism", href: "/judaism" },
    { key: "heritage", href: "/heritage" },
    { key: "projects", href: "/projects" },
    { key: "events", href: "/events" },
    { key: "news", href: "/news" },
    { key: "gallery", href: "/gallery" },
    { key: "contacts", href: "/contacts" }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Логотип ИРО */}
            <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
              <div className="flex-shrink-0">
                <img src={logo} alt="IRO Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
              </div>
              <div className="hidden sm:block min-w-0">
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-primary leading-tight">
                  {t("hero.titleHighlight")}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">{t("hero.titleLine3")}</p>
              </div>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`nav-link text-sm font-medium ${isActive ? "text-accent" : ""}`}
                >
                  {t(`navigation.menu.${item.key}`)}
                </Link>
              );
            })}
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-primary hover:text-accent transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-border mt-4">
            <div className="flex flex-col space-y-2 pt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className="px-4 py-2 text-primary hover:text-accent hover:bg-accent/5 rounded-lg transition-all"
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