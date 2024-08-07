const ModalConfirmDecorate = require('./elements-decorates/modal-confirm-decorate');
const ModalDecorate = require('./elements-decorates/modal-decorate');
const modalPhoto = require('./modal-decorates/photo-modal-decorate');
const page = require('../pages');
const {init, initAdd, initEdit, initCopy} = require('./other/init');
const before = require('./before-after-decorate/before-after-decorate');
const db = require('./database-decorate/database-decorate');
const api = require('./api-decorates/decorate-it-api');

module.exports = {
    el: {
        button: require('./elements-decorates/button-decorate'),
        butIcAfter: require('./elements-decorates/button-icon-after-decorate'),
        butIcBefore: require('./elements-decorates/button-icon-before-decorate'),
        checkbox: require('./elements-decorates/checkbox-decorate'),
        datepicker: require('./elements-decorates/datepicker-decorate'),
        file: require('./elements-decorates/file-decorate'),
        footer: require('./elements-decorates/footer-decorate'),
        formStatus: require('./elements-decorates/form-status-decorate'),
        header: require('./elements-decorates/header-decorate'),
        input: require('./elements-decorates/input-decorate'),
        loader: require('./elements-decorates/loader-decorate'),
        menu: require('./elements-decorates/menu-decorate'),
        placeholderText: require('./elements-decorates/placeholder-text-decorate'),
        error:  require('./elements-decorates/pop-up-error-decorate'),
        success: require('./elements-decorates/pop-up-success-decorate'),
        rowEmpty: require('./elements-decorates/row-empty-decorate'),
        section: require('./elements-decorates/section-decorate'),
        select: require('./elements-decorates/select-decorate'),
        selectInput: require('./elements-decorates/select-input-decorate'),
        selectMulti: require('./elements-decorates/select-multi-decorate'),
        selectXpand: require('./elements-decorates/select-xpand-decorate'),
        simpleCell: require('./elements-decorates/simple-cell-decorate'),
        subsection: require('./elements-decorates/subsection-decorate'),
        tab: require('./elements-decorates/tab-decorate'),
        table: require('./elements-decorates/table-decorate'),
        butIc: require('./elements-decorates/button-icon-decorate'),
        filterTreeNode: require('./elements-decorates/filter-tree-node'),
        photography: require('./elements-decorates/photography-decorate'),
        groupCell: require('./elements-decorates/group-cell-decorate'),
        timepicker: require('./elements-decorates/timepicker-decorate'),
        radio: require('./elements-decorates/radio-decorate'),
        pwMenu: require('./elements-decorates/pw-menu-decorate'),
        nodeCheckbox: require('./elements-decorates/node-checkbox-decorate'),
        element: require('./elements-decorates/element-decorate'),
    },
    page: {
        staffActive: require('./page-decorates/staff-active-decorate'),
        staffChange: require('./page-decorates/staff-change-decorate'),
        staffDimissed: require('./page-decorates/staff-dimissed-decorate'),
        premiseAccessAll: require('./page-decorates/premise-access-all-decorate'),
        premiseAccessStaff: require('./page-decorates/premise-access-staff-decorate'),
        premiseAccessVisitor: require('./page-decorates/premise-access-visitor-decorate'),
        staffPass: require('./page-decorates/staff-pass-decorate'),
        staffPassChange: require('./page-decorates/staff-pass-change-decorate'),
        visitorOrder: require('./page-decorates/visitor-ordered-decorate'),
        visitorCurrent: require('./page-decorates/visitor-current-decorate'),
        visitorArchive: require('./page-decorates/visitor-archive-decorate'),
        visitorChange: require('./page-decorates/visitor-change-decorate'),
        orderpassOrder: require('./page-decorates/orderpass-order-dercorate'),
        orderpassArchive: require('./page-decorates/orderpass-archive-dercorate'),
        orderpassChange: require('./page-decorates/orderpass-change-dercorate'),
        schedule: require('./page-decorates/schedule-decorate'),
        scheduleChange: require('./page-decorates/schedule-change-decorate'),
        base: require('./page-decorates/base-decorate'),
        workedJournal: require('./page-decorates/worked-journal-decorate'),
        timesheet: require('./page-decorates/timesheet-decorate'),
        accessTemplateScheduleChange: require('./page-decorates/access-template-change-decorate'),
        templateChange: require('./page-decorates/template-change-decorate'),
        accessCommission: require('./page-decorates/access-commission-decorate'),
        design: require('./page-decorates/design-decorate'),
        holiday: require('./page-decorates/holday-decorate'),
        division: require('./page-decorates/division-decorate'),
        device: require('./page-decorates/device-decorate'),
        room: require('./page-decorates/room-decorate'),
        system: require('./page-decorates/system-decorate'),
        eventactionChange: require('./page-decorates/eventaction-change-decorate'),
        taskChange: require('./page-decorates/task-change-decorate'),
        operatorChange: require('./page-decorates/operator-change-decorate'),
        license: require('./page-decorates/license-decorate'),
    },
    modal: {
        printTable: require('./modal-decorates/print-table-decorate'),
        exportData: ModalDecorate('export-data', 'Экспортировать данные'),
        removeIdentifiers: require('./modal-decorates/remove-identifiers-decorate'),
        divisionFilter: require('./modal-decorates/division-filter'),
        roomFilter: require('./modal-decorates/room-filter'),
        changePhoto: modalPhoto('change-photo', ''),
        addPhoto: modalPhoto('add-photo', ''),
        cardControlsAdd: require('./modal-decorates/card-controls-add'),
        cardControls:  ModalDecorate('card-controls', ''),
        cardControlsNumber: require('./modal-decorates/card-conrols-number-decorate'),
        printCardStaff: require('./modal-decorates/print-card-staff-decorate'),
        printDesignCard: ModalDecorate('print-design-card', 'Печать пропуска'),
        printBarcode: require('./modal-decorates/print-barcode-decorate'),
        dimissStaff: ModalDecorate('dismiss-staff-local', ''),
        planner: ModalDecorate('planner', ''),
        accessTemplate: ModalDecorate('access-template', 'Шаблоны доступа'),
        documentSupport: ModalDecorate('supporting-documents', ''),
        documentStaff: ModalDecorate('stuff-document', ''),
        barcode: ModalDecorate('barcode', ''),
        searchCard: ModalDecorate('card-search', ''),
        importFile: require('./modal-decorates/importFile'),
        printVisitorBarcode: require('./modal-decorates/print-barcode-visitor-decorate'),
        underTime: require('./modal-decorates/under-time-decorate'),
        docJustification: ModalDecorate('edit-justification', ''),
        docOvertime: ModalDecorate('edit-overtime', ''),
        docExplanatory: ModalDecorate('edit-explanatory', ''),
        timeZone: require('./modal-decorates/time-zone-decorate'),
        schedules: ModalDecorate('schedules', ''),
        schedulesList: ModalDecorate('schedulesList', ''),
        holiday: ModalDecorate('predefined-holidays', 'Календарь предопределенных праздничных дней'),
        holidayType: ModalDecorate('set-holiday-type', ''),
        divisionAdd: ModalDecorate('departments', 'Добавить подразделение'),
        divisionEdit: ModalDecorate('departments', 'Редактировать подразделение'),
        additionalDataAdd: ModalDecorate('additional-data-modal', 'Добавить дополнительное поле'),
        additionalDataEdit: ModalDecorate('additional-data-modal', 'Редактировать дополнительное поле'),
        addPosition: ModalDecorate('edit-position', 'Добавление должности'),
        editPosition: ModalDecorate('edit-position', 'Редактирование должности'),
        searchDevice: require('./modal-decorates/searchDevice'),
        addRoom: ModalDecorate('room-modal', 'Добавить помещение'),
        editRoom: ModalDecorate('room-modal', 'Редактировать помещение'),
        deviceSelect: ModalDecorate('device-select', 'Список устройств'),
        addCamera: ModalDecorate('camera-add', 'Добавить камеру'),
        addMobileInterval: ModalDecorate('mobile', 'Список NFC устройств'),
        addCameraTemplate: ModalDecorate('template-camera', 'Добавить шаблон'),
        editCameraTemplate: ModalDecorate('template-camera', 'Редактировать шаблон'),
        eventActionSelect: ModalDecorate('event-action-select', ''),
        httpRequest: ModalDecorate('http-request', 'Выполнить http-запрос'),
        modalEventSystem: ModalDecorate('modal-event-system', ''),
        hardwareAdd: ModalDecorate('hardware', 'Добавить внутреннюю реакцию на событие'),
        hardwareEdit: ModalDecorate('hardware', 'Редактировать внутреннюю реакцию на событие'),
        selectPeriod: ModalDecorate('select-period', 'Период'),
        staffSelect: ModalDecorate('staff-select', 'Оператор'),
        blockOperator: ModalDecorate('confirm-modal-lock-operator', 'Заблокировать оператора'),
        unblockOperator: ModalDecorate('confirm-modal-lock-operator', 'Разаблокировать оператора'),
        paramCommand: ModalDecorate('param-command', ''),
        selectDevice: ModalDecorate('select-device', 'Новая точка верификации'),
    },
    modalConfirm: {
        //Персонал
        //Сотрудники
        staffReturn: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите закрыть без сохранения?'),

        staffBlock: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите заблокировать данного сотрудника?'),

        staffUnBlock: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите разблокировать данного сотрудника?'),

        staffDeleteCard: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить карту у данного сотрудника?'),

        staffChangeDeleteBarcode: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить штрихкод?'),

        staffDeleteImage: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить эту фотографию?'),

        staffDeleteCar: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данное транспортное средство'),

        staffDeleteBarcode: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить штрихкод?'),

        staffDelete:  ModalConfirmDecorate('Подтвердите действие',
            'Сотрудник будет удален безвозвратно, его восстановление в дальнейшем будет невозможно.'),

        //Графики работы
        deleteSchedule: ModalConfirmDecorate('Удаление графика работы',
            'Вы действительно хотите удалить данный график работы?'),

        //Должности
        positionDelete: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данную должность?'),

        //Подразделения
        divisionDelete: ModalConfirmDecorate('Удаление подразделения',
            'Вы действительно хотите удалить подразделение?'),

        //Дополнительные данные
        additionalDataDelete: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данное дополнительное поле?'),

        //Праздничные дни
        resetHoliday: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите очистить календарь?'),
        addHoliday: ModalConfirmDecorate('Подтвердите действие',
            'Заполнить предопределенными значениями'),

        //Дополниеотные поля
        deleteAdditionalData: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данное дополнительное поле?'),

        //Бюро пропусков
        //Посетители
        visitorBlock: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите заблокировать данного посетителя?'),

        visitorUnBlock: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите разблокировать данного посетителя?'),

        visitorArchive: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите перенести заказанный пропуск в архив?'),

        visitorDelete: ModalConfirmDecorate('Подтвердите действие',
            'Посетитель будет удален безвозвратно, его восстановление в дальнейшем будет невозможно.'),

        // Подразделения
        divisionDelete: ModalConfirmDecorate('Удаление подразделения',
            'Вы действительно хотите удалить подразделение?'),

        accessSchedulesDelete: ModalConfirmDecorate('Удаление шаблона доступа',
            'Вы действительно хотите удалить этот шаблон доступа?'),

        designDelete: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данный дизайн пропуска?'),

        // УРВ
        // Оправдательные документы
        urvDocumentDelete: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить этот документ?'),

        //Верификация
        // Конфигурация верификации
        deleteVerifyConfig: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить эту конфигурацию?'),


        //Администрирование
        //Конфигурация
        roomDelete: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данное помещение?'),

        deviceActivate: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите включить данное устройство?'),

        deviceDeactivate: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите отключить данное устройство?'),

        deviceDelete: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить этот контроллер?'),

        deviceDeleteRoom: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данное устройство?'),

        deleteEventRename: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данное переименование?'),

        cameraTemplateDelete: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данный шаблон?'),

        deleteEventaction: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данную реакцию на события?'),

        taskActionDelete: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данное действие?'),

        deleteTask: ModalConfirmDecorate('Удаление задания',
            'Вы действительно хотите удалить это задание?'),

        deleteOperator: ModalConfirmDecorate('Удаление оператора',
            'Вы действительно хотите удалить данного оператора?'),

        deleteRole: ModalConfirmDecorate('Удаление роли','Вы действительно хотите удалить данную роль?'),

        //Лицензии
        licenseStandardDeactivate: ModalConfirmDecorate('Подтвердите действие',
            'При отключении модуля "Стандартный пакет" количество действующих карт будет ограничено ' +
            '100 картами сотрудников. Ранее введенные карты посетителей и карты сотрудников больше ' +
            '100 (в порядке добавления) будут заблокированы. Также будут отключены остальные модули, ' +
            'кроме "Базовый пакет".')
    },
    init: {
        staffActive: () => init(page.staffActive),
        accessSchedule: () => init(page.accessTemplateSchedulePage),
        accessScheduleChangeAdd: () => initAdd(page.accessTemplateScheduleChangePage),
        accessScheduleChangeEdit: () => initEdit(page.accessTemplateScheduleChangePage),
        deviceManagement: () => init(page.deviceManagement),
        template: () => init(page.accessTemplate),
        templateAdd: () => initAdd(page.accessTemplateChange),
        templateEdit: () => initEdit(page.accessTemplateChange),
        templateCopy: () => initCopy(page.accessTemplateChange),
        accessCommission: () => init(page.accessTemplateComission),
        design: () => init(page.design),
        designAdd: () => initAdd(page.designChange),
        designEdit: () => initEdit(page.designChange),
        designCopy: () => initCopy(page.designChange),
        event: () => init(page.event),
        eventaction: () => init(page.eventaction),
        task: () => init(page.task),
        taskChangeAdd: () => initAdd(page.taskChange),
        taskChangeEdit: () => initEdit(page.taskChange),
        operator: () => init(page.operator),
        operatorAdd: () => initAdd(page.operatorChange),
        operatorEdit: () => initEdit(page.operatorChange),
        operatorCopy: () => initCopy(page.operatorChange),
        role: () => init(page.role),
        roleAdd: () => initAdd(page.roleChange),
        roleEdit: () => initEdit(page.roleChange),
        roleCopy: () => initCopy(page.roleChange),
        verify: () => init(page.verify),
        verifyConfig: () => init(page.verifyConfig),
        verifyConfigAdd: () => initAdd(page.verifyConfigChange),
        verifyConfigEdit: () => initEdit(page.verifyConfigChange),
        plan: () => init(page.plan),
        license: () => init(page.license)
    },
    befAft: {...before},
    db,
    api
}

