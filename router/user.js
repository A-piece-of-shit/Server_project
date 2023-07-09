// 处理用户模块路由
const Router = require('koa-router');
const router = new Router();

const fs = require('fs');

//引入数据库接口
const resDb = require('../mysql/index.js');

//引入token接口
const { generationToken, verificationToken } = require('../token/index.js');
const { assert } = require('console');
//响应用户登录请求
router.post('/login', async (context) => {
    //context.request.rawBody原生post请求数据
    // console.log(context.request.rawBody);
    // console.log(context.request.body);
    const { password, accountNumber } = context.request.body;

    const result = await resDb('select id,accountnumber,password from demo1 where accountnumber=? and password=?;', [accountNumber, password]);


    // const flag = result.some(({ accountnumber, password }) => password === context.request.body.password && accountnumber === context.request.body.accountNumber);

    if (result.length > 0) {




        // userRightsList = [...new Set(userRightsList)];


        //生成token
        const token = generationToken(context.request.body);
        context.body = {
            code: 200,
            message: '成功',
            data: token
        };
    } else {
        context.body = {
            code: 201,
            message: '登录失败，账号或密码不正确！！！',
            data: null
        };
    };
});

//响应用户退出登录请求
router.get('/logout', async (context) => {
    context.body = {
        code: 200,
        message: '成功',
        data: null
    };
});

//响应用户信息请求
router.get('/info', async (context) => {

    // console.log(context.request.header);

    //获取并解析token
    try {
        const token = verificationToken(context.request.header.token);
        const data = await resDb('select id,useravatar,username from demo1 where accountnumber=?;', [token.accountNumber]);

        // const userPositionIdList = await resDb(`select positionid from userposition where userid=${data[0].id};`);

        let useravatar = '';

        try {
            useravatar = Buffer.from(data[0].useravatar).toString('base64');
        } catch (error) {
            useravatar = '';
        }



        //用户职位id列表
        const userPositionIdList = await resDb(`select positionid from table_userposition where userid=${data[0].id};`);

        //用户权限ID列表
        const userPermissionsIdList = [];

        //用户拥有的权限列表
        const userRightsList = new Set();


        for (let i = 0; i < userPositionIdList.length; i++) {
            const positionAuthority = await resDb(`select permissionsid from table_positionauthority where positionid=${userPositionIdList[i].positionid};`);
            userPermissionsIdList.push(positionAuthority.map(item => item.permissionsid));
        };


        for (let i = 0; i < userPermissionsIdList.length; i++) {
            for (let j = 0; j < userPermissionsIdList[i].length; j++) {
                const [{ name }] = await resDb(`select name from table_permissions where id=${userPermissionsIdList[i][j]};`);
                userRightsList.add(name);
            }
        };


        context.body = {
            code: 200,
            message: '成功',
            data: {
                useravatar,
                username: data[0].username,
                userRightsList: [...userRightsList],//用户权限
            }
        };

    } catch (error) {
        context.body = {
            code: 201,
            message: 'token过期，请重新登录！！！',
        }
    }


    // const flag = result.some(({ accountnumber, password }) => {
    //     if (password === token.password, accountnumber === token.accountNumber) return true;
    // });




});









//模拟所有用户信息
const allUserInfo = [
    {
        id: 0,
        createTime: '2023年1月1日',
        updateTime: '2023年1月1日',
        userName: '成果',
        position: '老板',
        accountnumber: '123456789',
        password: '741852963'
    },
    {
        id: 0,
        createTime: '2023年1月1日',
        updateTime: '2023年1月1日',
        userName: '成果',
        position: '老板',
        accountnumber: '123456789',
        password: '741852963'
    },
    {
        id: 0,
        createTime: '2023年1月1日',
        updateTime: '2023年1月1日',
        userName: '成果',
        position: '老板',
        accountnumber: '123456789',
        password: '741852963'
    },
    {
        id: 0,
        createTime: '2023年1月1日',
        updateTime: '2023年1月1日',
        userName: '成果',
        position: '老板',
        accountnumber: '123456789',
        password: '741852963'
    },
    {
        id: 0,
        createTime: '2023年1月1日',
        updateTime: '2023年1月1日',
        userName: '成果',
        position: '老板',
        accountnumber: '123456789',
        password: '741852963'
    },
    {
        id: 0,
        createTime: '2023年1月1日',
        updateTime: '2023年1月1日',
        userName: '成果',
        position: '老板',
        accountnumber: '123456789',
        password: '741852963'
    },
    {
        id: 0,
        createTime: '2023年1月1日',
        updateTime: '2023年1月1日',
        userName: '成果',
        position: '老板',
        accountnumber: '123456789',
        password: '741852963'
    },
    {
        id: 0,
        createTime: '2023年1月1日',
        updateTime: '2023年1月1日',
        userName: '成果',
        position: '老板',
        accountnumber: '123456789',
        password: '741852963'
    },
];


