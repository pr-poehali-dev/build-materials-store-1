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
        <div
          className="rounded-2xl p-4 w-72 animate-scale-in"
          style={{
            background: "rgba(28, 28, 30, 0.9)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {sent ? (
            <div className="text-center py-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: "var(--ios-green)" }}
              >
                <Icon name="Check" size={22} className="text-white" />
              </div>
              <p className="text-white font-bold text-sm">Отлично!</p>
              <p className="text-xs mt-1" style={{ color: "var(--ios-gray3)" }}>
                Перезвоним через 30 секунд
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-white font-bold text-sm">Перезвоним за 30 сек</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--ios-gray3)" }}>Бесплатно, без СМС</div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="tappable w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.1)", color: "var(--ios-gray3)" }}
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  autoFocus
                  className="flex-1 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--ios-yellow)]"
                  style={{ background: "rgba(255,255,255,0.1)", border: "none" }}
                />
                <button
                  type="submit"
                  className="btn-yellow tappable w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ borderRadius: 12 }}
                >
                  <Icon name="ArrowRight" size={16} style={{ color: "var(--ios-black)" }} />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="tappable w-14 h-14 rounded-full flex items-center justify-center shadow-yellow"
        style={{
          background: "var(--ios-yellow)",
          boxShadow: "0 4px 20px rgba(255,214,10,0.4), 0 8px 40px rgba(255,214,10,0.2)",
        }}
        title="Перезвоним за 30 секунд"
      >
        <Icon name="Phone" size={21} style={{ color: "var(--ios-black)" }} />
      </button>
    </div>
  );
}
