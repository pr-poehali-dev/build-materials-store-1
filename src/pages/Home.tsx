import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/shared/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/data/products";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/62df8b64-52d2-4caa-b427-9351100f1ee1/files/b8e41b8c-03e1-49a6-aea3-47c73ee626ec.jpg";

const TRUST_ITEMS = [
  { icon: "Shield", title: "Гарантия качества", desc: "Все товары сертифицированы" },
  { icon: "Truck", title: "Доставка по Москве", desc: "Газель, Манипулятор" },
  { icon: "RotateCcw", title: "Возврат 14 дней", desc: "Без вопросов и бюрократии" },
  { icon: "Headphones", title: "Поддержка 7/7", desc: "Эксперты ответят на вопросы" },
];

const PROMO_PRODUCTS = PRODUCTS.filter((p) => p.discount);

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigate = useNavigate();

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[520px] flex items-center diagonal-cut overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/70 to-transparent" />

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-brand-orange text-sm font-medium">Более 5000 товаров в наличии</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase leading-tight mb-4">
              Строй без<br />
              <span className="text-gradient-orange">лишних слов</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Профессиональные стройматериалы для прорабов и мастеров. Доставка газелью или манипулятором.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/catalog"
                className="flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-4 px-8 rounded-xl text-lg transition-all hover:scale-105 shadow-lg"
              >
                <Icon name="Grid3X3" size={20} />
                Весь каталог
              </Link>
              <Link
                to="/promotions"
                className="flex items-center justify-center gap-2 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold py-4 px-8 rounded-xl text-lg transition-all"
              >
                <Icon name="Percent" size={20} />
                Акции
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery calculator */}
      <section className="container mx-auto px-4 -mt-6 mb-12 relative z-10">
        <div className="bg-brand-dark rounded-2xl p-6 border border-brand-charcoal shadow-2xl max-w-3xl mx-auto">
          <h2 className="text-white font-oswald font-bold text-xl uppercase mb-4 flex items-center gap-2">
            <Icon name="Truck" size={20} className="text-brand-orange" />
            Быстрый расчёт доставки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Откуда (склад)"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-brand-charcoal text-white placeholder-gray-500 rounded-lg px-4 py-3 text-sm border border-brand-gray focus:border-brand-orange focus:outline-none"
            />
            <input
              type="text"
              placeholder="Адрес доставки"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-brand-charcoal text-white placeholder-gray-500 rounded-lg px-4 py-3 text-sm border border-brand-gray focus:border-brand-orange focus:outline-none"
            />
            <Link
              to="/delivery"
              className="flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              <Icon name="Calculator" size={16} />
              Рассчитать
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-oswald font-bold uppercase text-brand-dark mb-6">
          Категории товаров
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.id}`}
              className="group flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100 hover:border-brand-orange hover:shadow-lg transition-all card-hover"
            >
              <div className="w-12 h-12 bg-brand-orange/10 group-hover:bg-brand-orange rounded-xl flex items-center justify-center mb-3 transition-colors">
                <Icon name={cat.icon as "Package"} size={22} className="text-brand-orange group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-semibold text-brand-dark leading-tight">{cat.name}</span>
              <span className="text-xs text-gray-400 mt-1">{cat.count} товаров</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot deals */}
      {PROMO_PRODUCTS.length > 0 && (
        <section className="bg-brand-dark py-16 mb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-oswald font-bold uppercase text-white flex items-center gap-3">
                <span className="bg-red-500 text-white text-sm px-3 py-1 rounded font-bold">HOT</span>
                Товары недели
              </h2>
              <Link to="/promotions" className="text-brand-orange hover:text-brand-orange-light text-sm font-medium flex items-center gap-1 transition-colors">
                Все акции <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROMO_PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-brand-orange/30 transition-colors">
              <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon as "Shield"} size={20} className="text-brand-orange" />
              </div>
              <div>
                <div className="font-bold text-brand-dark text-sm">{item.title}</div>
                <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All products preview */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-oswald font-bold uppercase text-brand-dark">
            Популярные товары
          </h2>
          <Link
            to="/catalog"
            className="flex items-center gap-2 text-brand-orange hover:text-brand-orange-light font-medium text-sm transition-colors"
          >
            Весь каталог <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mb-16">
        <div className="bg-brand-orange rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 overflow-hidden relative">
          <div className="absolute right-0 top-0 bottom-0 w-64 opacity-10">
            <Icon name="Hammer" size={200} className="text-white" />
          </div>
          <div className="flex-1 relative">
            <h2 className="text-3xl font-oswald font-bold uppercase text-white mb-2">
              Нужна консультация?
            </h2>
            <p className="text-orange-100 text-lg">
              Наши эксперты помогут подобрать материалы для вашего проекта
            </p>
          </div>
          <button
            onClick={() => navigate("/contacts")}
            className="flex items-center gap-2 bg-white text-brand-orange font-bold py-4 px-8 rounded-xl text-lg hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <Icon name="Phone" size={20} />
            Связаться
          </button>
        </div>
      </section>
    </main>
  );
}
