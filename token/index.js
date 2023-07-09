const jwt = require('jsonwebtoken');

const secretKey = '(^_^)';


//userInformation 用户信息，格式为：{ accountnumber, password }
const generationToken = userInformation => jwt.sign(userInformation, secretKey, { expiresIn: '24h' });

//该方法需要设置错误处理
const verificationToken = token => jwt.verify(token, secretKey);


module.exports = { generationToken, verificationToken };