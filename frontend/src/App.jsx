import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

/*
  这段代码展示了一个React应用的主要组件结构，
  其中涉及了两个上下文提供者：`UserProgressContextProvider` 和 `CartContextProvider`。

  让我逐步解释每个组件的作用：

  1. `UserProgressContextProvider`：这是一个上下文提供者组件，它提供了一个用于跟踪用户进度的上下文。
                                    通过它，子组件可以访问用户的进度信息以及相关的更新函数。

  2. `CartContextProvider`：这是另一个上下文提供者组件，它提供了一个用于管理购物车状态的上下文。
                            类似于`UserProgressContextProvider`，它使得购物车的状态和相关的操作函数对其子组件可用。

  3. `Header`：这是一个用于显示应用标题或导航的组件，通常包含网站的标志、导航链接等内容。

  4. `Meals`：这是一个用于显示餐品列表或菜单的组件，可能包含各种可供选择的菜品。

  5. `Cart`：这是一个用于显示购物车内容的组件，
            通常包含用户已选择的商品列表以及与购物车相关的操作（如增加/减少数量、移除商品等）。

  6. `Checkout`：这是一个用于结账的组件，通常包含用户填写送货地址、支付方式等信息的表单，以及提交订单的按钮。

  综合起来，`App` 组件是应用的根组件，它包含了整个应用的主要结构。

  通过将 `UserProgressContextProvider` 和 `CartContextProvider` 包裹在 `App` 组件内部，
  它确保了应用中的其他组件都能够访问到用户进度和购物车的状态信息，并能够进行相应的更新操作。
*/

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;