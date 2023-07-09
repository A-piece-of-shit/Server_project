// 处理品牌模块路由
const Router = require('koa-router');
const router = new Router();


//引入数据库接口
const resDb = require('../mysql/index.js');

//处理文件上传
const multer = require('@koa/multer');
const upload = multer({ dest: './public/upload' });

const fs = require('fs');

//已有的spu数据
const data = [
    {
        id: 1,
        spuName: '苹果',
        description: `苹果公司（Apple Inc. ）是美国高科技公司。2021财年苹果营收达到3658亿美元， [169] 由史蒂夫·乔布斯、斯蒂夫·盖瑞·沃兹尼亚克和罗纳德·杰拉尔德·韦恩（Ron Wayne）等人于1976年4月1日创立，并命名为美国苹果电脑公司（Apple Computer Inc.），2007年1月9日更名为苹果公司，总部位于加利福尼亚州的库比蒂诺。
苹果公司1980年12月12日公开招股上市，2012年创下6235亿美元的市值记录，截至2014年6月，苹果公司已经连续三年成为全球市值最大公司。当地时间2020年8月19日，苹果公司市值首次突破2万亿美元。 [1] 苹果公司在2016年世界500强排行榜中排名第9名。 [2] 2013年9月30日，在宏盟集团的“全球最佳品牌”报告中，苹果公司超过可口可乐成为世界最有价值品牌。2014年，苹果品牌超越谷歌（Google），成为世界最具价值品牌。2021年《财富》世界500强排行榜第6名。 [125] 北京时间2022年1月4日凌晨2点45分左右，美国科技巨头苹果的股价达到了182.88美元，市值第一次站上了三万亿美元的台阶，这不仅是全球首个3万亿市值，也相当于全球第五大经济体的GDP体量，仅次于美国、中国、日本及德国。 [147]`,
        classification3Id: 8,
        brandId: 1,
        salexInformationList: null,//spu品牌销售信息列表
        imageInformationList: null//spu品牌图片信息列表
    },
    {
        id: 2,
        spuName: '华为',
        description: `华为技术有限公司，成立于1987年，总部位于广东省深圳市龙岗区。 [1] 2021年，华为公司的总收入为6368亿元，净利润达到1137亿元。 [232] 华为是全球领先的信息与通信技术（ICT）解决方案供应商，专注于ICT领域，坚持稳健经营、持续创新、开放合作，在电信运营商、企业、终端和云计算等领域构筑了端到端的解决方案优势，为运营商客户、企业客户和消费者提供有竞争力的ICT解决方案、产品和服务，并致力于实现未来信息社会、构建更美好的全联接世界。`,
        classification3Id: 456,
        brandId: 6,
        salexInformationList: null,//spu品牌销售信息列表
        imageInformationList: null//spu品牌图片信息列表
    },
    {
        id: 3,
        spuName: '小米',
        description: `小米科技有限责任公司成立于2010年3月3日，是专注于智能硬件和电子产品研发、智能手机、智能电动汽车 [350] 、互联网电视及智能家居生态链建设的全球化移动互联网企业、创新型科技企业。 [2-3]小米公司创造了用互联网模式开发手机操作系统、发烧友参与开发改进的模式。
        “为发烧而生”是小米的产品概念。“让每个人都能享受科技的乐趣”是小米公司的愿景。小米公司应用了互联网开发模式开发产品，用极客精神做产品，用互联网模式干掉中间环节，致力让全球每个人，都能享用来自中国的优质科技产品。
        小米已经建成了全球最大消费类IoT物联网平台，连接超过6.18 [586] 亿台智能设备，进入全球100多个国家和地区。 [4] [280] MIUI全球月活跃用户达到6亿。 [594] 小米系投资的公司超500家，覆盖智能硬件、生活消费用品、教育、游戏、社交网络、文化娱乐、医疗健康、汽车交通、金融等领域。 [256]`,
        classification3Id: 456,
        brandId: 2,
        salexInformationList: null,//spu品牌销售信息列表
        imageInformationList: null//spu品牌图片信息列表
    },
    {
        id: 4,
        spuName: 'OPPO',
        description: `OPPO（OPPO广东移动通信有限公司），是由陈明永于2004年创立， [106] 是一家全球领先的智能终端制造商和移动互联网服务提供商 [107] ，业务遍及50多个国家和地区。 [108] 通过40多万个销售网点及2500个服务中心，与全球用户共享科技之美。 [109]
        OPPO用手机解锁未来，当未来已来，OPPO用万物互融定义它，让用户尽享智慧数字生活。 [110] 在深耕手机业务的同时，OPPO于2019年开始构建多智能终端生态，为用户打造跨场景高频使用的入口级产品。 [111] OPPO已搭建智能电视，穿戴，声学以及其他配件等IOT产品矩阵。 [112]
        作为一家软硬服一体化的科技公司，OPPO不断优化以ColorOS为核心的软件平台 [113] ，为全球4.4亿ColorOS月活用户打造更人性化、更智能的移动操作系统。 [114] 同时，OPPO通过软件商店、云服务、智能助手的不断升级，为用户探索更快捷、更智能和更互联的增值服务。 [115]`,
        classification3Id: 456,
        brandId: 3,
        salexInformationList: null,//spu品牌销售信息列表
        imageInformationList: null//spu品牌图片信息列表
    },
    {
        id: 5,
        spuName: 'VIVO',
        description: `vivo品牌产品包括智能手机、平板电脑、智能手表等 [100] ，截至2022年8月，进驻60多个国家和地区，全球用户覆盖4亿多人，研发覆盖深圳、东莞（总部）、北京、上海、南京、杭州、西安等。2011年11月vivo发布首款智能手机；2019年3月vivo发布子品牌iQOO，宣传“生而强悍探索不止”理念。 [99]`,
        classification3Id: 456,
        brandId: 4,
        salexInformationList: null,//spu品牌销售信息列表
        imageInformationList: null//spu品牌图片信息列表
    },
    {
        id: 6,
        spuName: '三星',
        description: `三星集团（英文：SAMSUNG、韩文：삼성）是韩国的跨国企业，三星电子2022年利润43.3766万亿韩元， [117] 三星集团旗下子公司有：三星电子、三星物产、三星人寿保险等，业务涉及电子、金融、机械、化学等众多领域。三星集团成立于1938年，由李秉喆创办。三星集团是家族企业，李氏家族世袭，旗下各个三星产业均为家族产业，并由家族中的其他成员管理。 [1-2]
        旗下子公司包含：三星电子、三星SDI、三星SDS、三星电机、三星康宁、三星网络、三星火灾、三星证券、三星物产、三星重工、三星工程、三星航空和三星生命等，由家族内的李氏成员管理，其中三家子公司被美国《财富》杂志评选为世界500强企业。三星电子是旗下最大的子公司，2009年全球500强企业中三星电子排名第40位，全球最受尊敬企业排名第50位，三星的品牌价值排名第19位，较2008年又有了2位的进步。在2011年的全球企业市值中为1500亿美元。 [3]`,
        classification3Id: 456,
        brandId: 5,
        salexInformationList: null,//spu品牌销售信息列表
        imageInformationList: null//spu品牌图片信息列表
    }
];

