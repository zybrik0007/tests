const entry = require('../../../../../../entry');

module.exports = {
    userAdmin: {},
    user: {},
    userStaff: {},
    userRole: {},
    userOperator: {},
    app: {
        per: {
            staff: {
                last: 'lastStaff1',
                first: 'firstStaff1',
                middle: 'middleStaff1',
                date: '2023-06-01',
                day: 1,
                month: 'Июнь',
                year: '2023',
                position: 'positionName',
                division: 'divisionName',
                schedule: 'scheduleName',
                card: 1
            },
            schedule: {
                name: 'scheduleName',
                type: 'С накоплением нарушений на основе баланса'
            },
            division: {
                name: 'divisionName'
            },
            position: {
                name: 'positionName'
            },
            holiday: {
                day: 1,
                month: 'Июнь',
                year: '2024',
                name: 'holidayName'
            },
            data: {
                staff: {
                    name: 'dataStaffName',
                    type: 'Текстовый'
                },
                visitor: {
                    name: 'dataVisitorName',
                    type: 'Текстовый'
                }
            }
        },
        pas: {
            visitor: {
                last: 'lastVisitor1',
                first: 'firstVisitor',
                middle: 'middleVisitor1',
                date: '2023-06-01',
                day: 1,
                month: 'Июнь',
                year: '2023',
            },
            template: {
                name: 'templateName'
            },
            design: {
                name: 'designName',
                type: 'Сотрудник'
            },
            visitorsreport: {}
        },
        adm: {
            conf: {
                device: {
                    name: entry.device_name_1,
                    ip: entry.device_ip_1
                },
                event: {
                    name: 'eventactionName'
                },
                task: {
                    name: 'taskName'
                },
                operator: {
                    fio: 'lastStaff1 firstStaff1 middleStaff1',
                    role: 'roleName',
                    login: 'smoke1',
                    password: 'smoke1',
                },
                role: {
                    name: 'roleName'
                }
            }
        }
    }
}