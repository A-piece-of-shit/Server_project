// 处理品牌模块路由
const Router = require('koa-router');
const router = new Router();


//引入数据库接口
const resDb = require('../mysql/index.js');

// //一级分类数据
// const primaryClassificationData = [
//     { id: 1, name: '图书/音像/电子书刊' },
//     { id: 2, name: '手机' },
//     { id: 3, name: '家用电器' },
//     { id: 4, name: '数码' },
//     { id: 5, name: '家具家装' },
//     { id: 6, name: '电脑办公' },
//     { id: 7, name: '厨具' },
//     { id: 8, name: '个性化妆' },
//     { id: 9, name: '服饰内衣' },
//     { id: 10, name: '钟表' },
//     { id: 11, name: '鞋靴' },
//     { id: 12, name: '母婴' },
//     { id: 13, name: '礼品箱包' },
//     { id: 14, name: '食品饮料/保健食品' },
//     { id: 15, name: '珠宝' },
//     { id: 16, name: '汽车用品' },
//     { id: 17, name: '运动健康' },
//     // { id: 18, name: '测试一级分类' },
// ];

// //二级分类所有数据（需要根据一级分类id进行过滤）
// const allSecondaryClassificationData = [
//     //一级分类下id为1：所属二级分类数据
//     { id: 1, name: '图书', classification1Id: 1 },
//     { id: 2, name: '音箱', classification1Id: 1 },
//     { id: 3, name: '电子书刊', classification1Id: 1 },

//     //一级分类下id为2：所属二级分类数据
//     { id: 4, name: '手机通讯', classification1Id: 2 },
//     { id: 5, name: '运营商', classification1Id: 2 },
//     { id: 6, name: '手机配件', classification1Id: 2 },

//     //一级分类下id为3：所属二级分类数据
//     { id: 7, name: '吸尘器', classification1Id: 3 },
//     { id: 8, name: '洗衣机', classification1Id: 3 },
//     { id: 9, name: '冰箱', classification1Id: 3 },


//     //一级分类下id为4：所属二级分类数据
//     { id: 10, name: '相机', classification1Id: 4 },
//     { id: 11, name: '游戏机', classification1Id: 4 },

//     //一级分类下id为5：所属二级分类数据
//     { id: 12, name: '地板', classification1Id: 5 },
//     { id: 13, name: '沙发', classification1Id: 5 },


//     //一级分类下id为6：所属二级分类数据
//     { id: 14, name: '台式电脑', classification1Id: 6 },
//     { id: 15, name: '笔记本电脑', classification1Id: 6 },

//     //一级分类下id为7：所属二级分类数据
//     { id: 16, name: '微波炉', classification1Id: 7 },
//     { id: 17, name: '电饭煲', classification1Id: 7 },

//     //一级分类下id为8：所属二级分类数据
//     { id: 18, name: '眉笔', classification1Id: 8 },
//     { id: 19, name: '口红', classification1Id: 8 },

//     //一级分类下id为9：所属二级分类数据
//     { id: 20, name: '上衣', classification1Id: 9 },
//     { id: 21, name: '裤子', classification1Id: 9 },

//     //一级分类下id为10：所属二级分类数据
//     { id: 22, name: '钟表', classification1Id: 10 },
//     { id: 23, name: '手表', classification1Id: 10 },

//     //一级分类下id为11：所属二级分类数据
//     { id: 24, name: '男士鞋靴', classification1Id: 11 },
//     { id: 25, name: '女士鞋靴', classification1Id: 11 },

//     //一级分类下id为12：所属二级分类数据
//     { id: 26, name: '保养产品', classification1Id: 12 },
//     { id: 27, name: '婴儿产品', classification1Id: 12 },

//     //一级分类下id为13：所属二级分类数据
//     { id: 28, name: '礼品', classification1Id: 13 },
//     { id: 29, name: '箱包', classification1Id: 13 },