//所有的spu品牌数据
const spuBrandData = [
    { id: 1, brandName: '苹果', brandUrl: '123456' },
    { id: 2, brandName: '小米', brandUrl: '123456' },
    { id: 3, brandName: 'oppo', brandUrl: '123456' },
    { id: 4, brandName: 'vivo', brandUrl: '123456' },
    { id: 5, brandName: '三星', brandUrl: '123456' },
    { id: 6, brandName: '华为', brandUrl: '123456' },
    { id: 7, brandName: 'redme', brandUrl: '123456' },
    { id: 8, brandName: 'realme', brandUrl: '123456' },
    { id: 9, brandName: '魅族', brandUrl: '123456' },
];

//spu品牌品牌图片数据
const spuBrandImgData = [
    { id: 1, createTime: '2023年', updateTime: '2023年', brandId: 456, imgName: '9', imgUrl: '123' },
    { id: 2, createTime: '2023年', updateTime: '2023年', brandId: 456, imgName: '8', imgUrl: '123' },
    { id: 3, createTime: '2023年', updateTime: '2023年', brandId: 456, imgName: '7', imgUrl: '123' },
    { id: 4, createTime: '2023年', updateTime: '2023年', brandId: 456, imgName: '6', imgUrl: '123' },
    { id: 5, createTime: '2023年', updateTime: '2023年', brandId: 456, imgName: '5', imgUrl: '123' },
    { id: 6, createTime: '2023年', updateTime: '2023年', brandId: 456, imgName: '4', imgUrl: '123' },
    { id: 7, createTime: '2023年', updateTime: '2023年', brandId: 456, imgName: '3', imgUrl: '123' },
];


