import { Product, ProductsResponse } from "../types/product";

const BASE_URL = "https://dummyjson.com";

export const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};
