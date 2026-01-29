import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-8 pb-4 bg-white z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
            {t('hero.compact.title', 'Иудейское Религиозное Объединение')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t('hero.compact.subtitle', 'Объединяем еврейские общины Беларуси, сохраняем традиции и развиваем культурное наследие нашего народа')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;