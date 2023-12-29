const ModalConfirmDecorate = require('./elements-decorates/modal-confirm-decorate');
const ModalDecorate = require('./elements-decorates/modal-decorate');
const modalPhoto = require('./modal-decorates/photo-modal-decorate')

module.exports = {
    el: {
        button: require('./elements-decorates/button-decorate'),
        butIcAfter: '',
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
    },
    page: {
        staffActive: require('./page-decorates/staff-active-decorate'),
        staffChange: require('./page-decorates/staff-active-change-decorate'),
        premiseAccessAll: require('./page-decorates/premise-access-all-decorate'),
        premiseAccessStaff: require('./page-decorates/premise-access-staff-decorate'),
        premiseAccessVisitor: require('./page-decorates/premise-access-visitor-decorate'),
    },
    modal: {
        printTable: require('./modal-decorates/print-table-decorate'),
        exportData: require('./elements-decorates/modal-decorate'),
        removeIdentifiers: require('./modal-decorates/remove-identifiers-decorate'),
        divisionFilter: require('./modal-decorates/division-filter'),
        roomFilter: require('./modal-decorates/room-filter'),
        changePhoto: modalPhoto('change-photo', ''),
        addPhoto: modalPhoto('add-photo', ''),
        cardControlsAdd: require('./modal-decorates/card-controls-add'),
        cardControlsNumber: require('./modal-decorates/card-conrols-number-decorate'),
        printCardStaff: require('./modal-decorates/print-card-staff-decorate'),
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

        //Должности
        positionDelete: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данную должность?'),

        //Подразделения
        divisionDelete: ModalConfirmDecorate('Удаление подразделения',
            'Вы действительно хотите удалить подразделение?'),

        //Дополнительные данные
        additionalDataDelete: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите удалить данное дополнительное поле?'),

        //Бюро пропусков
        //Посетители
        visitorBlock: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите заблокировать данного посетителя?'),

        visitorUnBlock: ModalConfirmDecorate('Подтвердите действие',
            'Вы действительно хотите разблокировать данного посетителя?'),

        // Подразделения
        divisionDelete: ModalConfirmDecorate('Удаление подразделения',
            'Вы действительно хотите удалить подразделение?'),

        accessSchedulesDelete: ModalConfirmDecorate('Удаление шаблона доступа',
            'Вы действительно хотите удалить этот шаблон доступа?'),

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

        //Лицензии
        licenseStandardDeactivate: ModalConfirmDecorate('Подтвердите действие',
            'При отключении модуля "Стандартный пакет" количество действующих карт будет ограничено 100 картами '+
            'сотрудников. Ранее введенные карты посетителей и карты сотрудников больше 100 (в порядке добавления) ' +
            'будут заблокированы. Также будут отключены остальные модули, кроме "Базовый пакет".')
    },
}

