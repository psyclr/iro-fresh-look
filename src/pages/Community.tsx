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
            <p className="text-lg text-muted-foreground mb-8">
              Иудейская община Беларуси объединяет верующих по всей стране, создавая пространство для духовного роста и взаимной поддержки.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Минск</h3>
                <p className="text-muted-foreground mb-2">Община «Бейс Исроэль»</p>
                <p className="text-sm text-muted-foreground mb-1">Председатель: Игорь Карпелев</p>
                <p className="text-sm text-primary">+375 (29) 158-57-02</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Брест</h3>
                <p className="text-muted-foreground mb-2">Община «Эмуна»</p>
                <p className="text-sm text-muted-foreground mb-1">Председатель: Борис Брук</p>
                <p className="text-sm text-primary">+375 (29) 635-51-53</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Орша</h3>
                <p className="text-muted-foreground mb-2">Община «Хевра Тегелим»</p>
                <p className="text-sm text-muted-foreground mb-1">Председатель: Александр Розенберг</p>
                <p className="text-sm text-primary">+375 (33) 322-96-90</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Общины по регионам</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Минская область</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Быхов</li>
                    <li>• Молодечно</li>
                    <li>• Слуцк</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Гомельская область</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Гомель</li>
                    <li>• Мозырь</li>
                    <li>• Калинковичи</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Другие регионы</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Бобруйск</li>
                    <li>• Могилёв</li>
                    <li>• Полоцк</li>
                    <li>• Климовичи</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Наша деятельность</h3>
              <p className="text-muted-foreground">
                Мы организуем семинары, лекции и празднования, оказываем гуманитарную помощь многодетным семьям и людям с ограниченными возможностями. 
                Каждая община поддерживает традиции и помогает сохранить еврейское наследие для будущих поколений.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;