//spu销售列表数据
const spuSalesListData = [
    {
        id: 1,
        createTime: '2023年',
        updateTime: '2023年',
        brandId: 456,
        attrId: 1,
        attrName: '颜色',
        spuSalesListAttrValueList: [
            { id: 1, createTime: '2023年', updateTime: '2023年', brandId: 456, attrId: 1, attrName: '颜色', isChecked: null, valueName: '黑色' },
            { id: 2, createTime: '2023年', updateTime: '2023年', brandId: 456, attrId: 1, attrName: '颜色', isChecked: null, valueName: '白色' },
            { id: 3, createTime: '2023年', updateTime: '2023年', brandId: 456, attrId: 1, attrName: '颜色', isChecked: null, valueName: '黄色' }
        ]
    },
    {
        id: 2,
        createTime: '2023年',
        updateTime: '2023年',
        brandId: 456,
        attrId: 2,
        attrName: '大小',
        spuSalesListAttrValueList: [
            { id: 1, createTime: '2023年', updateTime: '2023年', brandId: 456, attrId: 2, attrName: '颜色', isChecked: null, valueName: '大' },
            { id: 2, createTime: '2023年', updateTime: '2023年', brandId: 456, attrId: 2, attrName: '颜色', isChecked: null, valueName: '小' },
            { id: 3, createTime: '2023年', updateTime: '2023年', brandId: 456, attrId: 2, attrName: '颜色', isChecked: null, valueName: '中' }
        ]
    }
];

//
const spuSalesAttrListData = [
    { id: 1, name: '配件' },
    { id: 2, name: '颜色' },
    { id: 3, name: '大小' },
];


//当前spu下sku数据
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
        skuImgUrl: '123'
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
        skuImgUrl: '123'
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
        skuImgUrl: '123'
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
        skuImgUrl: '123'
    }
];


//获取已有的spu
router.get('/get/:page/:size/:id3', async context => {


    //     {
    //         id: 1,
    //         spuName: '苹果',
    //         description: `苹果公司（Apple Inc. ）是美国高科技公司。2021财年苹果营收达到3658亿美元， [169] 由史蒂夫·乔布斯、斯蒂夫·盖瑞·沃兹尼亚克和罗纳德·杰拉尔德·韦恩（Ron Wayne）等人于1976年4月1日创立，并命名为美国苹果电脑公司（Apple Computer Inc.），2007年1月9日更名为苹果公司，总部位于加利福尼亚州的库比蒂诺。
    // 苹果公司1980年12月12日公开招股上市，2012年创下6235亿美元的市值记录，截至2014年6月，苹果公司已经连续三年成为全球市值最大公司。当地时间2020年8月19日，苹果公司市值首次突破2万亿美元。 [1] 苹果公司在2016年世界500强排行榜中排名第9名。 [2] 2013年9月30日，在宏盟集团的“全球最佳品牌”报告中，苹果公司超过可口可乐成为世界最有价值品牌。2014年，苹果品牌超越谷歌（Google），成为世界最具价值品牌。2021年《财富》世界500强排行榜第6名。 [125] 北京时间2022年1月4日凌晨2点45分左右，美国科技巨头苹果的股价达到了182.88美元，市值第一次站上了三万亿美元的台阶，这不仅是全球首个3万亿市值，也相当于全球第五大经济体的GDP体量，仅次于美国、中国、日本及德国。 [147]`,
    //         classification3Id: 8,
    //         brandId: 1,
    //         salexInformationList: null,//spu品牌销售信息列表
    //         imageInformationList: null//spu品牌图片信息列表
    //     },




    const data = await resDb(`SELECT 
    id, 
    name as spuName,
    description,
    brandId,
    manage3id as classification3Id
    FROM table_spu WHERE manage3id = ${context.params.id3} LIMIT ${(context.params.page - 1) * context.params.size}, ${context.params.size};`);

    const total = await resDb(`select count(*) as total from table_spu;`);


    data.forEach(item => {
        item.salexInformationList = null;
        item.imageInformationList = null;

    });

    // console.log(context.params);
    context.body = {
        code: 200,
        message: '成功',
        data: {
            records: data,
            total: total[0].total
        }
    };


});

