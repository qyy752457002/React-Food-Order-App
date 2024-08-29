import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'

/*
  ReactDOM.createRoot(document.getElementById('root')).render(): 

  这行代码将会在具有 id 为 "root" 的 div 元素内部渲染 <App /> 组件。

  所以，"root" div 将成为 <App /> 组件的容器，并且 <App /> 组件将成为 "root" div 的子节点。
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)