type Currency = "USD" | "EUR" | "RUB" | "UAH";
export type ProductCategory = "Смартфоны" | "Ноутбуки" | "Наушники" | "Планшеты" | "Игровые консоли" | "Аксессуары";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  currency: Currency;
  description: string;
  image: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  features: string[];
  brand: string;
}


export interface ProductFilters {
  category?: ProductCategory | "all";
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  minRating?: number;
  brands?: string[];
}
