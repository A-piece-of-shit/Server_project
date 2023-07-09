// 处理用户模块路由
const Router = require('koa-router');
const router = new Router();


//引入数据库接口
const resDb = require('../mysql/index.js');

//模拟所有职位信息数据
// const allJobInformationData = [
//     { id: 1, creatTime: '2023年1月1日', updateTime: '2023年1月1日', name: '前端' },
//     { id: 1, creatTime: '2023年1月1日', updateTime: '2023年1月1日', name: '后端' },
//     { id: 1, creatTime: '2023年1月1日', updateTime: '2023年1月1日', name: '测试' },
//     { id: 1, creatTime: '2023年1月1日', updateTime: '2023年1月1日', name: '大数据' },
//     { id: 1, creatTime: '2023年1月1日', updateTime: '2023年1月1日', name: '老板' },
//     { id: 1, creatTime: '2023年1月1日', updateTime: '2023年1月1日', name: '安卓' },
//     { id: 1, creatTime: '2023年1月1日', updateTime: '2023年1月1日', name: 'IOS' },
//     { id: 1, creatTime: '2023年1月1日', updateTime: '2023年1月1日', name: '算法' },
//     { id: 1, creatTime: '2023年1月1日', updateTime: '2023年1月1日', name: 'UI' },
//     { id: 1, creatTime: '2023年1月1日', updateTime: '2023年1月1日', name: '程序员鼓励师' },
//     { id: 1, creatTime: '2023年1月1日', updateTime: '2023年1月1日', name: '励志师' }

// ];





//响应获取所有职位信息数据
router.get('/getall/:page/:size', async context => {
    // console.log(context.request.query.jobTitle);
    let result = [];
    if (context.request.query.jobTitle === '') {
        result = await resDb(`select id,name,creatTime,updateTime from table_position limit ${(context.params.page - 1) * context.params.size}, ${context.params.size};`);
    } else {
        result = await resDb(`select id,name,creatTime,updateTime from table_position where name like ? limit ${(context.params.page - 1) * context.params.size}, ${context.params.size};`, [context.request.query.jobTitle + '%']);
    };

    const total = await resDb(`select count(*) as total from table_position;`);

    context.body = { code: 200, message: '成功', data: { records: result, total: total[0].total } };

});

//响应添加职位信息数据
router.post('/add', async context => {
    const date = new Date();
    const time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;

    resDb(`insert into table_position (name,creatTime,updateTime) values(?,?,?);`, [context.request.body.name, time, time]);
    context.body = { code: 200, message: '成功' };
});

//响应更新职位信息数据
router.post('/update', async context => {

    const date = new Date();
    const time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;

    resDb(`update table_position set name=?,updateTime=? where id=${context.request.body.id};`, [context.request.body.name, time]);
    context.body = { code: 200, message: '成功' };
});

//响应删除职位信息数据
router.get('/delete/:jobId', async context => {
    await resDb(`delete from table_position where id=${context.params.jobId};`);
    context.body = { code: 200, message: '成功' };
});


