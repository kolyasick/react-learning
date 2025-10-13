import axios from "axios";
import ProductCard from "./components/ProductCard";
import { useEffect, useState } from "react";
import type { Product, ProductCategory, ProductFilters } from "./types/product.ts";
import { Loader } from "./components/icons/Loader";

function App() {
  const categories: ProductCategory[] = ["Аксессуары", "Наушники", "Планшеты", "Смартфоны", "Ноутбуки", "Игровые консоли"];
  const brands = ["Apple", "Samsung", "Sony", "Dell", "Nintendo", "Bose", "Canon"];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<ProductFilters>({
    brands: [],
    category: "all",
    inStock: undefined,
    maxPrice: 5000,
    minPrice: undefined,
    minRating: 0,
    searchQuery: "",
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Product[]>("./src/api/products.json");
        setProducts(data);
      } catch (error) {
        console.log("Ошибка при загрузке продуктов: ", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = (): Product[] => {
    if (!products) return [];

    return products.filter((product) => {
      if (filters.category && filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchFields = [product.name, product.description, product.brand, ...product.features];

        const matchesSearch = searchFields.some((field) => field.toLowerCase().includes(query));

        if (!matchesSearch) return false;
      }

      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }

      if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
        return false;
      }

      if (filters.minRating && product.rating < filters.minRating) {
        return false;
      }

      if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      return true;
    });
  };
  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleCategoryChange = (category: ProductCategory | "all") => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleBrandToggle = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands?.includes(brand) ? prev.brands.filter((b) => b !== brand) : [...(prev.brands || []), brand],
    }));
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  const handleStockChange = (inStock: boolean | undefined) => {
    setFilters((prev) => ({ ...prev, inStock }));
  };

  const handleRatingChange = (rating: number) => {
    setFilters((prev) => ({ ...prev, minRating: rating }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      searchQuery: "",
      minPrice: 0,
      maxPrice: 5000,
      inStock: undefined,
      minRating: 0,
      brands: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎧</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TechStore</h1>
            </div>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={filters.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Лучшие технологии для вашей жизни</h2>
          <p className="text-xl opacity-90 mb-8">Откройте мир инноваций с нашей коллекцией</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Фильтры</h3>
                <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800">
                  Сбросить
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Категории</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === "all"}
                      onChange={() => handleCategoryChange("all")}
                      className="mr-2"
                    />
                    Все категории
                  </label>
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === cat}
                        onChange={() => handleCategoryChange(cat)}
                        className="mr-2"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Бренды</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.brands?.includes(brand) || false}
                        onChange={() => handleBrandToggle(brand)}
                        className="mr-2"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Цена, $</h4>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={filters.minPrice}
                    onChange={(e) => handlePriceChange(Number(e.target.value), filters.maxPrice || 5000)}
                    className="w-1/2 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={filters.maxPrice}
                    onChange={(e) => handlePriceChange(filters.minPrice || 0, Number(e.target.value))}
                    className="w-1/2 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Наличие</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stock"
                      checked={filters.inStock === undefined}
                      onChange={() => handleStockChange(undefined)}
                      className="mr-2"
                    />
                    Все
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="stock" checked={filters.inStock === true} onChange={() => handleStockChange(true)} className="mr-2" />В
                    наличии
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="stock" checked={filters.inStock === false} onChange={() => handleStockChange(false)} className="mr-2" />
                    Нет в наличии
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Рейтинг</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.minRating === rating}
                        onChange={() => handleRatingChange(rating)}
                        className="mr-2"
                      />
                      {rating}+ звезды и выше
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-900">Товары {filteredProducts.length > 0 && `(${filteredProducts.length})`}</h3>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="w-24 aspect-square animate-spin" />
              </div>
            ) : filteredProducts().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-6xl mb-4">😔</div>
                <div className="text-2xl text-gray-600 mb-2">Ничего не найдено</div>
                <div className="text-gray-500 mb-4">Попробуйте изменить параметры фильтрации</div>
                <button onClick={clearFilters} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">AudioStore</h4>
              <p className="text-gray-400">Лучшие аудио-решения для настоящих ценителей звука</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Магазин</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Наушники
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Колонки
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Аксессуары
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Контакты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Доставка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Возврат
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <p className="text-gray-400">+7 (999) 999-99-99</p>
              <p className="text-gray-400">info@audiostore.ru</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
