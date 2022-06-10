// 引入 express 框架
const express = require('express');
// 路径处理模块
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
// 创建 web 服务器
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public_1')));

// 对应 01_Ajax入门.html 文件
app.get('/first', (req, res) => {  
    res.status(400).send('Hello Ajax');
});

app.post('/first', (req, res) => {  
    res.status(400).send('Hello Ajax');
});
// 对应 02_处理服务器端返回的JSON数据.html 文件
app.get('/responseData', (req, res) => {
    res.send({
        "name": "zs"
    });
})
// 对应 03_传递get请求参数.html 文件
app.get('/get', (req, res) => {
     res.send(req.query);
});
// 对应 04_传递post请求参数.html 文件
app.post('/post',(req, res) => {
    res.send(req.body);
});
// 对应 05_向服务器传递JSON格式的请求参数.html 文件
app.post('/json',(req, res) => {
    res.send(req.body);
});
// 对应 06_获取服务器端响应数据的另一种方法.html 文件
app.get('/readystate', (req, res) => {
    res.send('hello');
});
// 对应 07_Ajax错误处理.html 文件
app.get('/error', (req, res) => {
    res.status(400).send('not ok');
    // console.log(op);   500
});
// 对应 08_Ajax缓存.html 文件
app.get('/cache', (req, res) => {
    fs.readFile(path.join(__dirname, '/test.txt'), (err, result) => {
        res.send(result);
    });
});

// 监听端口
app.listen(3000, () => {
    console.log('服务器启动成功');
});