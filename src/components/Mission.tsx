const Mission = () => {
  return (
    <section id="mission" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title text-center">Наша миссия</h2>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-medium mb-16">
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
              Сохранять и передавать иудейские традиции, обеспечивая духовное и культурное 
              развитие еврейской общины в Республике Беларусь.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-enhanced p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Обучение и просвещение</h3>
              <p className="text-muted-foreground text-sm">
                Регулярные занятия, семинары и лекции о иудаизме, его истории и культуре
              </p>
            </div>

            <div className="card-enhanced p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Религиозные события</h3>
              <p className="text-muted-foreground text-sm">
                Празднование шаббата, праздников и особенных моментов в иудейском календаре
              </p>
            </div>

            <div className="card-enhanced p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Сообщество</h3>
              <p className="text-muted-foreground text-sm">
                Организация мероприятий для еврейских семей, молодёжи и пожилых людей
              </p>
            </div>

            <div className="card-enhanced p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Культурные инициативы</h3>
              <p className="text-muted-foreground text-sm">
                Поддержка культурных мероприятий, выставок и концертов, посвященных иудейской культуре
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;