const Section = require('./elements/section');
const Subsection = require('./elements/subsection');
const Tab = require('./elements/tab');
const Input = require('./elements/input');
const Select = require('./elements/select');
const SelectInput = require('./elements/select-input');
const SelectMulti = require('./elements/select-multi');
const SelectXpand = require('./elements/select-xpand');
const Button = require('./elements/button');
const ButtonIconBefore = require('./elements/button-icon-before');
const ButtonIconAfter = require('./elements/button-icon-after');
const PopUpError = require('./elements/pop-up-error');
const PopUpSuccess = require('./elements/pop-up-success');
const Datepicker = require('./elements/datepicker');
const SimpleCell = require('./elements/simple-cell');
const Table = require('./elements/table');
const Checkbox = require('./elements/checkbox');
const Loader = require('./elements/loader');
const Header = require('./elements/header');
const FormStatus = require('./elements/form-status');
const RowEmpty = require('./elements/row-empty');
const Menu = require('./elements/menu');
const Footer = require('./elements/footer');
const File = require('./elements/file');
const PrintTable = require('./modals/print-table');
const PlaceholderText = require('./elements/placeholder-text');
const ButtonIcon = require('./elements/button-icon');
const FilterTreeNode = require('./elements/filter-tree-node');
const Photography = require('./elements/photography');
const GroupCell = require('./elements/group-cell');
const Timepicker = require('./elements/timepicker');
const Radio = require('./elements/radio');
const PwMenu = require('./elements/pw-menu');
const NodeCheckbox = require('./elements/node-checkbox');
const Element = require('./elements/element');

const Modal = require('./elements/modal');
const Dialog = require('./elements/dialog');
const ModalConfirm = require('./elements/modal-confirm');
const DeviceSearch = require('./modals/search-device');
const DeviceSelect = require('./modals/device-select');
const ScheduleSelect = require('./modals/schedule-select');
const ImportDate = require('./modals/import-data');
const TimeZoneModalSelect = require('./modals/time-zone-modal-select');
const AdditionalData = require('./modals/additional-data');
const Departments = require('./modals/departments');
const RemoveIdentifiers = require('./modals/remove-identifiers');
const AddPhoto = require('./modals/add-photo');
const ChangePhoto = require('./modals/photo');
const CardControlsNumber = require('./modals/card-controls-number');
const PrintCardStaff = require('./modals/print-card-modal');
const BarcodePrint = require('./modals/barcode-print');
const BarcodeVisitorPrint = require('./modals/barcode-visitor-print');
const UnderTime = require('./modals/under-time');


