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
    divisions: {
        division1: {
            parent_id: 0,
            name: 'division1',
        },
        division2: {
            parent_id: 0,
            name: 'division2',
        },
        division3: {
            parent_id: 0,
            name: 'division3',
        },
        division4: {
            parent_id: 0,
            name: 'division4',
        },

    },
    positions: {
        position1: {
            name: 'position1',
            comment: ''
        },
        position2: {
            name: 'position2',
            comment: ''
        },
        position3: {
            name: 'position3',
            comment: ''
        },
    },
    templates: {
        template1: 'template1',
        template2: 'template2',
        template3: 'template3',
    },
    template: (name, zone1Id, zone2Id, zone3Id) => {
        return {
            "name": `${name}`,
            "comment": '',
            "access": [
                {
                    "access_zone_id": zone1Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
                {
                    "access_zone_id": zone2Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
                {
                    "access_zone_id": zone3Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
            ]
        }
    },
    templateOneRoom: (name, zone1Id) => {
        return {
            "name": `${name}`,
            "comment": '',
            "access": [
                {
                    "access_zone_id": zone1Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                }
            ]
        }
    },
    staff: {
        staff1: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '1',
            tabel_number: '1',
            hiring_date: '2023-01-01',
            division: 'division1',
            position: 'position1',
            access_template: ['template1'],
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
        staff2: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '2',
            tabel_number: '2',
            hiring_date: '2023-02-01',
            division: 'division2',
            position: 'position2',
            access_template: ['template2'],
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
        staff3: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '3',
            tabel_number: '3',
            hiring_date: '2023-02-01',
            division: 'division3',
            position: 'position3',
            access_template: ['template3'],
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
    },
    fio: {
        staff1: 'staff name 1',
        staff2: 'staff name 2',
        staff3: 'staff name 3',
        visitor1: 'visitor name 1',
        visitor2: 'visitor name 2',
        visitor3: 'visitor name 3',
    },
    visitor1: {
        firstName: 'name1',
        middleName: 'middle1',
        lastName: 'last1',
        mail: 'zybrik007@gmail.com',
        fio: 'last1 name1 middle1',
        staff: 'staff name 1',
        dateIn: {
            day: '1',
            month: 'Июнь',
            year: '2023',
            date: '2023-06-01 00:00'
        },
        dateAfter: {
            day: '1',
            month: 'Июнь',
            year: '2033',
            date: '2033-06-01 23:59'
        },
        division: 'division1',
        template: 'template1',
        pinCode: 'test-123456',
        card: '1',
        barcode: '2184201005502',
        ts: {
            arrTS: [
                {
                    number: 'abc123',
                    model: 'xyz123'
                },
                {
                    number: 'abc1234',
                    model: 'xyz1234'
                },
                {
                    number: 'abc12345',
                    model: 'xyz12345'
                },
                {
                    number: 'abc12346',
                    model: 'xyz123456'
                }],
            ts1: {
                number: 'abc123',
                model: 'xyz123'
            },
            ts2: {
                number: 'abc1234',
                model: 'xyz1234'
            },
            ts3: {
                number: 'abc12345',
                model: 'xyz12345'
            },
            ts4: {
                number: 'abc12346',
                model: 'xyz123456'
            }
        },
        document: 'passport',
        documentNumber: '2202 191535',
        dateArchive: 'Уволен с 01 июня 2023',
        db: {
            last_name: 'last1',
            first_name: 'name1',
            middle_name: 'middle1',
            division: 'division1',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"1", is_universal: true}],
        },
    },
    visitor2: {
        firstName: 'name2',
        middleName: 'middle2',
        lastName: 'last2',
        fio: 'last2 name2 middle2',
        staff: 'staff name 2',
        mail: 'zybrik007@rambler.ru',
        dateIn: {
            day: '1',
            month: 'Июнь',
            year: '2023',
            date: '2023-06-01 00:00'
        },
        dateAfter: {
            day: '1',
            month: 'Июнь',
            year: '2033',
            date: '2033-06-01 23:59'
        },
        division: 'division2',
        template: 'template2',
        pinCode: 'test-654321',
        card: '2',
        barcode: '9825684626442',
        ts: {
            arrTS: [
                {
                    number: 'xxx456',
                    model: 'yyy456'
                },
                {
                    number: 'xxx4567',
                    model: 'yyy4567'
                },
                {
                    number: 'xxx45678',
                    model: 'yyy45678'
                },
                {
                    number: 'xxx456789',
                    model: 'yyy456789'
                }],
            ts1: {
                number: 'xxx456',
                model: 'yyy456'
            },
            ts2: {
                number: 'xxx4567',
                model: 'yyy4567'
            },
            ts3: {
                number: 'xxx45678',
                model: 'yyy45678'
            },
            ts4: {
                number: 'xxx456789',
                model: 'yyy456789'
            }
        },
        document: 'vicale',
        documentNumber: '282466',
        dateArchive: 'Уволен с 01 июня 2023',
        db: {
            last_name: 'last2',
            first_name: 'name2',
            middle_name: 'middle2',
            tabel_number: '1',
            division: 'division2',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier: "2", is_universal: true}],
        }
    },
    event1: new Date().toLocaleDateString('fr-ca') + ' 00:00:00',
    event2: new Date().toLocaleDateString('fr-ca') + ' 01:00:00',
    event3: new Date().toLocaleDateString('fr-ca') + ' 23:59:00',
}

