import { useState } from "react";
import type { Product } from "../types/product";
import { formatCurrency } from "../utils/formatCurrency";

interface Props {
  product: Product;
  addToCart: (product: Product, initial?: boolean) => void;
  deleteFromCart: (p: Product, isTotal: boolean) => void;

  getProductQty: (p: Product) => number;
}

const ProductCard: React.FC<Props> = ({ product, getProductQty, addToCart, deleteFromCart }) => {
  const [featureLimit, setFeatureLimit] = useState(2);
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const partialStar = rating - fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (partialStar > 0) {
      stars.push(
        <div key="partial" className="relative">
          <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${partialStar * 100}%` }}>
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        {product.inStock ? (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">В наличии</div>
        ) : (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Нет в наличии</div>
        )}

        <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">{product.brand}</div>
      </div>

      <div className="p-4">
        <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>

        <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 line-clamp-2">{product.name}</h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">{renderRatingStars(product.rating)}</div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {product.features.slice(0, featureLimit).map((feature, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {feature}
            </span>
          ))}
          {product.features.length > featureLimit && (
            <span
              onClick={() => setFeatureLimit(product.features.length)}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs cursor-pointer"
            >
              +{product.features.length - 2}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
            <span className="text-gray-600 ml-1">{product.currency}</span>
          </div>

          {getProductQty(product) ? (
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => deleteFromCart(product, false)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{getProductQty(product)}</span>
              <button onClick={() => addToCart(product, false)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Купить</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
