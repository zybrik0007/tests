const {it} = require('mocha');
const {createConnection} = require('mysql');
const {makeDb} = require('mysql-async-simple');
const entry = require('../../../../entry');
const connection = createConnection({
    host: entry.db.host,
    port: entry.db.port,
    user: entry.db.user,
    password: entry.db.password,
    database: entry.db.database
});
const db = makeDb();
//db.connect(connection);

module.exports = {

    connectionDB: async () => {
        try {
            await db.connect(connection);
            return {
                error: false,
                description: 'Соединение с БД.'
            }
        } catch (err) {
            console.log(err);
            return {
                error: true,
                description: 'Ошибка соединения с БД.'
            }
        }
    },

    quitDb: async () => {
        try {
            await db.close(connection);
            return {
                error: false,
                description: 'Соединение с БД прервано.'
            }
        } catch (err) {
            console.log(err);
            return {
                error: true,
                description: 'Ошибка разрыва связей с БД.'
            }
        }
    },

    addEvent: async (object) => {
        try {
            //await db.connect(connection);
            console.log('Object.keys(object).join(): ', Object.keys(object).join());
            console.log('{Object.values(object).join(): ', Object.values(object).join());
            await db.query(connection,`INSERT INTO event (${Object.keys(object).join()}) VALUES (${Object.values(object).join()})`);
            //await db.close(connection);
            return {
                error: false,
                description: 'Событие добавлено.'
            }
        } catch (err) {
            console.log('Object.keys(object).join(): ', Object.keys(object).join());
            console.log('{Object.values(object).join(): ', Object.values(object).join());
            console.log('err: ', err)
            return {
                error: true,
                description: 'Событие не добавлено.'
            }
        }
    },

    deleteEventFioId: async (userId) => {
        try {
            await db.query(connection,`DELETE FROM event WHERE user_id=${userId}`);
            return {
                error: false,
                description: 'Событие удалено.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Событие не удалено.'
            }
        }
    },

    updateUserCard: async ({user_id, identifier, operator_id, create_date}) => {
        try {
            await db.query(connection,
                `UPDATE user_card SET 
                identifier="${identifier}",
                operator_id="${operator_id}",
                create_date="${create_date}"
                WHERE user_id="${user_id}"`);
            return {
                error: false,
                description: 'Строка в таблице user_card изменена.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Строка в таблице user_card не изменена.'
            }
        }
    },

    deleteUser: async (id) => {
        try {
            await db.query(connection,`DELETE FROM user WHERE id=${id}`);
            return {
                error: false,
                description: 'Пользователь удален.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Пользователь не удален.'
            }
        }
    },

    deleteAllUser : async () => {
        try {
            await db.query(connection,`TRUNCATE TABLE user `);
            return {
                error: false,
                description: 'Пользователи удален.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Пользователи не удален.'
            }
        }
    },

    deleteAlUserAdditionalData: async () => {
        try {
            await db.query(connection,`TRUNCATE TABLE user_additional_field_data`);
            return {
                error: false,
                description: 'Удалены связи пользователей и дополнительных данных.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Не удалены связи пользователей и дополнительных данных.'
            }
        }
    },

    updateUserCrateDate: async ({id, create_date}) => {
        try {
            await db.query(connection,
                `UPDATE user SET 
                create_date="${create_date}"
                WHERE id="${id}"`);
            return {
                error: false,
                description: 'Строка в таблице user изменена.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Строка в таблице user не изменена.'
            }
        }
    },

    updateUserEndDate: async ({id, end_date}) => {
        try {
            await db.query(connection,
                `UPDATE user_visitor SET 
                archive_datetime="${end_date}"
                WHERE user_id="${id}"`);
            return {
                error: false,
                description: 'Строка в таблице user_visitor изменена.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Строка в таблице user_visitor не изменена.'
            }
        }
    },

}

