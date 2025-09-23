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
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Центральный офис</h3>
                <p className="text-muted-foreground mb-2"><strong>Адрес:</strong></p>
                <p className="text-muted-foreground mb-4">220002, г. Минск, ул. Даумана 13Б</p>
                <p className="text-muted-foreground mb-2"><strong>Контакты:</strong></p>
                <p className="text-muted-foreground">Email: iro13b@gmail.com</p>
                <p className="text-muted-foreground">Телефон: +375 (44) 555-06-83</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Режим работы</h3>
                <p className="text-muted-foreground mb-2">Понедельник - Пятница: 9:00 - 18:00</p>
                <p className="text-muted-foreground mb-2">Суббота: По расписанию богослужений</p>
                <p className="text-muted-foreground mb-4">Воскресенье: Выходной</p>
                <p className="text-sm text-muted-foreground">
                  В праздничные дни режим работы может изменяться
                </p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border mt-8">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Контакты общин по регионам</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">Минск</h4>
                  <p className="text-sm text-muted-foreground mb-1">Община «Бейс Исроэль»</p>
                  <p className="text-sm text-muted-foreground mb-1">Председатель: Игорь Карпелев</p>
                  <p className="text-sm text-primary">+375 (29) 158-57-02</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">Брест</h4>
                  <p className="text-sm text-muted-foreground mb-1">Община «Эмуна»</p>
                  <p className="text-sm text-muted-foreground mb-1">Председатель: Борис Брук</p>
                  <p className="text-sm text-primary">+375 (29) 635-51-53</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">Орша</h4>
                  <p className="text-sm text-muted-foreground mb-1">Община «Хевра Тегелим»</p>
                  <p className="text-sm text-muted-foreground mb-1">Председатель: Александр Розенберг</p>
                  <p className="text-sm text-primary">+375 (33) 322-96-90</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Примечание:</strong> Для связи с общинами в других городах (Гомель, Могилёв, Бобруйск, 
                  Полоцк и др.) обращайтесь в центральный офис.
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

export default Contacts;