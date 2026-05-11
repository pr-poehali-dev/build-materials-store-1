import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, island } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-float" : "bg-[var(--ios-bg)]"
        }`}
      >
        {/* Dynamic Island notification */}
        {island && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-3 z-50 ${
              island.visible ? "island-enter" : "island-exit"
            }`}
          >
            <div className="flex items-center gap-3 bg-[var(--ios-black)] text-white rounded-2xl px-4 py-2.5 shadow-2xl min-w-[260px]">
              <img
                src={island.product.image}
                alt=""
                className="w-9 h-9 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-[var(--ios-gray4)] font-semibold uppercase tracking-wider">
                  Добавлено в корзину
                </div>
                <div className="text-sm font-bold truncate leading-tight mt-0.5">
                  {island.product.name}
                </div>
              </div>
              <Link
                to="/cart"
                className="btn-yellow text-xs font-bold px-3 py-1.5 rounded-xl flex-shrink-0 tappable"
              >
                Корзина
              </Link>
            </div>
          </div>
        )}

        <div className="container mx-auto">
          {/* Top micro-bar */}
          <div className="flex items-center justify-between py-2 border-b border-[var(--ios-gray6)]">
            <div className="flex items-center gap-5 text-xs text-[var(--ios-gray3)] font-medium">
              <a
                href="tel:+78001234567"
                className="flex items-center gap-1.5 hover:text-[var(--ios-black)] transition-colors tappable"
              >
                <Icon name="Phone" size={12} />
                8 800 123-45-67
                <span className="text-[var(--ios-green)] font-semibold">бесплатно</span>
              </a>
              <span className="hidden md:block">Пн–Сб: 8:00–20:00</span>
            </div>
            <button className="text-xs font-semibold text-[var(--ios-yellow)] hover:opacity-70 transition-opacity tappable">
              Перезвоним за 30 сек →
            </button>
          </div>

          {/* Main row */}
          <div className="flex items-center gap-4 py-3">
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 tappable">
              <div className="w-9 h-9 bg-[var(--ios-black)] rounded-xl flex items-center justify-center shadow-float">
                <Icon name="Hammer" size={18} className="text-[var(--ios-yellow)]" />
              </div>
              <div className="hidden sm:block">
                <div
                  style={{ fontFamily: "Manrope, sans-serif", letterSpacing: "-0.04em" }}
                  className="text-[var(--ios-black)] text-[17px] font-extrabold leading-tight"
                >
                  СТРОЙБАЗА
                </div>
                <div className="text-[var(--ios-gray3)] text-[10px] font-semibold tracking-wide uppercase">
                  стройматериалы
                </div>
              </div>
            </Link>

            <form onSubmit={handleSearch} className="flex-1 max-w-xl">
              <div className="relative">
                <Icon
                  name="Search"
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ios-gray3)] pointer-events-none"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Поиск товаров, артикулов, брендов…"
                  className="w-full bg-[var(--ios-gray6)] text-[var(--ios-black)] placeholder-[var(--ios-gray3)] rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--ios-yellow)] transition-all"
                />
              </div>
            </form>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-[var(--ios-black)] text-white px-4 py-3 rounded-xl font-bold text-sm tappable"
            >
              <Icon name="ShoppingBag" size={17} />
              <span className="hidden sm:block">Корзина</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--ios-yellow)] text-[var(--ios-black)] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-yellow">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden text-[var(--ios-gray2)] tappable"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>

          {/* Nav */}
          <nav className={`${menuOpen ? "block" : "hidden"} md:block pb-2`}>
            <ul className="flex flex-col md:flex-row md:items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all tappable ${
                        active
                          ? "bg-[var(--ios-black)] text-[var(--ios-yellow)]"
                          : "text-[var(--ios-gray2)] hover:text-[var(--ios-black)] hover:bg-[var(--ios-gray6)]"
                      }`}
                    >
                      {link.label}
                      {link.label === "Акции" && (
                        <span className="bg-[var(--ios-yellow)] text-[var(--ios-black)] text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                          HOT
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-overlay z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
