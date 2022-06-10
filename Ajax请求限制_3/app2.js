// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 创建web服务器
const app = express();


// 身份认证
const session = require('express-session');
// 配置
app.use(session({
    secret: 'wzt_ ^_^',    // 加密的字符串
    resave: false,
    saveUninitialized: true
}));


// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

// 解析表单数据
const formidable = require('formidable');

// 不拦截所有请求
// 用服务器访问就不需要他了
app.use((req, res, next) => {
    // 1. 允许那些客户端访问我
    // * 代表允许所有的客户端访问我
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // 2. 允许客户端使用那些请求方法访问我
    res.header('Access-Control-Allow-Methods', 'get, post');
    
    // 3. 允许客户端发送跨域请求时携带cookie信息
    res.header('Access-Control-Allow-Credentials', true);

    next();
});


// 02_使用jsop向非同源服务器端请求数据.html
app.get('/test', (req, res) => {
    const result = 'fn({name: "张三"})';
    res.send(result);
});

// 03_使用jsnp向非同源服务器请求数据.html
// 04_封装json方法.html
app.get('/better', (req, res) => {
    // 接收客户端传递过来的函数名称
    // const fnName = req.query.callback;
    // // 将函数名称对应的函数调用代码返回给客户端
    // const data = JSON.stringify({name: "张三"});
    // const result =`${fnName}(${data})`;
    // setTimeout(()=>{
    //     res.send(result);
    // }, 1000);

    res.jsonp({name: 'lisi', age: 20});
});

// 06_CORS跨越资源共享.html
// 07_访问非同源数据的服务器端解决方案.html
app.get('/cross', (req, res) => {
    res.send('ok');
});

// 08_实现跨域登录功能.html
app.post('/login', (req, res) => {
    // 创建表单解析对象
    var form = new formidable.IncomingForm();
    // 解析表单
    form.parse(req, (err, fields, file) => {
        // 接收客户端传递过来的用户名和密码
        const { username, password } = fields;
        // 用户名密码比对
        if (username == 'wzt' && password == '123456') {
            // 设置session
            req.session.isLogin = true;     // 身份认证的
            res.send({message: '登录成功'});
        } else {
            req.session.isLogin = false;
            res.send({message: '登录失败，用户名和密码错误'});
        }
    });
});
// 08_实现跨域登录功能.html
app.get('/checkLogin', (req, res) => {
   if (req.session.isLogin) {
       res.send({message: '当前处于登录状态'});
   } else {
       res.send({message: '处于未登录状态'});
   }
});


// 监听端口
app.listen(3002, () => {
    console.log('服务器启动成功');
});