//获取所有的spu品牌
router.get('/get/brand', async (context) => {

    const data = await resDb(`SELECT id,name as brandName FROM table_spubrand;`)
    context.body = { code: 200, message: '成功', data };
});

//获取spu品牌图片
router.get('/get/brandimg/:spuId', async (context) => {
    // { id: 1, createTime: '2023年', updateTime: '2023年', brandId: 456, imgName: '9', imgUrl: '123' },


    const data = await resDb(`SELECT id,name as imgName,url as imgUrl FROM table_spuimg WHERE spuid=${context.params.spuId};`)



    context.body = { code: 200, message: '成功', data };
});

//获取spu品牌销售列表
router.get('/get/saleslist/:spuId', async (context) => {


    // {
    //     id: 1,
    //     createTime: '2023年',
    //     updateTime: '2023年',
    //     brandId: 456,
    //     attrId: 1,
    //     attrName: '颜色',
    //     spuSalesListAttrValueList: [
    //         { id: 1, createTime: '2023年', updateTime: '2023年', brandId: 456, attrId: 1, attrName: '颜色', isChecked: null, valueName: '黑色' },
    //         { id: 2, createTime: '2023年', updateTime: '2023年', brandId: 456, attrId: 1, attrName: '颜色', isChecked: null, valueName: '白色' },
    //         { id: 3, createTime: '2023年', updateTime: '2023年', brandId: 456, attrId: 1, attrName: '颜色', isChecked: null, valueName: '黄色' }
    //     ]
    // },
    const salesAttrValuedata = await resDb(`SELECT id,attrid as attrId,value as valueName FROM table_attrvalue WHERE spuid=${context.params.spuId};`)

    // const attrIdArr = await resDb(`select distinct attrid from table_attrvalue;`)





    const salesAttrdata = await resDb(`SELECT id,name as attrName FROM table_salesattr;`);

    let i = 0;
    while (i < salesAttrValuedata.length) {
        let j = 0;
        while (j < salesAttrdata.length) {

            if (salesAttrValuedata[i].attrId === salesAttrdata[j].id) {
                if (!salesAttrdata[j].attrId) salesAttrdata[j].attrId = salesAttrValuedata[i].attrId;
                if (!salesAttrdata[j].spuSalesListAttrValueList) salesAttrdata[j].spuSalesListAttrValueList = [];

                salesAttrdata[j].spuSalesListAttrValueList.push(salesAttrValuedata[i]);
                salesAttrValuedata.splice(i, 1);
                j = salesAttrdata.length;
                i = 0;
            } else {
                j++;
            };
        };
    };









    // const data = await resDb(`SELECT id,name as imgName,url as imgUrl FROM table_spuimg WHERE spuid=${context.params.spuId};`)

    context.body = { code: 200, message: '成功', data: salesAttrdata };
});

//获取spu品牌销售属性列表
router.get('/get/salesattrlist', async (context) => {
    const data = await resDb(`SELECT id,name FROM table_salesattr;`);
    context.body = { code: 200, message: '成功', data };
});


//上传spu品牌图片
// router.post('/upload/brandimg', context => {
//     console.log(123);

//     context.body = { code: 200, message: '成功' };
// });

