const Router = require("koa-router")
const router = new Router()
const userRouter = require("./user.js")
const manageRouter = require("./manage.js")
const attrRouter = require('./attr.js');
const spuRouter = require('./spu.js');
const skuRouter = require('./sku.js');
const roleRouter = require('./role.js');


// router.get('/', context => {
//     ctx.set('Content-Type', 'text/html;charset=utf-8');
//     context.body = fs.readFileSync('./public/upload/dist/index.html');
// })


// 统一加前缀
router.prefix("/development")

// 注册user路由级中间件
router.use("/user", userRouter.routes(), userRouter.allowedMethods())

// 注册管理路由级中间件
router.use("/manage", manageRouter.routes(), manageRouter.allowedMethods())

// 注册属性路由级中间件
router.use("/attr", attrRouter.routes(), attrRouter.allowedMethods())

// 注册spu路由级中间件
router.use("/spu", spuRouter.routes(), spuRouter.allowedMethods())

// 注册sku路由级中间件
router.use("/sku", skuRouter.routes(), skuRouter.allowedMethods())

// 注册role路由级中间件
router.use("/role", roleRouter.routes(), roleRouter.allowedMethods());

module.exports = router;