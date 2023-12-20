const entry = require('../../../entry');
const mysql = require('./connection/mysql');

const middleware = () => {
    switch (entry.db.type) {
        case "mysql":
            return mysql

        default:
            return mysql
    }
}

module.exports = middleware();
