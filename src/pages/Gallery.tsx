import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Галерея</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              Фотогалерея событий, мероприятий и важных моментов из жизни нашей общины. 
              Здесь собраны памятные снимки праздников, церемоний и повседневной жизни общины.
            </p>

            <div className="space-y-8">
              <div className="bg-card p-8 rounded-lg border text-center">
                <div className="w-32 h-32 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Праздничные мероприятия</h2>
                <p className="text-muted-foreground">
                  Фотографии с празднования традиционных иудейских праздников: Ханука, Пурим, Песах, 
                  Рош ха-Шана и других важных дат в жизни общины.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border">
                  <div className="w-full h-32 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Синагоги и общины</h3>
                  <p className="text-muted-foreground">
                    Фотографии синагог, общинных центров и религиозных церемоний в различных городах Беларуси.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <div className="w-full h-32 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Образовательные мероприятия</h3>
                  <p className="text-muted-foreground">
                    Снимки семинаров, лекций, изучения Торы и других образовательных программ для детей и взрослых.
                  </p>
                </div>
              </div>

              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Исторические проекты</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-10 h-10 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Лапидарий в Бресте</h4>
                    <p className="text-sm text-muted-foreground">Строительство первого еврейского лапидария</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-10 h-10 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Еврейские кладбища</h4>
                    <p className="text-sm text-muted-foreground">Восстановление и документирование</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-10 h-10 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Мемориальные места</h4>
                    <p className="text-sm text-muted-foreground">Установка памятных знаков</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Поделитесь своими фотографиями</h3>
                <p className="text-muted-foreground">
                  Если у вас есть фотографии с мероприятий общины или исторические снимки, которыми вы хотели бы 
                  поделиться, свяжитесь с нами через контактную форму. Вместе мы сохраним память о важных моментах 
                  нашей общинной жизни.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;