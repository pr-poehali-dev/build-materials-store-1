import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function CallbackWidget() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setPhone("");
        setOpen(false);
      }, 3000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-brand-dark border border-brand-charcoal rounded-xl p-4 w-72 shadow-2xl animate-fade-in">
          {sent ? (
            <div className="text-center py-2">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Check" size={24} className="text-white" />
              </div>
              <p className="text-white font-bold">Отлично!</p>
              <p className="text-gray-400 text-sm mt-1">Перезвоним через 30 секунд</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-bold text-sm">Перезвоним за 30 сек</h4>
                <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white">
                  <Icon name="X" size={16} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="flex-1 bg-brand-charcoal text-white placeholder-gray-500 rounded-lg px-3 py-2.5 text-sm border border-brand-gray focus:border-brand-orange focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-orange-light text-white px-3 py-2.5 rounded-lg transition-colors"
                >
                  <Icon name="ArrowRight" size={16} />
                </button>
              </form>
              <p className="text-gray-500 text-xs mt-2 text-center">Бесплатно, без СМС</p>
            </>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-brand-orange hover:bg-brand-orange-light rounded-full flex items-center justify-center shadow-lg shadow-orange-900/40 transition-all hover:scale-110 orange-glow"
        title="Перезвоним за 30 секунд"
      >
        <Icon name="Phone" size={22} className="text-white" />
      </button>
    </div>
  );
}