//     //一级分类下id为14：所属二级分类数据
//     { id: 30, name: '食品饮料', classification1Id: 14 },
//     { id: 31, name: '保健产品', classification1Id: 14 },

//     //一级分类下id为15：所属二级分类数据
//     { id: 32, name: '戒指', classification1Id: 15 },
//     { id: 33, name: '首饰', classification1Id: 15 },

//     //一级分类下id为16：所属二级分类数据
//     { id: 34, name: '内饰用品', classification1Id: 16 },
//     { id: 35, name: '基础用品', classification1Id: 16 },

//     //一级分类下id为17：所属二级分类数据
//     { id: 36, name: '运动装备', classification1Id: 17 },
//     { id: 37, name: '运动食品', classification1Id: 17 },
// ];

// //三级分类所有数据（需要根据二级分类id进行过滤）
// const allThreelevelClassificationData = [
//     //二级分类下id为1：所属三级分类数据 
//     { id: 1, name: '小说', classification2Id: 1 },
//     { id: 2, name: '名著', classification2Id: 1 },


//     //二级分类下id为2：所属三级分类数据 
//     { id: 3, name: '台式音箱', classification2Id: 2 },
//     { id: 4, name: '移动音箱', classification2Id: 2 },


//     //二级分类下id为3：所属三级分类数据 
//     { id: 4, name: '爽文', classification2Id: 3 },
//     { id: 5, name: '都市小说', classification2Id: 3 },


//     //二级分类下id为4：所属三级分类数据 
//     { id: 5, name: '手机', classification2Id: 4 },
//     { id: 6, name: '对讲机', classification2Id: 4 },


//     //二级分类下id为5：所属三级分类数据 
//     { id: 7, name: 'vivo', classification2Id: 5 },
//     { id: 8, name: 'oppo', classification2Id: 5 },
//     { id: 9, name: '小米', classification2Id: 5 },
//     { id: 10, name: '华为', classification2Id: 5 },
//     { id: 11, name: '苹果', classification2Id: 5 },
//     { id: 12, name: '三星', classification2Id: 5 },

//     //二级分类下id为6：所属三级分类数据 
//     { id: 7, name: '手机膜', classification2Id: 6 },
//     { id: 8, name: '手机壳', classification2Id: 6 },
//     { id: 9, name: '耳机', classification2Id: 6 },


//     //二级分类下id为7：所属三级分类数据 
//     { id: 10, name: '戴森', classification2Id: 7 },
//     { id: 11, name: 'xx1', classification2Id: 7 },
//     { id: 12, name: 'xx2', classification2Id: 7 },

//     //二级分类下id为8：所属三级分类数据 
//     { id: 13, name: '海尔', classification2Id: 8 },
//     { id: 14, name: 'xx1', classification2Id: 8 },
//     { id: 15, name: 'xx2', classification2Id: 8 },

//     //二级分类下id为9：所属三级分类数据 
//     { id: 16, name: '美的', classification2Id: 9 },
//     { id: 17, name: 'xx1', classification2Id: 9 },
//     { id: 18, name: 'xx2', classification2Id: 9 },

//     //二级分类下id为10：所属三级分类数据 
//     { id: 19, name: '美的', classification2Id: 10 },
//     { id: 20, name: 'xx1', classification2Id: 10 },
//     { id: 21, name: 'xx2', classification2Id: 10 },

//     //二级分类下id为11：所属三级分类数据 
//     { id: 22, name: 'switch', classification2Id: 11 },
//     { id: 23, name: 'xbox', classification2Id: 11 },
//     { id: 24, name: '小霸王', classification2Id: 11 },

//     //二级分类下id为12：所属三级分类数据 
//     { id: 25, name: '木地板', classification2Id: 12 },
//     { id: 26, name: '大理石', classification2Id: 12 },
//     { id: 27, name: '玻璃', classification2Id: 12 },


//     //二级分类下id为13：所属三级分类数据 
//     { id: 28, name: '硬座', classification2Id: 13 },
//     { id: 29, name: '软座', classification2Id: 13 },

