const teamcityParams = {

    // Настройки версии

    type: process.env.a101_app_type,
    version: process.env.a102_app_version_number,
    number: process.env.a103_app_build_number,
    buildName: process.env.a104_file_installation,
    dateBuild: processenv.a105_date_build_file,

    // Настройки браузера

    browser: process.env.a201_browser,
    headless: Boolean(process.env.a202_headless),
    width: Number(process.env.a203_width),
    height: Number(process.env.a114height),

    // Настройки авторизации в приложении

    address: process.env.a301_ip_address_app,
    login: process.env.a302_login_administration,
    password: process.env.a303_password_administration,
    customLogin: process.env.a304_login_user,
    customPassword: process.env.a305_password_user,
    operator: process.env.a306_operator_name,

    // Настройки авторизации в базе данных

    db: {
        type: process.env.a401_database_type,
        host: process.env.a402_database_host,
        port: process.env.a403_database_port,
        user: process.env.a404_database_user,
        password: process.env.a405_database_password,
        database: process.env.a406_database_name,
    },

    // Настройки времени ожиданий и откликов

    max: Number(process.env.a501_max_time_element),
    min: Number(process.env.a502_min_time_element),
    upload: Number(process.env.a503_file_time),
    datepicker: Number(process.env.a504_calendar_time),
    urv: Number(env.a505_urv_time),
    sleep1: Number(process.env.a506_sleep_time_1),
    sleep2: Number(process.env.a507_sleep_time_2),
    sleep3: Number(process.env.a508_sleep_time_3),

    // Директории и файлы

    download: process.env.a601_directory_upload_file,
    failedExport: process.env.a602_file_error_export,

    // Устройства
    device_name_1: process.env.a701_device_name_1,
    device_ip_1: process.env.a702_device_ip_1,
    device_name_2: process.env.a703_device_name_2,
    device_ip_2: process.env.a704_device_ip_2,

    // Тесты раздела Персонал

    personal: {
        b101PersonalStaff: Boolean(process.env.b101_personal_staff),
        b102PersonalSchedule: Boolean(process.env.b102_personal_schedule),
        b103PersonalDivision: Boolean(processenv.b103_personal_division),
        b104PersonalPosition: Boolean(process.env.b104_personal_position),
        b105PersonalHoliday: Boolean(process.env.b105_personal_holiday),
        b106PersonalAdditionalData: Boolean(process.env.b016_personal_additiona_data),
    },

    // Тесты раздела Бюро пропусков

    passoffice: {
        c101PassofficeVisitor: Boolean(process.env.c101_passoffice_visitor),
        c102PassofficeStaff: Boolean(process.env.c102_passoffice_staff),
        c103PassofficeTemplate: Boolean(process.env.c103_passoffice_template),
        c104PassofficeDesign: Boolean(process.env.c104_passoffice_design),
        c105PassofficeReportVisitor: Boolean(process.env.c105_passoffice_report_visitor),
    },

    // Тесты раздела Учет рабочего времени

    urv: {
        d101UrvWorkedJournal: Boolean(process.env.d101_urv_workedjournal),
        d102UrvDocumentType: Boolean(process.env.d102_urv_document_type),
        d103UrvTimesheet: Boolean(process.env.d103_urv_timesheet),
        d104UrvDisciplineReport: Boolean(process.env.d104_urv_discipline_report),
        d105UrvReport: Boolean(process.env.d105_urv_report),
        d106UrvTimePresence: Boolean(process.env.d106_urv_time_presence),
        d107UrvUserDoc: Boolean(process.env.d107_urv_user_doc),
    },

    // Тесты раздела Контроль доступа

    controlaccess: {
        e101ControlAccessPremiseAccess: Boolean(process.env.e101_control_access_premise_access),
        e102ControlAccessDeviceManagement: Boolean(process.env.e102_control_access_device_management),
        e103ControlAccessVerificationJournal: Boolean(process.env.e103_control_access_verification_journal),
        e104ControlAccessPremiseSuccessReport: Boolean(process.env.e104_control_access_premise_success_report),
        e105ControlAccessWhereAbout: Boolean(process.env.e105_control_access_where_about),
        e106ControlAccessIdentifier: Boolean(process.env.e106_control_access_identifier),
    },

    // Тесты раздела Администрирование
    administration: {
        h101AdministrationConfiguration: Boolean(process.env.h101_administration_configuration),
        h102AdministrationEventSystem: Boolean(process.env.h102_administration_event_system),
        h103AdministrationEventAction: Boolean(process.env.h103_administration_event_action),
        h104AdministrationTask: Boolean(process.env.h104_administration_task),
        h105AdministrationOperatorRole: Boolean(process.env.h105_administration_operator_role)
    }
}

const appParams = {

    // Настройки версии
    type: 'percoweb',
    version: '2.0',
    number: '12.0',
    buildName: '',
    dateBuild: '',

    // Настройки браузера
    browser: 'chrome',
    headless: false,
    width: 1920,
    height: 1080,

    // Настройки авторизации в приложении
    address: 'http://172.17.0.50:8080/',
    login:  'adm',
    password: 'admin1',
    customLogin: 'adm',
    customPassword: 'admin1',
    operator: 'Администратор',

    // Настройки авторизации в базе данных
    db: {
        type: 'mysql',
        host: '172.17.0.50',
        port: '3306',
        user: 'admin',
        password: '123456',
        database: 'selenium_26072024_3'
    },

    // Настройки времени ожиданий и откликов
    max: 30000,
    min: 2000,
    upload: 50000,
    datepicker: 500,
    urv: 10000,
    sleep1: 1000,
    sleep2: 2000,
    sleep3: 10000,

    // Директории и файлы
    download: '/home/qwe/Загрузки/',
    failedExport: 'unimported.xlsx',

    // Устройства
    device_name_1: 'Контроллер CL15',
    device_ip_1: '172.17.100.4',
    device_name_2: 'Контроллер CL15',
    device_ip_2: '10.1.221.41',

    // Тесты раздела персонал

    personal: {
        b101PersonalStaff: true,
        b102PersonalSchedule: true,
        b103PersonalDivision: true,
        b104PersonalPosition: true,
        b105PersonalHoliday: true,
        b106PersonalAdditionalData: true,
    },

    // Тесты раздела Бюро пропусков

    passoffice: {
        c101PassofficeVisitor: true,
        c102PassofficeStaff: true,
        c103PassofficeTemplate: true,
        c104PassofficeDesign: true,
        c105PassofficeReportVisitor: true,
    },

    // Тесты раздела Учет рабочего времени

    urv: {
        d101UrvWorkedJournal: true,
        d102UrvDocumentType: true,
        d103UrvTimesheet: true,
        d104UrvDisciplineReport: true,
        d105UrvReport: true,
        d106UrvTimePresence: true,
        d107UrvUserDoc: true,
    },

    // Тесты раздела Контроль доступа

    controlaccess: {
        e101ControlAccessPremiseAccess: true,
        e102ControlAccessDeviceManagement: true,
        e103ControlAccessVerificationJournal: true,
        e104ControlAccessPremiseSuccessReport: true,
        e105ControlAccessWhereAbout: true,
        e106ControlAccessIdentifier: true,
    },

    // Тесты раздела Администрирование
    administration: {
        h101AdministrationConfiguration: true,
        h102AdministrationEventSystem: true,
        h103AdministrationEventAction: true,
        h104AdministrationTask: true,
        h105AdministrationOperatorRole: true,
    }
}

const middlewareEntry = () => Boolean(process.env.teamcity) ? teamcityParams : appParams

module.exports = {
    ...middlewareEntry()
}