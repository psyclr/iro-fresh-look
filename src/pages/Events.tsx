import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Афиша</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Календарь предстоящих мероприятий, праздников и богослужений нашей общины.
            </p>
            <p className="text-lg text-muted-foreground">
              Следите за обновлениями, чтобы не пропустить важные события.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;