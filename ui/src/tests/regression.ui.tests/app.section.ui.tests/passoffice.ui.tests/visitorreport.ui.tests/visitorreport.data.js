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
        position4: {
            name: 'position4',
            comment: ''
        },
    },
    templates: {
        template1: 'template1',
        template2: 'template2',
        template3: 'template3',
        template4: 'template4',
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
            identifier: [{identifier:"1", is_universal: true}],
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
            identifier: [{identifier:"2", is_universal: true}],
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
            identifier: [{identifier:"3", is_universal: true}],
        },
        staff4: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '4',
            tabel_number: '4',
            hiring_date: '2023-02-01',
            division: 'division4',
            position: 'position4',
            access_template: ['template4'],
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"7", is_universal: true}],
        },
    },
    visitor: {
        visitor1: {
            last_name: 'visitor',
            first_name: 'name',
            middle_name: '1',
            division: 'division1',
            access_template: 'template1',
            identifier: [{identifier:"4", is_universal: true}],
            supporting_document: 'passport',
            supporting_document_number: '1',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
        visitor2: {
            last_name: 'visitor',
            first_name: 'name',
            middle_name: '2',
            division: 'division2',
            access_template: 'template2',
            identifier: [{identifier:"5", is_universal: true}],
            supporting_document: 'passport',
            supporting_document_number: '2',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
        visitor3: {
            last_name: 'visitor',
            first_name: 'name',
            middle_name: '3',
            division: 'division3',
            access_template: 'template3',
            identifier: [{identifier:"6", is_universal: true}],
            supporting_document: 'passport',
            supporting_document_number: '3',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
    },
    fio: {
        staff1: 'staff name 1',
        staff2: 'staff name 2',
        staff3: 'staff name 3',
        staff4: 'staff name 4',
        visitor1: 'visitor name 1',
        visitor2: 'visitor name 2',
        visitor3: 'visitor name 3',
    },
    event: {
        staff1: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 02:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '1',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
        },
        staff2: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 08:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '2',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
            event2: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 09:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 06:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '2',
                user_id: '',
                device_id: '',
                access_zone_id1: 'room1',
                access_zone_id2: 'room2'
            },
            event3: {
                time_label: '"2023-06-06 09:00:00"',
                time_label_utc: '"2023-06-06 06:00:00"',
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '2',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },

        },
        staff3: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 02:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '3',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
            event2: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 02:00:00"`,
                event_type: 17,
                resource_number: 1,
                resource_type: 12,
                identifier: '3',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
        },
        visitor1: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 02:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '4',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
        },
        visitor2: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 08:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '5',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
            event2: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 09:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 06:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '5',
                user_id: '',
                device_id: '',
                access_zone_id1: 'room1',
                access_zone_id2: 'room2'
            },
            event3: {
                time_label: '"2023-06-07 09:00:00"',
                time_label_utc: '"2023-06-07 06:00:00"',
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '5',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
        },
        visitor3: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 02:00:00"`,
                event_type: 17,
                resource_number: 1,
                resource_type: 12,
                identifier: '6',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
            event2: {
                time_label: '"2023-06-01 08:00:00"',
                time_label_utc: '"2023-06-01 05:00:00"',
                event_type: 17,
                resource_number: 1,
                resource_type: 12,
                identifier: '6',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },


        },
    },
    eventDate: {
        event1: new Date().toLocaleDateString('fr-ca') + ' ' + '09:00:00',
        event2: new Date().toLocaleDateString('fr-ca') + ' ' + '08:00:00',
        event3: new Date().toLocaleDateString('fr-ca') + ' ' + '05:00:00',
        event4: '2033-01-01 00:00:00',
        event5: '2023-06-01 08:00:00',
        event6: '2023-06-01 08:00:00',
    },
    date: () => {
        const yesterday = new Date(new Date() - 24*3600*1000).toLocaleDateString('fr-ca');
        const today = new Date().toLocaleDateString('fr-ca');
        return yesterday + ' – ' + today
    },
    date2: () => {
        const yesterday = new Date(new Date() - 24*3600*1000).toLocaleDateString('fr-ca');
        const today = new Date().toLocaleDateString('fr-ca');
        return yesterday + ' - ' + today
    },
    dateTimeToday: () => {
        const today = new Date().toLocaleDateString('fr-ca');
        return today + ' 00:00' + ' – ' + today + ' 23:59'
    },
    dateTimeToday2: () => {
        const today = new Date().toLocaleDateString('fr-ca');
        return today + ' 00:00' + ' - ' + today + ' 23:59'
    },
    todayNow: () => {
        const day = new Date().toLocaleDateString('fr-ca');
        const time = new Date().toLocaleTimeString().slice(0,-3);
        return day + ' ' + time;
    },
    todayDate: () => new Date().toLocaleDateString('fr-ca'),
    dateCard: '2023-06-01 08:00:00',
    endDate: '2033-01-01',
    june6Now: '2023-06-01',
    june7Now: '2023-06-07',
}

