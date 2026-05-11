import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/shared/ProductCard";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const { addToCart, items } = useCart();
  const [area, setArea] = useState("");
  const [thickness, setThickness] = useState("");
  const [showAllChars, setShowAllChars] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Icon name="PackageX" size={64} className="text-gray-200 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-brand-dark mb-2">Товар не найден</h1>
        <Link to="/catalog" className="text-brand-orange hover:underline">Вернуться в каталог</Link>
      </div>
    );
  }

  const inCart = items.some((i) => i.product.id === product.id);
  const finalPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  const characteristics = Object.entries(product.characteristics);
  const visibleChars = showAllChars ? characteristics : characteristics.slice(0, 5);

  const calcBags = () => {
    const a = parseFloat(area);
    const t = parseFloat(thickness);
    const consumptionPerMm = parseFloat(String(product.characteristics["Расход"] ?? "").replace(/[^0-9.]/g, "")) || 1.5;
    if (a && t) return Math.ceil((a * t * consumptionPerMm) / 25);
    return null;
  };
  const bags = calcBags();

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-brand-orange transition-colors">Главная</Link>
        <Icon name="ChevronRight" size={14} />
        <Link to="/catalog" className="hover:text-brand-orange transition-colors">Каталог</Link>
        <Icon name="ChevronRight" size={14} />
        <span className="text-brand-dark font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="relative">
          <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.discount && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
              −{product.discount}%
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-brand-orange font-semibold">{product.brand}</span>
            <span className="text-gray-300">·</span>
            <span
              className={`text-sm font-semibold ${product.inStock ? "text-green-600" : "text-gray-400"}`}
            >
              {product.inStock ? "В наличии" : "Под заказ"}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-oswald font-bold text-brand-dark uppercase mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-4xl font-bold text-brand-dark">{finalPrice.toLocaleString("ru-RU")} ₽</span>
              {product.discount && (
                <span className="text-xl text-gray-400 line-through">{product.price.toLocaleString("ru-RU")} ₽</span>
              )}
            </div>
            <div className="text-sm text-gray-500">за {product.unit}</div>

            <button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className={`mt-4 w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${
                !product.inStock
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : inCart
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-brand-orange hover:bg-brand-orange-light text-white shadow-lg"
              }`}
            >
              <Icon name={inCart ? "Check" : "ShoppingCart"} size={22} />
              {!product.inStock ? "Нет в наличии" : inCart ? "Добавлено в корзину" : "В корзину"}
            </button>
          </div>

          {/* Calculator (for dry mixes) */}
          {product.category === "dry-mixes" && product.characteristics["Расход"] && (
            <div className="bg-brand-dark rounded-xl p-5 mb-6">
              <h3 className="text-white font-bold flex items-center gap-2 mb-4">
                <Icon name="Calculator" size={18} className="text-brand-orange" />
                Калькулятор расхода
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Площадь, м²</label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Например: 25"
                    className="w-full bg-brand-charcoal text-white rounded-lg px-3 py-2.5 text-sm border border-brand-gray focus:border-brand-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Толщина, мм</label>
                  <input
                    type="number"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    placeholder="Например: 10"
                    className="w-full bg-brand-charcoal text-white rounded-lg px-3 py-2.5 text-sm border border-brand-gray focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>
              {bags && (
                <div className="bg-brand-orange/20 border border-brand-orange/30 rounded-lg p-3 text-center">
                  <div className="text-brand-orange font-bold text-lg">{bags} мешков</div>
                  <div className="text-gray-300 text-sm">= {(bags * finalPrice).toLocaleString("ru-RU")} ₽</div>
                </div>
              )}
            </div>
          )}

          {/* Delivery info */}
          <div className="flex items-center gap-3 text-sm text-gray-500 border border-gray-100 rounded-xl p-4">
            <Icon name="Truck" size={20} className="text-brand-orange flex-shrink-0" />
            <span>Доставка газелью или манипулятором. <Link to="/delivery" className="text-brand-orange hover:underline">Подробнее о доставке</Link></span>
          </div>
        </div>
      </div>

      {/* Characteristics */}
      <section className="mb-16">
        <h2 className="text-2xl font-oswald font-bold uppercase text-brand-dark mb-6">Характеристики</h2>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <tbody>
              {visibleChars.map(([key, val], i) => (
                <tr key={key} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-3 px-5 text-sm text-gray-500 font-medium w-1/2">{key}</td>
                  <td className="py-3 px-5 text-sm text-brand-dark font-semibold">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {characteristics.length > 5 && (
            <div className="p-4 text-center border-t border-gray-100">
              <button
                onClick={() => setShowAllChars(!showAllChars)}
                className="text-brand-orange hover:text-brand-orange-light text-sm font-medium flex items-center gap-1 mx-auto transition-colors"
              >
                <Icon name={showAllChars ? "ChevronUp" : "ChevronDown"} size={16} />
                {showAllChars ? "Скрыть" : `Показать все (${characteristics.length})`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-oswald font-bold uppercase text-brand-dark mb-6">С этим товаром берут</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
