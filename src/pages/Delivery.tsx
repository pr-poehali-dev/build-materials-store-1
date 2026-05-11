import { useState } from "react";
import Icon from "@/components/ui/icon";

const DELIVERY_TYPES = [
  {
    id: "van_open",
    icon: "Truck",
    title: "Газель (борт до 3м)",
    desc: "Кирпич, блоки, мешки, плиты до 3м",
    price: 2500,
    priceNote: "в пределах МКАД",
  },
  {
    id: "van_tent",
    icon: "Truck",
    title: "Газель-тент 3м",
    desc: "Утеплитель, гипсокартон, длинные профили",
    price: 3200,
    priceNote: "в пределах МКАД",
  },
  {
    id: "manipulator",
    icon: "Construction",
    title: "Манипулятор (стрела 5т)",
    desc: "Длинномеры, тяжёлые паллеты, металлопрокат",
    price: 8900,
    priceNote: "минимальный заказ",
  },
];

const WAREHOUSES = [
  { name: "Склад Каширский", address: "Каширское ш., 12", stock: "Большой запас", color: "green" },
  { name: "Склад Люберцы", address: "ул. Проспект, 45", stock: "Есть товары", color: "yellow" },
  { name: "Склад Химки", address: "Ленинградское ш., 3", stock: "Ограниченно", color: "orange" },
];

export default function Delivery() {
  const [selected, setSelected] = useState("van_open");
  const [address, setAddress] = useState("");
  const [weight, setWeight] = useState("");

  const current = DELIVERY_TYPES.find((d) => d.id === selected);

  const calcPrice = () => {
    const km = address.length > 5 ? 15 : 0;
    const base = current?.price ?? 0;
    return km > 0 ? base + km * 50 : null;
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-oswald font-bold uppercase text-brand-dark mb-1">Доставка</h1>
        <p className="text-gray-500">Доставляем по Москве и Московской области</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Calculator */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <h2 className="font-oswald font-bold text-xl uppercase text-brand-dark mb-5 flex items-center gap-2">
              <Icon name="Calculator" size={20} className="text-brand-orange" />
              Расчёт стоимости
            </h2>

            {/* Delivery type */}
            <div className="space-y-3 mb-5">
              {DELIVERY_TYPES.map((type) => (
                <label
                  key={type.id}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selected === type.id
                      ? "border-brand-orange bg-brand-orange/5"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={type.id}
                    checked={selected === type.id}
                    onChange={() => setSelected(type.id)}
                    className="mt-1 accent-orange-500"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-brand-dark text-sm">{type.title}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{type.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-brand-orange">{type.price.toLocaleString("ru-RU")} ₽</div>
                    <div className="text-gray-400 text-xs">{type.priceNote}</div>
                  </div>
                </label>
              ))}
            </div>

            {/* Address */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Адрес доставки</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Введите адрес"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Примерный вес груза, кг</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Например: 500"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
            </div>

            {address && (
              <div className="mt-4 bg-brand-orange/10 border border-brand-orange/20 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-dark">Стоимость доставки:</span>
                  <span className="text-xl font-bold text-brand-orange">
                    {calcPrice()?.toLocaleString("ru-RU") ?? current?.price.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                {Number(weight) > 1000 && (
                  <p className="text-xs text-gray-500 mt-2">
                    * При весе более 1000 кг рекомендуем манипулятор
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Free delivery */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="Gift" size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-green-800">Бесплатная доставка</div>
              <div className="text-green-700 text-sm mt-0.5">При заказе от 30 000 ₽ в пределах МКАД доставка включена в стоимость</div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Warehouses */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-oswald font-bold text-xl uppercase text-brand-dark mb-4 flex items-center gap-2">
              <Icon name="MapPin" size={20} className="text-brand-orange" />
              Склады
            </h2>
            <div className="space-y-3">
              {WAREHOUSES.map((wh) => (
                <div key={wh.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      wh.color === "green" ? "bg-green-500" : wh.color === "yellow" ? "bg-yellow-500" : "bg-orange-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-brand-dark text-sm">{wh.name}</div>
                    <div className="text-gray-500 text-xs">{wh.address}</div>
                  </div>
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      wh.color === "green"
                        ? "bg-green-100 text-green-700"
                        : wh.color === "yellow"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {wh.stock}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-oswald font-bold text-xl uppercase text-brand-dark mb-4 flex items-center gap-2">
              <Icon name="CreditCard" size={20} className="text-brand-orange" />
              Оплата
            </h2>
            <div className="space-y-3">
              {[
                { icon: "CreditCard", title: "Картой онлайн", desc: "Visa, MasterCard, МИР" },
                { icon: "Building2", title: "Счёт на организацию", desc: "Для юридических лиц с НДС" },
                { icon: "Banknote", title: "Наличными", desc: "При получении на складе" },
              ].map((pay) => (
                <div key={pay.title} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                    <Icon name={pay.icon as "CreditCard"} size={18} className="text-brand-orange" />
                  </div>
                  <div>
                    <div className="font-semibold text-brand-dark text-sm">{pay.title}</div>
                    <div className="text-gray-500 text-xs">{pay.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Min order */}
          <div className="bg-brand-dark rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white font-bold mb-1">Минимальный заказ</div>
                <div className="text-gray-400 text-sm">Минимальная сумма заказа — 5 000 ₽. При меньшей сумме стоимость доставки увеличивается.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