//响应element组件上传spu图片
router.post('/upload/brandimg', upload.single('file'), async (context) => {
    // console.log(context.file);

    context.body = {
        code: 200,
        message: '成功',
        data: `spu/file/upload/${context.file.filename}`
    };

});

//响应获取spu图片
router.get('/file/upload/:filename', (context) => {
    // console.log(context.params);

    const data = fs.readFileSync(`./public/upload/${context.params.filename}`);

    context.set('Content-Type', 'image/jpeg');
    context.body = data;

});



//响应添加spu
router.post('/add', async context => {
    // console.log(context.request.body);
    // console.log('-------------------------------------------------');
    // console.log(context.request.body.salexInformationList)
    // console.log('-------------------------------------------------');

    // context.request.body.salexInformationList.forEach(item => {
    //     console.log(item.spuSalesListAttrValueList);
    // });

    // console.log(context.request.body.salexInformationList.spuSalesListAttrValueList);
    // console.log('-------------------------------------------------');


    const { spuName, description, brandId, classification3Id, salexInformationList, imageInformationList } = context.request.body;


    await resDb(`insert into table_spu (
        name,
        description,
        brandid,
        manage3id) values(?,?,${brandId},${classification3Id});`, [spuName, description]);

    const [{ spuid }] = await resDb(`SELECT id as spuid FROM table_spu WHERE name=?;`, [spuName]);


    salexInformationList.forEach(item => {

        item.spuSalesListAttrValueList.forEach(async valItem => {
            await resDb(`insert into table_attrvalue (
                value,
                attrid,
                spuid) values(?,${valItem.attrId},${spuid});`, [valItem.valueName]);
        });


    });


    imageInformationList.forEach(async item => {

        await resDb(`insert into table_spuimg (name,url,spuid) values(?,?,${spuid});`, [item.imgName, item.imgUrl]);
    });

    context.body = { code: 200, message: '成功' };


    // {
    //     spuName: '123',
    //     description: '213',
    //     classification3Id: 8,
    //     brandId: 1,
    //     salexInformationList: [
    //       {
    //         attrId: 1,
    //         attrName: '颜色',
    //         spuSalesListAttrValueList:[
    //          { attrName: '颜色', attrId: 1, valueName: '123' },
    //          { attrName: '颜色', attrId: 1, valueName: '1325' },
    //          { attrName: '颜色', attrId: 1, valueName: '4563' }
    //         ]
    //         flag: false,
    //         attrValue: '4563'
    //       },
    //       {
    //         attrId: 2,
    //         attrName: '大小',
    //         spuSalesListAttrValueList: [Array],
    //         flag: false,
    //         attrValue: '4563'
    //       }
    //     ],
    //     imageInformationList: [
    //       {
    //         imgName: '1.jpg',
    //         imgUrl: 'spu/file/upload/dba0c612ea9e82468733032a4cee5ea0'
    //       },
    //       {
    //         imgName: 'cg_gif.gif',
    //         imgUrl: 'spu/file/upload/94f081ca26f225b47852d5960f6d3ef5'
    //       },
    //       {
    //         imgName: 'cg4.jpg',
    //         imgUrl: 'spu/file/upload/8606be5ed3a091230c131ae65fccff1f'
    //       }
    //     ]
    //   }
    //   -------------------------------------------------
    //   [
    //     { attrName: '颜色', attrId: 1, valueName: '123' },
    //     { attrName: '颜色', attrId: 1, valueName: '1325' },
    //     { attrName: '颜色', attrId: 1, valueName: '4563' }
    //   ]
    //   [
    //     { attrName: '大小', attrId: 2, valueName: '123' },
    //     { attrName: '大小', attrId: 2, valueName: '4563' }
    //   ]
    //   -------------------------------------------------
    //   [
    //     {
    //       imgName: '1.jpg',
    //       imgUrl: 'spu/file/upload/dba0c612ea9e82468733032a4cee5ea0'
    //     },
    //     {
    //       imgName: 'cg_gif.gif',
    //       imgUrl: 'spu/file/upload/94f081ca26f225b47852d5960f6d3ef5'
    //     },
    //     {
    //       imgName: 'cg4.jpg',
    //       imgUrl: 'spu/file/upload/8606be5ed3a091230c131ae65fccff1f'
    //     }
    //   ]



});