//     //二级分类下id为14：所属三级分类数据 
//     { id: 30, name: '微软', classification2Id: 14 },
//     { id: 31, name: '华硕', classification2Id: 14 },
//     { id: 32, name: '神舟', classification2Id: 14 },

//     //二级分类下id为15：所属三级分类数据 
//     { id: 33, name: '苹果', classification2Id: 15 },
//     { id: 34, name: '联想', classification2Id: 15 },
//     { id: 35, name: '小米', classification2Id: 15 },

//     //二级分类下id为16：所属三级分类数据 
//     { id: 36, name: '松下', classification2Id: 16 },
//     { id: 37, name: 'xx1', classification2Id: 16 },
//     { id: 38, name: 'xx2', classification2Id: 16 },

//     //二级分类下id为17：所属三级分类数据 
//     { id: 39, name: '九阳', classification2Id: 17 },
//     { id: 40, name: 'xx1', classification2Id: 17 },
//     { id: 41, name: 'xx2', classification2Id: 17 },

//     //二级分类下id为18：所属三级分类数据 
//     { id: 42, name: '卡姿兰', classification2Id: 18 },
//     { id: 43, name: 'xx1', classification2Id: 18 },
//     { id: 44, name: 'xx2', classification2Id: 18 },

//     //二级分类下id为19：所属三级分类数据 
//     { id: 45, name: '名创优品', classification2Id: 19 },
//     { id: 46, name: 'xx1', classification2Id: 19 },
//     { id: 47, name: 'xx2', classification2Id: 19 },

//     //二级分类下id为20：所属三级分类数据 
//     { id: 48, name: '男士上衣', classification2Id: 20 },
//     { id: 49, name: '男士上衣', classification2Id: 20 },

//     //二级分类下id为21：所属三级分类数据 
//     { id: 50, name: '女生裤子', classification2Id: 21 },
//     { id: 51, name: '女生裤子', classification2Id: 21 },

//     //二级分类下id为22：所属三级分类数据 
//     { id: 52, name: '复古钟表', classification2Id: 22 },
//     { id: 53, name: '潮流钟表', classification2Id: 22 },

//     //二级分类下id为23：所属三级分类数据 
//     { id: 54, name: '卡西欧', classification2Id: 23 },
//     { id: 55, name: '绿水鬼', classification2Id: 23 },

//     //二级分类下id为24：所属三级分类数据 
//     { id: 56, name: '球鞋', classification2Id: 24 },
//     { id: 57, name: '皮鞋', classification2Id: 24 },


//     //二级分类下id为25：所属三级分类数据 
//     { id: 58, name: '高跟鞋', classification2Id: 25 },
//     { id: 59, name: '平底鞋', classification2Id: 25 },

//     //二级分类下id为26：所属三级分类数据 
//     { id: 60, name: '燕窝', classification2Id: 26 },
//     { id: 61, name: 'xx1', classification2Id: 26 },

//     //二级分类下id为27：所属三级分类数据 
//     { id: 62, name: '奶粉', classification2Id: 27 },
//     { id: 63, name: '奶嘴', classification2Id: 27 },


//     //二级分类下id为28：所属三级分类数据 
//     { id: 64, name: '高档礼品', classification2Id: 28 },
//     { id: 65, name: '性价比礼品', classification2Id: 28 },

//     //二级分类下id为29：所属三级分类数据 
//     { id: 66, name: '背包', classification2Id: 29 },
//     { id: 67, name: '行李箱', classification2Id: 29 },

//     //二级分类下id为30：所属三级分类数据 
//     { id: 68, name: '食品', classification2Id: 30 },
//     { id: 69, name: '饮料', classification2Id: 30 },

//     //二级分类下id为31：所属三级分类数据 
//     { id: 70, name: '脑白金', classification2Id: 31 },
//     { id: 71, name: '樟脑丸', classification2Id: 31 },

