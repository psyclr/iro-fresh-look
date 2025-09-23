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
            <p className="text-lg text-muted-foreground mb-8">
              Новости и актуальные события из жизни иудейской общины Беларуси. 
              Здесь вы найдете свежие новости, репортажи и важные объявления.
            </p>

            <div className="space-y-6">
              <article className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3 text-primary">
                  Презентация книги «Анна Мачиз: свидетельства трагедии и борьбы в Минском гетто 1941–1943 гг.»
                </h2>
                <p className="text-sm text-muted-foreground mb-3">Недавно</p>
                <p className="text-muted-foreground">
                  Состоялась презентация важного исторического исследования, посвящённого трагическим событиям 
                  в Минском гетто. Книга содержит уникальные свидетельства и документы того времени.
                </p>
              </article>

              <article className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3 text-primary">XXVIII конференция объединения</h2>
                <p className="text-sm text-muted-foreground mb-3">Недавно</p>
                <p className="text-muted-foreground">
                  Прошла ежегодная конференция Иудейского религиозного объединения, где обсуждались важные 
                  вопросы развития общин, планы на будущий год и текущие проекты организации.
                </p>
              </article>

              <article className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3 text-primary">Празднование Хануки</h2>
                <p className="text-sm text-muted-foreground mb-3">Декабрь</p>
                <p className="text-muted-foreground">
                  Во всех общинах страны прошли торжественные мероприятия, посвящённые празднику Хануки. 
                  Были организованы зажигания свечей, традиционные угощения и культурные программы для детей и взрослых.
                </p>
              </article>

              <article className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3 text-primary">Митинг-реквием памяти жертв Холокоста</h2>
                <p className="text-sm text-muted-foreground mb-3">Январь</p>
                <p className="text-muted-foreground">
                  В Международный день памяти жертв Холокоста прошёл торжественный митинг-реквием. 
                  Мероприятие было посвящено сохранению памяти о трагических событиях и важности борьбы 
                  с антисемитизмом в современном мире.
                </p>
              </article>

              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Регулярные публикации</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Газета «Берега»</h3>
                    <p className="text-muted-foreground text-sm">
                      Регулярное издание нашего объединения освещает жизнь общин, публикует исторические материалы 
                      и рассказывает о традициях еврейского народа.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Научные публикации</h3>
                    <p className="text-muted-foreground text-sm">
                      Центр изучения еврейского наследия регулярно издаёт научные работы и исследования 
                      по истории и культуре евреев в Беларуси.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Подписка на новости</h3>
                <p className="text-muted-foreground">
                  Чтобы быть в курсе всех событий и новостей общины, свяжитесь с нами через контактную форму 
                  или подпишитесь на рассылку газеты «Берега».
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

export default News;