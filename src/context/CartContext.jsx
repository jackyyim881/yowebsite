import React, { createContext, useContext, useReducer, useEffect } from "react";

// 创建上下文
const CartContext = createContext();

// 初始状态
const initialState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

// 定义reducer处理各种购物车操作
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // 如果商品已存在，更新数量
        const updatedCart = state.cart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }
          return item;
        });

        return calculateCartTotals({
          ...state,
          cart: updatedCart,
        });
      } else {
        // 添加新商品
        const updatedCart = [...state.cart, action.payload];

        return calculateCartTotals({
          ...state,
          cart: updatedCart,
        });
      }
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload
      );

      return calculateCartTotals({
        ...state,
        cart: updatedCart,
      });
    }

    case "UPDATE_QUANTITY": {
      const updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });

      return calculateCartTotals({
        ...state,
        cart: updatedCart,
      });
    }

    case "CLEAR_CART":
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

// 计算购物车总数和总价
function calculateCartTotals(state) {
  const totalItems = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = state.cart.reduce((total, item) => {
    // 考虑折扣价格
    const itemPrice = item.discount
      ? item.price - (item.price * item.discount) / 100
      : item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  return {
    ...state,
    totalItems,
    totalPrice,
  };
}

// 创建上下文提供者组件
export function CartProvider({ children }) {
  // 从本地存储加载初始状态
  const savedCart = localStorage.getItem("cart");
  const initialCartState = savedCart ? JSON.parse(savedCart) : initialState;

  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // 当购物车发生变化时保存到本地存储
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  // 创建要提供的上下文值
  const value = {
    cart: state.cart,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    addToCart: (product, quantity = 1) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...product, quantity },
      });
    },
    removeFromCart: (productId) => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: productId,
      });
    },
    updateQuantity: (productId, quantity) => {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, quantity },
      });
    },
    clearCart: () => {
      dispatch({ type: "CLEAR_CART" });
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 创建自定义钩子以便于使用
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
