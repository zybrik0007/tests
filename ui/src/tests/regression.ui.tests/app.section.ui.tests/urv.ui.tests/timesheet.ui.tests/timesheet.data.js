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
        division5: {
            parent_id: 0,
            name: 'division5',
        },
        division6: {
            parent_id: 0,
            name: 'division6',
        },
        division7: {
            parent_id: 0,
            name: 'division7',
        },
        division8: {
            parent_id: 0,
            name: 'division8',
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
        position5: {
            name: 'position5',
            comment: ''
        },
        position6: {
            name: 'position6',
            comment: ''
        },
        position7: {
            name: 'position7',
            comment: ''
        },
        position8: {
            name: 'position8',
            comment: ''
        },
    },
    schedules: {
        schedule1: {
            name: 'week',
            db: {
                "name": "week",
                "work_schedule_type_id": 2,
                "comment": "week",
                "allow_coming_later": "00:01",
                "allow_leaving_before": "00:01",
                "overtime": "00:01",
                "undertime": "00:01",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc:"Вторник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc:"Среда",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Четверг",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Пятница",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Суббота",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    }
                ]
            }
        },
        schedule2: {
            name: 'shift',
            db: {
                "name": "shift",
                "work_schedule_type_id": 3,
                "comment": "shift",
                "allow_coming_later": "00:01",
                "allow_leaving_before": "00:01",
                "overtime": "00:01",
                "undertime": "00:01",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "intervals": [
                    {
                        desc:"День 1",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 86400,
                                jumpRight: true,
                                "type": 1
                            }
                        ],
                        title: "Рабочее время: 15ч 00м"
                    },
                    {
                        desc:"День 2",
                        "intervals": [
                            {
                                "begin": 0,
                                "end": 3300,
                                jumpLeft: true,
                                "type": 1
                            },
                            {
                                "begin": 4500,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 17ч 40м"
                    },
                ]
            }
        },
        schedule3: {
            name: 'attendance',
            db: {
                "name": "attendance",
                "work_schedule_type_id": 4,
                "comment": "attendance",
                "allow_coming_later": "00:00",
                "allow_leaving_before": "00:00",
                "overtime": "00:00",
                "undertime": "00:00",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": []
                    },
                    {
                        desc:"Вторник",
                        "intervals": []
                    },
                    {
                        desc:"Среда",
                        "intervals": []
                    },
                    {
                        desc: "Четверг",
                        "intervals": []
                    },
                    {
                        desc: "Пятница",
                        "intervals": []
                    },
                    {
                        desc: "Суббота",
                        "intervals": []
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": []
                    }
                ]
            }
        },
        schedule4: {
            name: 'violation',
            db: {
                "name": "violation",
                "work_schedule_type_id": 5,
                "comment": "violation",
                "allow_coming_later": "00:01",
                "allow_leaving_before": "00:01",
                "overtime": "00:01",
                "undertime": "00:01",
                "allow_breaks": "01:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc:"Вторник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc:"Среда",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc: "Четверг",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc: "Пятница",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc: "Суббота",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    }
                ]
            }
        },
        schedule5: {
            name: 'balance',
            db: {
                "name": "balance",
                "work_schedule_type_id": 6,
                "comment": "balance",
                "allow_coming_later": "00:00",
                "allow_leaving_before": "00:00",
                "overtime": "00:00",
                "undertime": "00:00",
                "days": 127,
                "allow_breaks": "01:00",
                "begin_date": "2023-01-01",
                "week_hours": "63:00",
                "worktime_begin": "08:00",
                "worktime_end": "20:00",
                "control_coming_before": "09:00",
                "control_leaving_later": "18:00",
                "balance_stored": "00:01",
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": []
                    },
                    {
                        desc:"Вторник",
                        "intervals": []
                    },
                    {
                        desc:"Среда",
                        "intervals": []
                    },
                    {
                        desc: "Четверг",
                        "intervals": []
                    },
                    {
                        desc: "Пятница",
                        "intervals": []
                    },
                    {
                        desc: "Суббота",
                        "intervals": []
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": []
                    }
                ]
            }
        },
        schedule6: {
            name: 'week_2',
            db: {
                "name": "week_2",
                "work_schedule_type_id": 2,
                "comment": "week_2",
                "allow_coming_later": "00:00",
                "allow_leaving_before": "00:00",
                "overtime": "00:00",
                "undertime": "00:00",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "is_first_input_last_output": true,
                "is_not_holiday": true,
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc:"Вторник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc:"Среда",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Четверг",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Пятница",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Суббота",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    }
                ]
            }
        },
        schedule7: {
            name: 'shift_2',
            db: {
                "name": "shift_2",
                "work_schedule_type_id": 3,
                "comment": "shift_2",
                "allow_coming_later": "00:00",
                "allow_leaving_before": "00:00",
                "overtime": "00:00",
                "undertime": "00:00",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "is_first_input_last_output": true,
                "intervals": [
                    {
                        desc:"День 1",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 86400,
                                jumpRight: true,
                                "type": 1
                            }
                        ],
                        title: "Рабочее время: 15ч 00м"
                    },
                    {
                        desc:"День 2",
                        "intervals": [
                            {
                                "begin": 0,
                                "end": 3300,
                                jumpLeft: true,
                                "type": 1
                            },
                            {
                                "begin": 4500,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 17ч 40м"
                    },
                ]
            }
        },
        schedule8: {
            name: 'attendance_2',
            db: {
                "name": "attendance_2",
                "work_schedule_type_id": 4,
                "comment": "attendance_2",
                "allow_coming_later": "00:00",
                "allow_leaving_before": "00:00",
                "overtime": "00:00",
                "undertime": "00:00",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "is_first_input_last_output": true,
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": []
                    },
                    {
                        desc:"Вторник",
                        "intervals": []
                    },
                    {
                        desc:"Среда",
                        "intervals": []
                    },
                    {
                        desc: "Четверг",
                        "intervals": []
                    },
                    {
                        desc: "Пятница",
                        "intervals": []
                    },
                    {
                        desc: "Суббота",
                        "intervals": []
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": []
                    }
                ]
            }
        },
    },
    fio: {
        staff1: 'staff name 1',
        staff2: 'staff name 2',
        staff3: 'staff name 3',
        staff4: 'staff name 4',
        staff5: 'staff name 5',
        staff6: 'staff name 6',
        staff7: 'staff name 7',
        staff8: 'staff name 8',
    },
    staffs: {
        staff1: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '1',
            tabel_number: '1',
            hiring_date: '2023-01-01',
            division: 'division1',
            position: 'position1',
            work_schedule: 'week',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"1", is_universal: true}],
        },
        staff2: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '2',
            tabel_number: '2',
            hiring_date: '2023-01-01',
            division: 'division2',
            position: 'position2',
            work_schedule: 'shift',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"2", is_universal: true}],
        },
        staff3: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '3',
            tabel_number: '3',
            hiring_date: '2023-01-01',
            division: 'division3',
            position: 'position3',
            work_schedule: 'attendance',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"3", is_universal: true}],
        },
        staff4: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '4',
            tabel_number: '4',
            hiring_date: '2023-01-01',
            division: 'division4',
            position: 'position4',
            work_schedule: 'violation',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"4", is_universal: true}],
        },
        staff5: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '5',
            tabel_number: '5',
            hiring_date: '2023-01-01',
            division: 'division5',
            position: 'position5',
            work_schedule: 'balance',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"5", is_universal: true}],
        },
        staff6: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '6',
            tabel_number: '6',
            hiring_date: '2023-01-01',
            division: 'division6',
            position: 'position6',
            work_schedule: 'week_2',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"6", is_universal: true}],
        },
        staff7: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '7',
            tabel_number: '7',
            hiring_date: '2023-01-01',
            division: 'division7',
            position: 'position7',
            work_schedule: 'shift_2',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2023-12-01 00:00:00',
            identifier: [{identifier:"7", is_universal: true}],
        },
        staff8: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '8',
            tabel_number: '8',
            hiring_date: '2023-01-01',
            division: 'division8',
            position: 'position8',
            work_schedule: 'attendance_2',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"8", is_universal: true}],
        },
    },
    events: {
        staff1: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 09:00:00"',
                    time_label_utc: '"2023-06-01 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-01 13:00:00"',
                    time_label_utc: '"2023-06-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-01 14:00:00"',
                    time_label_utc: '"2023-06-01 11:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-01 18:00:00"',
                    time_label_utc: '"2023-06-01 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day2: {
                event1: {
                    time_label: '"2023-06-02 09:00:00"',
                    time_label_utc: '"2023-06-02 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-02 18:00:00"',
                    time_label_utc: '"2023-06-02 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day3: {
                event1: {
                    time_label: '"2023-06-03 09:01:00"',
                    time_label_utc: '"2023-06-03 06:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-03 18:00:00"',
                    time_label_utc: '"2023-06-03 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day4: {
                event1: {
                    time_label: '"2023-06-04 09:02:00"',
                    time_label_utc: '"2023-06-04 06:02:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-04 18:00:00"',
                    time_label_utc: '"2023-06-04 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day5: {
                event1: {
                    time_label: '"2023-06-05 09:00:00"',
                    time_label_utc: '"2023-06-05 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-05 17:59:00"',
                    time_label_utc: '"2023-06-05 14:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day6: {
                event1: {
                    time_label: '"2023-06-06 09:00:00"',
                    time_label_utc: '"2023-06-06 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-06 17:58:00"',
                    time_label_utc: '"2023-06-06 14:58:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day7: {
                event1: {
                    time_label: '"2023-06-07 09:00:00"',
                    time_label_utc: '"2023-06-07 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-07 13:00:00"',
                    time_label_utc: '"2023-06-07 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-07 14:01:00"',
                    time_label_utc: '"2023-06-07 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-07 18:00:00"',
                    time_label_utc: '"2023-06-07 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day8: {
                event1: {
                    time_label: '"2023-06-08 09:00:00"',
                    time_label_utc: '"2023-06-08 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-08 12:59:00"',
                    time_label_utc: '"2023-06-08 09:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-08 14:01:00"',
                    time_label_utc: '"2023-06-08 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-08 18:00:00"',
                    time_label_utc: '"2023-06-08 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day9: {
                event1: {
                    time_label: '"2023-06-09 09:00:00"',
                    time_label_utc: '"2023-06-09 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-09 18:01:00"',
                    time_label_utc: '"2023-06-09 15:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day10: {
                event1: {
                    time_label: '"2023-06-10 08:59:00"',
                    time_label_utc: '"2023-06-10 05:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-10 18:01:00"',
                    time_label_utc: '"2023-06-10 15:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day11: {
                event1: {
                    time_label: `"${new Date().toLocaleDateString('fr-ca')} 12:00:00"`,
                    time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 09:00:00"`,
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: `"${new Date().toLocaleDateString('fr-ca')} 13:00:00"`,
                    time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 10:00:00"`,
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
        },
        staff2: {
            day1: {
                event1: {
                    time_label: '"2023-06-02 09:00:00"',
                    time_label_utc: '"2023-06-02 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-03 18:00:00"',
                    time_label_utc: '"2023-06-03 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day2: {
                event1: {
                    time_label: '"2023-06-04 09:01:00"',
                    time_label_utc: '"2023-06-04 06:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-05 18:00:00"',
                    time_label_utc: '"2023-06-05 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day3: {
                event1: {
                    time_label: '"2023-06-06 09:02:00"',
                    time_label_utc: '"2023-06-06 06:02:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-07 18:00:00"',
                    time_label_utc: '"2023-06-07 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day4: {
                event1: {
                    time_label: '"2023-06-08 09:00:00"',
                    time_label_utc: '"2023-06-08 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-09 17:59:00"',
                    time_label_utc: '"2023-06-09 14:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day5: {
                event1: {
                    time_label: '"2023-06-10 09:00:00"',
                    time_label_utc: '"2023-06-10 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-11 17:58:00"',
                    time_label_utc: '"2023-06-11 14:58:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day6: {
                event1: {
                    time_label: '"2023-06-12 09:00:00"',
                    time_label_utc: '"2023-06-12 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-12 23:58:00"',
                    time_label_utc: '"2023-06-12 20:58:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-12 23:59:00"',
                    time_label_utc: '"2023-06-12 20:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-13 18:00:00"',
                    time_label_utc: '"2023-06-13 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day7: {
                event1: {
                    time_label: '"2023-06-14 09:00:00"',
                    time_label_utc: '"2023-06-14 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-14 23:59:00"',
                    time_label_utc: '"2023-06-14 20:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-15 00:01:00"',
                    time_label_utc: '"2023-06-15 00:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-15 18:00:00"',
                    time_label_utc: '"2023-06-15 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day8: {
                event1: {
                    time_label: '"2023-06-16 09:00:00"',
                    time_label_utc: '"2023-06-16 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-17 18:01:00"',
                    time_label_utc: '"2023-06-17 15:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day9: {
                event1: {
                    time_label: '"2023-06-18 09:00:00"',
                    time_label_utc: '"2023-06-18 05:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-19 18:02:00"',
                    time_label_utc: '"2023-06-19 15:02:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
        },
        staff3: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 00:00:00"',
                    time_label_utc: '"2023-06-01 00:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '3',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-01 23:59:00"',
                    time_label_utc: '"2023-06-01 20:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '3',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day2: {
                event1: {
                    time_label: `"${new Date().toLocaleDateString('fr-ca')} 12:00:00"`,
                    time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 09:00:00"`,
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
            },
        },
        staff4: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 09:00:00"',
                    time_label_utc: '"2023-06-01 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-01 12:30:00"',
                    time_label_utc: '"2023-06-01 09:30:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-01 13:30:00"',
                    time_label_utc: '"2023-06-01 10:30:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-01 18:00:00"',
                    time_label_utc: '"2023-06-01 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day2: {
                event1: {
                    time_label: '"2023-06-02 09:00:00"',
                    time_label_utc: '"2023-06-02 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-02 18:00:00"',
                    time_label_utc: '"2023-06-02 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day3: {
                event1: {
                    time_label: '"2023-06-03 09:01:00"',
                    time_label_utc: '"2023-06-03 06:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-03 18:00:00"',
                    time_label_utc: '"2023-06-03 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day4: {
                event1: {
                    time_label: '"2023-06-04 09:02:00"',
                    time_label_utc: '"2023-06-04 06:02:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-04 18:00:00"',
                    time_label_utc: '"2023-06-04 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day5: {
                event1: {
                    time_label: '"2023-06-05 09:00:00"',
                    time_label_utc: '"2023-06-05 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-05 17:59:00"',
                    time_label_utc: '"2023-06-05 14:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day6: {
                event1: {
                    time_label: '"2023-06-06 09:00:00"',
                    time_label_utc: '"2023-06-06 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-06 17:58:00"',
                    time_label_utc: '"2023-06-06 14:58:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day7: {
                event1: {
                    time_label: '"2023-06-07 09:00:00"',
                    time_label_utc: '"2023-06-07 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-07 13:00:00"',
                    time_label_utc: '"2023-06-07 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-07 14:01:00"',
                    time_label_utc: '"2023-06-07 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-07 18:00:00"',
                    time_label_utc: '"2023-06-07 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day8: {
                event1: {
                    time_label: '"2023-06-08 09:00:00"',
                    time_label_utc: '"2023-06-08 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-08 12:59:00"',
                    time_label_utc: '"2023-06-08 09:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-08 14:01:00"',
                    time_label_utc: '"2023-06-08 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-08 18:00:00"',
                    time_label_utc: '"2023-06-08 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day9: {
                event1: {
                    time_label: '"2023-06-09 09:00:00"',
                    time_label_utc: '"2023-06-09 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-09 12:30:00"',
                    time_label_utc: '"2023-06-09 09:30:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-09 13:32:00"',
                    time_label_utc: '"2023-06-09 10:32:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-09 18:00:00"',
                    time_label_utc: '"2023-06-09 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day10: {
                event1: {
                    time_label: '"2023-06-10 09:00:00"',
                    time_label_utc: '"2023-06-10 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-10 18:01:00"',
                    time_label_utc: '"2023-06-10 15:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day11: {
                event1: {
                    time_label: '"2023-06-11 08:59:00"',
                    time_label_utc: '"2023-06-11 05:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-11 18:01:00"',
                    time_label_utc: '"2023-06-11 15:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day12: {
                event1: {
                    time_label: '"2023-05-01 12:00:00"',
                    time_label_utc: '"2023-05-01 09:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-05-01 13:00:00"',
                    time_label_utc: '"2023-05-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day13: {
                event1: {
                    time_label: '"2023-03-01 12:00:00"',
                    time_label_utc: '"2023-03-01 09:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-03-01 13:00:00"',
                    time_label_utc: '"2023-03-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day14: {
                event1: {
                    time_label: '"2022-12-01 12:00:00"',
                    time_label_utc: '"2022-12-01 09:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2022-12-01 13:00:00"',
                    time_label_utc: '"2022-12-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day15: {
                event1: {
                    time_label: '"2022-06-01 12:00:00"',
                    time_label_utc: '"2022-06-01 09:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2022-06-01 13:00:00"',
                    time_label_utc: '"2022-06-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day16: {
                event1: {
                    time_label: `"${new Date().toLocaleDateString('fr-ca')} 12:00:00"`,
                    time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 09:00:00"`,
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: `"${new Date().toLocaleDateString('fr-ca')} 13:00:00"`,
                    time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 10:00:00"`,
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
        },
        staff5: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 09:00:00"',
                    time_label_utc: '"2023-06-01 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-01 13:00:00"',
                    time_label_utc: '"2023-06-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-01 14:00:00"',
                    time_label_utc: '"2023-06-01 11:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-01 18:00:00"',
                    time_label_utc: '"2023-06-01 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day2: {
                event1: {
                    time_label: '"2023-06-02 08:59:00"',
                    time_label_utc: '"2023-06-02 05:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-02 18:01:00"',
                    time_label_utc: '"2023-06-02 15:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day3: {
                event1: {
                    time_label: '"2023-06-03 09:01:00"',
                    time_label_utc: '"2023-06-03 06:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-03 18:00:00"',
                    time_label_utc: '"2023-06-03 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day4: {
                event1: {
                    time_label: '"2023-06-04 09:02:00"',
                    time_label_utc: '"2023-06-04 06:02:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-04 18:00:00"',
                    time_label_utc: '"2023-06-04 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day5: {
                event1: {
                    time_label: '"2023-06-05 09:00:00"',
                    time_label_utc: '"2023-06-05 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-05 17:59:00"',
                    time_label_utc: '"2023-06-05 14:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day6: {
                event1: {
                    time_label: '"2023-06-06 09:00:00"',
                    time_label_utc: '"2023-06-06 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-06 17:58:00"',
                    time_label_utc: '"2023-06-06 14:58:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day7: {
                event1: {
                    time_label: '"2023-06-07 09:00:00"',
                    time_label_utc: '"2023-06-07 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-07 13:00:00"',
                    time_label_utc: '"2023-06-07 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-07 14:01:00"',
                    time_label_utc: '"2023-06-07 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-07 18:00:00"',
                    time_label_utc: '"2023-06-07 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day8: {
                event1: {
                    time_label: '"2023-06-08 09:00:00"',
                    time_label_utc: '"2023-06-08 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-08 13:00:00"',
                    time_label_utc: '"2023-06-08 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-08 14:01:00"',
                    time_label_utc: '"2023-06-08 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-08 18:00:00"',
                    time_label_utc: '"2023-06-08 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day9: {
                event1: {
                    time_label: '"2023-05-01 12:00:00"',
                    time_label_utc: '"2023-05-01 09:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-05-01 13:00:00"',
                    time_label_utc: '"2023-05-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day10: {
                event1: {
                    time_label: '"2023-03-01 12:00:00"',
                    time_label_utc: '"2023-03-01 09:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-03-01 13:00:00"',
                    time_label_utc: '"2023-03-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day11: {
                event1: {
                    time_label: '"2022-12-01 12:00:00"',
                    time_label_utc: '"2022-12-01 09:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2022-12-01 13:00:00"',
                    time_label_utc: '"2022-12-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day12: {
                event1: {
                    time_label: '"2022-06-01 12:00:00"',
                    time_label_utc: '"2022-06-01 09:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2022-06-01 13:00:00"',
                    time_label_utc: '"2022-06-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day13: {
                event1: {
                    time_label: `"${new Date().toLocaleDateString('fr-ca')} 12:00:00"`,
                    time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 09:00:00"`,
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
            },
            day14: {
                event1: {
                    time_label: `"${new Date().toLocaleDateString('fr-ca')} 12:00:00"`,
                    time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 09:00:00"`,
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
            },
        },
        staff6: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 09:00:00"',
                    time_label_utc: '"2023-06-01 06:00:00"',
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
                    time_label: '"2023-06-01 10:00:00"',
                    time_label_utc: '"2023-06-01 07:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '6',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-01 17:00:00"',
                    time_label_utc: '"2023-06-01 14:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '6',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-01 18:00:00"',
                    time_label_utc: '"2023-06-01 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '6',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
        },
        staff7: {
            day1: {
                event1: {
                    time_label: '"2023-06-02 09:00:00"',
                    time_label_utc: '"2023-06-02 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '7',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-02 10:00:00"',
                    time_label_utc: '"2023-06-02 07:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '7',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-02 17:00:00"',
                    time_label_utc: '"2023-06-02 14:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '7',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-03 09:00:00"',
                    time_label_utc: '"2023-06-03 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '7',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
        },
        staff8: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 09:00:00"',
                    time_label_utc: '"2023-06-01 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '8',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-01 10:00:00"',
                    time_label_utc: '"2023-06-01 07:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '8',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-01 17:00:00"',
                    time_label_utc: '"2023-06-01 14:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '8',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-01 18:00:00"',
                    time_label_utc: '"2023-06-01 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '8',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
        }
    },
    holiday: {
        date1: {
            date: '2023-06-12',
            type: 1
        },
        date2: {
            date: '2023-06-13',
            reduction: '02:00',
            type: 2
        },
        date3: {
            date: '2023-06-17',
            reduction: '02:00',
            transfer_date: '2023-06-16',
            type: 3
        },
        year: '2023'
    },
    date: {
        day1: '1',
        day2: '30',
        month: 'Июнь',
        year: '2023',
        date: '2023-06-01 – 2023-06-30'
    },
    date2: {
        day1: '1',
        day2: '30',
        month1: 'Июнь',
        month2: 'Июнь',
        year1: '2022',
        year2: '2023',
        date: '2022-06-01 – 2023-06-30'
    },
    date3: new Date().toLocaleDateString('fr-ca'),
    documents: {
        document1: {
            number: '1',
            name: 'ВМ/5 - Продолжительность работы вахтовым методом',
            hour: '00',
            minute: '02'
        },
        document2: {
            number: '2',
            name: 'ОВ/27 - Дополнительные выходные дни (оплачиваемые)',
            hour: '00',
            minute: '02'
        },
        document3: {
            number: '4',
            name: 'С/4 - Продолжительность сверхурочной работы',
            hour: '00',
            minute: '02'
        },
        document4: {
            number: '5',
            name: 'НП/32 - Время простоя по причинам, не зависящим от работодателя и работника',
        },
    },
    today: new Date().toLocaleDateString('fr-ca'),
    doc: {
        justification: {
            name: 'justification',
            sortNumber: '1',
            codeArticle: 'ЯЯ',
            codeNumber: '99',
            addWorkTime: 'Нет',
            workCount: 'В календарных днях включая праздничные дни'
        },
        justificationUpdate: {
            name: 'justificationUpdate',
            sortNumber: '2',
            codeArticle: 'ЧЧ',
            codeNumber: '98',
            addWorkTime: 'Добавлять',
            workCount: 'В рабочих днях'
        },
        overtime: {
            name: 'overtime',
            sortNumber: '1',
            codeArticle: 'ЯЯ',
            codeNumber: '99',
            over: 'Сверхурочный',
        },
        overtimeUpdate: {
            name: 'overtimeUpdate',
            sortNumber: '2',
            codeArticle: 'ЧЧ',
            codeNumber: '98',
            over: 'Нет',
        },
        explanatory: {
            name: 'explanatory',
        },
        explanatoryUpdate: {
            name: 'explanatoryUpdate',
        }
    }
}
