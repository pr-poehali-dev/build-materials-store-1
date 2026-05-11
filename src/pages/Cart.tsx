import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useCart } from "@/context/CartContext";

const DELIVERY_OPTIONS = [
  { id: "van_open", label: "Газель (борт до 3м)", price: 2500 },
  { id: "van_tent", label: "Газель-тент 3м", price: 3200 },
  { id: "manipulator", label: "Манипулятор (стрела 5т)", price: 8900 },
];

const MIN_ORDER = 5000;
const FREE_DELIVERY_THRESHOLD = 30000;

export default function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [delivery, setDelivery] = useState("van_open");
  const [address, setAddress] = useState("");
  const [orderSent, setOrderSent] = useState(false);

  const deliveryPrice = totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_OPTIONS.find((d) => d.id === delivery)?.price ?? 0;
  const grandTotal = totalPrice + deliveryPrice;
  const freeDeliveryLeft = FREE_DELIVERY_THRESHOLD - totalPrice;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSent(true);
  };

  if (orderSent) {
    return (
      <main className="container mx-auto px-4 py-20 text-center max-w-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={40} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-oswald font-bold uppercase text-brand-dark mb-2">Заказ оформлен!</h1>
        <p className="text-gray-500 mb-6">Мы свяжемся с вами для подтверждения в течение 30 минут</p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-orange-light transition-colors"
        >
          <Icon name="Grid3X3" size={18} />
          Продолжить покупки
        </Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-20 text-center max-w-lg">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="ShoppingCart" size={36} className="text-gray-300" />
        </div>
        <h1 className="text-2xl font-oswald font-bold uppercase text-brand-dark mb-2">Корзина пуста</h1>
        <p className="text-gray-500 mb-6">Добавьте товары из каталога</p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-orange-light transition-colors"
        >
          <Icon name="Grid3X3" size={18} />
          Перейти в каталог
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-oswald font-bold uppercase text-brand-dark mb-6">
        Корзина <span className="text-gray-400 font-normal text-2xl ml-2">{totalItems} товаров</span>
      </h1>

      {/* Free delivery progress */}
      {freeDeliveryLeft > 0 && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 text-sm font-medium">До бесплатной доставки</span>
            <span className="text-green-700 font-bold">{freeDeliveryLeft.toLocaleString("ru-RU")} ₽</span>
          </div>
          <div className="w-full bg-green-100 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(100, (totalPrice / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const price = item.product.discount
              ? Math.round(item.product.price * (1 - item.product.discount / 100))
              : item.product.price;
            return (
              <div key={item.product.id} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`} className="font-semibold text-brand-dark hover:text-brand-orange text-sm leading-snug line-clamp-2 transition-colors">
                    {item.product.name}
                  </Link>
                  <div className="text-xs text-gray-400 mt-1">{item.product.brand} · за {item.product.unit}</div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-l-lg transition-colors"
                      >
                        <Icon name="Minus" size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-r-lg transition-colors"
                      >
                        <Icon name="Plus" size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-brand-dark">{(price * item.quantity).toLocaleString("ru-RU")} ₽</div>
                      <div className="text-xs text-gray-400">{price.toLocaleString("ru-RU")} ₽/шт</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors self-start"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Order */}
        <div>
          <form onSubmit={handleOrder} className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-oswald font-bold text-lg uppercase text-brand-dark mb-5">Оформление заказа</h2>

            {/* Delivery */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Тип доставки</label>
              {DELIVERY_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer mb-2 transition-all ${
                    delivery === opt.id ? "border-brand-orange bg-brand-orange/5" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === opt.id}
                      onChange={() => setDelivery(opt.id)}
                      className="accent-orange-500"
                    />
                    <span className="text-sm font-medium text-brand-dark">{opt.label}</span>
                  </div>
                  <span className="text-sm font-bold text-brand-orange">
                    {totalPrice >= FREE_DELIVERY_THRESHOLD ? "Бесплатно" : `${opt.price.toLocaleString("ru-RU")} ₽`}
                  </span>
                </label>
              ))}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">Адрес доставки *</label>
              <input
                required
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Улица, дом, корпус"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-orange focus:outline-none"
              />
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 pt-4 mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Товары</span>
                <span className="font-medium">{totalPrice.toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Доставка</span>
                <span className={deliveryPrice === 0 ? "text-green-500 font-medium" : "font-medium"}>
                  {deliveryPrice === 0 ? "Бесплатно" : `${deliveryPrice.toLocaleString("ru-RU")} ₽`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-2 mt-2">
                <span>Итого</span>
                <span className="text-brand-orange">{grandTotal.toLocaleString("ru-RU")} ₽</span>
              </div>
            </div>

            {totalPrice < MIN_ORDER && (
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 mb-4 text-xs text-yellow-700">
                <Icon name="AlertCircle" size={14} className="inline mr-1" />
                Минимальная сумма заказа — {MIN_ORDER.toLocaleString("ru-RU")} ₽
              </div>
            )}

            <button
              type="submit"
              disabled={totalPrice < MIN_ORDER}
              className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Оформить заказ
            </button>

            <div className="flex justify-center gap-4 mt-4">
              <button type="button" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-dark transition-colors">
                <Icon name="CreditCard" size={14} />
                Онлайн
              </button>
              <button type="button" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-dark transition-colors">
                <Icon name="Building2" size={14} />
                Счёт
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
