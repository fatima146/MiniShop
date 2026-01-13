// the type for a product from DummyJson API
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// type for a response
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
