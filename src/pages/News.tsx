import Header from '@/components/Header';
import Footer from '@/components/Footer';

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">События</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Новости и актуальные события из жизни иудейской общины Беларуси.
            </p>
            <p className="text-lg text-muted-foreground">
              Здесь вы найдете свежие новости, репортажи и важные объявления.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;