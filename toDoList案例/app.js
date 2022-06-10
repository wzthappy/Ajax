/*
    这个服务器是自己瞎写的  请勿参考
*/
// 引入 express 框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 导入 mysql 模块
const mysql = require('mysql');
// 导入 bodyParser模块
const bodyParser = require('body-parser');
// 创建 web 服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, '/public')));
// 处理 post 请求参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
    // status 默认值为 1，表示失败的情况
    // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        });
    }
    next();
});

// 导入并配置 cors 中间件
const cors = require('cors');
app.use(cors());

// 数据库连接
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '18729231365wzt',
    database: 'todolist'
});

// 获取任务
app.get('/todo/task', (req, res) => {
    // 定义查询语句
    const sql = 'select * from todo';
    // 执行sql语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        res.send(results);
    });
});

// 添加任务
app.post('/todo/addTask', (req, res) => {
    // 客户端发送过来的title数据
    const title = req.body.title;
    // 判断输入的值是否当前数据库中有
    const sql = 'select * from todo where title=?';
    db.query(sql, title, (err, results) => {
        if (err) return res.cc(err);
        if (results.length > 0) return res.send('用户名被占用，请更换其他用户名!');
        // 定义插入新用户的 SQL 语句
        const sql = 'insert into todo set ?';
        db.query(sql, { title: title, completed: 'false' }, (err, results) => {
            // 判断 SQL 语句是否成功
            if (err) return res.cc(err);
            // 判断影响行数是否为 1
            if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试!');
            // 注册用户成功
            const sql = 'select * from todo where title=?';
            db.query(sql, title, (err, results) => {
                // 响应延迟   更好查看进度条
                setTimeout(() => {
                    res.send(results[0]);
                }, 2000);
            });
        });
    });
});

// 删除任务
app.get('/todo/deleteTask', (req, res) => {
    // 拿到客户端发送来的_id值
    const id = req.query._id;
    // 返回被删除的对象
    const sql1 = `select * from todo where _id=?`;
    db.query(sql1, id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('查询失败!');
        res.send(results[0]);
    });

    // 定义要删除的sql语句
    const sql = 'delete from todo where _id=?';
    // 执行sql语句
    db.query(sql, id, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('删除失败!');
    });
});

// 更改任务状态
app.post('/todo/modifyTask', (req, res) => {
    // 要发生选中状态的id
    const id = req.body._id;
    // 要发生选中状态的值
    const completed = req.body.completed + '';
    // 要修改的值
    const title = req.body.title;
    // sql语句
    const sql = 'update todo set completed=?,title=? where _id=?';
    // 执行sql语句
    db.query(sql, [completed, title, id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('更改失败');
        // 成功
        const sql1 = `select * from todo where _id=?`;
        db.query(sql1, [id], (err, results) => {
            res.send(results[0]);
        });
    });
});

// 未结束.....

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
});