import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-charcoal mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-orange rounded flex items-center justify-center">
                <Icon name="Hammer" size={20} className="text-white" />
              </div>
              <div>
                <div className="text-white font-oswald text-lg font-bold">СТРОЙБАЗА</div>
                <div className="text-gray-500 text-xs">строительные материалы</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Профессиональные строительные материалы и инструмент для прорабов и частных мастеров.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-brand-charcoal hover:bg-brand-orange rounded-lg flex items-center justify-center transition-colors">
                <Icon name="MessageCircle" size={16} className="text-gray-400" />
              </a>
              <a href="#" className="w-9 h-9 bg-brand-charcoal hover:bg-brand-orange rounded-lg flex items-center justify-center transition-colors">
                <Icon name="Send" size={16} className="text-gray-400" />
              </a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-white font-oswald font-bold uppercase tracking-wide mb-4">Каталог</h4>
            <ul className="space-y-2">
              {["Сухие смеси", "Пиломатериалы", "Инструмент", "Сантехника", "Электрика", "Крепёж"].map((cat) => (
                <li key={cat}>
                  <Link to="/catalog" className="text-gray-400 hover:text-brand-orange text-sm transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-oswald font-bold uppercase tracking-wide mb-4">Информация</h4>
            <ul className="space-y-2">
              {[
                { to: "/delivery", label: "Доставка и оплата" },
                { to: "/promotions", label: "Акции и скидки" },
                { to: "/contacts", label: "Контакты" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-brand-orange text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-oswald font-bold uppercase tracking-wide mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Icon name="Phone" size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+78001234567" className="text-white font-bold hover:text-brand-orange transition-colors">
                    8 800 123-45-67
                  </a>
                  <div className="text-gray-500 text-xs">бесплатно по России</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Москва, Каширское ш., 12</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Clock" size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Пн–Сб: 8:00–20:00<br />Вс: 9:00–17:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-charcoal mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2025 СТРОЙБАЗА. Все права защищены.</p>
          <p className="text-gray-600 text-xs">ИНН 7701234567 · ОГРН 1027700000001</p>
        </div>
      </div>
    </footer>
  );
}
