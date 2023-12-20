const {it} = require('mocha');
const {createConnection} = require('mysql');
const {makeDb} = require('mysql-async-simple');
const entry = require('../../../../entry');
const connection = createConnection({
    host: entry.db.host,
    user: entry.db.user,
    password: entry.db.password,
    database: entry.db.database
});
const db = makeDb();

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
            await db.query(connection,`INSERT INTO event (${Object.keys(object).join()}) 
            VALUES (${Object.values(object).join()})`);
            //await db.close(connection);
            return {
                error: false,
                description: 'Событие добавлено.'
            }
        } catch (err) {
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
}

