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

    addDocument: async (object) => {
        try {
            console.log('Object.keys(object).join(): ', Object.keys(object).join());
            console.log('{Object.values(object).join(): ', Object.values(object).join());
            await db.query(connection,`INSERT INTO user_doc (${Object.keys(object).join()}) VALUES (${Object.values(object).join()})`);
            return {
                error: false,
                description: 'Документ добавлен.'
            }
        } catch (err) {
            console.log('Object.keys(object).join(): ', Object.keys(object).join());
            console.log('{Object.values(object).join(): ', Object.values(object).join());
            console.log('err: ', err)
            return {
                error: true,
                description: 'Документ не добавлен.'
            }
        }
    },

    deleteDocument: async (userId) => {
        try {
            await db.query(connection,`DELETE FROM user_doc WHERE user_id=${userId}`);
            return {
                error: false,
                description: 'Документ удален.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Документ не удален.'
            }
        }
    },

    updateDateUserChange: async (begin_date) => {
        try {
            await db.query(connection,
                `UPDATE user_change SET 
                begin_date="${begin_date}"`);
            return {
                error: false,
                description: 'Строка в таблице user_change изменена.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Строка в таблице user не изменена.'
            }
        }
    },

    truncateEvent: async () => {
        try {
            await db.query(connection,`TRUNCATE TABLE event`);
            return {
                error: false,
                description: 'Удалены все события.'
            }
        } catch (err) {
            return {
                error: true,
                description: 'Не удалены все события.'
            }
        }
    },

    addDesignTemplate: async (object) => {
        try {
            //console.log(Object.keys({name, data, user_type}).join());
            //console.log(Object.values({name, data, user_type}).join());
            await db.query(connection,`INSERT INTO pass_template_design (${Object.keys(object).join()}) VALUES (${Object.values(object).join()})`);
            return {
                error: false,
                description: 'Добавление Дизайна пропуска.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Не добавлен Дизайн пропуска.'
            }
        }
    },

    deleteDesignTemplate: async (name) => {
        try {
            await db.query(connection,`DELETE FROM pass_template_design WHERE name='${name}'`);
            return {
                error: false,
                description: 'Удаление дизайна прпоуска.'
            }
        } catch (err) {
            return {
                error: true,
                description: 'Дизайн пропуска не удален.'
            }
        }
    },

    addVerifyTemplate: async (object) => {
        try {
            await db.query(connection,`INSERT INTO verify_template (${Object.keys(object).join()}) VALUES (${Object.values(object).join()})`);
            return {
                error: false,
                description: 'Добавление Шаблона верификации.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Не добавлен Шаблон верификации.'
            }
        }
    },

    deleteVerifyTemplate: async (name) => {
        try {
            await db.query(connection,`DELETE FROM verify_template WHERE name='${name}'`);
            return {
                error: false,
                description: 'Удаление Шаблона верификации.'
            }
        } catch (err) {
            return {
                error: true,
                description: 'Шаблон верификации не удален.'
            }
        }
    },

    addPlan: async (object) => {
        try {
            await db.query(connection,`INSERT INTO plan (${Object.keys(object).join()}) VALUES (${Object.values(object).join()})`);
            return {
                error: false,
                description: 'Добавление Интерактивного плана.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Не добавлен Интерактивный план.'
            }
        }
    },

    deletePlan: async (name) => {
        try {
            await db.query(connection,`DELETE FROM plan WHERE name='${name}'`);
            return {
                error: false,
                description: 'Удаление Интерактивного плана.'
            }
        } catch (err) {
            return {
                error: true,
                description: 'Интерактивный план не удален.'
            }
        }
    },
}

