import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-6 bg-gradient-to-r from-background via-white to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
            {t('hero.compact.title', 'Иудейское Религиозное Объединение')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('hero.compact.subtitle', 'Объединяем еврейские общины Беларуси, сохраняем традиции и развиваем культурное наследие нашего народа')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;