
exports.mysqlConfig = {
    host:'localhost',
    port: 3306,
    user: 'root', // mysql账号
    password: '123456', // mysql数据库密码
    database: 'thumnus_blog',
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
};
