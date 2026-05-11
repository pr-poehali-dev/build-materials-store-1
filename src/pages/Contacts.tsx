import { useState } from "react";
import Icon from "@/components/ui/icon";

const CONTACTS = [
  { icon: "Phone", label: "Телефон", value: "8 800 123-45-67", sub: "бесплатно по России", href: "tel:+78001234567" },
  { icon: "Mail", label: "Email", value: "info@stroybaza.ru", href: "mailto:info@stroybaza.ru" },
  { icon: "MapPin", label: "Главный офис", value: "Москва, Каширское ш., 12" },
  { icon: "Clock", label: "Режим работы", value: "Пн–Сб: 8:00–20:00, Вс: 9:00–17:00" },
];

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-oswald font-bold uppercase text-brand-dark mb-1">Контакты</h1>
        <p className="text-gray-500">Свяжитесь с нами любым удобным способом</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contacts info */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACTS.map((c) => (
              <div key={c.label} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon as "Phone"} size={20} className="text-brand-orange" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="font-bold text-brand-dark hover:text-brand-orange transition-colors text-sm">
                      {c.value}
                    </a>
                  ) : (
                    <div className="font-bold text-brand-dark text-sm">{c.value}</div>
                  )}
                  {c.sub && <div className="text-xs text-green-500 mt-0.5">{c.sub}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-brand-dark rounded-2xl overflow-hidden h-64 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-charcoal" />
            <div className="relative text-center">
              <Icon name="MapPin" size={48} className="text-brand-orange mx-auto mb-3" />
              <div className="text-white font-bold">Каширское ш., 12</div>
              <div className="text-gray-400 text-sm mt-1">Москва</div>
              <a
                href="https://yandex.ru/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 bg-brand-orange text-white text-sm px-4 py-2 rounded-lg hover:bg-brand-orange-light transition-colors"
              >
                <Icon name="Navigation" size={14} />
                Открыть в картах
              </a>
            </div>
          </div>

          {/* Messengers */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-brand-dark mb-4">Написать нам</h3>
            <div className="flex gap-3">
              {[
                { label: "WhatsApp", color: "bg-green-500", icon: "MessageCircle" },
                { label: "Telegram", color: "bg-sky-500", icon: "Send" },
              ].map((m) => (
                <a
                  key={m.label}
                  href="#"
                  className={`flex items-center gap-2 ${m.color} text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity`}
                >
                  <Icon name={m.icon as "Send"} size={16} />
                  {m.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-oswald font-bold text-xl uppercase text-brand-dark mb-5">
            Задать вопрос
          </h2>

          {sent ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Сообщение отправлено!</h3>
              <p className="text-gray-500">Мы свяжемся с вами в течение 30 минут</p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", phone: "", message: "" }); }}
                className="mt-6 text-brand-orange hover:underline text-sm"
              >
                Отправить ещё
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Ваше имя *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Как к вам обращаться?"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Телефон *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Сообщение</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Опишите ваш вопрос или задачу..."
                  rows={5}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-orange focus:outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Send" size={18} />
                Отправить
              </button>
              <p className="text-xs text-gray-400 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
