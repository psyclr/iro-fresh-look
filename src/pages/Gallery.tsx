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
            <p className="text-lg text-muted-foreground mb-6">
              Фотогалерея событий, мероприятий и важных моментов из жизни нашей общины.
            </p>
            <p className="text-lg text-muted-foreground">
              Здесь собраны памятные снимки праздников, церемоний и повседневной жизни общины.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;