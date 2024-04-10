import fs from 'node:fs/promises'; // 导入文件系统模块的promises API
import bodyParser from 'body-parser'; // 导入用于解析请求体的body-parser模块
import express from 'express'; // 导入Express框架

const app = express(); // 创建Express应用程序实例

app.use(bodyParser.json()); // 使用body-parser中间件解析JSON请求体
app.use(express.static('public')); // 指定静态文件目录为public

// 设置CORS头部，允许跨域请求
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 处理GET请求，返回可用餐品数据
app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

// 处理POST请求，创建新订单
app.post('/orders', async (req, res) => {
  const orderData = req.body.order; // 获取请求体中的订单数据

  // 检查订单数据是否完整
  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  // 检查顾客信息是否完整
  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  // 生成新订单ID
  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  // 读取所有订单数据
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);

  // 将新订单添加到订单数组中
  allOrders.push(newOrder);

  // 将更新后的订单数据写入文件
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));

  // 返回订单创建成功的响应
  res.status(201).json({ message: 'Order created!' });
});

// 处理未匹配的请求
app.use((req, res) => {
  // 如果请求是OPTIONS预检请求，返回状态码200
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  // 否则，返回404 Not Found
  res.status(404).json({ message: 'Not found' });
});

// 监听3000端口
app.listen(3000);

