// 自己封装的
function ajax(options) {
    // 存储的是默认值
    var defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {'Content-Type': 'application/x-www-form-urlencoded'},
        success: () => {},
        error: () => {}
    }
    Object.assign(defaults, options);
    // 创建 Ajax 对象
    var xhr = new XMLHttpRequest();
    // 拼接请求参数的变量
    var params = '';
    // 循环用户传递进来的对象格式参数
    for (var attr in defaults.data) {
    // 将参数转换为字符串格式
        params += attr + '=' + defaults.data[attr] + '&';
    }
    // 将参数最后面的&截取掉
    // 将截取的结果重新赋值给params变量
    params = params.substr(0, params.length - 1);

    // 判断请求方式
    if (defaults.type == 'get') {
        defaults.url += `?${params}`;
    }
    /*
        {
            name: 'zhangsan',
            age: 20
        }

        name=zhangsan&age=20
    */
    // 配置 Ajax 对象
    xhr.open(defaults.type,defaults.url);
    // 如果请求方式为 post
    // 发送请求
    if (defaults.type == 'post') {
        // 用户希望向服务器端传递的请求参数的类型
        var contentType = defaults.header['Content-Type'];
        // 设置请求参数格式的类型
        xhr.setRequestHeader('Content-Type', contentType);
        // 判断用户希望的请求参数格式的类型
        // 如果类型为json
        if (contentType == 'application/json') {
            // 向服务器端传递json数据的参数
            xhr.send(JSON.stringify(defaults.data));
        } else {
            // 向服务器端传递普通类型的请求参数
            xhr.send(params);
        }
    } else {
        xhr.send();
    }
    // 监听 xhr 对象下面的 onload 事件
    // 当 xhr 对象接收完响应数据后触发
    xhr.addEventListener('load', () => {
        // xhr.getResponseHeader()   获取响应头中的数据
        var contentType = xhr.getResponseHeader('Content-Type');
        // 服务器端放回的数据
        var responseText = xhr.responseText;

        // 如果响应类型中包含 application/json 
        if (contentType.includes('application/json')) {
            // 将json字符串转换为json对象
            responseText = JSON.parse(responseText);
        } 
        // 当http状态码对于200的时候
        if (xhr.status == 200) {
            // 请求成功   调用处理成功情况的函数
            defaults.success(responseText, xhr);
        } else {
            // 请求失败  调用处理失败情况的函数
            defaults.error(responseText, xhr);
        }
    });
}