module.exports = {
    section: new Section(),
    subsection: new Subsection(),
    tab: new Tab(),
    input: new Input(),
    select: new Select(),
    selectInput: new SelectInput(),
    selectMulti: new SelectMulti(),
    selectXpand: new SelectXpand(),
    button: new Button(),
    butIcBefore: new ButtonIconBefore(),
    butIcAfter: new ButtonIconAfter(),
    error: new PopUpError(),
    success: new PopUpSuccess(),
    datepicker: new Datepicker(),
    simpleCell: new SimpleCell(),
    table: new Table(),
    checkbox: new Checkbox(),
    loader: new Loader(),
    header: new Header(),
    formStatus: new FormStatus(),
    rowEmpty: new RowEmpty(),
    footer: new Footer(),
    menu: new Menu(),
    file: new File(),
    placeText: new PlaceholderText(),
    butIc: new ButtonIcon(),
    filterTreeNode: new FilterTreeNode(),
    photography: new Photography(),
    groupCell: new GroupCell(),
    timepicker: new Timepicker(),
    radio: new Radio(),
    pwMenu: new PwMenu(),
    nodeCheckbox: new NodeCheckbox(),
    element: new Element(),

    modal: {
        //Персонал
        staffCardAdd: new Modal('card-controls', ''),
        addPhoto: new AddPhoto('add-photo', ''),
        changePhoto: new ChangePhoto('change-photo', ''),
        cardControlsNumber: new CardControlsNumber(),
        printCard: new PrintCardStaff('print-card', 'Печать карточки сотрудника'),
        barcodePrint: new BarcodePrint('barcode-print', 'Печать штрихкода'),

        divisionAdd: new Departments('departments', 'Добавить подразделение'),
        divisionEdit: new Departments('departments', 'Редактировать подразделение'),
        positionAdd: new Modal('edit-position', 'Добавление должности'),
        positionEdit: new Modal('edit-position', 'Редактирование должности'),
        additionalDataAdd: new AdditionalData('additional-data-modal', 'Добавить дополнительное поле'),
        additionalDataEdit: new AdditionalData('additional-data-modal', 'Редактировать дополнительное поле'),

        //Бюро пропусков
        visitorAddCard:  new Modal('card-controls', ''),
        barcodeVisitorPrint: new BarcodeVisitorPrint('visitor-barcode', 'Печать штрихкода'),
        scheduleSelect: new ScheduleSelect('schedules', ''),
        timeZoneModalSelect: new TimeZoneModalSelect('timeZonesModalSelect', ''),
        removeIdentifiers: new RemoveIdentifiers('remove-identifiers', 'Неиспользуемые идентификаторы'),

        //УРВ
        underTime: new UnderTime('under-time', 'Задолженности'),


        //Конфигурация
        roomAdd: new Modal('room-modal', 'Добавить помещение'),
        roomEdit: new Modal('room-modal', 'Редактировать помещение'),
        deviceSearch: new DeviceSearch('search-device', 'Поиск устройств'),
        deviceSelect: new DeviceSelect('device-select', 'Список устройств'),
        eventActionSelect: new Modal('event-action-select', 'Выбрать событие'),
        httpRequest: new Modal('http-request', 'Выполнить http-запрос'),
        hardware: new Modal('hardware', 'Добавить внутреннюю реакцию на событие'),

        //Импорт
        importData: new ImportDate('import-data', 'Импорт'),

        //Экспорт
        exportData: new Modal('export-data', 'Экспортировать данные'),

        //Печать таблицы
        printTable: new PrintTable('print-table', ''),

        //Фильтры
        divisionFilter: new Dialog('Подразделение'),
        roomsFilter: new Modal('rooms-tree', 'Помещение'),
    },

    modalConfirm: {
        //Персонал
        //Сотрудники
        staffBlock: new ModalConfirm('Подтвердите действие',
            'Вы действительно хотите заблокировать данного сотрудника?'),

        staffUnBlock: new ModalConfirm('Подтвердите действие',
            'Вы действительно хотите разблокировать данного сотрудника?'),

        staffDeleteCard: new ModalConfirm('Подтвердите действие',
            'Вы действительно хотите удалить карту у данного сотрудника?'),

        staffReturn: new ModalConfirm('Подтвердите действие', 'Вы действительно хотите закрыть без сохранения?'),

        //Должности
        positionDelete: new ModalConfirm('Подтвердите действие',
            'Вы действительно хотите удалить данную должность?'),

        //Подразделения
        divisionDelete: new ModalConfirm('Удаление подразделения',
            'Вы действительно хотите удалить подразделение?'),

        //Дополнительные данные
        additionalDataDelete: new ModalConfirm('Подтвердите действие',
            'Вы действительно хотите удалить данное дополнительное поле?'),

        //Бюро пропусков
        //Посетители
        visitorBlock: new ModalConfirm('Подтвердите действие',
            'Вы действительно хотите заблокировать данного посетителя?'),

        visitorUnBlock: new ModalConfirm('Подтвердите действие',
            'Вы действительно хотите разблокировать данного посетителя?'),

        // Подразделения
        divisionDelete: new ModalConfirm('Удаление подразделения',
            'Вы действительно хотите удалить подразделение?'),

        accessSchedulesDelete: new ModalConfirm('Удаление шаблона доступа',
            'Вы действительно хотите удалить этот шаблон доступа?'),

        //Администрирование
        //Конфигурация
        roomDelete: new ModalConfirm('Подтвердите действие',
            'Вы действительно хотите удалить данное помещение?'),

        deviceActivate: new ModalConfirm('Подтвердите действие',
            'Вы действительно хотите включить данное устройство?'),

        deviceDeactivate: new ModalConfirm('Подтвердите действие',
            'Вы действительно хотите отключить данное устройство?'),

        deviceDelete: new ModalConfirm('Подтвердите действие',
            'Вы действительно хотите удалить этот контроллер?'),

        //Лицензии
        licenseStandardDeactivate: new ModalConfirm('Подтвердите действие',
            'При отключении модуля "Стандартный пакет" количество действующих карт будет ограничено 100 картами сотрудников. ' +
            'Ранее введенные карты посетителей и карты сотрудников больше 100 (в порядке добавления) будут заблокированы. ' +
            'Также будут отключены остальные модули, кроме "Базовый пакет".')
    },

}
