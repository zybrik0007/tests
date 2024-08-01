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

    // Добавление события
    addEvent: async (object) => {
        try {
            const keys = Object.keys(object).join();
            const values = Object.values(object).join();
            await db.query(connection,`INSERT INTO event (${keys}) VALUES (${values})`);
            return {
                error: false,
                description: 'Событие добавлено.'
            }
        } catch (err) {
            return {
                error: true,
                description: 'Событие не добавлено.'
            }
        }
    },

    // Удалние событий у пользователя
    deleteEventFioId: async ({id}) => {
        try {
            await db.query(connection,`DELETE FROM event WHERE user_id=${id}`);
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

    // Изменние карты, оператора и даты создания у пользователя
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

    // Удаление пользователя
/*    deleteUser: async ({id}) => {
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
    },*/

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

    // Удаление всех дополнительных данные
    deleteAdditionalData: async ({name}) => {
        try {
            await db.query(connection,`DELETE FROM user_additional_field WHERE name='${name}'`);
            return {
                error: false,
                description: 'Удалены связи пользователей и дополнительных данных.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'ОШИБКА. Не удалены связи пользователей и дополнительных данных.'
            }
        }
    },

    // Изменнеие даты создания у пользователя
    updateUserCrateDate: async ({id, create_date}) => {
        try {
            await db.query(connection, `UPDATE user SET create_date="${create_date}" WHERE id="${id}"`);
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

    // Изменение даты окончания у пользователя
    updateUserEndDate: async ({id, end_date}) => {
        try {
            await db.query(connection,
                `UPDATE user_visitor SET archive_datetime="${end_date}" WHERE user_id="${id}"`);
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

    // Добавление документа пользователю
    addDocument: async (object) => {
        try {
            const keys = Object.keys(object).join();
            const values = Object.values(object).join();
            await db.query(connection,`INSERT INTO user_doc (${keys}) VALUES (${values})`);
            return {
                error: false,
                description: 'Документ добавлен.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Документ не добавлен.'
            }
        }
    },

    // Удаление документов  у пользователей
    deleteDocument: async ({id}) => {
        try {
            await db.query(connection,`DELETE FROM user_doc WHERE user_id=${id}`);
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

    // Изменнение даты начала у сотрудников (для планировщика)
    updateDateUserChange: async ({begin_date}) => {
        try {
            await db.query(connection, `UPDATE user_change SET begin_date="${begin_date}"`);
            return {
                error: false,
                description: 'Строки в таблице user_change изменена.'
            }
        } catch (err) {
            console.log('err: ', err)
            return {
                error: true,
                description: 'Строки в таблице user_change не изменена.'
            }
        }
    },

    // Удаление всех событий
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

    // Добавление дизайна пропуска
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

    // Удаление дизайна пропуска
    deleteDesignTemplate: async ({name}) => {
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

    // Добавление шаблона верификации
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

    // Удаление шаблона верификации
    deleteVerifyTemplate: async ({name}) => {
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

    // Добавление интерактивного плана
    addPlan: async (object) => {
        try {
            const keys = Object.keys(object).join();
            const values = Object.values(object).join();
            await db.query(connection,`INSERT INTO plan (${keys}) VALUES (${values})`);
            return {
                error: false,
                description: 'Добавление Интерактивного плана.'
            }
        } catch (err) {
            return {
                error: true,
                description: 'Не добавлен Интерактивный план.'
            }
        }
    },

    // Удаление интерактивного плана
    deletePlan: async ({name}) => {
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

    // Удаление графика работы
    deleteSchedule:  async ({name}) => {
        try {
            await db.query(connection,`DELETE FROM work_schedule WHERE name='${name}'`);
            return {
                error: false,
                description: `Удаление графика работы "${name}".`
            }
        } catch (err) {
            return {
                error: true,
                description: `ОШИБКА. Удаление должности "${name}".`
            }
        }
    },

    // Удаление должности
    deletePosition: async ({name}) => {
        try {
            await db.query(connection,`DELETE FROM position WHERE name='${name}'`);
            return {
                error: false,
                description: `Удаление должности "${name}".`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление должности "${name}".`
            }
        }
    },

    // Удаление помещения
    deleteAccessZone: async ({name}) => {
        try {
            await db.query(connection,`DELETE FROM access_zone WHERE name='${name}'`);
            return {
                error: false,
                description: `Удаление помещения "${name}".`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление помещения "${name}".`
            }
        }
    },

    // Удаление шаблона доступа
    deleteAccessTemplate: async ({name}) => {
        try {
            await db.query(connection,`DELETE FROM access_template WHERE name='${name}'`);
            return {
                error: false,
                description: `Удаление шаблона доступа "${name}".`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление шаблона доступа "${name}".`
            }
        }
    },

    // Удаление Подразделения
    deleteDivision: async ({name}) => {
        try {
            await db.query(connection,`DELETE FROM division WHERE name='${name}'`);
            return {
                error: false,
                description: `Удаление подразделения "${name}".`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление подразделения "${name}".`
            }
        }
    },

    // Удаление устройства
    deleteDevice: async ({ip}) => {
        try {
            await db.query(connection,`DELETE FROM device WHERE ip_addr='${ip}'`);
            return {
                error: false,
                description: `Удаление устройства "${ip}".`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление устройства "${ip}".`
            }
        }
    },

    // Удаление строк в таблице user_additional_field_data
    truncateUserAdditionalFieldFata:  async () => {
        try {
            await db.query(connection,`TRUNCATE TABLE user_additional_field_data`);
            return {
                error: false,
                description: `Удаление строк в таблице user_additional_field_data.`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление строк в таблице user_additional_field_data.`
            }
        }
    },

    // Удаление строк в таблице user_document
    truncateUserDocument:  async () => {
        try {
            await db.query(connection,`TRUNCATE TABLE user_document`);
            return {
                error: false,
                description: `Удаление строк в таблице user_document.`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление строк в таблице user_document.`
            }
        }
    },

    // Удаление строк в таблице user_staff
    truncateUserStaff:  async () => {
        try {
            await db.query(connection,`TRUNCATE TABLE user_staff`);
            return {
                error: false,
                description: `Удаление строк в таблице user_staff.`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление строк в таблице user_staff.`
            }
        }
    },

    // Удаление строк в таблице user_visitor
    truncateUserVisitor:  async () => {
        try {
            await db.query(connection,`TRUNCATE TABLE user_visitor`);
            return {
                error: false,
                description: `Удаление строк в таблице user_visitor.`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление строк в таблице user_visitor.`
            }
        }
    },

    // Удаление строк в таблице user_car
    truncateUserCar:  async () => {
        try {
            await db.query(connection,`TRUNCATE TABLE user_car`);
            return {
                error: false,
                description: `Удаление строк в таблице user_car.`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление строк в таблице user_car.`
            }
        }
    },

    // Удаление строк в таблице user_barcode
    truncateUserBarcode:  async () => {
        try {
            await db.query(connection,`TRUNCATE TABLE user_barcode`);
            return {
                error: false,
                description: `Удаление строк в таблице user_barcode.`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление строк в таблице user_barcode.`
            }
        }
    },

    // Удаление строк в таблице user_card
    truncateUserCard:  async () => {
        try {
            await db.query(connection,`TRUNCATE TABLE user_card`);
            return {
                error: false,
                description: `Удаление строк в таблице user_card.`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление строк в таблице user_card.`
            }
        }
    },

    // Удаление пользовтеля
    deleteUser: async ({lastName, name, middleName}) => {
        try {
/*            await db.query(connection,`TRUNCATE TABLE user_additional_field_data`);
            await db.query(connection,`TRUNCATE TABLE user_document`);
            await db.query(connection, 'TRUNCATE TABLE user_staff');
            await db.query(connection, 'TRUNCATE TABLE user_visitor');*/
            if(middleName) {
                await db.query(
                    connection,
                    `DELETE FROM user WHERE last_name='${lastName}' AND first_name='${name}' AND middle_name='${middleName}'`
                );
            }

            if(!middleName) {
                await db.query(
                    connection,
                    `DELETE FROM user WHERE last_name='${lastName}' AND first_name='${name}'`
                );
            }

/*            await db.query(connection, 'TRUNCATE TABLE user_car');
            await db.query(connection, 'TRUNCATE TABLE user_barcode');*/
            //await db.query(connection, 'TRUNCATE TABLE user_card');

            return {
                error: false,
                description: `Удаление пользователя "${lastName} ${name}".`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление пользователя "${lastName} ${name}".`
            }
        }
    },

    deleteUserFIO: async ({lastName, name, middleName}) => {
        try {
            await db.query(
                connection,
                `DELETE FROM user WHERE last_name='${lastName}' AND first_name='${name}' AND middle_name='${middleName}'`
            );
            return {
                error: false,
                description: `Удаление пользователя "${lastName} ${name}".`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                description: `ОШИБКА. Удаление пользователя "${lastName} ${name}".`
            }
        }
    },
}

