// eg

const express = require('express');
// 路径处理模块
const path = require('path');
// 创建 web 服务器
const app = express();

// 导入并配置 cors 中间件
const cors = require('cors');
app.use(cors());

// 解析表单数据
const formidable = require('formidable');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 静态资源访问服务功能
app.use(express.static('./eg_2'));

// 自己写的  
// 02_验证邮箱地址唯一性.html
app.get('/verifyEmailAdress', (req, res) => {
    const email = req.query.email;
    console.log(email);
    // wzt@wzt.cn  这个邮箱已被注册
    if (email === 'wzt@wzt.cn') return res.status(400).send({ message: '邮箱地址已经注册过了，请更换其他邮政地址!' });
    // 成功的
    res.send({ message: '恭喜，邮政地址可用' });
});
// 03_搜索框内容自动提示.html
app.get('/searchAutoPrompt', (req, res) => {
    const key = req.query.key;
    // const z = /\/[黑马]*/;     // 不会
    // console.log(z.exec(key));  
    // if (z.exec(key)) {
    res.send([
        '黑马程序员',
        '黑马程序员官网',
        '黑马程序员顺义校区'
    ]);
    // }
});
// 04_省市区联动.html
app.get('/province', (req, res) => {
    res.send([{
        id: '001',
        name: '黑龙江省'
    }, {
        id: '002',
        name: '四川省'
    }, {
        id: '003',
        name: '河北省'
    }, {
        id: '004',
        name: '江苏省'
    }]);
});
app.get('/cities', (req, res) => {
    const id = req.query.id;
    if (id != 001) {
        res.send([{}]);
    }
    if (id == 001) {
        res.send([{
            id: 300,
            name: '哈尔滨市'
        }, {
            id: 301,
            name: '齐齐哈尔市'
        }, {
            id: 302,
            name: '牡丹江市'
        }, {
            id: 303,
            name: '佳木斯市'
        },]);
    }
});
app.get('/areas', (req, res) => {
    const id = req.query.id;

    if (id != 300) {
        res.send([{}]);
    }
    if (id == 300) {
        res.send([{
            id: 20,
            name: '道里区'
        }, {
            id: 21,
            name: '南岗区'
        }, {
            id: 22,
            name: '平房区'
        }, {
            id: 23,
            name: '松山区'
        },]);
    }
});
// 05_FormData对象的使用方法.html
app.post('/formData', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        res.send(fields);
    });
});
// 07_FromData对象实现二进制文件上传.html
app.post('/upload', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 设置客户端上传文件的存储路径
    form.uploadDir = path.join(__dirname, 'eg', 'uploads');
    // 保留上传文件的后缀名字
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        // 将客户端传递过来的文件地址响应到客户端
        res.send({
            path: files.attrName.path.split('eg')[1]
        });
    });
});
app.listen('3000', () => {
    console.log('http://127.0.0.1:3000');
});