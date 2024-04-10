// 从react包中导入useEffect和useRef钩子
import { useEffect, useRef } from 'react';
// 从react-dom包中导入createPortal函数，用于将子节点渲染到存在于父组件以外的DOM节点
import { createPortal } from 'react-dom';

// 定义并导出Modal组件，接受children, open, onClose, className作为props
export default function Modal({ children, open, onClose, className = ''}) {
  // 使用useRef创建一个引用（ref），用于引用dialog元素
  const dialog = useRef(); 

  // 使用useEffect钩子，监听open属性的变化
  useEffect(() => {
    // 通过current属性访问挂载的dialog DOM元素
    const modal = dialog.current;

    // 如果open为true，则显示模态窗口
    if (open) {
      modal.showModal(); 
    } 

    // 组件卸载时调用的清理函数，关闭模态窗口
    return () => modal.close();
  }, [open]); // 仅在open值变化时重新运行

  // 使用createPortal将dialog元素渲染到id为'modal'的DOM节点上
  // 使用dialog HTML元素创建模态窗口，并设置一个ref以便能够直接操作DOM元素
  // className用于接收外部传入的CSS类，实现样式的自定义
  // onClose属性用于处理模态窗口关闭时的事件

  /*
    所以，{children}插槽的具体位置在Modal组件定义中的<dialog>标签内部。
    这允许任何嵌套在Modal标签内的元素或组件在模态窗口中显示。
  */
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children} {/* 插槽，用于传入显示在模态窗口中的React子元素 */}
    </dialog>,

    document.getElementById('modal') // 定位渲染目标节点
  );
}