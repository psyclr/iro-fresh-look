import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Judaism = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Иудаизм</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Иудаизм - древняя монотеистическая религия, основанная на учении Торы и традициях еврейского народа.
            </p>
            <p className="text-lg text-muted-foreground">
              Здесь вы можете узнать больше о основах иудейской веры, традициях и обрядах.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Judaism;