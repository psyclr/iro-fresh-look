import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'ОБЩИНА', href: '/community' },
    { label: 'ИУДАИЗМ', href: '/judaism' },
    { label: 'НАСЛЕДИЕ', href: '/heritage' },
    { label: 'ПРОЕКТЫ', href: '/projects' },
    { label: 'АФИША', href: '/events' },
    { label: 'СОБЫТИЯ', href: '/news' },
    { label: 'ГАЛЕРЕЯ', href: '/gallery' },
    { label: 'КОНТАКТЫ', href: '/contacts' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Логотип ИРО */}
          <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <div className="flex-shrink-0">
              <img src="/src/assets/iro-logo.png" alt="IRO Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
            </div>
            <div className="hidden sm:block min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-primary leading-tight">Иудейское Религиозное Объединение</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">в Республике Беларусь</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="nav-link text-sm font-medium"
              >
                {item.label}
              </Link>
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
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-4 py-2 text-primary hover:text-accent hover:bg-accent/5 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;