// 从react包中导入useContext钩子，用于访问React的Context
import { useContext } from 'react';

// 导入Button组件，用于在头部导航中展示按钮
import Button from './UI/Button.jsx';
// 导入应用logo图像
import logoImg from '../assets/logo.jpg';
// 导入购物车上下文
import CartContext from '../store/CartContext.jsx';
// 导入用户进度上下文
import UserProgressContext from '../store/UserProgressContext.jsx';

// 定义并导出Header组件
export default function Header() {
  // 使用useContext钩子获取购物车的上下文
  const cartCtx = useContext(CartContext);
  // 用户进度的上下文
  const userProgressCtx = useContext(UserProgressContext);


  // 这里的reduce函数中的0是用来初始化totalNumberOfItems的

  // 计算购物车中所有商品的总数量
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    // 累加每个商品的数量
    return totalNumberOfItems + item.quantity;
  }, 0);

  // 定义处理显示购物车的函数
  function handleShowCart() {
    // 调用用户进度上下文中的showCart方法
    userProgressCtx.showCart(); 
  }

  // 返回JSX，构成头部导航的UI结构
  return (
    <header id = "main-header">
      <div id = "title">
        <img src = {logoImg}  alt="A restaurant" /> {/* 展示logo图片 */}
        <h1>ReactFood</h1> {/* 网站标题 */}
      </div>
      <nav>
         {/* 渲染一个按钮，点击时调用handleShowCart函数，按钮内显示购物车商品总数 */}
         <Button textOnly onClick = {handleShowCart}>
            Cart ({totalCartItems})
         </Button>
      </nav>
    </header>
  );
}