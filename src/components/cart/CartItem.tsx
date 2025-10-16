import type { CartProduct as CP, Product } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {
  product: CP;
  deleteFromCart: (p: CP, isTotal: boolean) => void;
  addToCart: (product: Product, initial: boolean) => void;
};

const CartItem: React.FC<Props> = ({ product, deleteFromCart, addToCart }) => {
  return (
    <div className="flex gap-4 pb-4 border-b border-gray-100">
      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
        <img src={"/products/" + product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.brand}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => deleteFromCart(product, false)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{product.qty}</span>
            <button onClick={() => addToCart(product, false)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100">
              +
            </button>
          </div>
          <span className="font-semibold text-gray-900">{formatCurrency(product.price)}</span>
        </div>
      </div>
      <button onClick={() => deleteFromCart(product, true)} className="text-gray-400 hover:text-red-500 transition-colors self-start">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
