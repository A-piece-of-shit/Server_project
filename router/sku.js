// 处理品牌模块路由
const Router = require('koa-router');
const router = new Router();


//引入数据库接口
const resDb = require('../mysql/index.js');



//sku数据
const sku = [
    {
        classification3Id: 1,
        spuId: 1,
        brandId: 1,
        skuName: 'oppo10',
        skuPrice: 2000,
        skuWeight: 90,
        skuDesc: '你好',
        skuPlatformAttrList: [],
        skuSalesAttrList: [],
        skuImgUrl: '123',
        isListing: true,
        id: 1
    },
    {
        classification3Id: 2,
        spuId: 2,
        brandId: 2,
        skuName: 'oppo20',
        skuPrice: 3000,
        skuWeight: 100,
        skuDesc: '你好',
        skuPlatformAttrList: [],
        skuSalesAttrList: [],
        skuImgUrl: '123',
        isListing: false,
        id: 2
    },
    {
        classification3Id: 3,
        spuId: 3,
        brandId: 3,
        skuName: 'oppo30',
        skuPrice: 3000,
        skuWeight: 110,
        skuDesc: '你好',
        skuPlatformAttrList: [],
        skuSalesAttrList: [],
        skuImgUrl: '123',
        isListing: false,
        id: 3
    },
    {
        classification3Id: 4,
        spuId: 4,
        brandId: 4,
        skuName: 'oppo40',
        skuPrice: 4000,
        skuWeight: 120,
        skuDesc: '你好',
        skuPlatformAttrList: [],
        skuSalesAttrList: [],
        skuImgUrl: '123',
        isListing: false,
        id: 4
    }
];


//指定的sku信息数据
const skuInfo = {
    id: 1,
    platformAttrList: [
        { id: 1, attrId: 1, attrName: 'xx1' },
        { id: 2, attrId: 1, attrName: 'xx2' },
        { id: 3, attrId: 1, attrName: 'xx3' },
        { id: 4, attrId: 1, attrName: 'xx4' },
        { id: 5, attrId: 1, attrName: 'xx5' },
        { id: 6, attrId: 1, attrName: 'xx6' },
        { id: 7, attrId: 1, attrName: 'xx7' },
        { id: 8, attrId: 1, attrName: 'xx8' },
        { id: 9, attrId: 1, attrName: 'xx9' },
        { id: 10, attrId: 1, attrName: 'xx10' },
        { id: 11, attrId: 1, attrName: 'xx11' }
    ],
    salesAttrList: [
        { id: 1, attrId: 1, attrName: 'xx1' },
        { id: 2, attrId: 1, attrName: 'xx2' },
        { id: 3, attrId: 1, attrName: 'xx3' },
        { id: 4, attrId: 1, attrName: 'xx4' },
        { id: 5, attrId: 1, attrName: 'xx5' },
        { id: 6, attrId: 1, attrName: 'xx6' },
        { id: 7, attrId: 1, attrName: 'xx7' },
        { id: 8, attrId: 1, attrName: 'xx8' },
        { id: 9, attrId: 1, attrName: 'xx9' },
        { id: 10, attrId: 1, attrName: 'xx10' },
        { id: 11, attrId: 1, attrName: 'xx11' }
    ],
    salesImgList: [
        { id: 1, imgUrl: '1', imgName: '456465' },
        { id: 1, imgUrl: '1', imgName: '456465' },
        { id: 1, imgUrl: '1', imgName: '456465' },
        { id: 1, imgUrl: '1', imgName: '456465' },
        { id: 1, imgUrl: '1', imgName: '456465' },
        { id: 1, imgUrl: '1', imgName: '456465' },
        { id: 1, imgUrl: '1', imgName: '456465' }

    ]
}



//获取sku数据
router.get('/get/:page/:size', async context => {

    // {
    //     classification3Id: 1,
    //     spuId: 1,
    //     brandId: 1,
    //     skuName: 'oppo10',
    //     skuPrice: 2000,
    //     skuWeight: 90,
    //     skuDesc: '你好',
    //     skuPlatformAttrList: [],
    //     skuSalesAttrList: [],
    //     skuImgUrl: '123',
    //     isListing: true,
    //     id: 1
    // },
    const data = await resDb(`select 
    id,
    manage3id as classification3Id,
    brandid as brandId,
    name as skuName,
    price as skuPrice,
    weight as skuWeight,
    description as skuDesc,
    imgurl as skuImgUrl,
    spuid as spuId,
    islisting as isListing
    from table_sku limit ${(context.params.page - 1) * context.params.size}, ${context.params.size};`);

    data.forEach(item => {
        if (item.isListing === '') {
            item.isListing = false;
        } else {
            item.isListing = true;

        };
    });


    const total = await resDb(`select count(*) as total from table_sku;`);

    context.body = {
        code: 200,
        message: '成功',
        data: {
            records: data,
            total: total[0].total,
            size: +context.params.size,
            page: +context.params.page
        }
    };
});


//sku上架
router.get('/listing/:skuid', async context => {
    await resDb(`update table_sku set islisting=? where id=${context.params.skuid};`, ['listing']);

    context.body = { code: 200, message: '成功' };
});

//sku上架
router.get('/delist/:skuid', async context => {
    await resDb(`update table_sku set islisting=? where id=${context.params.skuid};`, ['']);

    context.body = { code: 200, message: '成功' };
});


//获取指定sku信息数据
router.get('/info/:skuid', async context => {
    const platformAttrList = [];

    const salesAttrList = [];
    const salesImgList = [];


    const platformId = await resDb(`select valueid from table_skuplatform where skuid=${+context.params.skuid};`);



    platformId.map(async item => {
        const [platformAttr] = await resDb(`select id,attrid as attrId,value as attrName from table_managedatavalue where id=${item.valueid};`);
        platformAttrList.push(platformAttr);
    });


    const salesId = await resDb(`select valueid from table_skusales where skuid=${+context.params.skuid};`);


    salesId.map(async item => {
        const [salesAttr] = await resDb(`select id,attrid as attrId,value as attrName from table_attrvalue where id=${item.valueid};`);
        salesAttrList.push(salesAttr);

    });


    const [salesImg] = await resDb(`select id,imgurl as imgUrl from table_sku where id=${+context.params.skuid};`);
    salesImgList.push(salesImg);


    context.body = { code: 200, message: '成功', data: { id: +context.params.skuid, platformAttrList, salesAttrList, salesImgList } };








    // console.log(platformAttrList);
});


router.get('/delete/:skuid', async context => {
    await resDb(`delete from table_skuplatform where skuid=${+context.params.skuid};`);
    await resDb(`delete from table_skusales where skuid=${+context.params.skuid};`);

    await resDb(`delete from table_sku where id=${+context.params.skuid};`);
    context.body = { code: 200, message: '成功' };
});















module.exports = router;