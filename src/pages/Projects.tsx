import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Проекты</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              Наши проекты направлены на развитие общины, сохранение традиций и поддержку нуждающихся. 
              Мы реализуем различные инициативы в области культуры, образования и социальной помощи.
            </p>

            <div className="space-y-8">
              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Газета «Берега»</h2>
                <p className="text-muted-foreground mb-4">
                  Наше регулярное издание освещает жизнь еврейской общины Беларуси, публикует исторические 
                  материалы, рассказывает о традициях и современных событиях общинной жизни.
                </p>
                <p className="text-muted-foreground">
                  Газета является важным связующим звеном между общинами различных городов и регионов страны.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Лапидарий в Бресте</h2>
                <p className="text-muted-foreground mb-4">
                  Строительство первого еврейского лапидария в Бресте - это масштабный проект по созданию 
                  музея под открытым небом, где будут представлены исторические надгробия и памятники.
                </p>
                <p className="text-muted-foreground">
                  Проект направлен на сохранение материального наследия еврейской общины региона для будущих поколений.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Центр изучения еврейского наследия</h2>
                <p className="text-muted-foreground">
                  Исследовательский и образовательный центр, который занимается сбором, систематизацией и 
                  изучением материалов о еврейской истории и культуре в Беларуси. Центр проводит научные 
                  конференции, семинары и издаёт научные публикации.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Гуманитарная помощь</h2>
                <p className="text-muted-foreground mb-4">
                  Ежегодно мы оказываем поддержку многодетным семьям и людям с ограниченными возможностями. 
                  Наша программа включает материальную помощь, продуктовые наборы и социальную поддержку.
                </p>
                <p className="text-muted-foreground">
                  Мы верим, что взаимопомощь и забота о ближних - основа крепкой общины.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Архивы</h2>
                <p className="text-muted-foreground">
                  Мы ведём работу по сбору, оцифровке и сохранению архивных документов, фотографий и 
                  других материалов, связанных с историей еврейских общин Беларуси. Этот проект помогает 
                  сохранить память о прошлом и обеспечить доступ к историческим материалам для исследователей.
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

export default Projects;