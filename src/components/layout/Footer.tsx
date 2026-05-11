import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer style={{ background: "var(--ios-black)" }} className="mt-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--ios-yellow)" }}
              >
                <Icon name="Hammer" size={18} style={{ color: "var(--ios-black)" }} />
              </div>
              <div>
                <div
                  className="font-extrabold text-white text-[17px]"
                  style={{ letterSpacing: "-0.04em", fontFamily: "Manrope, sans-serif" }}
                >
                  СТРОЙБАЗА
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--ios-gray3)" }}>
                  стройматериалы
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ios-gray3)" }}>
              Профессиональные стройматериалы и инструмент для прорабов и мастеров.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <div className="section-eyebrow mb-4" style={{ color: "var(--ios-gray3)" }}>Каталог</div>
            <ul className="space-y-2.5">
              {["Сухие смеси", "Пиломатериалы", "Инструмент", "Сантехника", "Электрика"].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/catalog"
                    className="text-sm font-medium transition-colors hover:opacity-60"
                    style={{ color: "var(--ios-gray4)" }}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <div className="section-eyebrow mb-4" style={{ color: "var(--ios-gray3)" }}>Информация</div>
            <ul className="space-y-2.5">
              {[
                { to: "/delivery", label: "Доставка и оплата" },
                { to: "/promotions", label: "Акции" },
                { to: "/contacts", label: "Контакты" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-medium transition-colors hover:opacity-60"
                    style={{ color: "var(--ios-gray4)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <div className="section-eyebrow mb-4" style={{ color: "var(--ios-gray3)" }}>Контакты</div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Icon name="Phone" size={15} style={{ color: "var(--ios-yellow)", marginTop: 2 }} />
                <div>
                  <a
                    href="tel:+78001234567"
                    className="text-white font-bold text-sm hover:opacity-70 transition-opacity"
                  >
                    8 800 123-45-67
                  </a>
                  <div className="text-xs mt-0.5" style={{ color: "var(--ios-gray3)" }}>бесплатно по России</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="MapPin" size={15} style={{ color: "var(--ios-yellow)", marginTop: 2 }} />
                <span className="text-sm" style={{ color: "var(--ios-gray4)" }}>Москва, Каширское ш., 12</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Clock" size={15} style={{ color: "var(--ios-yellow)", marginTop: 2 }} />
                <span className="text-sm" style={{ color: "var(--ios-gray4)" }}>
                  Пн–Сб: 8:00–20:00<br />Вс: 9:00–17:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--ios-gray1)" }}
        >
          <p className="text-xs font-medium" style={{ color: "var(--ios-gray2)" }}>
            © 2025 СТРОЙБАЗА. Все права защищены.
          </p>
          <p className="text-xs" style={{ color: "var(--ios-gray2)" }}>
            ИНН 7701234567 · ОГРН 1027700000001
          </p>
        </div>
      </div>
    </footer>
  );
}
