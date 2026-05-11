import { useState, useMemo, useEffect } from "react";
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
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
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
    setSearch("");
    setSelectedCategory("");
    setSelectedBrands([]);
    setPriceFrom(PRICE_MIN);
    setPriceTo(PRICE_MAX);
    setInStockOnly(false);
    setDiscountOnly(false);
    setSortBy("default");
    setSearchParams({});
  };

  const FiltersPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-bold text-brand-dark text-sm uppercase tracking-wide mb-3">Категория</h3>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory("")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedCategory ? "bg-brand-orange text-white font-semibold" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Все категории
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                selectedCategory === cat.id ? "bg-brand-orange text-white font-semibold" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-xs ${selectedCategory === cat.id ? "text-orange-100" : "text-gray-400"}`}>{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-bold text-brand-dark text-sm uppercase tracking-wide mb-3">Цена, ₽</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={priceFrom}
            onChange={(e) => setPriceFrom(Number(e.target.value))}
            placeholder="от"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
          <input
            type="number"
            value={priceTo}
            onChange={(e) => setPriceTo(Number(e.target.value))}
            placeholder="до"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-bold text-brand-dark text-sm uppercase tracking-wide mb-3">Производитель</h3>
        <div className="space-y-1.5">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 rounded border-gray-300 text-brand-orange accent-orange-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-brand-dark">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-bold text-brand-dark text-sm uppercase tracking-wide mb-3">Наличие</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm text-gray-600">Только в наличии</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={discountOnly}
              onChange={(e) => setDiscountOnly(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm text-gray-600">Только со скидкой</span>
          </label>
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="w-full border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-300 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
      >
        <Icon name="X" size={14} />
        Сбросить фильтры
      </button>
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-oswald font-bold uppercase text-brand-dark mb-1">Каталог товаров</h1>
        <p className="text-gray-500 text-sm">Профессиональные строительные материалы и инструмент</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по названию, бренду, артикулу..."
          className="w-full border border-gray-200 rounded-xl pl-5 pr-12 py-4 text-sm focus:border-brand-orange focus:outline-none bg-white shadow-sm"
        />
        <Icon name="Search" size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="flex gap-6">
        {/* Filters — desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
            <FiltersPanel />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="lg:hidden flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                <Icon name="SlidersHorizontal" size={16} />
                Фильтры
              </button>
              <span className="text-sm text-gray-500">
                Найдено: <strong className="text-brand-dark">{filtered.length}</strong> товаров
              </span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-orange bg-white"
            >
              <option value="default">По умолчанию</option>
              <option value="price_asc">Цена: дешевле</option>
              <option value="price_desc">Цена: дороже</option>
              <option value="name">По названию</option>
            </select>
          </div>

          {/* Mobile filters */}
          {filterOpen && (
            <div className="lg:hidden bg-white rounded-xl border border-gray-100 p-5 mb-5">
              <FiltersPanel />
            </div>
          )}

          {/* Active filters */}
          {(selectedCategory || selectedBrands.length > 0 || inStockOnly || discountOnly || search) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory && (
                <span className="flex items-center gap-1 bg-brand-orange/10 text-brand-orange text-xs px-3 py-1 rounded-full font-medium">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory("")}><Icon name="X" size={12} /></button>
                </span>
              )}
              {selectedBrands.map((b) => (
                <span key={b} className="flex items-center gap-1 bg-brand-orange/10 text-brand-orange text-xs px-3 py-1 rounded-full font-medium">
                  {b}
                  <button onClick={() => toggleBrand(b)}><Icon name="X" size={12} /></button>
                </span>
              ))}
              {inStockOnly && (
                <span className="flex items-center gap-1 bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                  В наличии
                  <button onClick={() => setInStockOnly(false)}><Icon name="X" size={12} /></button>
                </span>
              )}
              {discountOnly && (
                <span className="flex items-center gap-1 bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full font-medium">
                  Со скидкой
                  <button onClick={() => setDiscountOnly(false)}><Icon name="X" size={12} /></button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="SearchX" size={48} className="text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-dark mb-2">Товары не найдены</h3>
              <p className="text-gray-500 mb-6">Попробуйте изменить параметры поиска</p>
              <button onClick={resetFilters} className="bg-brand-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-orange-light transition-colors">
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
