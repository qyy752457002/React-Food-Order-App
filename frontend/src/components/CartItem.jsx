// 从'../util/formatting.js'导入currencyFormatter工具函数，用于格式化价格显示
import { currencyFormatter } from '../util/formatting.js';

// 定义并导出CartItem组件，它接受name, quantity, price, onIncrease, 和 onDecrease作为props
export default function CartItem({
  name,       // 商品名称
  quantity,   // 商品数量
  price,      // 商品单价
  onIncrease, // 点击增加按钮时调用的函数
  onDecrease, // 点击减少按钮时调用的函数
}) {
  return (
    <li className="cart-item">
      <p>
        {/* 显示商品名称，数量，以及格式化后的价格 */}
        {/* 价格通过currencyFormatter格式化，以适应不同的货币显示格式 */}
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        {/* 减少按钮，点击时调用onDecrease函数 */}
        <span>{quantity}</span>
        {/* 显示当前商品的数量 */}
        <button onClick={onIncrease}>+</button>
        {/* 增加按钮，点击时调用onIncrease函数 */}
      </p>
    </li>
  );
}