//响应获取职位权限
router.get('/authority/:jobId', async context => {



    // {
    //     id: 1, name: '权限管理', authorityLevel: 1, select: true,
    //         children: [
    //             {
    //                 id: 3, name: '用户管理', authorityLevel: 2, select: true, children: [
    //                     { id: 9, name: '增', authorityLevel: 3, select: true, },
    //                     { id: 10, name: '删', authorityLevel: 3, select: true, },
    //                     { id: 11, name: '改', authorityLevel: 3, select: true, },
    //                     { id: 12, name: '查', authorityLevel: 3, select: true, }
    //                 ]
    //             },
    //             {
    //                 id: 4, name: '角色管理', authorityLevel: 2, select: true, children: [
    //                     { id: 13, name: '增', authorityLevel: 3, select: true, },
    //                     { id: 14, name: '删', authorityLevel: 3, select: true, },
    //                     { id: 15, name: '改', authorityLevel: 3, select: true, },
    //                     { id: 16, name: '查', authorityLevel: 3, select: true, }
    //                 ]
    //             },
    //         ]
    // },
    // {
    //     id: 2, name: '商品管理', authorityLevel: 1, select: false,
    //         children: [
    //             {
    //                 id: 5, name: '品牌管理', authorityLevel: 1, select: false, children: [
    //                     { id: 17, name: '增', authorityLevel: 3, select: true, },
    //                     { id: 18, name: '删', authorityLevel: 3, select: true, },
    //                     { id: 19, name: '改', authorityLevel: 3, select: true, },
    //                     { id: 20, name: '查', authorityLevel: 3, select: false, }
    //                 ]
    //             },
    //             {
    //                 id: 6, name: '属性管理', authorityLevel: 1, select: false, children: [
    //                     { id: 21, name: '增', authorityLevel: 3, select: true, },
    //                     { id: 22, name: '删', authorityLevel: 3, select: true, },
    //                     { id: 23, name: '改', authorityLevel: 3, select: true, },
    //                     { id: 24, name: '查', authorityLevel: 3, select: false, }
    //                 ]
    //             },
    //             {
    //                 id: 7, name: 'SPU管理', authorityLevel: 1, select: false, children: [
    //                     { id: 25, name: '增', authorityLevel: 3, select: true, },
    //                     { id: 26, name: '删', authorityLevel: 3, select: true, },
    //                     { id: 27, name: '改', authorityLevel: 3, select: true, },
    //                     { id: 28, name: '查', authorityLevel: 3, select: false, }
    //                 ]
    //             },
    //             {
    //                 id: 8, name: 'SKU管理', authorityLevel: 1, select: false, children: [
    //                     { id: 29, name: '增', authorityLevel: 3, select: true, },
    //                     { id: 30, name: '删', authorityLevel: 3, select: true, },
    //                     { id: 31, name: '改', authorityLevel: 3, select: true, },
    //                     { id: 32, name: '查', authorityLevel: 3, select: false, }
    //                 ]
    //             }

    //         ],
    // },



    // console.log(context.params.jobId);

    const result = await resDb(`select id,name,level as authorityLevel,attribution from table_permissions;`);

    //当前职位下已有权限
    const positionAuthorityIdList = await resDb(`select permissionsid from table_positionauthority where positionid=${context.params.jobId};`);
    // console.log(positionAuthorityIdList);


    const firstLevelAuthority = [];
    const secondLevelAuthority = [];
    const threeLevelAuthority = [];


    result.forEach((item, index, arr) => {
        if (item.authorityLevel === 1) {
            item.children = [];
            firstLevelAuthority.push(item);
            // arr.splice(index, 1);
        } else if (item.authorityLevel === 2) {
            item.children = [];
            secondLevelAuthority.push(item);
        } else {

            positionAuthorityIdList.find((alreadyHavePermission, index) => {
                if (alreadyHavePermission.permissionsid === item.id) {
                    positionAuthorityIdList.splice(index, 1);
                    item.select = true;
                    return true;
                };
            });

            if (!item?.select) item.select = false;
            threeLevelAuthority.push(item);

        };
    });


    //一级权限数据
    // const firstLevelAuthority = result.filter((item, index, arr) => {
    //     if (item.authorityLevel === 1) {
    //         item.children = [];
    //         // arr.splice(index, 1);
    //         return true;
    //     };
    // });

    //二级权限数据
    // const secondLevelAuthority = result.filter((item, index, arr) => {
    //     if (item.authorityLevel === 2) {
    //         item.children = [];
    //         // arr.splice(index, 1);
    //         return true;
    //     };
    // });

    //三级权限数据
    // const threeLevelAuthority = result.filter((item, index, arr) => {
    //     // let i = 0;
    //     // while (i < positionAuthorityIdList.length) {
    //     //     if (item.id === positionAuthorityIdList[i].permissionsid) {
    //     //         item.select = true;
    //     //         positionAuthorityIdList.splice(i, 1);
    //     //         i = 0;
    //     //     } else i++;
    //     // };

    //     positionAuthorityIdList.find((alreadyHavePermission, index) => {
    //         if (alreadyHavePermission.permissionsid === item.id) {
    //             positionAuthorityIdList.splice(index, 1);
    //             item.select = true;
    //             return true;
    //         };
    //     });

    //     if (!item?.select) item.select = false;

    //     if (item.authorityLevel === 3) {
    //         // arr.splice(index, 1);
    //         return true;
    //     };
    // });


    threeLevelAuthority.forEach(threeLevelAuthorityItem => {
        secondLevelAuthority.forEach(secondLevelAuthorityItem => {
            secondLevelAuthorityItem.select = true;
            if (threeLevelAuthorityItem.attribution === secondLevelAuthorityItem.name) {
                if (threeLevelAuthorityItem.select === false) secondLevelAuthorityItem.select = false;
                secondLevelAuthorityItem.children.push(threeLevelAuthorityItem);
            };
        });
    });

    secondLevelAuthority.forEach(secondLevelAuthorityItem => {
        firstLevelAuthority.forEach(firstLevelAuthorityItem => {
            firstLevelAuthorityItem.select = true;
            if (secondLevelAuthorityItem.attribution === firstLevelAuthorityItem.name) {
                if (secondLevelAuthorityItem.select === false) firstLevelAuthorityItem.select = false;
                firstLevelAuthorityItem.children.push(secondLevelAuthorityItem);
            }
        });
    });


    context.body = {
        code: 200,
        message: '成功',
        data: firstLevelAuthority,
    };




});


