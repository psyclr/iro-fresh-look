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
            <p className="text-lg text-muted-foreground mb-8">
              Иудаизм - древняя монотеистическая религия, основанная на учении Торы и традициях еврейского народа.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg border text-center">
                <h3 className="text-xl font-semibold mb-3 text-primary">Совет раввина</h3>
                <p className="text-muted-foreground">Духовное руководство и консультации по вопросам религиозной практики</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border text-center">
                <h3 className="text-xl font-semibold mb-3 text-primary">Праздники</h3>
                <p className="text-muted-foreground">Календарь иудейских праздников и их значение в религиозной традиции</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border text-center">
                <h3 className="text-xl font-semibold mb-3 text-primary">Традиции</h3>
                <p className="text-muted-foreground">Обряды, обычаи и практики, передаваемые из поколения в поколение</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Основы веры</h2>
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-4">
                  Иудаизм основан на вере в единого Бога и соблюдении заповедей Торы. Это не только религия, 
                  но и образ жизни, объединяющий духовные, этические и культурные традиции еврейского народа.
                </p>
                <p className="text-muted-foreground">
                  В нашем объединении мы изучаем священные тексты, соблюдаем праздники и поддерживаем 
                  связь с многовековыми традициями наших предков.
                </p>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Религиозная жизнь общины</h3>
              <p className="text-muted-foreground">
                Мы проводим регулярные богослужения, изучаем Тору, отмечаем праздники и жизненные циклы согласно 
                иудейским традициям. Наша община открыта для всех, кто стремится к духовному росту и изучению иудаизма.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Judaism;