//     //二级分类下id为32：所属三级分类数据 
//     { id: 72, name: '金戒指', classification2Id: 32 },
//     { id: 73, name: '钻石戒指', classification2Id: 32 },

//     //二级分类下id为33：所属三级分类数据 
//     { id: 74, name: '头饰', classification2Id: 33 },
//     { id: 75, name: '项链', classification2Id: 33 },

//     //二级分类下id为34：所属三级分类数据 
//     { id: 76, name: '行车记录仪', classification2Id: 34 },
//     { id: 77, name: '真皮座椅', classification2Id: 34 },

//     //二级分类下id为35：所属三级分类数据 
//     { id: 78, name: '挡风玻璃', classification2Id: 35 },
//     { id: 79, name: '轮胎', classification2Id: 35 },

//     //二级分类下id为36：所属三级分类数据 
//     { id: 80, name: '护袖', classification2Id: 36 },
//     { id: 81, name: '太阳镜', classification2Id: 36 },

//     //二级分类下id为37：所属三级分类数据 
//     { id: 82, name: '能量棒', classification2Id: 37 },
//     { id: 83, name: '能量饮料', classification2Id: 37 },
// ];


//所有分类数据（需要根据一级分类id和二级分类id和三级分类id进行过滤）
const allClassifiedData = [
    {
        id: 1,
        name: '手机一级',
        attrId: 245,
        attrValueList: [
            { id: 1, valueName: '安卓手机', attrId: 245 },
            { id: 2, valueName: '安卓手机222', attrId: 245 },
            { id: 3, valueName: '安卓手机', attrId: 245 },
            { id: 4, valueName: '安卓手机111', attrId: 245 },
            { id: 5, valueName: '苹果手机', attrId: 245 },
            { id: 6, valueName: '苹果手机', attrId: 245 },
            { id: 7, valueName: '安卓手机', attrId: 245 },
            { id: 8, valueName: '苹果手机', attrId: 245 },
            { id: 9, valueName: '苹果手机', attrId: 245 },
            { id: 10, valueName: '安卓手机', attrId: 245 },
            { id: 11, valueName: '安卓手机222', attrId: 245 },
            { id: 12, valueName: '安卓手机111', attrId: 245 }
        ]
    },
    {
        id: 2,
        name: '电池容量',
        attrId: 245,
        attrValueList: [
            { id: 1, valueName: '1200mAh到3000mAh', attrId: 245 },
            { id: 2, valueName: '1200mAh以下', attrId: 245 },
            { id: 3, valueName: '3000mAh以上', attrId: 245 }
        ]
    },
    {
        id: 3,
        name: '运行内存',
        attrId: 245,
        attrValueList: [
            { id: 1, valueName: '6G', attrId: 245 },
            { id: 2, valueName: '256G', attrId: 245 },
            { id: 3, valueName: '128G', attrId: 245 }
        ]
    },
    {
        id: 4,
        name: '机身内存',
        attrId: 245,
        attrValueList: [
            { id: 1, valueName: '64G', attrId: 245 },
            { id: 2, valueName: '256G', attrId: 245 },
            { id: 3, valueName: '1T', attrId: 245 },
            { id: 4, valueName: '32G', attrId: 245 },
            { id: 5, valueName: '128G', attrId: 245 },
            { id: 6, valueName: '512G', attrId: 245 }
        ]
    },
    {
        id: 5,
        name: 'CPU型号',
        attrId: 245,
        attrValueList: [
            { id: 1, valueName: '麒麟990', attrId: 245 },
            { id: 2, valueName: '晓龙439', attrId: 245 },
            { id: 3, valueName: '晓龙845', attrId: 245 },
            { id: 4, valueName: '5G晓龙768G', attrId: 245 },
            { id: 5, valueName: '晓龙730G', attrId: 245 },

        ]
    },
    {
        id: 6,
        name: '屏幕尺寸',
        attrId: 245,
        attrValueList: [
            { id: 1, valueName: '6.95英寸及以上', attrId: 245 },
            { id: 2, valueName: '6.85~6.94英寸', attrId: 245 },
            { id: 3, valueName: '6.65~6.74英寸', attrId: 245 },
            { id: 4, valueName: '6.0~6.24英寸', attrId: 245 },
            { id: 5, valueName: '6.75~6.84英寸', attrId: 245 },
            { id: 6, valueName: '6.55~6.64英寸', attrId: 245 },
        ]
    },
];


