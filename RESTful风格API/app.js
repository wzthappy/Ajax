const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));


// 获取用户列表信息
app.get('/users', (req, res) => {
    res.send('当前是获取用户列表信息的路由');
});

// 获取某一个用户具体信息的路由
app.get('/users/:id', (req, res) => {
    // 获取客户端传递过来的用户id
    const id = req.params.id;
    res.send(`当前我们是在获取id为${id}用户信息`);
});

// 删除某一个用户
app.delete('/users/:id', (req, res) => {
    // 获取客户端传递过来的用户id
    const id = req.params.id;
    res.send(`当前我们是在删除id为${id}用户信息`);
});

// 修改某一个用户的信息
app.put('/users/:id', (req, res) => {
    // 获取客户端传递过来的用户id
    const id = req.params.id;
    res.send(`当前我们是在修改id为${id}用户信息`);
});

// 添加某一个用户的信息
app.post('/users', (req, res) => {
    // 获取客户端传递过来的用户id
    const id = req.body.id;
    res.send(`_______当前我们是在添加id为${id}用户信息`);
});

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
});