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
    schedules: {
        schedule1: {
            name: 'schedule1',
            comment: '',
            work_schedule_type_id: 4
        },
        schedule2: {
            name: 'schedule2',
            comment: '',
            work_schedule_type_id: 4
        },
        schedule3: {
            name: 'schedule3',
            comment: '',
            work_schedule_type_id: 4
        }
    },
    additionalData: {
        data1Text: {
            name: 'data1',
            comment: '',
            type_id: 1,
            default_value: '',
            items: ''
        },
        data2Graf: {
            name: 'data2',
            comment: '',
            type_id: 2,
            default_value: '',
            items: ''
        },
        data3Select: {
            name: 'data3',
            comment: '',
            type_id: 9,
            default_value: '',
            items: JSON.stringify([...Array(8).keys()].map(item => {
                return {name: 'select' + (item + 1)}
            }))
        },
        data4Checkbox: {
            name: 'data4',
            comment: '',
            type_id: 8,
            default_value: '',
            items: ''
        },
        data5Date: {
            name: 'data5',
            comment: '',
            type_id: 10,
            default_value: '',
            items: ''
        },
        data6DateTime: {
            name: 'data6',
            comment: '',
            type_id: 11,
            default_value: '',
            items: ''
        }
    },
    staff: {
        staff1: {
            firstName: 'name1',
            middleName: 'middle1',
            lastName: 'last1',
            fio: 'last1 name1 middle1',
            phone: '+79819314277',
            mail: 'zybrik0007@rambler.ru',
            dateBirthday: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01'
            },
            tabelNumber: 'tabel1',
            date: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01'
            },
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
                date: '2033-06-01 23:00'
            },
            division: 'division1',
            position: 'position1',
            schedule: 'schedule1',
            template: {
                template1: 'template1',
                template2: 'template2'
            },
            pinCode: 'test-123456',
            data1: 'testtext',
            data2: 'data2',
            data3: 'select1',
            data4: 'Да',
            data5: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01'
            },
            data6: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01 00:00'
            },
            card: {
                arr: ['2', '3', '4', '5', '6', '7', '8', '9', '10'],
                card1: '1',
                card2: '2',
                card3: '3',
                card4: '4',
                card5: '5',
                card6: '6',
                card7: '7',
                card8: '8',
                card9: '9',
                card10: '10',
            },
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
            documentSupport: {
                name: 'К/6 - Служебная командировка',
                number: 'Alex1990',
                dateIn: new Date().toLocaleDateString('fr-ca'),
                dateAfter: new Date().toLocaleDateString('fr-ca')
            },
            license: {
                type: 'Водительское удостоверение',
                series: '3333',
                number: '4444',
                birthplace: 'SPB',
                issue: 'FSB',
                dateIn: {
                    day: '1',
                    month: 'Июль',
                    year: '2023',
                    date: '2023-07-01'
                },
                dateOut: {
                    day: '2',
                    month: 'Июль',
                    year: '2023',
                    date: '2023-07-02'
                },
            },
            dateDimissed: 'Уволен с 01 июня 2023',
            bd: {
                last_name: 'last1',
                first_name: 'name1',
                middle_name: 'middle1',
                tabel_number: '1',
                hiring_date: '2023-01-01',
                division: 'division1',
                begin_datetime: '2023-01-01 00:00:00',
                end_datetime: '2033-01-01 00:00:00',
                identifier: [{identifier:"1", is_universal: true}],
            }
        },
        staff2: {
            firstName: 'name2',
            middleName: 'middle2',
            lastName: 'last2',
            fio: 'last2 name2 middle2',
            phone: '+79110228999',
            mail: 'zybrik007@gmail.com',
            dateBirthday: {
                day: '1',
                month: 'Июль',
                year: '2023',
                date: '2023-07-01'
            },
            tabelNumber: 'tabel1',
            date: {
                day: '1',
                month: 'Июль',
                year: '2023',
                date: '2023-07-01'
            },
            dateIn: {
                day: '1',
                month: 'Июль',
                year: '2023',
                date: '2023-07-01 00:00'
            },
            dateAfter: {
                day: '1',
                month: 'Июль',
                year: '2033',
                date: '2033-07-01 23:00'
            },
            division: 'division2',
            position: 'position2',
            schedule: 'schedule2',
            template: {
                template1: 'template2',
                template2: 'template3'
            },
            pinCode: 'test-789',
            data1: 'testtextUpdate',
            data2: 'data2',
            data3: 'select8',
            data4: 'Нет',
            data5: {
                day: '1',
                month: 'Июль',
                year: '2023',
                date: '2023-07-01'
            },
            data6: {
                day: '1',
                month: 'Июль',
                year: '2023',
                date: '2023-07-01 00:00'
            },
            card: {
                arr: ['12', '13', '14', '15', '16', '17', '18', '19', '20'],
                card1: '11',
                card2: '12',
                card3: '13',
                card4: '14',
                card5: '15',
                card6: '16',
                card7: '17',
                card8: '18',
                card9: '19',
                card10: '20',
            },
            barcode: '9825684626442',
            documentSupport: {
                name: 'ОВ/27 - Дополнительные выходные дни (оплачиваемые)',
                number: 'qwerty123',
                dateIn: new Date().toLocaleDateString('fr-ca'),
                dateAfter: new Date().toLocaleDateString('fr-ca')
            },
            passport: {
                type: 'Паспорт',
                series: '1111',
                number: '222222',
                birthplace: 'Magadan',
                issue: 'police',
                dateIn: {
                    day: '1',
                    month: 'Июль',
                    year: '2023',
                    date: '2023-07-01'
                },
                dateOut: {
                    day: '2',
                    month: 'Июль',
                    year: '2023',
                    date: '2023-07-02'
                },
                code: '002',
                gender: 'Мужской'
            },
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
            bd: {
                last_name: 'last2',
                first_name: 'name2',
                middle_name: 'middle2',
                tabel_number: '2',
                hiring_date: '2023-02-01',
                division: 'division2',
                begin_datetime: '2023-01-01 00:00:00',
                end_datetime: '2033-01-01 00:00:00',
                identifier: [{identifier:"2", is_universal: true}],
            }
        },
        staff3: {
            firstName: 'name3',
            lastName: 'last3',
            tabelNumber: 'tabel3',
            date: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01'
            },
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
                date: '2033-06-01 23:00'
            },
            division: 'division3',
            card: '21',
            barcode: '1462846716368'
        },
    },
    today: new Date().toLocaleDateString('fr-ca'),
    yesterday: new Date(Date.now() - 86400000).toLocaleDateString('fr-ca'),
    tomorrow: new Date(Date.now() + 86400000).toLocaleDateString('fr-ca'),
    date: {
        day: '1',
        month: 'Июль',
        year: '2023'
    }
}


