import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const SUPPORTED_LANGUAGES = [
  { code: "ru", labelKey: "navigation.language.ru" },
  { code: "en", labelKey: "navigation.language.en" }
] as const;

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language ?? "ru";

  const handleChange = useCallback(
    async (next: string) => {
      if (next === currentLanguage) return;
      await i18n.changeLanguage(next);
    },
    [currentLanguage, i18n]
  );

  return (
    <div
      role="group"
      aria-label={t("navigation.language.label")}
      className="inline-flex items-center rounded-full border border-border bg-white/70 backdrop-blur px-1 py-0.5 shadow-inner"
    >
      {SUPPORTED_LANGUAGES.map(({ code, labelKey }) => {
        const isActive = code === currentLanguage;
        return (
          <button
            key={code}
            type="button"
            onClick={() => handleChange(code)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isActive
                ? "bg-primary text-white focus-visible:ring-primary"
                : "text-primary hover:bg-primary/10 focus-visible:ring-primary/40"
            }`}
            aria-pressed={isActive}
          >
            {t(labelKey)}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
