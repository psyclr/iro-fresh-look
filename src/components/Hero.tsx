import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#mission');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-accent">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t('hero.titleLine1')}
            <span className="block text-accent-light mt-2">
              {t('hero.titleHighlight')}
            </span>
            <span className="block text-2xl md:text-3xl mt-2 font-normal">
              {t('hero.titleLine3')}
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={scrollToNextSection}
              className="btn-primary hover:transform hover:scale-105 transition-all duration-300"
            >
              {t('hero.cta')}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>;
};
export default Hero;