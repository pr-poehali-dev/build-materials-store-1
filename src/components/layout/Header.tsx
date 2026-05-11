import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { to: "/", label: "Главная" },
  { to: "/catalog", label: "Каталог" },
  { to: "/promotions", label: "Акции" },
  { to: "/delivery", label: "Доставка" },
  { to: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-dark border-b border-brand-charcoal shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-brand-charcoal/50">
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="tel:+78001234567" className="flex items-center gap-1.5 hover:text-brand-orange transition-colors">
              <Icon name="Phone" size={14} />
              <span>8 800 123-45-67</span>
              <span className="text-xs text-green-400 ml-1">бесплатно</span>
            </a>
            <span className="hidden md:block">Пн–Сб: 8:00–20:00</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="hidden md:flex items-center gap-1">
              <Icon name="MapPin" size={14} />
              Москва
            </span>
            <a href="#callback" className="text-brand-orange hover:text-brand-orange-light transition-colors font-medium">
              Перезвоним за 30 сек
            </a>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center gap-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-brand-orange rounded flex items-center justify-center">
              <Icon name="Hammer" size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-oswald text-lg font-bold leading-tight tracking-wide">СТРОЙБАЗА</div>
              <div className="text-gray-400 text-xs leading-tight">строительные материалы</div>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по товарам, артикулу, бренду..."
                className="w-full bg-brand-charcoal text-white placeholder-gray-500 rounded-lg pl-4 pr-12 py-3 text-sm border border-brand-gray focus:border-brand-orange focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-brand-orange hover:bg-brand-orange-light rounded-r-lg flex items-center justify-center transition-colors"
              >
                <Icon name="Search" size={18} className="text-white" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-white px-4 py-3 rounded-lg transition-colors font-medium text-sm"
            >
              <Icon name="ShoppingCart" size={18} />
              <span className="hidden sm:block">Корзина</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className={`${menuOpen ? "block" : "hidden"} md:block pb-3`}>
          <ul className="flex flex-col md:flex-row md:items-center gap-1 md:gap-0">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-brand-orange hover:bg-brand-charcoal rounded-lg transition-all font-medium"
                >
                  {link.label}
                  {link.label === "Акции" && (
                    <span className="ml-2 bg-brand-orange text-white text-xs px-1.5 py-0.5 rounded font-bold">HOT</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
