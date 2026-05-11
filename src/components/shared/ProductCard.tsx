import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const { addToCart, items } = useCart();
  const inCart = items.some((i) => i.product.id === product.id);
  const finalPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <div className="card-float group flex flex-col" style={{ borderRadius: 20 }}>
      {/* Image zone — overflow trick */}
      <div
        className="relative bg-[var(--ios-gray6)] overflow-visible"
        style={{ height: 200, borderRadius: "20px 20px 0 0" }}
      >
        <div className="product-img-overflow absolute inset-x-0 bottom-0 flex items-end justify-center h-full px-4">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-44 w-full object-cover rounded-2xl"
            style={{ objectPosition: "center" }}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount && (
            <span
              className="text-[10px] font-extrabold px-2 py-1 rounded-full"
              style={{ background: "var(--ios-yellow)", color: "var(--ios-black)" }}
            >
              −{product.discount}%
            </span>
          )}
        </div>

        {/* Availability pulse */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`text-[11px] font-semibold flex items-center ${
              product.inStock ? "pulse-green text-[var(--ios-green)]" : "pulse-gray text-[var(--ios-gray3)]"
            }`}
          >
            {product.inStock ? "В наличии" : "Под заказ"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-4 pb-4 pt-5">
        <div
          className="text-[11px] font-bold uppercase tracking-widest mb-1.5"
          style={{ color: "var(--ios-gray3)" }}
        >
          {product.brand}
        </div>

        <Link to={`/product/${product.id}`}>
          <h3
            className="text-sm font-bold leading-snug line-clamp-2 mb-3 hover:opacity-70 transition-opacity"
            style={{ color: "var(--ios-black)", letterSpacing: "-0.02em" }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex-1" />

        {/* Price row */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <div
              className="text-2xl font-extrabold"
              style={{ color: "var(--ios-black)", letterSpacing: "-0.04em" }}
            >
              {finalPrice.toLocaleString("ru-RU")} ₽
            </div>
            {product.discount && (
              <div className="text-xs line-through" style={{ color: "var(--ios-gray3)" }}>
                {product.price.toLocaleString("ru-RU")} ₽
              </div>
            )}
          </div>
          <div className="text-xs font-medium" style={{ color: "var(--ios-gray3)" }}>
            за {product.unit}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => product.inStock && addToCart(product)}
          disabled={!product.inStock}
          className="tappable w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-colors"
          style={
            !product.inStock
              ? { background: "var(--ios-gray6)", color: "var(--ios-gray3)", cursor: "not-allowed" }
              : inCart
              ? { background: "var(--ios-green)", color: "#fff" }
              : { background: "var(--ios-yellow)", color: "var(--ios-black)" }
          }
        >
          <Icon name={inCart ? "Check" : "ShoppingBag"} size={15} />
          {!product.inStock ? "Нет в наличии" : inCart ? "В корзине" : "В корзину"}
        </button>
      </div>
    </div>
  );
}
