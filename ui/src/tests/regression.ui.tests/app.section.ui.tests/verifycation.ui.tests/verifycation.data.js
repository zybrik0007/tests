const entry = require('../../../../../../entry');

module.exports = {
    verify1: {
        name: 'verifyName1',
        displayData: {
            fio: true,
            tabel: true,
            divison: true,
            position: true,
            schedule: true,
            template: true,
            transport: false,
            email: false,
            phone: false,
            pinCode: false
        },
        point1: {
            params: {
                info: {
                    display: 'Не более чем',
                    value: '2'
                },
                video: {
                    prerecord: '8',
                    record: '6',
                    framed: '2'
                }
            },
            reaction: {
                staff: {
                    pass: 'Отслеживать',
                    verify: 'Нет (режим индикации)',
                    time: 'Отслеживать',
                    zone: 'Отслеживать',
                    security: 'Отслеживать',
                    unguarding: 'Отслеживать',
                },
                visitor: {
                    time:  'Отслеживать',
                    verify: 'Нет (режим индикации)',
                    zone: 'Отслеживать',
                    pass: 'Отслеживать',
                },
                event: {
                    registered: 'Отслеживать',
                    blocked: 'Отслеживать',
                    expired: 'Отслеживать',
                    wdd: 'Отслеживать',
                    bw: 'Отслеживать',
                    du: 'Отслеживать',
                }
            }
        }
    },
    verify2: {
        name: 'verifyName2',
        description: 'verifyDescription2',
        displayData: {
            fio: true,
            tabel: true,
            divison: true,
            position: true,
            schedule: true,
            template: true,
            transport: true,
            email: true,
            phone: true,
            pinCode: true
        },
        keyboardResolve: 'F1',
        keyboardProhibit: 'F2',
        http: 'https://github.com/zybrik0007/tests',
        point1: {
            params: {
                info: {
                    display: 'Постоянно'
                },
                video: {
                    prerecord: '120',
                    record: '255',
                    framed: '10'
                }
            },
            reaction: {
                staff: {
                    pass: 'Не отслеживать',
                    time: 'Не отслеживать',
                    zone: 'Не отслеживать',
                    security: 'Не отслеживать',
                    unguarding: 'Не отслеживать',
                },
                visitor: {
                    time: 'Не отслеживать',
                    zone: 'Не отслеживать',
                    pass: 'Не отслеживать',
                },
                event: {
                    registered: 'Не отслеживать',
                    blocked: 'Не отслеживать',
                    expired: 'Не отслеживать',
                    wdd: 'Не отслеживать',
                    bw: 'Не отслеживать',
                    du: 'Не отслеживать',
                }
            }
        },
    },
    verify3: {
        name: 'verifyName3',
        keyboardResolve: 'F1',
        keyboardProhibit: 'F1',
    },
    point1: {
        name: 'point1',
        device: entry.device_name_1,
        reader: 'Направление 1',
        camera: 'camera1'
    },
    point2: {
        name: 'point2',
        device: entry.device_name_1,
        reader: 'Направление 1',
        camera: 'camera1'
    },
    point3: {
        name: 'point3',
        device: entry.device_name_1,
        reader: 'Направление 1',
        camera: 'camera1'
    },
    device: {
        ip: entry.device_ip_1,
        name: entry.device_name_1
    },
    camera: {
        name: 'camera1',
        ip: '172.17.0.1',
        port: '8333',
        login: 'admin',
        password: 'admin1',
        template: 'AXIS - All (mjpeg_over_http)'
    },
    rooms: {
        room1: 'room1',
        room2: 'room2'
    },
}