//响应修改spu
router.post('/edit', async context => {
    // console.log(context.request.body);
    // const [id, spuName, description, brandId, salexInformationList] = context.request.body

    const { id, spuName, description, brandId, salexInformationList, imageInformationList } = context.request.body
    salexInformationList.forEach(item => {
        console.log(item);
    });

    await resDb(`update table_spu set name=?,description=?,brandid=${brandId} where id=${id};`, [spuName, description]);
    // await resDb(`update table_attrvalue set name=?,description=?,brandid=${brandId} where id=${id};`, [spuName, description]);


    //删除原有的数据，直接使用新数据覆盖
    await resDb(`delete from table_attrvalue WHERE spuid=${id};`);

    await resDb(`delete from table_spuimg WHERE spuid=${id};`);

    salexInformationList.forEach(item => {
        console.log(item.id);
        if (item.spuSalesListAttrValueList) {
            item.spuSalesListAttrValueList.forEach(async valItem => {
                await resDb(`insert into table_attrvalue (
                value,
                attrid,
                spuid) values(?,${item.id},${id});`, [valItem.valueName]);
            });

        };


    });





    imageInformationList.forEach(async item => {

        await resDb(`insert into table_spuimg (name,url,spuid) values(?,?,${id});`, [item.imgName, item.imgUrl.match(/spu\/file\/upload.*/)[0]]);
    });

    context.body = { code: 200, message: '成功' };
});


//响应删除spu
router.get('/delete/:spuid', async context => {
    // console.log(+context.params.spuid);

    await resDb(`delete from table_attrvalue WHERE spuid=${+context.params.spuid};`);

    await resDb(`delete from table_spuimg WHERE spuid=${+context.params.spuid};`);

    //删除原有的数据，直接使用新数据覆盖
    await resDb(`delete from table_spu WHERE id=${+context.params.spuid};`);


    context.body = { code: 200, message: '成功' };


});




//响应添加sku
router.post('/add/sku', async context => {

    const {
        classification3Id,
        spuId,
        brandId,
        skuName,
        skuPrice,
        skuWeight,
        skuDesc,
        // skuPlatformAttrList: [{ attrId: '5', valueId: '25' }, { attrId: '9', valueId: '48' }],
        skuPlatformAttrList,
        // skuSalesAttrList: [{ attrId: '1', valueId: '22' }, { attrId: '2', valueId: '23' }],
        skuSalesAttrList,
        skuImgUrl,
        islisting = ''
    } = context.request.body;



    await resDb(`insert into table_sku (
        brandid,
        spuid,
        manage3id,
        name,
        price,
        weight,
        description,
        imgurl, 
        islisting) values(
            ${+brandId},
            ${+spuId},
            ${+classification3Id},
            ?,
            ?,
            ?,
            ?,
            ?,
            ?);`, [skuName, skuPrice, skuWeight, skuDesc, skuImgUrl, islisting]);

    const [{ id }] = await resDb(`select id from table_sku where name=?;`, [skuName]);


    skuPlatformAttrList.forEach(async item => {
        console.log(123);
        await resDb(`insert into table_skuplatform (
            skuid,
            attrid,
            valueid) 
            values(${+id},${+item.attrId},${+item.valueId});`);
    });

    skuSalesAttrList.forEach(async item => {
        await resDb(`insert into table_skusales (
            skuid,
            attrid,
            valueid) 
            values(${+id},${+item.attrId},${+item.valueId});`);
    });


    context.body = { code: 200, message: '成功' };
});




//获取当前spu下sku数据
router.get('/get/sku/:spuid', context => {
    // classification3Id: 1,
    // spuId: 1,
    // brandId: 1,
    // skuName: 'oppo10',
    // skuPrice: 2000,
    // skuWeight: 90,
    // skuDesc: '你好',
    // skuPlatformAttrList: [],
    // skuSalesAttrList: [],
    // skuImgUrl: '123',
    // isListing: true,
    // id: 1

    context.body = { code: 200, message: '成功', data: sku };
});


module.exports = router;





