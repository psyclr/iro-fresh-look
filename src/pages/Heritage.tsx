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
            <p className="text-lg text-muted-foreground mb-8">
              Богатое культурное и духовное наследие еврейского народа в Беларуси насчитывает многие века. 
              Мы работаем над сохранением исторических памятников, традиций и передачей знаний молодому поколению.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Виртуальные туры</h3>
                <p className="text-muted-foreground">
                  Исследуйте исторические еврейские места Беларуси через интерактивные виртуальные экскурсии, 
                  которые позволяют познакомиться с богатым наследием не выходя из дома.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Проект «Беларусь еврейская»</h3>
                <p className="text-muted-foreground">
                  Комплексный проект по документированию и сохранению еврейского наследия на территории 
                  Беларуси, включающий исследования, архивную работу и образовательные программы.
                </p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Еврейские кладбища</h2>
              <p className="text-muted-foreground mb-4">
                Мы ведём работу по сохранению и восстановлению еврейских кладбищ по всей Беларуси. 
                Эти священные места являются важной частью нашего исторического наследия.
              </p>
              <p className="text-muted-foreground">
                Наша деятельность включает документирование надгробий, установку мемориальных знаков 
                и создание аллей памяти для сохранения памяти о прошлых поколениях.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Лапидарий в Бресте</h2>
              <p className="text-muted-foreground">
                Мы реализуем уникальный проект строительства первого еврейского лапидария в Бресте - 
                музея под открытым небом, где будут представлены исторические надгробия и памятники 
                еврейской культуры региона.
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Центр изучения еврейского наследия</h3>
              <p className="text-muted-foreground">
                Наш центр проводит исследования, собирает архивные материалы и организует образовательные 
                программы для изучения и сохранения еврейского культурного наследия Беларуси.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Heritage;