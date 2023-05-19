const mysql = require('mysql');
const { mysqlConfig } = require('./config');

module.exports = {
    pool: null,
    reconnectCount: 1,
    init: function () {
        // 创建sql链接池
        var pool = mysql.createPool(mysqlConfig);
        this.pool = pool;
        this.checkDataBase();
        return;
    },
    checkDataBase: async function () {
        let result = await this.query('show tables', '');
        if (!result.type) {
            if (this.reconnectCount > 100) {
                this.reconnectCount = 1;
            }
            setTimeout(() => {
                this.reconnectCount++;
                this.checkDataBase();
            }, this.reconnectCount * 1000 * 10);
        }
    },
    // 普通的单条查询
    query: function (sql, sqlParams) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log('建立数据库连接失败', err);
                    reject({
                        type: false,
                        result: err,
                    });
                } else {
                    console.log('建立数据库连接成功');
                    connection.query(sql, sqlParams, (qerr, values, fields) => {
                        if (qerr) {
                            reject({
                                type: false,
                                result: qerr,
                                fields: fields,
                            });
                        } else {
                            resolve({
                                type: true,
                                result: values,
                                // fields: fields
                            });
                            this.pool.releaseConnection(connection);
                        }
                    });
                }
            });
        });
    },
    // mysql 多条sql操作事务处理
    execTransection: function (sqlArr) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    return reject({
                        type: false,
                        result: err,
                    });
                }
                connection.beginTransaction((err) => {
                    if (err) {
                        return reject({
                            type: false,
                            result: err,
                        });
                    }
                    let promiseArr = sqlArr.map(({ sql, value }) => {
                        return new Promise((resolve, reject) => {
                            connection.query(sql, value, (err, rows, fields) => {
                                if (err) {
                                    reject({
                                        type: false,
                                        result: err,
                                        fields: fields,
                                    });
                                } else {
                                    resolve({
                                        type: true,
                                        result: rows,
                                    });
                                }
                            });
                        });
                    });
                    Promise.all(promiseArr)
                        .then((res) => {
                            connection.commit((err) => {
                                if (err) {
                                    connection.rollback(() => {
                                        console.log('执行失败，回滚数据');
                                    });
                                    reject({
                                        type: false,
                                        result: err,
                                    });
                                } else {
                                    resolve({
                                        type: true,
                                        result: res,
                                    });
                                }
                                this.pool.releaseConnection(connection);
                            });
                        })
                        .catch((err) => {
                            connection.rollback(() => {
                                console.log('执行失败，回滚数据');
                            });
                            reject({
                                type: false,
                                result: err,
                            });
                            this.pool.releaseConnection(connection);
                        });
                });
            });
        });
    },
};
