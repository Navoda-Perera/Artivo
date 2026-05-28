import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('artivo_cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('artivo_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize, qty = 1) => {
    const key = `${product._id}-${selectedSize?.label || 'default'}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        toast.success('Quantity updated');
        return prev.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      toast.success('Added to cart 🛒');
      return [...prev, {
        key,
        _id: product._id,
        name: product.name,
        image: product.images?.[0]?.url || '',
        price: selectedSize?.price || product.price,
        size: selectedSize?.label || '',
        qty,
      }];
    });
  };

  const removeFromCart = (key) => {
    setCartItems((prev) => prev.filter((i) => i.key !== key));
    toast.success('Removed from cart');
  };

  const updateQty = (key, qty) => {
    if (qty < 1) return;
    setCartItems((prev) => prev.map((i) => i.key === key ? { ...i, qty } : i));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, i) => acc + i.qty, 0);
  const cartTotal = cartItems.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
