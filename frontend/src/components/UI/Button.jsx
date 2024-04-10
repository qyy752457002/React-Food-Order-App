// 自定义按钮组件
export default function Button({ children, textOnly, className, ...props }) {
  // 根据 textOnly 属性确定按钮样式类名
  let cssClasses = textOnly ? 'text-button' : 'button';
  // 将 className 属性添加到样式类名中
  cssClasses += ' ' + className;

  // 返回带有样式类名和其他属性的按钮元素
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
