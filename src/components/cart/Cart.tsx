import { useMemo, useState } from "react";
import type { CartProduct as CP, Product } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";
import CartProduct from "./CartItem";

type Props = {
  closeCart: (val: boolean) => void;
  deleteFromCart: (product: CP, isTotal: boolean) => void;
  addToCart: (product: Product, initial: boolean) => void;
  cart: CP[];
};

const Cart: React.FC<Props> = ({ closeCart, cart, deleteFromCart, addToCart }) => {
  const promos = [
    {
      code: "SALE25",
      discount: 25,
    },
    {
      code: "SUPER10",
      discount: 10,
    },
  ];

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyPromo = () => {
    if (!promoCode.trim()) return;

    const promo = promos.find((p) => p.code === promoCode);
    if (promo) setDiscount(promo.discount);
  };

  const totalAmount = () => {
    return Math.floor(cart.reduce((acc, p) => acc + p.price * p.qty, 0));
  };

  const totalDiscount = () => {
    return (totalAmount() * discount) / 100;
  };

  const totalQty = useMemo(() => {
    return cart.reduce((acc, p) => acc + p.qty, 0);
  }, [cart]);

  return (
    <>
      <div onClick={() => closeCart(false)} className="fixed inset-0 bg-black/50"></div>
      <div className="w-1/4 border-l border-gray-200 h-screen fixed top-0 right-0 bg-white shadow-xl flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Корзина</h2>
            <button onClick={() => closeCart(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            {totalQty} товара на сумму {formatCurrency(totalAmount())}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.map((product, index) => (
            <CartProduct product={product} key={index} deleteFromCart={deleteFromCart} addToCart={addToCart} />
          ))}
        </div>

        <div className={`p-6 border-t border-gray-200 ${totalDiscount() ? "opacity-60 pointer-events-none" : ""}`}>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Промокод"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button onClick={applyPromo} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Применить
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Товары ({totalQty})</span>
              <span className="text-gray-900">{formatCurrency(totalAmount())}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Скидка</span>
              <span className="text-green-600">−{formatCurrency(totalDiscount())} </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Доставка</span>
              <span className="text-gray-900">Бесплатно</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
            <span className="text-lg font-bold text-gray-900">Итого</span>
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount() - totalDiscount())}</span>
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg">
            Оформить заказ
          </button>

          <p className="text-center text-gray-500 text-xs mt-3">Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных</p>
        </div>
      </div>
    </>
  );
};

export default Cart;