//响应分配权限
router.post('/assignauthority/:jobId', async context => {
    // console.log(context.params.jobId);
    // console.log(context.request.body[0]);


    context.request.body.forEach(async item => {
        await resDb(`insert into table_positionauthority (permissionsid,positionid) values(${item},${+context.params.jobId});`);
    });

    context.body = { code: 200, message: '成功' };


});



// const data = [
//     {
//         id: 1, name: '权限管理', authorityLevel: 1, select: true,
//         children: [
//             {
//                 id: 3, name: '用户管理', authorityLevel: 2, select: true, children: [
//                     { id: 9, name: '增', authorityLevel: 3, select: true, },
//                     { id: 10, name: '删', authorityLevel: 3, select: true, },
//                     { id: 11, name: '改', authorityLevel: 3, select: true, },
//                     { id: 12, name: '查', authorityLevel: 3, select: true, }
//                 ]
//             },
//             {
//                 id: 4, name: '角色管理', authorityLevel: 2, select: true, children: [
//                     { id: 13, name: '增', authorityLevel: 3, select: true, },
//                     { id: 14, name: '删', authorityLevel: 3, select: true, },
//                     { id: 15, name: '改', authorityLevel: 3, select: true, },
//                     { id: 16, name: '查', authorityLevel: 3, select: true, }
//                 ]
//             },
//         ]
//     },
//     {
//         id: 2, name: '商品管理', authorityLevel: 1, select: false,
//         children: [
//             {
//                 id: 5, name: '品牌管理', authorityLevel: 1, select: false, children: [
//                     { id: 17, name: '增', authorityLevel: 3, select: true, },
//                     { id: 18, name: '删', authorityLevel: 3, select: true, },
//                     { id: 19, name: '改', authorityLevel: 3, select: true, },
//                     { id: 20, name: '查', authorityLevel: 3, select: false, }
//                 ]
//             },
//             {
//                 id: 6, name: '属性管理', authorityLevel: 1, select: false, children: [
//                     { id: 21, name: '增', authorityLevel: 3, select: true, },
//                     { id: 22, name: '删', authorityLevel: 3, select: true, },
//                     { id: 23, name: '改', authorityLevel: 3, select: true, },
//                     { id: 24, name: '查', authorityLevel: 3, select: false, }
//                 ]
//             },
//             {
//                 id: 7, name: 'SPU管理', authorityLevel: 1, select: false, children: [
//                     { id: 25, name: '增', authorityLevel: 3, select: true, },
//                     { id: 26, name: '删', authorityLevel: 3, select: true, },
//                     { id: 27, name: '改', authorityLevel: 3, select: true, },
//                     { id: 28, name: '查', authorityLevel: 3, select: false, }
//                 ]
//             },
//             {
//                 id: 8, name: 'SKU管理', authorityLevel: 1, select: false, children: [
//                     { id: 29, name: '增', authorityLevel: 3, select: true, },
//                     { id: 30, name: '删', authorityLevel: 3, select: true, },
//                     { id: 31, name: '改', authorityLevel: 3, select: true, },
//                     { id: 32, name: '查', authorityLevel: 3, select: false, }
//                 ]
//             }

//         ],
//     },

// ];
//

// router.get('/authority/:jobid', context => {
//     context.body = { code: 200, message: '成功', data };
// });








module.exports = router;