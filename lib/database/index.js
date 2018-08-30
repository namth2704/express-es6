import mysql from 'mysql';
import config from 'exp-config';
import logger from '../logger';

let instance = null;

class Database {
    constructor() {
        if (!instance) {
            instance = this;
            this._connection = this.createConnection();
        }

        return instance;
    }

    createConnection() {
        return mysql.createConnection(config.mysqlConfig);
    }

    query(sqlQuery, params) {
        if (this._connection) {
            return new Promise((resolve, reject) => {
                this._connection.query(sqlQuery, params, (err, results) => {
                    if (err) reject(err);

                    resolve(results);
                });
            });
        } else {
            return null;
        }
    }
}

export default Database;