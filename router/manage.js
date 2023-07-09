// 处理品牌模块路由
const Router = require('koa-router');
const router = new Router();

//处理文件上传
const multer = require('@koa/multer');
const upload = multer({ dest: './public/upload' });

const fs = require('fs');

//引入数据库接口
const resDb = require('../mysql/index.js');

//引入token接口
const { generationToken, verificationToken } = require('../token/index.js');

//引入当前服务器端域名
const domainNames = require('../url.js');

//响应获取品牌管理数据请求
router.get('/brand/:page/:limit', async (context) => {
    /*
    brandname 
    brandlogourl 
    brandcreationtime 
    brandedittime 
    brandlogourlname 
    brandlogosize
    */

    /*
    id?: number,
    //品牌logo添加时间
    creationDate
    //品牌logo编辑时间：第一次为品牌logo添加时间
    editDate
    //品牌名称
    brandName
    //品牌url
    brandLogoImg
    //品牌logo图片名称
    brandLogoFilename
    brandLogoSize
    */

    const data = await resDb(`select 
    id,
    brandname as brandName,
    brandlogourl as brandLogoImg,
    brandcreationtime as creationDate,
    brandedittime as editDate,
    brandlogourlname as brandLogoFilename,
    brandlogosize as brandLogoSize
    from
    table_brand
    limit ${(context.params.page - 1) * context.params.limit},${context.params.limit};`);

    const total = await resDb(`select count(*) as total from table_brand;`);

    // const brandArr = [
    //     {
    //         id: 1,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '小米',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 2,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '苹果',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 3,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '华为',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 1,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '小米',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 2,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '苹果',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 3,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '华为',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 1,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '小米',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 2,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '苹果',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 3,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '华为',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 1,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '小米',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 2,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '苹果',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 3,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '华为',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 1,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '小米',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 2,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '苹果',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 3,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '华为',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 1,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '小米',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 2,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '苹果',
    //         brandLogoImg: '11111111111111'
    //     },
    //     {
    //         id: 3,
    //         creationDate: '2021/12/3 7:4:12',
    //         editDate: '2021/12/3 7:4:12',
    //         brandName: '华为',
    //         brandLogoImg: '11111111111111'
    //     }
    // ];

    // const responesdata = [];

    // console.log((+context.params.page - 1) * +context.params.limit);
    // console.log(((+context.params.page - 1) * +context.params.limit) + (+context.params.limit));


    // try {
    //     const token = verificationToken(context.request.header.token);
    //     const page = (+context.params.page - 1) * +context.params.limit;
    //     const limit = ((+context.params.page - 1) * +context.params.limit) + (+context.params.limit);


    //     // console.log(limit);
    //     // console.log(page);

    //     for (let i = page; i < limit; i++) {
    //         if (i === brandArr.length - 1) {
    //             responesdata.push(brandArr[i]);
    //             break;
    //         }
    //         else responesdata.push(brandArr[i]);
    //     };
    //     // console.log(responesdata);

    //     // const data = await resDb('select useravatar,username from demo1 where accountnumber=?;', [token.accountNumber]);
    //     context.body = {
    //         code: 200,
    //         message: '成功',
    //         data: {
    //             total: brandArr.length,
    //             records: responesdata
    //         }
    //     }
    // } catch (error) {
    //     context.body = {
    //         code: 201,
    //         message: 'token过期，请重新登录！！！',
    //         data: null
    //     }
    // }

    // console.log(data);
    // console.log(total);

    context.body = {
        code: 200,
        message: '成功',
        total: total[0].total,
        data
    };


});


//响应添加品牌管理数据请求
router.post('/addbrand', async (context) => {


    const {
        brandName,
        brandLogoImg,
        creationDate,
        editDate,
        brandLogoFilename,
        brandLogoSize
    } = context.request.body;

    /*
        brandname 
        brandlogourl 
        brandcreationtime 
        brandedittime 
        brandlogourlname 
        brandlogosize
    */
    await resDb(`insert into table_brand (
        brandname,
        brandlogourl,
        brandcreationtime,
        brandedittime,
        brandlogourlname,
        brandlogosize
        ) values(?,?,?,?,?,?);`, [
        brandName,
        brandLogoImg,
        creationDate,
        editDate,
        brandLogoFilename,
        brandLogoSize
    ]);

    // console.log(result);

    context.body = { code: 200, message: '成功' };
});

//响应编辑品牌管理数据请求
router.post('/updatebrand', async (context) => {

    // console.log(context.request.body);

    let {
        id,
        brandName,
        brandLogoImg,
        editDate,
        brandLogoFilename,
        brandLogoSize
    } = context.request.body;


    //获取当前的完整时间

    const date = new Date();
    editDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;


    /*
    update 表名 set 字段名1=值1,字段名2=值2,字段名3=值3 where 条件;
    没有条件限制会导致该表所有数据全部更新
    */


    /*
        brandname 
        brandlogourl 
        brandcreationtime 
        brandedittime 
        brandlogourlname 
        brandlogosize
    */
    const result = resDb(`update table_brand set 
    brandname=?,
    brandlogourl=?,
    brandedittime=?,
    brandlogourlname=?,
    brandlogosize=?
    where id=${id}
    `, [brandName, brandLogoImg, editDate, brandLogoFilename, brandLogoSize]);


    // console.log(result);
    context.body = { code: 200, message: '成功' };

});


//响应elementui组件upload上传品牌logo数据请求
router.post('/brand/uploadingimages', upload.single('file'), async (context) => {
    // console.log(context.file);

    context.body = {
        code: 200,
        message: '成功',
        data: `manage/file/upload/${context.file.filename}`
    };

});


//响应品牌图片url数据请求
router.get('/file/upload/:filename', (context) => {
    // console.log(context.params);

    const data = fs.readFileSync(`./public/upload/${context.params.filename}`);

    context.set('Content-Type', 'image/jpeg');
    context.body = data;

});


//响应品牌图片url取消上传请求
router.get('/cancel/upload/:filename', (context) => {
    // console.log(context.params);


    // console.log(`./upload/${context.params.filename}`);

    fs.unlinkSync(`./public/upload/${context.params.filename}`);

    context.body = { code: 200, message: '成功' };

});


//响应删除品牌请求
router.get('/deletebrand/:id', async (context) => {
    // console.log(context.request.params);

    await resDb(`DELETE FROM table_brand WHERE id=?;`, [context.request.params.id]);

    context.body = { code: 200, message: '成功' };
});




module.exports = router;