import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import axios from "axios";

export const useProduct = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const findAll = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>("/src/api/products.json");
      setProducts(data);
      return data;
    } catch (error) {
      console.log("Ошибка при загрузке продуктов: ", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findAll();
  }, []);

  const findById = async (id: number) => {
    if (products.length > 0) {
      return products.find((p) => p.id === id);
    }

    const allProducts = await findAll();
    return allProducts.find((p) => p.id === id);
  };

  return {
    loading,
    products,
    findById,
  };
};