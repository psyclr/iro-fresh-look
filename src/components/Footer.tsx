const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Organization Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary text-xs font-bold">IRO</span>
              </div>
              <div>
                <h3 className="font-bold">Иудейское Религиозное Объединение</h3>
                <p className="text-sm text-white/80">в Республике Беларусь</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Сохраняя традиции и строя будущее еврейской общины в Беларуси
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#community" className="text-white/80 hover:text-accent-light transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#events" className="text-white/80 hover:text-accent-light transition-colors">
                  События
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white/80 hover:text-accent-light transition-colors">
                  Проекты
                </a>
              </li>
              <li>
                <a href="#contacts" className="text-white/80 hover:text-accent-light transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-sm text-white/80">
              <p>Минск, Республика Беларусь</p>
              <p>Email: info@iro.by</p>
              <p>Тел: +375 (XX) XXX-XX-XX</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-white/60">
            © 2024 Иудейское Религиозное Объединение в Республике Беларусь. Все права защищены.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-white/40">Создано с</span>
            <span className="text-accent-light text-xs">❤️</span>
            <span className="text-xs text-white/40">для общины</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;