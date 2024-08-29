import { createContext, useReducer } from 'react';

// 创建一个 CartContext，并提供默认值
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

// 定义购物车 reducer 函数
function cartReducer(state, action) {
  // 处理添加商品的情况
  if (action.type === 'ADD_ITEM') {
    // 查找已存在的商品在购物车中的索引
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // 复制购物车商品数组
    const updatedItems = [...state.items];

    // 如果商品已存在于购物车中，则更新其数量
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // 否则将新商品添加到购物车中
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    // 返回更新后的购物车状态
    return { ...state, items: updatedItems };
  }

  // 处理移除商品的情况
  if (action.type === 'REMOVE_ITEM') {
    // 查找要移除商品的索引
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    // 复制购物车商品数组
    const updatedItems = [...state.items];

    // 如果商品数量为1，则从购物车中移除
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      // 否则更新商品数量
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // 返回更新后的购物车状态
    return { ...state, items: updatedItems };
  }

  // 处理清空购物车的情况
  if (action.type === 'CLEAR_CART') {
    // 返回一个空的购物车状态
    return { ...state, items: [] };
  }

  // 默认情况下返回当前状态
  return state;
}

// 导出购物车上下文提供程序组件
export function CartContextProvider({ children }) {
  // 使用 useReducer 创建购物车状态和调度函数
  // 这儿 { items: [] } 是 传入 cartReducer() 函数 的 state参数 的初始值
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  // 定义向购物车中添加商品的函数
  function addItem(item) {
    // 这儿 { type: 'ADD_ITEM', item } 是传递给 dispatchCartAction() 的 action参数，会传递给 cartReducer() 函数
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  // 定义从购物车中移除商品的函数
  function removeItem(id) {
    // 这儿 { type: 'REMOVE_ITEM', id } 是传递给 dispatchCartAction 的 action，会传递给 cartReducer() 函数
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  }

  // 定义清空购物车的函数
  function clearCart() {
    // 这儿 { type: 'CLEAR_CART' } 是传递给 dispatchCartAction 的 action，会传递给 cartReducer() 函数
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  // 定义购物车上下文对象
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  // 返回包装了购物车上下文的提供程序组件
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

// 默认导出购物车上下文
export default CartContext;












