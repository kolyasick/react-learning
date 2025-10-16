import { useProduct } from "../hooks/useProduct";
import type { CartProduct, Product, ProductCategory, ProductFilters } from "../types/product";
import Filters from "../components/Filters";
import { Loader } from "../components/icons/Loader";
import ProductItem from "../components/product/ProductItem";

type Props = {
  filters: ProductFilters;
  cart: CartProduct[];
  addToCart: (product: Product, initial?: boolean) => void;
  deleteFromCart: (p: Product, isTotal: boolean) => void;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
  getProductQty: (p: Product) => number;
};

const IndexPage: React.FC<Props> = ({ filters, setFilters, cart, addToCart, deleteFromCart, getProductQty }) => {
  const categories: ProductCategory[] = ["Аксессуары", "Наушники", "Планшеты", "Смартфоны", "Ноутбуки", "Игровые консоли"];
  const brands = ["Apple", "Samsung", "Sony", "Dell", "Nintendo", "Bose", "Canon"];
  const { products, loading } = useProduct();

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <Filters filters={filters} setFilters={setFilters} products={products} categories={categories} brands={brands} clearFilters={clearFilters} />

        <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Товары {filteredProducts().length > 0 && `(${filteredProducts().length})`}</h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-24 aspect-square animate-spin" />
            </div>
          ) : filteredProducts().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts().map((product) => (
                <ProductItem key={product.id} product={product} getProductQty={getProductQty} addToCart={addToCart} deleteFromCart={deleteFromCart} />
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
  );
};

export default IndexPage;
