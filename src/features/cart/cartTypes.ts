// item in cart
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

// type for cart state
export interface CartState {
  items: CartItem[];
}
