module.exports = {
    per: {
        staff: {
            url: '/personal/staff',
            description: 'Сотрудники'
        },
        schedule: {
            url: '/personal/schedules',
            description: 'Графики работы'
        },
        division: {
            url: '/personal/divisions',
            description: 'Подразделения'
        },
        position: {
            url: '/personal/positions',
            description: 'Должности'
        },
        holiday: {
            url: '/personal/holidays',
            description: 'Праздничные дни'
        },
        data: {
            url: '/personal/additionaldata',
            description: 'Дополнительные данные'
        },
    },
    pas: {
        visitor: {
            url: '/passoffice/visitors',
            description: 'Посетители'
        },
        staff: {
            url: '/passoffice/staff',
            description: 'Сотрудники'
        },
        template: {
            url: '/passoffice/access',
            description: 'Шаблоны доступа'
        },
        design: {
            url: '/passoffice/design',
            description: 'Дизайн пропуска'
        },
        report: {
            url: '/passoffice/visitorsreport',
            description: 'Отчет по посетителям'
        }
    },
    urv: {
        journal: {
            url: '/timetracking/workedjournal',
            description: 'Журнал отработанного времени'
        },
        document: {
            url: '/timetracking/documenttype',
            description: 'Оправдательные документы'
        },
        tabel: {
            url: '/timetracking/timesheetsformation',
            description: 'Формирование табеля'
        },
        violator: {
            url: '/timetracking/disciplinereports',
            description: 'Отчеты по дисциплине'
        },
        report: {
            url: '/timetracking/reports',
            description: 'Отчет УРВ'
        },
        presence: {
            url: '/timetracking/timepresence',
            description: 'Время присутствия'
        },
        support: {
            url: '/timetracking/userdocs',
            description: 'Выданные документы'
        }
    },
    con: {
        premises: {
            url: '/controlaccess/premisesaccess',
            description: 'Отчет о проходах'
        },
        device: {
            url: '/controlaccess/devicemanagement',
            description: 'Управление устройствами'
        },
        verif: {
            url: '/controlaccess/verificationjournal',
            description: 'Журнал верификации'
        },
        room: {
            url: '/controlaccess/premisesaccessreport',
            description: 'Отчет по доступу в помещение'
        },
        location: {
            url: '/controlaccess/whereabouts',
            description: 'Местонахождение'
        },
        card: {
            url: '/controlaccess/identifiers',
            description: 'Выданные идентификаторы'
        }
    },
    ver: {
        verif: {
            url: '/verification/verification',
            description: 'Верификации'
        },
        config: {
            url: '/verification/verificationconfig',
            description: 'Конфигурация верификации'
        }
    },
    ord: {
        order: {
            url: '/orderpass',
            description: 'Заказ пропуска'
        }
    },
    mon: {
        plan: {
            url: '/centralpost/plan',
            description: 'Интерактивные план'
        }
    },
    adm: {
        conf: {
            url: '/administration/premisesconfiguration',
            description: 'Конфигурация'
        },
        event: {
            url: '/administration/eventssystem',
            description: 'События системы'
        },
        action: {
            url: '/administration/eventaction',
            description: 'Реакции на события'
        },
        task: {
            url: '/administration/task',
            description: 'Задания'
        },
        operator: {
            url:  '/administration/operators',
            description: 'Операторы'
        },
        role: {
            url: '/administration/roles',
            description: 'Роли и права операторов'
        },
        license: {
            url: '/administration/license',
            description: 'Лицензии'
        }
    },
    doc: {
        sdk: {
            url: '/dev',
            description: 'SDK'
        }
    }
}