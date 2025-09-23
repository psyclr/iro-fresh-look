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
            <p className="text-lg text-muted-foreground mb-6">
              Наши проекты направлены на развитие общины, сохранение традиций и поддержку нуждающихся.
            </p>
            <p className="text-lg text-muted-foreground">
              Здесь вы найдете информацию о текущих инициативах и возможностях участия.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;