//响应一级分类数据请求
router.get('/primaryclassification', async (context) => {
    const data = await resDb('SELECT id,name FROM table_manage1;');
    // console.log(data);

    context.body = { code: 200, message: '成功', data };
});

//响应二级分类数据请求
router.get('/secondaryclassification/:id1', async (context) => {
    // const secondaryClassificationData = [];

    // allSecondaryClassificationData.forEach(item => {
    //     if (item.classification1Id === +context.params.id1) secondaryClassificationData.push(item);
    // });

    const data = await resDb(`SELECT id,name,manage1id AS classification1Id FROM table_manage2 WHERE manage1id=${+context.params.id1};`);
    // console.log(data);


    context.body = { code: 200, message: '成功', data }
});

//响应三级分类数据请求
router.get('/threelevelclassification/:id2', async (context) => {
    // const threelevelClassification = [];

    // allThreelevelClassificationData.forEach(item => {
    //     if (item.classification2Id === +context.params.id2) threelevelClassification.push(item);
    // });

    const data = await resDb(`SELECT id,name,manage2id AS classification2Id FROM table_manage3 WHERE manage2id=${+context.params.id2};`);
    // console.log(data);

    context.body = { code: 200, message: '成功', data }
});

//响应分类数据请求
router.get('/classifieddata/:id1/:id2/:id3', async (context) => {
    // const classifiedData = [];

    // allClassifiedData.forEach(item => {
    //     if (item.attrId === +(`${context.params.id1}${context.params.id2}${context.params.id3}`)) classifiedData.push(item);
    // });

    console.log(context.params.id3);

    const data = await resDb(`
    SELECT 
    id,
    attrname AS name,
    manage3id AS attrId
    FROM
    table_managedataattr
    WHERE
    manage3id=${context.params.id3};`);

    const value = await resDb(`
    SELECT
    id,
    value AS valueName,
    manage3id AS attrId,
    attrid
    FROM table_managedatavalue
    WHERE manage3id=${context.params.id3};`);


    data.forEach((item) => {
        item.attrValueList = [];

        let i = 0;
        while (i < value.length) {
            if (item.id === value[i].attrid) {
                item.attrValueList.push(value[i]);

                value.splice(i, 1);
                i = 0;
            } else {
                i++;
            };
        };
    });

    // console.log(data);
    // console.log(value);

    /*
    {
        id: 1,
        name: '手机一级',
        attrId: 245,
        attrValueList: [
            { id: 1, valueName: '安卓手机', attrId: 245 },
            { id: 2, valueName: '安卓手机222', attrId: 245 },
            { id: 3, valueName: '安卓手机', attrId: 245 },
            { id: 4, valueName: '安卓手机111', attrId: 245 },
            { id: 5, valueName: '苹果手机', attrId: 245 },
            { id: 6, valueName: '苹果手机', attrId: 245 },
            { id: 7, valueName: '安卓手机', attrId: 245 },
            { id: 8, valueName: '苹果手机', attrId: 245 },
            { id: 9, valueName: '苹果手机', attrId: 245 },
            { id: 10, valueName: '安卓手机', attrId: 245 },
            { id: 11, valueName: '安卓手机222', attrId: 245 },
            { id: 12, valueName: '安卓手机111', attrId: 245 }
        ]
    },
    */

    context.body = { code: 200, message: '成功', data }
});