//响应获取用户所有信息
router.get('/getall/:page/:size', async context => {
    // {
    //     id: 0,
    //     createTime: '2023年1月1日',
    //     updateTime: '2023年1月1日',
    //     userName: '成果',
    //     position: '老板',
    //     accountnumber: '123456789',
    //     password: '741852963'
    // },

    let result = [];
    if (context.request.query.username === '') {
        result = await resDb(`select 
        id,
        username as userName,
        creatTime as createTime,
        updateTime,
        accountnumber,
        password from demo1 limit ${(context.params.page - 1) * context.params.size}, ${context.params.size};`);
    } else {
        result = await resDb(`select 
        id,
        username as userName,
        creatTime as createTime,
        updateTime,
        accountnumber,
        password from demo1 where name like ? limit ${(context.params.page - 1) * context.params.size}, ${context.params.size};`, [context.request.query.username + '%']);
    };

    const total = await resDb(`select count(*) as total from demo1;`);
    // console.log(result);

    context.body = { code: 200, message: '成功', data: { records: result, total: total[0].total } };

    // console.log(context.request.query.username);
    // context.body = { code: 200, message: '成功', data: { records: allUserInfo, total: 500 } };
});




//响应添加用户
router.post('/add', async context => {
    const { userName, accountnumber, password } = context.request.body
    // console.log(conrext.request.body);
    const date = new Date();
    const time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;

    await resDb(`insert into demo1 (username,accountnumber,password,creatTime,updateTime) values(?,?,?,?,?);`, [userName, accountnumber, password, time, time]);

    context.body = { code: 200, message: '成功' };
});

//响应更新用户
router.post('/update', async context => {
    const { userName, accountnumber, password, id } = context.request.body
    // console.log(context.request.body);

    const date = new Date();
    const time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;
    await resDb(`update demo1 set username=?,accountnumber=?,password=?,updateTime=? where id=${id};`, [userName, accountnumber, password, time]);
    // await resDb(`insert into demo1 (username,accountnumber,password,creatTime,updateTime) values(?,?,?,?,?);`, [userName, accountnumber, password, time, time]);

    context.body = { code: 200, message: '成功' };
});

//响应删除用户
router.get('/delete/:userid', async context => {
    await resDb(`delete from demo1 where id=${context.params.userid};`);

    context.body = { code: 200, message: '成功' };
});

//响应批量删除用户
router.post('/deleteall', context => {
    // console.log(context.request.body);


    context.request.body.forEach(async item => {
        await resDb(`delete from demo1 where id=${item};`);

    });

    context.body = { code: 200, message: '成功' };

});


//模拟所有职位信息
// const allPosition = [
//     {
//         id: 1,
//         createTime: '2023年1月1日',
//         updateTime: '2023年1月1日',
//         jobTitle: '前端'
//     },
//     {
//         id: 2,
//         createTime: '2023年1月1日',
//         updateTime: '2023年1月1日',
//         jobTitle: '后端'
//     },
//     {
//         id: 3,
//         createTime: '2023年1月1日',
//         updateTime: '2023年1月1日',
//         jobTitle: 'UI'
//     },
//     {
//         id: 4,
//         createTime: '2023年1月1日',
//         updateTime: '2023年1月1日',
//         jobTitle: '大数据'
//     },
//     {
//         id: 5,
//         createTime: '2023年1月1日',
//         updateTime: '2023年1月1日',
//         jobTitle: '老板'
//     },
//     {
//         id: 6,
//         createTime: '2023年1月1日',
//         updateTime: '2023年1月1日',
//         jobTitle: '安卓'
//     },
//     {
//         id: 7,
//         createTime: '2023年1月1日',
//         updateTime: '2023年1月1日',
//         jobTitle: 'ios'
//     },

// ];

//模拟当前用户信息
// const userPosition = [
//     {
//         id: 1,
//         createTime: '2023年1月1日',
//         updateTime: '2023年1月1日',
//         jobTitle: '前端'
//     },
//     {
//         id: 2,
//         createTime: '2023年1月1日',
//         updateTime: '2023年1月1日',
//         jobTitle: '后端'
//     },
//     // {
//     //     id: 5,
//     //     createTime: '2023年1月1日',
//     //     updateTime: '2023年1月1日',
//     //     jobTitle: '老板'
//     // }
// ];


//获取所有职位 以及 当前用户职位信息接口
router.get('/positioninfo/:userid', async context => {
    // console.log(+context.params.userid);
    // {
    //     id: 1,
    //     createTime: '2023年1月1日',
    //     updateTime: '2023年1月1日',
    //     jobTitle: '前端'
    // },


    //存储用户已有职位信息
    const userPosition = [];

    //用户已有职位id
    const userPositionIdList = await resDb(`select positionid from table_userposition where userid=${+context.params.userid}`);

    userPositionIdList.forEach(async item => {
        const [userPositionItem] = await resDb(`select id,name as jobTitle,creatTime as createTime,updateTime from table_position where id=${item.positionid}`);
        userPosition.push(userPositionItem);
    });

    //存储所有职位信息
    const allPosition = await resDb(`select id,name as jobTitle,creatTime as createTime,updateTime from table_position`);

    context.body = { code: 200, message: '成功', data: { allPosition, userPosition } };
});


//当前用户分配职位接口
router.post('/assignedpost', async context => {

    const { userId, positionIdList } = context.request.body

    // console.log(context.request.body);
    positionIdList.forEach(async item => {
        await resDb(`insert into table_userposition (positionid,userid) values(${item},${userId});`);
    });

    context.body = { code: 200, message: '成功' };
});





// router.get('/demo', (context) => {
//     // console.log(context.request.header);
//     try {
//         // const decoded = jwt.verify(context.request.header.token, '(^_^)');
//         const userInformation = verificationToken(context.request.header.token);
//         console.log(a);
//         context.body = '成功了'

//     } catch (error) {
//         // console.log(error.message);

//         context.body = '失败了'
//     }

// });





module.exports = router;