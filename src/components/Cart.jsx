import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting.js'; // 引入货币格式化工具

import Modal from './UI/Modal.jsx'; // 引入模态框组件
import CartContext from '../store/CartContext.jsx'; // 引入购物车上下文
import Button from './UI/Button.jsx'; // 引入按钮组件
import UserProgressContext from '../store/UserProgressContext.jsx'; // 引入用户进度上下文
import CartItem from './CartItem.jsx'; // 引入购物车项目组件

export default function Cart() {
  const cartCtx = useContext(CartContext); // 使用购物车上下文
  const userProgressCtx = useContext(UserProgressContext); // 使用用户进度上下文

  // 计算购物车总金额
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  ); 

  // 处理关闭购物车的函数
  function handleCloseCart() {
    userProgressCtx.hideCart(); 
  }

  // 处理前往结账的函数
  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === 'cart'} // 根据用户进度显示模态框
      onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null} // 设置关闭模态框的回调
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)} // 增加商品数量
            onDecrease={() => cartCtx.removeItem(item.id)} // 减少商品数量
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p> {/* 显示格式化后的总金额 */}
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button> // 结账按钮仅当购物车非空时显示
        )}
      </p>
    </Modal>
  );
}