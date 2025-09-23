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
            <p className="text-lg text-muted-foreground mb-8">
              Календарь предстоящих мероприятий, праздников и богослужений нашей общины. 
              Следите за обновлениями, чтобы не пропустить важные события.
            </p>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Регулярные мероприятия</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="font-medium">Субботние богослужения</span>
                    <span className="text-sm text-muted-foreground">Каждую субботу</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="font-medium">Семинары и лекции</span>
                    <span className="text-sm text-muted-foreground">Еженедельно</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="font-medium">Изучение Торы</span>
                    <span className="text-sm text-muted-foreground">По вечерам</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Праздничный календарь</h3>
                <p className="text-muted-foreground mb-4">
                  Мы отмечаем все традиционные иудейские праздники, включая Рош ха-Шана, Йом Кипур, 
                  Суккот, Хануку, Пурим и Песах. Каждый праздник сопровождается особыми богослужениями 
                  и общинными мероприятиями.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Ханука</strong> - Праздник огней, отмечается восемь дней с зажиганием свечей 
                    и традиционными играми и угощениями.
                  </p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Специальные события</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Конференции объединения</h4>
                    <p className="text-sm text-muted-foreground">
                      Ежегодные конференции для обсуждения важных вопросов развития общин и планирования деятельности
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Презентации книг</h4>
                    <p className="text-sm text-muted-foreground">
                      Мероприятия, посвящённые представлению новых изданий по еврейской истории и культуре
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Митинги-реквиемы</h4>
                    <p className="text-sm text-muted-foreground">
                      Памятные мероприятия в честь жертв Холокоста и других трагических событий еврейской истории
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Как участвовать</h3>
                <p className="text-muted-foreground">
                  Все мероприятия открыты для членов общины и гостей. Для получения подробной информации 
                  о времени и месте проведения обращайтесь к руководству вашей местной общины или в центральный офис.
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

export default Events;