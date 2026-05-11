import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/shared/ProductCard";
import { PRODUCTS, CATEGORIES, BRANDS } from "@/data/products";

const PRICE_MIN = 0;
const PRICE_MAX = 20000;

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState(PRICE_MIN);
  const [priceTo, setPriceTo] = useState(PRICE_MAX);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "price_asc" | "price_desc" | "name">("default");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = searchParams.get("category");
    const s = searchParams.get("search");
    if (cat) setSelectedCategory(cat);
    if (s) setSearch(s);
  }, [searchParams]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filtered = useMemo(() => {
    let result = PRODUCTS;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    result = result.filter((p) => {
      const price = p.discount ? p.price * (1 - p.discount / 100) : p.price;
      return price >= priceFrom && price <= priceTo;
    });
    if (inStockOnly) result = result.filter((p) => p.inStock);
    if (discountOnly) result = result.filter((p) => !!p.discount);
    if (sortBy === "price_asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [search, selectedCategory, selectedBrands, priceFrom, priceTo, inStockOnly, discountOnly, sortBy]);

  const resetFilters = () => {
    setSearch(""); setSelectedCategory(""); setSelectedBrands([]);
    setPriceFrom(PRICE_MIN); setPriceTo(PRICE_MAX);
    setInStockOnly(false); setDiscountOnly(false); setSortBy("default");
    setSearchParams({});
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Price */}
      <div>
        <div className="section-eyebrow mb-3">Цена, ₽</div>
        <div className="flex gap-2">
          <input
            type="number"
            value={priceFrom}
            onChange={(e) => setPriceFrom(Number(e.target.value))}
            placeholder="от"
            className="w-full bg-[var(--ios-gray6)] text-[var(--ios-black)] rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--ios-yellow)]"
          />
          <input
            type="number"
            value={priceTo}
            onChange={(e) => setPriceTo(Number(e.target.value))}
            placeholder="до"
            className="w-full bg-[var(--ios-gray6)] text-[var(--ios-black)] rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--ios-yellow)]"
          />
        </div>
      </div>

      {/* Brands */}
      <div>
        <div className="section-eyebrow mb-3">Производитель</div>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer tappable">
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: selectedBrands.includes(brand) ? "var(--ios-yellow)" : "var(--ios-gray6)",
                  border: selectedBrands.includes(brand) ? "none" : "1.5px solid var(--ios-gray5)",
                }}
              >
                {selectedBrands.includes(brand) && (
                  <Icon name="Check" size={12} style={{ color: "var(--ios-black)" }} />
                )}
              </div>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="sr-only"
              />
              <span className="text-sm font-medium" style={{ color: "var(--ios-gray1)" }}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <div className="section-eyebrow mb-3">Наличие</div>
        <div className="space-y-2">
          {[
            { label: "Только в наличии", value: inStockOnly, setter: setInStockOnly },
            { label: "Только со скидкой", value: discountOnly, setter: setDiscountOnly },
          ].map(({ label, value, setter }) => (
            <label key={label} className="flex items-center gap-3 cursor-pointer tappable">
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: value ? "var(--ios-yellow)" : "var(--ios-gray6)",
                  border: value ? "none" : "1.5px solid var(--ios-gray5)",
                }}
                onClick={() => setter(!value)}
              >
                {value && <Icon name="Check" size={12} style={{ color: "var(--ios-black)" }} />}
              </div>
              <span className="text-sm font-medium" style={{ color: "var(--ios-gray1)" }}>
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="w-full py-2.5 rounded-xl text-sm font-semibold transition-colors tappable"
        style={{
          background: "var(--ios-gray6)",
          color: "var(--ios-gray2)",
        }}
      >
        Сбросить фильтры
      </button>
    </div>
  );

  return (
    <main className="min-h-screen" style={{ background: "var(--ios-bg)" }}>
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-6 animate-fade-up">
          <div className="section-eyebrow mb-2">Каталог</div>
          <h1
            className="text-4xl font-extrabold"
            style={{ color: "var(--ios-black)", letterSpacing: "-0.04em" }}
          >
            Стройматериалы
          </h1>
        </div>

        {/* Search */}
        <div className="relative mb-5 animate-fade-up delay-100">
          <Icon
            name="Search"
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--ios-gray3)" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по названию, бренду, артикулу…"
            className="w-full rounded-2xl pl-11 pr-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--ios-yellow)] transition-all"
            style={{ background: "#fff", color: "var(--ios-black)" }}
          />
        </div>

        {/* Capsule category tabs */}
        <div className="capsule-tabs mb-6 animate-fade-up delay-200">
          <button
            onClick={() => setSelectedCategory("")}
            className={`capsule-tab ${!selectedCategory ? "active" : ""}`}
          >
            <Icon name="Grid3X3" size={13} />
            Все
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
              className={`capsule-tab ${selectedCategory === cat.id ? "active" : ""}`}
            >
              <Icon name={cat.icon as "Package"} size={13} />
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div
              className="rounded-2xl p-5 sticky top-24"
              style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)" }}
            >
              <div className="section-eyebrow mb-5">Фильтры</div>
              <FiltersContent />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="lg:hidden flex items-center gap-2 tappable px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "#fff", color: "var(--ios-gray1)" }}
                >
                  <Icon name="SlidersHorizontal" size={15} />
                  Фильтры
                </button>
                <span className="text-sm font-medium" style={{ color: "var(--ios-gray3)" }}>
                  {filtered.length} товаров
                </span>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--ios-yellow)]"
                style={{ background: "#fff", color: "var(--ios-gray1)", border: "none" }}
              >
                <option value="default">По умолчанию</option>
                <option value="price_asc">Дешевле</option>
                <option value="price_desc">Дороже</option>
                <option value="name">По названию</option>
              </select>
            </div>

            {/* Mobile filters with backdrop */}
            {filterOpen && (
              <>
                <div
                  className="backdrop-blur-overlay"
                  onClick={() => setFilterOpen(false)}
                />
                <div
                  ref={filterPanelRef}
                  className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl p-6 animate-scale-in"
                  style={{ background: "#fff", maxHeight: "80vh", overflowY: "auto" }}
                >
                  <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
                  <div className="section-eyebrow mb-4">Фильтры</div>
                  <FiltersContent />
                </div>
              </>
            )}

            {/* Active filter chips */}
            {(selectedCategory || selectedBrands.length > 0 || inStockOnly || discountOnly) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory("")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tappable"
                    style={{ background: "var(--ios-yellow)", color: "var(--ios-black)" }}
                  >
                    {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                    <Icon name="X" size={11} />
                  </button>
                )}
                {selectedBrands.map((b) => (
                  <button
                    key={b}
                    onClick={() => toggleBrand(b)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tappable"
                    style={{ background: "var(--ios-gray6)", color: "var(--ios-gray1)" }}
                  >
                    {b} <Icon name="X" size={11} />
                  </button>
                ))}
              </div>
            )}

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 animate-fade-in">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "var(--ios-gray6)" }}
                >
                  <Icon name="SearchX" size={32} style={{ color: "var(--ios-gray3)" }} />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--ios-black)", letterSpacing: "-0.03em" }}
                >
                  Ничего не найдено
                </h3>
                <p className="text-sm mb-6" style={{ color: "var(--ios-gray3)" }}>
                  Попробуйте изменить параметры поиска
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-yellow tappable px-6 py-3 text-sm font-bold"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p, i) => (
                  <div
                    key={p.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${Math.min(i * 0.04, 0.3)}s` }}
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
