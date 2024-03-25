import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export interface CartItem {
  count: number;
  productItemId: number;
  productId: number;
  productItemImage: string;
  productItemName: string;
  qtyInStock: number;
  rating: number;
  price: number;
}

export type CartItems = CartItem[];

export interface CartItemsContextType {
  cartItems: CartItems;
  setCartItems: Dispatch<SetStateAction<CartItems>>;
}


const defaultCartItems: CartItems = [
  {
    count: 0,
    productItemId: 0,
    productId: 0,
    productItemImage: "",
    productItemName: "",
    qtyInStock: 0,
    rating: 0,
    price: 0
  }
];

// Creating the cart item context
export const CartItemsContext = createContext<CartItemsContextType>({
  cartItems: defaultCartItems,
  setCartItems: () => {} 
});

// Creating type for useProviderProps
type CartItemsProviderProps = {
  children: ReactNode;
}

// Creating the provider
export default function CartItemsProvider({ children }: CartItemsProviderProps) {
  const [cartItemsArray, setCartItemsArray] = useState<CartItem[]>([]);

  return (
    <CartItemsContext.Provider value={{ cartItems: cartItemsArray, setCartItems: setCartItemsArray }}>
      {children}
    </CartItemsContext.Provider>
  );
}
