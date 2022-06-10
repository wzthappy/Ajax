const express = require('express');
const app = express();
const path = require('path');

// 允许不同源访问
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','get, post');

    next();
});
                // ======== 
// // 导入并配置 cors 中间件
// const cors = require('cors');
// app.use(cors()); 

// 解析 json 数据
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));


// 01_$.ajax方法基本使用.html
// 05_$.get、$.post方法的使用.html
app.get('/base', (req, res) => {
    res.send({
        name: 'zhangsan',
        age: 30
    });
});
app.post('/base', (req, res) => {
    res.status(400).send({   // 400 为失败的状态码
        name: 'zhooliu',
        age: 35
    });
});

// 02_$.ajax方法传递请求参数.html
app.post('/user', (req, res) => {
    res.send(req.body);
});

// 04_$.ajax方法发送json请求.html
app.get('/jsonp', (req, res) => {
    const cd = req.query.cd;
    const data = `${cd}({
        name: 'zhaoliu',
        age: 21
    })`;
    res.send(data);

    // res.jsonp({
    //     name: 'lisi',
    //     age: 50
    // });
});

// 06_xml介绍.html
app.get('/xml', (req, res) => {
    res.header('content-type', 'text/xml');
    res.send('<message><title>消息标签</title><content>信息内容</content></message>');
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});