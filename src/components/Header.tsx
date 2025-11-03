import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "@/assets/iro-logo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SubMenuItem {
  key: string;
  href: string;
  description?: string;
}

interface MenuItem {
  key: string;
  href?: string;
  submenu?: SubMenuItem[];
}

// Компонент для hover dropdown с поддержкой клавиатуры
const HoverDropdownMenu = ({
  children,
  trigger
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleOpen = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange} modal={false}>
      <div
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        className="relative"
      >
        <DropdownMenuTrigger asChild>
          {trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          align="start"
          sideOffset={4}
          className="w-[200px] bg-white/95 backdrop-blur-md border-border/50"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {children}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      key: "community",
      href: "/community",
    },
    {
      key: "judaism",
      href: "/judaism",
      submenu: [
        { key: "rabbi", href: "/judaism#rabbi", description: "Совет раввина" },
        { key: "holidays", href: "/judaism#holidays", description: "Еврейские праздники" },
        { key: "traditions", href: "/judaism#traditions", description: "Традиции и обычаи" },
      ]
    },
    {
      key: "heritage",
      href: "/heritage",
      submenu: [
        { key: "lapidary", href: "/heritage#lapidary", description: "Лапидарий в Бресте" },
        { key: "cemeteries", href: "/heritage#cemeteries", description: "Еврейские кладбища" },
        { key: "archives", href: "/heritage#archives", description: "Архивные материалы" },
      ]
    },
    {
      key: "projects",
      href: "/projects",
      submenu: [
        { key: "newspaper", href: "/projects#newspaper", description: "Газета «Берега»" },
        { key: "education", href: "/projects#education", description: "Образовательные программы" },
        { key: "tours", href: "/projects#tours", description: "Аудио и видео туры" },
      ]
    },
    {
      key: "events",
      href: "/events",
      submenu: [
        { key: "upcoming", href: "/events#upcoming", description: "Предстоящие события" },
        { key: "archive", href: "/events#archive", description: "Архив событий" },
      ]
    },
    { key: "gallery", href: "/gallery" }
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
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;

              // If item has submenu, render with dropdown
              if (item.submenu && item.submenu.length > 0) {
                return (
                  <HoverDropdownMenu
                    key={item.key}
                    trigger={
                      <button
                        className={cn(
                          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                          "hover:bg-accent/50 hover:text-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                          "group",
                          isActive && "text-accent"
                        )}
                        aria-label={t(`navigation.menu.${item.key}`)}
                      >
                        {t(`navigation.menu.${item.key}`)}
                        <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
                      </button>
                    }
                  >
                    {item.submenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.key} asChild>
                        <Link
                          to={subItem.href}
                          className={cn(
                            "cursor-pointer px-3 py-2.5 text-sm transition-all duration-200",
                            "text-foreground/80 hover:text-primary hover:translate-x-1",
                            "relative after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2",
                            "after:w-0 after:h-px after:bg-primary after:transition-all after:duration-200",
                            "hover:after:w-2"
                          )}
                        >
                          <span className="font-medium">
                            {t(`navigation.submenu.${item.key}.${subItem.key}`)}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </HoverDropdownMenu>
                );
              }

              // Simple link without submenu
              return (
                <Link
                  key={item.key}
                  to={item.href!}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
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
              {menuItems.map((item) => {
                if (item.submenu && item.submenu.length > 0) {
                  return (
                    <div key={item.key} className="flex flex-col">
                      <Link
                        to={item.href!}
                        className="px-4 py-2 text-primary font-medium hover:text-accent hover:bg-accent/5 rounded-lg transition-all"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t(`navigation.menu.${item.key}`)}
                      </Link>
                      <div className="ml-4 flex flex-col space-y-1 mt-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.key}
                            to={subItem.href}
                            className="px-4 py-1.5 text-sm text-foreground/70 hover:text-primary hover:bg-accent/5 rounded-lg transition-all"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {t(`navigation.submenu.${item.key}.${subItem.key}`)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.key}
                    to={item.href!}
                    className="px-4 py-2 text-primary hover:text-accent hover:bg-accent/5 rounded-lg transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(`navigation.menu.${item.key}`)}
                  </Link>
                );
              })}
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