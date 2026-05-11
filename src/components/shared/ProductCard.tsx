import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addToCart, items } = useCart();
  const inCart = items.some((i) => i.product.id === product.id);

  const finalPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 card-hover group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-48">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            −{product.discount}%
          </div>
        )}
        <div
          className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded ${
            product.inStock
              ? "bg-green-500 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {product.inStock ? "В наличии" : "Под заказ"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-brand-orange font-medium mb-1">{product.brand}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-brand-orange transition-colors mb-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="flex-1" />

        {/* Price */}
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-brand-dark">
              {finalPrice.toLocaleString("ru-RU")} ₽
            </span>
            {product.discount && (
              <span className="text-sm text-gray-400 line-through">
                {product.price.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">за {product.unit}</div>
        </div>

        {/* Add to cart */}
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all ${
            !product.inStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : inCart
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-brand-orange hover:bg-brand-orange-light text-white"
          }`}
        >
          <Icon name={inCart ? "Check" : "ShoppingCart"} size={16} />
          {!product.inStock ? "Нет в наличии" : inCart ? "В корзине" : "В корзину"}
        </button>
      </div>
    </div>
  );
}
