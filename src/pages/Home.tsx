import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/shared/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/data/products";

const HERO_IMG = "https://cdn.poehali.dev/projects/62df8b64-52d2-4caa-b427-9351100f1ee1/files/b8e41b8c-03e1-49a6-aea3-47c73ee626ec.jpg";

const TRUST = [
  { icon: "ShieldCheck", title: "Гарантия качества", desc: "Сертифицированные товары" },
  { icon: "Truck", title: "Доставка по Москве", desc: "Газель или Манипулятор" },
  { icon: "RotateCcw", title: "Возврат 14 дней", desc: "Без лишних вопросов" },
  { icon: "HeadphonesIcon", title: "Поддержка 7/7", desc: "Эксперты ответят быстро" },
];

const PROMO = PRODUCTS.filter((p) => p.discount);
const POPULAR = PRODUCTS.slice(0, 6);

export default function Home() {
  return (
    <main style={{ background: "var(--ios-bg)" }}>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ minHeight: 540 }}>
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${HERO_IMG})`, filter: "brightness(0.35)" }}
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative container mx-auto px-4 pt-20 pb-28 flex flex-col items-start">
          {/* Eyebrow badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 animate-fade-up"
            style={{ background: "rgba(255,214,10,0.15)", border: "1px solid rgba(255,214,10,0.4)" }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--ios-yellow)] animate-pulse" />
            <span className="text-xs font-bold text-[var(--ios-yellow)] tracking-wider uppercase">
              Более 5 000 товаров в наличии
            </span>
          </div>

          <h1
            className="text-white font-extrabold mb-5 animate-fade-up delay-100"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: 640,
            }}
          >
            Материалы для{" "}
            <span style={{ color: "var(--ios-yellow)" }}>настоящего</span>{" "}
            строителя
          </h1>

          <p
            className="text-lg mb-8 animate-fade-up delay-200"
            style={{ color: "rgba(255,255,255,0.65)", maxWidth: 460, lineHeight: 1.6 }}
          >
            Профессиональный инструмент и стройматериалы. Доставка газелью или манипулятором.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-300">
            <Link
              to="/catalog"
              className="btn-yellow tappable flex items-center gap-2.5 px-8 py-4 text-base font-bold"
              style={{ borderRadius: 16 }}
            >
              <Icon name="Grid3X3" size={18} />
              Весь каталог
            </Link>
            <Link
              to="/promotions"
              className="tappable flex items-center gap-2.5 px-8 py-4 text-base font-bold text-white"
              style={{
                borderRadius: 16,
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.2)",
              }}
            >
              <Icon name="Percent" size={18} />
              Акции
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="absolute bottom-0 left-0 right-0 glass"
          style={{ borderRadius: 0 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { num: "5 000+", label: "товаров" },
                { num: "24 ч", label: "доставка" },
                { num: "8 лет", label: "на рынке" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-xl font-extrabold"
                    style={{ color: "var(--ios-yellow)", letterSpacing: "-0.03em" }}
                  >
                    {s.num}
                  </div>
                  <div className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="container mx-auto px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="section-eyebrow mb-1">Разделы</div>
            <h2
              className="text-3xl font-extrabold"
              style={{ color: "var(--ios-black)", letterSpacing: "-0.04em" }}
            >
              Категории
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-sm font-bold tappable"
            style={{ color: "var(--ios-yellow)" }}
          >
            Все →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.id}`}
              className="group card-float tappable flex flex-col items-center text-center p-4"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all"
                style={{ background: "var(--ios-yellow-dim)" }}
              >
                <Icon
                  name={cat.icon as "Package"}
                  size={22}
                  style={{ color: "var(--ios-black)" }}
                />
              </div>
              <span
                className="text-xs font-bold leading-tight"
                style={{ color: "var(--ios-black)" }}
              >
                {cat.name}
              </span>
              <span className="text-[10px] mt-1" style={{ color: "var(--ios-gray3)" }}>
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── HOT DEALS ─── */}
      {PROMO.length > 0 && (
        <section
          className="py-12 mt-6"
          style={{ background: "var(--ios-black)" }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-7">
              <div>
                <div
                  className="section-eyebrow mb-1"
                  style={{ color: "var(--ios-gray3)" }}
                >
                  Горячие предложения
                </div>
                <h2
                  className="text-3xl font-extrabold text-white"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  Акции{" "}
                  <span
                    className="text-sm font-extrabold px-2 py-1 rounded-full ml-1"
                    style={{ background: "var(--ios-yellow)", color: "var(--ios-black)" }}
                  >
                    HOT
                  </span>
                </h2>
              </div>
              <Link
                to="/promotions"
                className="text-sm font-bold tappable"
                style={{ color: "var(--ios-yellow)" }}
              >
                Все акции →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROMO.slice(0, 3).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── TRUST ─── */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST.map((item, i) => (
            <div
              key={item.title}
              className="card-float p-5 flex items-start gap-4 animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--ios-yellow-dim)" }}
              >
                <Icon name={item.icon as "ShieldCheck"} size={20} style={{ color: "var(--ios-black)" }} />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: "var(--ios-black)", letterSpacing: "-0.02em" }}>
                  {item.title}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--ios-gray3)" }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POPULAR ─── */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-7">
          <div>
            <div className="section-eyebrow mb-1">Выбор профессионалов</div>
            <h2
              className="text-3xl font-extrabold"
              style={{ color: "var(--ios-black)", letterSpacing: "-0.04em" }}
            >
              Популярное
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-sm font-bold tappable"
            style={{ color: "var(--ios-yellow)" }}
          >
            Каталог →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR.map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="container mx-auto px-4 pb-16">
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-14"
          style={{ background: "var(--ios-yellow)" }}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-64 opacity-[0.08] flex items-center justify-center"
          >
            <Icon name="Hammer" size={220} style={{ color: "#000" }} />
          </div>
          <div className="relative max-w-lg">
            <div
              className="section-eyebrow mb-2"
              style={{ color: "rgba(0,0,0,0.45)" }}
            >
              Нужна помощь?
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-3"
              style={{ color: "var(--ios-black)", letterSpacing: "-0.04em" }}
            >
              Консультация эксперта
            </h2>
            <p className="mb-6 text-base" style={{ color: "rgba(0,0,0,0.55)" }}>
              Подберём материалы под ваш проект, рассчитаем смету и организуем доставку
            </p>
            <Link
              to="/contacts"
              className="tappable inline-flex items-center gap-2.5 bg-[var(--ios-black)] text-white font-bold px-7 py-4 text-sm"
              style={{ borderRadius: 14 }}
            >
              <Icon name="Phone" size={16} />
              Связаться
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
