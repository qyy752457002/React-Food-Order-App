// Input组件的定义。它接受label和id作为props，以及其他的props。
export default function Input({ label, id, ...props }) {
  return (
    // 包裹输入控件的段落标签，使用了"control"类以应用特定样式。

    /* label元素，关联到特定的输入字段，以显示字段的标签文本。
        htmlFor属性确保点击标签时，关联的输入字段会获得焦点。 */

    /* input元素，使用扩展运算符传入的其他props填充其属性。
          id属性使输入字段与其标签关联，name属性通常用于表单提交时标识字段，
          required属性确保在提交表单前用户必须填写该输入字段。 */

    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </p>
  );
}

/*
  这个组件接受label和id作为必要的props，用于生成一个带有标签的输入框。
  id属性确保输入框与其标签关联，从而提高可访问性。
  另外，使用...props允许你向input元素传递额外的属性，使得这个组件非常灵活。
*/