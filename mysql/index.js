// import mysql from 'mysql'
const mysql = require('mysql');

//创建连接池 
// mysql 连接 mysql数据库

const connection = mysql.createConnection({
    host: '47.243.253.162', // mysql所在的主机，本地的话就是 127.0.0.1 或者 localhost, 如果数据库在服务器上，就写服务器的ip
    user: 'root', // mysql的用户名
    password: '123456', // mysql的密码
    database: 'test' // 你要连接那个数据库
})

connection.connect(err => {
    // err代表失败
    if (err) {
        console.log("数据库初始化失败");
    } else {
        console.log("数据库初始化成功");
    }
});


function resDb(sql, data) {
    return new Promise((resolve, reject) => {
        connection.query(sql, data, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        });
    })
};



module.exports = resDb;