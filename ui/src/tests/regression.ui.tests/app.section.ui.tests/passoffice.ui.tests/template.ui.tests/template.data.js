module.exports = {
    rooms: {
        room1: 'room1',
        room2: 'room2',
        room3: 'room3'
    },
    devices: {
        device1: {
            name: 'Контроллер замка CL05',
            ip: '10.10.5.10',
            obj: {
                "device_type": 16,
                "ip_addr": "10.10.5.10",
                "mac_addr": "02:42:2f:97:86:32"
            }
        },
        device2: {
            name: 'Контроллер CL15',
            ip: '10.10.5.2',
            obj: {
                "device_type": 902,
                "ip_addr": "10.10.5.2",
                "mac_addr": "02:42:2f:97:86:40"
            }
        },
        device3: {
            name: 'ЛИКОН 2',
            ip: '10.10.5.9',
            obj: {
                "device_type": 65,
                "ip_addr": "10.10.5.9",
                "mac_addr": "02:42:2f:97:86:33"
            }
        }
    },
    staffs: {
        staff1: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '1',
            division: 1,
            hiring_date: '2023-01-01',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00'
        },
    },
    fio: {
        staff1: 'staff name 1'
    },
    zone: {
        name: 'zoneName',
        intervalsValue: [
            {begin: 0, end: 21540},
            {begin: 21600, end: 43140},
            {begin: 43200, end: 64740},
            {begin: 64800, end: 86340}
        ]
    },
    zoneUpdate: {
        name: 'zoneNameUpdate',
        description: 'zoneDescriptionUpdate',
        intervals: [
            {begin: '00:05', end: '23:55'},
        ]
    },
    week: {
        name: 'weekName',
        description: 'weekDescription',
    },
    weekUpdate: {
        name: 'weekNameUpdate',
        description: 'weekDescriptionUpdate',
    },
    tzSlide: {
        name: 'tzSlideName',
        description: 'tzSlideDescription',
        date: new Date().toLocaleDateString('fr-ca'),
    },
    tzSlideUpdate: {
        name: 'tzSlideNameUpdate',
        description: 'tzSlideDescriptionUpdate',
        date: '2023-06-01'
    },
    sSlide: {
        name: 'sSlideName',
        description: 'sSlideDescription',
        date: new Date().toLocaleDateString('fr-ca'),
    },
    sSlideUpdate: {
        name: 'sSlideNameUpdate',
        description: 'sSlideDescriptionUpdate',
        date: '2023-06-01',
    },
    template: {
        name: 'templateName'
    },
    templateUpdate: {
        name: 'templateNameUpdate',
        description: 'templateDescriptionUpdate'
    },
}

