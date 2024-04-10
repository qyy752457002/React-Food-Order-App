import { createContext, useState } from 'react';

// 创建一个 UserProgressContext，并提供默认值
const UserProgressContext = createContext({
  progress: '', // 用户进度，可能的取值为 'cart'（购物车），'checkout'（结账）
  showCart: () => {}, // 显示购物车的函数
  hideCart: () => {}, // 隐藏购物车的函数
  showCheckout: () => {}, // 显示结账页面的函数
  hideCheckout: () => {}, // 隐藏结账页面的函数
});

// 定义用户进度上下文提供程序组件
export function UserProgressContextProvider({ children }) {
  // 使用 useState 创建用户进度状态
  const [userProgress, setUserProgress] = useState('');

  // 显示购物车的函数
  function showCart() {
    setUserProgress('cart');
  }

  // 隐藏购物车的函数
  function hideCart() {
    setUserProgress('');
  }

  // 显示结账页面的函数
  function showCheckout() {
    setUserProgress('checkout');
  }

  // 隐藏结账页面的函数
  function hideCheckout() {
    setUserProgress('');
  }

  // 定义用户进度上下文对象
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  // 返回包装了用户进度上下文的提供程序组件
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

// 默认导出用户进度上下文
export default UserProgressContext;

