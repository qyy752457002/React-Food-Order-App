import { useContext } from 'react';

import { currencyFormatter } from '../util/formatting.js'; // 导入货币格式化工具
import Button from './UI/Button.jsx'; // 导入按钮组件
import CartContext from '../store/CartContext.jsx'; // 导入购物车上下文

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext); // 使用购物车上下文

  // 处理将餐品添加到购物车的函数
  function handleAddMealToCart() {
    cartCtx.addItem(meal); // 调用购物车上下文中的addItem函数将餐品添加到购物车
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} /> {/* 餐品图片 */}
        <div>
          <h3>{meal.name}</h3> {/* 餐品名称 */}
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)} {/* 餐品价格，使用货币格式化工具 */}
          </p>
          <p className="meal-item-description">{meal.description}</p> {/* 餐品描述 */}
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button> {/* 添加到购物车按钮 */}
        </p>
      </article>
    </li>
  );
}