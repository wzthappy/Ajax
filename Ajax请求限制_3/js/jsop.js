// 自己封装的
function jsonp(options) {
    // 动态创建script标签
    var script = document.createElement('script');
    // 拼接字符串的变量  循环对象
    var params = '';
    for (var attr in options.data) {
        params += "&" + attr + '=' +options.data[attr];
    }
    // 0.124231   ==   "myJsonp0124231"
    var fnName = 'myJsonp' + Math.random().toString().replace('.', '');  // 为了防止函数覆盖

    // 他已经不是一个全局函数了
    // 我们要想办法把他变成全局函数
    window[fnName] = options.success;
    // 为script标签添加src属性
    script.src = options.url + `?callback=${fnName}${params}`;
    // 将script标签追加到页面中
    document.body.appendChild(script);
    // 为script标签添加onload事件
    script.onload = function () {
        document.body.removeChild(script);
    }
}