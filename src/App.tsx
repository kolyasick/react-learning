import { useState } from "react";
import type { CartProduct, Product, ProductFilters } from "./types/product.ts";
import Header from "./components/main-page/Header.tsx";
import Hero from "./components/main-page/Hero.tsx";

import Footer from "./components/main-page/Footer.tsx";

import Cart from "./components/cart/Cart.tsx";

import { Route, Routes } from "react-router";
import ProductPage from "./pages/ProductPage.tsx";
import IndexPage from "./pages/IndexPage.tsx";

function App() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [filters, setFilters] = useState<ProductFilters>({
    brands: [],
    category: "all",
    inStock: undefined,
    maxPrice: 5000,
    minPrice: undefined,
    minRating: 0,
    searchQuery: "",
  });

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const addToCart = (product: Product, initial: boolean = true) => {
    if (initial) {
      setCart((prev) => [...prev, { ...product, qty: 1 }]);
    } else {
      setCart((prev) => prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p)));
    }
  };

  const deleteFromCart = (product: CartProduct | Product, isTotal: boolean) => {
    if (isTotal) {
      setCart((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setCart((prev) => prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty - 1 } : p)).filter((p) => p.qty > 0));
    }
  };

  const getProductQty = (product: Product) => {
    const exist = cart.find((c) => c.id === product.id);

    if (!exist) return 0;
    return exist.qty;
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Header searchQuery={filters.searchQuery!} handleSearchChange={handleSearchChange} openCart={setIsCartOpen} cartLength={cart.length} />

        <Hero />
      </div>

      <Routes>
        <Route
          path="/product/:id"
          element={<ProductPage addToCart={addToCart} deleteFromCart={deleteFromCart} getProductQty={getProductQty} />}
        ></Route>
        <Route
          index
          element={
            <IndexPage
              addToCart={addToCart}
              cart={cart}
              deleteFromCart={deleteFromCart}
              filters={filters}
              setFilters={setFilters}
              getProductQty={getProductQty}
            />
          }
        ></Route>
      </Routes>

      {isCartOpen && <Cart closeCart={setIsCartOpen} cart={cart} deleteFromCart={deleteFromCart} addToCart={addToCart} />}

      <Footer />
    </div>
  );
}

export default App;
