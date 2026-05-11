import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/shared/ProductCard";
import { PRODUCTS } from "@/data/products";

const PROMO_BANNERS = [
  {
    id: 1,
    title: "Скидки до 20% на инструмент",
    subtitle: "Только до конца месяца",
    color: "from-blue-900 to-blue-700",
    icon: "Wrench",
    category: "tools",
  },
  {
    id: 2,
    title: "Сухие смеси по акции",
    subtitle: "Knauf, Ceresit со склада",
    color: "from-brand-dark to-brand-charcoal",
    icon: "Package",
    category: "dry-mixes",
  },
  {
    id: 3,
    title: "Бесплатная доставка",
    subtitle: "При заказе от 30 000 ₽",
    color: "from-green-900 to-green-700",
    icon: "Truck",
    category: null,
  },
];

const discountedProducts = PRODUCTS.filter((p) => p.discount);

export default function Promotions() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-oswald font-bold uppercase text-brand-dark mb-1">
          Акции и скидки
        </h1>
        <p className="text-gray-500">Актуальные предложения для строителей и прорабов</p>
      </div>

      {/* Promo banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {PROMO_BANNERS.map((banner) => (
          <div
            key={banner.id}
            className={`relative bg-gradient-to-br ${banner.color} rounded-2xl p-6 overflow-hidden`}
          >
            <div className="absolute right-4 bottom-4 opacity-10">
              <Icon name={banner.icon as "Wrench"} size={80} className="text-white" />
            </div>
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Icon name={banner.icon as "Wrench"} size={20} className="text-white" />
              </div>
              <h3 className="text-white font-oswald font-bold text-xl uppercase mb-1">{banner.title}</h3>
              <p className="text-white/70 text-sm mb-4">{banner.subtitle}</p>
              <Link
                to={banner.category ? `/catalog?category=${banner.category}` : "/catalog"}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Смотреть <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Countdown */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
            <Icon name="Timer" size={20} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-red-700">Горячие скидки заканчиваются!</div>
            <div className="text-red-500 text-sm">Успей купить до конца акции</div>
          </div>
        </div>
        <div className="flex items-center gap-2 md:ml-auto">
          {["05", "12", "43"].map((val, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="bg-red-500 text-white font-bold text-xl w-12 h-12 rounded-lg flex items-center justify-center">
                {val}
              </div>
              {i < 2 && <span className="text-red-500 font-bold text-xl">:</span>}
            </div>
          ))}
          <div className="text-red-500 text-xs ml-2">ч&nbsp;/&nbsp;мин&nbsp;/&nbsp;сек</div>
        </div>
      </div>

      {/* Products on sale */}
      <h2 className="text-2xl font-oswald font-bold uppercase text-brand-dark mb-6">
        Товары со скидкой
      </h2>

      {discountedProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Icon name="Tag" size={48} className="mx-auto mb-4 opacity-30" />
          <p>Акционных товаров сейчас нет. Загляните позже!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {discountedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
