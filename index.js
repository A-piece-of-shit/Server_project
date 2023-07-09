const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

const fs = require('fs');

//连接mysql数据库
require('./mysql/index.js');



const static = require('koa-static');
app.use(static('./public'));

//导入跨域
const cors = require('koa2-cors');// CORS是一个W3C标准，全称是"跨域资源共享"
app.use(cors()); //全部允许跨域





//路由
const Router = require("./router");

app.use(bodyParser());
//应用路由
app.use(Router.routes());






// 当请求方法错误时（比如需要get请求发成了post请求），提示相应错误
app.use(Router.allowedMethods())





app.listen(3000);