//响应新增or编辑管理分类数据
router.post('/addoredit/classifieddata/:id1/:id2/:id3', async (context) => {
    // console.log(context.params);
    // console.log(context.request.body);




    if (context.request.body.id) {
        //编辑数据

        context.request.body.attrValueList.forEach(item => {
            item.attrid = context.request.body.id;
            item.attrId = context.request.body.attrId;
        });

        // console.log(context.request.body.attrValueList);




        // `update 表名 set 字段名1=值1,字段名2=值2,字段名3=值3 where 条件;`
        await resDb(`update table_managedataattr set attrname=? where id=${context.request.body.id};`, [context.request.body.name]);

        //删除原有的数据，直接使用新数据覆盖
        await resDb(`delete from table_managedatavalue WHERE attrid=${context.request.body.attrValueList[0].attrid};`);

        context.request.body.attrValueList.forEach(async (item, index) => {
            await resDb(`insert into table_managedatavalue(value,manage3id,attrid) values(?,${item.attrId},${item.attrid});`, [item.valueName]);
        });

        // for (let i = 0; i < context.request.body.attrValueList.length; i++) {
        //     await resDb();
        // };

        // allClassifiedData.find((item, index) => {
        //     if (item.id === context.request.body.id) {
        //         item = context.request.body;
        //         return true;
        //     }
        // });
        context.body = { code: 200, message: '成功' };

    } else {
        //新增数据

        // {
        //     name: '手机一级',
        //     attrId: 8,
        //     attrValueList: [ { valueName: '123', flag: false, attrId: 8 } ],
        //     id: 1
        //   }

        await resDb(`insert into table_managedataattr(attrname,manage3id) values(?,${+context.params.id3});`, [context.request.body.name]);
        // const data = await resDb(`SELECT id FROM table_managedataattr WHERE attrname='电池容量';`);
        const [{ id }] = await resDb(`SELECT id FROM table_managedataattr WHERE attrname=?;`, [context.request.body.name]);


        context.request.body.attrValueList.forEach(async (item, index) => {
            await resDb(`insert into table_managedatavalue(value,manage3id,attrid) values(?,${+context.params.id3},${id});`, [item.valueName]);
        });

        context.body = { code: 200, message: '成功' };


    };



    // {
    //     id: 1,
    //         name: '手机一级',
    //             attrId: 245,
    //                 attrValueList: [
    //                     { id: 1, valueName: '安卓手机', attrId: 245 },
    //                     { id: 2, valueName: '安卓手机222', attrId: 245 },
    //                     { id: 3, valueName: '安卓手机', attrId: 245 },
    //                     { id: 4, valueName: '安卓手机111', attrId: 245 },
    //                     { id: 5, valueName: '苹果手机', attrId: 245 },
    //                     { id: 6, valueName: '苹果手机', attrId: 245 },
    //                     { id: 7, valueName: '安卓手机', attrId: 245 },
    //                     { id: 8, valueName: '苹果手机', attrId: 245 },
    //                     { id: 9, valueName: '苹果手机', attrId: 245 },
    //                     { id: 10, valueName: '安卓手机', attrId: 245 },
    //                     { id: 11, valueName: '安卓手机222', attrId: 245 },
    //                     { id: 12, valueName: '安卓手机111', attrId: 245 }
    //                 ]
    // },



});


//响应删除管理分类数据
router.get('/delete/classifieddata/:id', async (context) => {

    // console.log(context.params);

    //删除的顺序：先删除子表  ->   再删除父表
    await resDb(`delete from table_managedatavalue where attrid=${+context.params.id};`);

    await resDb(`delete from table_managedataattr where id=${+context.params.id};`);

    // allClassifiedData.find((item, index) => {
    //     if (item.id === +context.params.id) {
    //         allClassifiedData.splice(index, 1);
    //         return true;
    //     }
    // });


    context.body = { code: 200, message: '成功' };
});


//测试
// router.post('/demo', async context => {

//     const data = await resDb(`SELECT id FROM table_managedataattr WHERE attrname='电池容量';`);


//     console.log(data);
//     context.body = data
// });


module.exports = router;