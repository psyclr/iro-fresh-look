import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Heritage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Наследие</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Богатое культурное и духовное наследие еврейского народа в Беларуси насчитывает многие века.
            </p>
            <p className="text-lg text-muted-foreground">
              Мы работаем над сохранением исторических памятников, традиций и передачей знаний молодому поколению.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Heritage;