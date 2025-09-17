const Impact = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Support Section */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="section-title mb-6">Поддерживаем</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-card p-6 rounded-xl shadow-soft">
                  <div className="text-3xl font-bold text-primary mb-2">15</div>
                  <p className="text-muted-foreground">
                    еврейских общин по всей Беларуси, реализуя совместные проекты
                  </p>
                </div>
                
                <div className="bg-gradient-card p-6 rounded-xl shadow-soft">
                  <div className="text-3xl font-bold text-accent mb-2">Ежегодно</div>
                  <p className="text-muted-foreground">
                    оказываем гуманитарную помощь еврейскому населению, многодетным, людям с ограниченными возможностями
                  </p>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-accent-light rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              
              <h2 className="section-title mb-6">Помогаем</h2>
              
              <div className="bg-gradient-card p-8 rounded-xl shadow-soft">
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Ежегодно оказываем гуманитарную помощь еврейскому населению, 
                  многодетным, людям с ограниченными возможностями.
                </p>
                
                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold text-primary mb-4">Присоединяйтесь к нам!</h3>
                  <p className="text-muted-foreground mb-6">
                    Независимо от того, ищете ли вы место для молитвы, желаете узнать 
                    больше о своем культурном наследии или просто хотите стать частью 
                    теплого и приветливого сообщества, вы всегда найдете у нас дом.
                  </p>
                  
                  <button className="accent-highlight">
                    Связаться с нами
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;