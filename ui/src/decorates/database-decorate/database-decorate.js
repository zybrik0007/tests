const db = require('../../database/connection/mysql');
const dec = require('../../dictionaries/decorate');

module.exports = {

    addEvent: (object) => it(`Добавление события в БД.`, async () => await dec.simple(db.addEvent,
        [object],
        db.addEvent)),

    deleteEventFioId: ({id}) => it(`Удаление событий у пользователя с id ${id} из БД.`,
        async () => await dec.simple(db.deleteEventFioId,
            [{id}],
            db.deleteEventFioId)),

    updateUserCard: ({user_id, identifier, operator_id, create_date}) =>
        it(`Изменние карты, оператора и даты создания у пользователя id ${user_id} в БД.`,
            async () => await dec.simple(db.updateUserCard,
                [{user_id, identifier, operator_id, create_date}],
                db.updateUserCard)),

/*    deleteUser: ({id}) => it(`Удаление пользователя с id ${id} из БД.`,
        async () => await dec.simple(db.deleteUser,
            [{id}],
            db.deleteUser)),*/

    deleteAdditionalData: ({name}) => it(`Удаление дополнительного поля ${name} из БД.`,
        async () => await dec.simple(db.deleteAdditionalData,
            [{name}],
            db.deleteAdditionalData)),

    updateUserCreateDate: ({id, create_date}) => it(`Изменнеие даты создания у пользователя с id ${id} в БД.`,
        async () => await dec.simple(db.updateUserCreateDate,
            [{id, create_date}],
            db.updateUserCreateDate)),

    updateUserEndDate: ({id, end_date}) => it(`Изменение даты создания у пользователя с id ${id} в БД.`,
        async () => await dec.simple(db.updateUserEndDate,
            [{id, end_date}],
            db.updateUserEndDate)),

    addDocument: (object) => it(`Добавление локумента пользователю с id ${object['user_id']} в БД.`,
        async () => await dec.simple(db.addDocument,
            [object],
            db.addDocument)),

    deleteDocument: ({id}) => it(`Удаления документа у пользователя с id ${id} из БД.`,
        async () => await dec.simple(db.deleteDocument,
            [{id}],
            db.deleteDocument)),

    updateDateUserChange: ({begin_date}) => it(`Изменение даты начала на ${begin_date} в планировщике 
    у пользователе в БД.`,
        async () => await dec.simple(db.updateDateUserChange,
            [{begin_date}],
            db.updateDateUserChange)),

    truncateEvent: () => it(`Удаление событий из БД.`, async () => await dec.simple(db.truncateEvent,
        [],
        db.truncateEvent)),

    addDesignTemplate: (object) => it(`Добавление дизайн пропуска ${object['name']} в БД.`,
        async () => await dec.simple(db.addDesignTemplate,
            [object],
            db.addDesignTemplate)),

    deleteDesignTemplate: ({name}) => it(`Удаление дизайна пропуска ${name} из БД.`,
        async () => await dec.simple(db.deleteDesignTemplate,
            [{name}],
            db.deleteDesignTemplate)),

    addVerifyTemplate: (object) => it(`Добавление шаблона верификации ${object['name']} в БД.`,
        async () => await dec.simple(db.addVerifyTemplate,
            [object],
            db.addVerifyTemplate)),

    deleteVerifyTemplate: ({name}) => it(`Удаление шаблона верификации ${name} из БД.`,
        async () => await dec.simple(db.deleteVerifyTemplate,
            [{name}],
            db.deleteVerifyTemplate)),

    addPlan: (object) => it(`Добавление интерактивного плана ${object['name']} в БД.`,
        async () => await dec.simple(db.addPlan,
            [object],
            db.addPlan)),

    deletePlan: ({name}) => it(`Удаление интерактивного плана ${name} из БД.`,
        async () => await dec.simple(db.deletePlan,
            [{name}],
            db.deletePlan)),

    deleteSchedule: ({name}) => it(`Удаление графика работы ${name} из БД.`,
        async () => await dec.simple(db.deleteSchedule,
            [{name}],
            db.deleteSchedule)),

    deletePosition: ({name}) => it(`Удаление должности ${name} из БД.`,
        async () => await dec.simple(db.deletePosition,
            [{name}],
            db.deletePosition)),

    deleteAccessZone: ({name}) => it(`Удаление помещения ${name} из БД.`,
        async () => await dec.simple(db.deleteAccessZone,
            [{name}],
            db.deleteAccessZone)),

    deleteAccessTemplate: ({name}) => it(`Удаление шаблона доступа ${name} из БД.`,
        async () => await dec.simple(db.deleteAccessTemplate,
            [{name}],
            db.deleteAccessTemplate)),

    deleteDivision: ({name}) => it(`Удаление подразделения ${name} из БД.`,
        async () => await dec.simple(db.deleteDivision,
            [{name}],
            db.deleteDivision)),

    deleteDevice: ({ip}) => it(`Удаление устрйоства ${ip} из БД.`,
        async () => await dec.simple(db.deleteDevice,
            [{ip}],
            db.deleteDevice)),

    deleteUser: ({lastName, name, middleName}) => it(`Удаление пользователя ${lastName} ${name} ${middleName} из БД.`,
        async () => await dec.simple(db.deleteUser,
            [{lastName, name, middleName}],
            db.deleteUser)),

    truncateUserAdditionalFieldFata: () =>
        it(`Удаление строк в таблице user_additional_field_data в БД.`,
            async () => await dec.simple(db.truncateUserAdditionalFieldFata,
                [],
                db.truncateUserAdditionalFieldFata)),

    truncateUserDocument: () =>
        it(`Удаление строк в таблице user_document в БД.`,
            async () => await dec.simple(db.truncateUserDocument,
                [],
                db.truncateUserDocument)),

    truncateUserStaff: () =>
        it(`Удаление строк в таблице user_staff в БД.`,
            async () => await dec.simple(db.truncateUserStaff,
                [],
                db.truncateUserStaff)),

    truncateUserVisitor: () =>
        it(`Удаление строк в таблице user_visitor в БД.`,
            async () => await dec.simple(db.truncateUserVisitor,
                [],
                db.truncateUserVisitor)),

    truncateUserCar: () =>
        it(`Удаление строк в таблице user_car в БД.`,
            async () => await dec.simple(db.truncateUserCar,
                [],
                db.truncateUserCar)),

    truncateUserBarcode: () =>
        it(`Удаление строк в таблице user_barcode в БД.`,
            async () => await dec.simple(db.truncateUserBarcode,
                [],
                db.truncateUserBarcode)),

    truncateUserCard: () =>
        it(`Удаление строк в таблице user_card в БД.`,
            async () => await dec.simple(db.truncateUserCard,
                [],
                db.truncateUserCard)),


    deleteUserFIO: ({lastName, name, middleName}) =>
        it(`Удаление пользователя ${lastName} ${name} ${middleName} из БД.`,
            async () => await dec.simple(db.deleteUserFIO,
                [{lastName, name, middleName}],
                db.deleteUser)),

}