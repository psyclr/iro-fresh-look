import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Община</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Иудейская община Беларуси объединяет верующих по всей стране, создавая пространство для духовного роста и взаимной поддержки.
            </p>
            <p className="text-lg text-muted-foreground">
              Мы поддерживаем традиции, организуем религиозные мероприятия и помогаем сохранить еврейское наследие для будущих поколений.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;