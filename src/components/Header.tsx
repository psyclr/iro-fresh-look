import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'ОБЩИНА', href: '#community' },
    { label: 'ИУДАИЗМ', href: '#judaism' },
    { label: 'НАСЛЕДИЕ', href: '#heritage' },
    { label: 'ПРОЕКТЫ', href: '#projects' },
    { label: 'АФИША', href: '#events' },
    { label: 'СОБЫТИЯ', href: '#news' },
    { label: 'ГАЛЕРЕЯ', href: '#gallery' },
    { label: 'КОНТАКТЫ', href: '#contacts' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo placeholder - будет заменен на оригинальный логотип */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary text-xs font-bold">IRO</span>
              </div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-primary">Иудейское Религиозное Объединение</h1>
              <p className="text-sm text-muted-foreground">в Республике Беларусь</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="ml-4 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
              ENG
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-primary hover:text-accent transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-border mt-4">
            <div className="flex flex-col space-y-2 pt-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-primary hover:text-accent hover:bg-accent/5 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;