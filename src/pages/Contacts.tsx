import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contacts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Контакты</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Свяжитесь с нами для получения информации о деятельности общины или участии в мероприятиях.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Адрес</h3>
                <p className="text-muted-foreground">г. Минск, ул. Примерная, 1</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Связь</h3>
                <p className="text-muted-foreground">info@iro.by</p>
                <p className="text-muted-foreground">+375 (17) 123-45-67</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;