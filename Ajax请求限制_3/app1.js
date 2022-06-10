// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 向其他服务器端请求数据的模块
const request = require('request');

// 创建web服务器
const app = express();

// 导入并配置 cors 中间件
const cors = require('cors');
app.use(cors()); 

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

// 07_访问非同源数据的服务器端解决方案.html
app.get('/server', (req, res) => {
    request('http://127.0.0.1:3002/cross', function(error, response, body) {
        res.send(body);
    });
});


// 监听端口
app.listen(3000, () => {
    console.log('服务器启动成功');
});