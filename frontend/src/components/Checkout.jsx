import { useContext } from 'react';

import Modal from './UI/Modal.jsx'; // 引入Modal组件
import CartContext from '../store/CartContext.jsx'; // 引入购物车上下文
import { currencyFormatter } from '../util/formatting.js'; // 引入货币格式化工具
import Input from './UI/Input.jsx'; // 引入Input组件
import Button from './UI/Button.jsx'; // 引入Button组件
import UserProgressContext from '../store/UserProgressContext.jsx'; // 引入用户进度上下文
import useHttp from '../hooks/useHttp.js'; // 引入自定义HTTP钩子
import Error from './Error.jsx'; // 引入Error组件

const requestConfig = { // 配置请求信息
  method: 'POST', // 请求方法
  headers: { // 请求头
    'Content-Type': 'application/json', // 内容类型
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext); // 使用购物车上下文
  const userProgressCtx = useContext(UserProgressContext); // 使用用户进度上下文

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp('http://localhost:3000/orders', requestConfig); // 使用自定义HTTP钩子

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price, // 计算购物车总金额
    0
  );

  function handleClose() { // 处理关闭模态框
    userProgressCtx.hideCheckout();
  }

  function handleFinish() { // 处理完成订单
    userProgressCtx.hideCheckout();
    cartCtx.clearCart(); // 清空购物车
    clearData(); // 清除请求数据
  }

  function handleSubmit(event) { // 提交表单
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // 从表单数据中获取客户数据

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items, // 订单项
          customer: customerData, // 客户信息
        },
      })
    );
  }

  let actions = ( // 根据状态设置动作按钮
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) { // 如果正在发送数据，显示提示
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) { // 如果订单提交成功且无错误，显示成功信息
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return ( // 渲染结账模态框
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

