import type { Product, ProductCategory, ProductFilters } from "../types/product";

type Props = {
  filters: ProductFilters;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
  clearFilters: () => void;
  products: Product[];
  categories: ProductCategory[];
  brands: string[];
};

const Filters: React.FC<Props> = ({ filters, setFilters, categories, brands, clearFilters }) => {
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

  return (
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
                <input type="radio" name="category" checked={filters.category === cat} onChange={() => handleCategoryChange(cat)} className="mr-2" />
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
              value={filters.minPrice || ""}
              onChange={(e) => handlePriceChange(Number(e.target.value), filters.maxPrice || 5000)}
              className="w-1/2 px-2 py-1 border border-gray-300 rounded text-sm"
            />
            <input
              type="number"
              placeholder="До"
              value={filters.maxPrice || ""}
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
  );
};

export default Filters;
