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
    weekly1: {
        name: 'weeklyName1',
        description: 'weeklyDescription1',
        intervals: {
            day1: {
                name: 'Понедельник',
                time: 'Рабочее время 23ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day2: {
                name: 'Вторник',
                time: 'Рабочее время 23ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day3: {
                name: 'Среда',
                time: 'Рабочее время 23ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day4: {
                name: 'Четверг',
                time: 'Рабочее время 00ч 00м',
            },
            day5: {
                name: 'Пятница',
                time: 'Рабочее время 08ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
            day6: {
                name: 'Суббота',
                time: 'Рабочее время 08ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
            day7: {
                name: 'Воскресенье',
                time: 'Рабочее время 08ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
        },
        setting: {
            holiday: false,
            firstEntranceAndLastExit: false,
            arrival: {
                hour: '00',
                minute: '00'
            },
            less: {
                hour: '00',
                minute: '00'
            },
            early: {
                hour: '00',
                minute: '00'
            },
            overtime: {
                hour: '00',
                minute: '00'
            },
        },
        db: {
            "name": "weeklyName1",
            "work_schedule_type_id": 2,
            "comment": "weeklyDescription1",
            "allow_coming_later": "00:00",
            "allow_leaving_before": "00:00",
            "overtime": "00:00",
            "undertime": "00:00",
            "allow_breaks": "00:00",
            "begin_date": "2024-02-08",
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
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc:"Вторник",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc:"Среда",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc: "Четверг",
                    "intervals": [],
                    title: "Рабочее время: 00ч 00м"
                },
                {
                    desc: "Пятница",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        },
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc: "Суббота",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
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
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                }
            ]
        }
    },
    weekly2: {
        name: 'weeklyName2',
        description: 'weeklyDescription2',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
        intervals: {
            day1: {
                name: 'Понедельник',
                time: 'Рабочее время: 01ч 00м',
                interval1: {
                    begin: '08:00',
                    end: '09:00'
                },
            },
            day2: {
                name: 'Вторник',
                time: 'Рабочее время: 00ч 00м',
            },
            day3: {
                name: 'Среда',
                time: 'Рабочее время: 12ч 00м',
                interval1: {
                    begin: '08:00',
                    end: '20:00'
                },
            },
            day4: {
                name: 'Четверг',
                time: 'Рабочее время: 00ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '00:00'
                },
            },
            day5: {
                name: 'Пятница',
                time: 'Рабочее время: 18ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '05:00'
                },
                interval2: {
                    begin: '08:00',
                    end: '17:00'
                },
                interval3: {
                    begin: '19:00',
                    end: '23:59'
                },
            },
            day6: {
                name: 'Суббота',
                time: 'Рабочее время: 01ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '01:00'
                },
                interval2: {
                    begin: '23:00',
                    end: '23:59'
                },
            },
            day7: {
                name: 'Воскресенье',
                time: 'Рабочее время: 19ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '05:00'
                },
                interval2: {
                    begin: '08:00',
                    end: '17:00'
                },
                interval3: {
                    begin: '19:00',
                    end: '23:59'
                },
            },
        },
        setting: {
            holiday: true,
            firstEntranceAndLastExit: true,
            arrival: {
                hour: '23',
                minute: '59'
            },
            less: {
                hour: '23',
                minute: '59'
            },
            early: {
                hour: '23',
                minute: '59'
            },
            overtime: {
                hour: '23',
                minute: '59'
            },
        },
        db: {
            "name": "weeklyName2",
            "work_schedule_type_id": 2,
            "comment": "weeklyDescription1",
            "allow_coming_later": "00:00",
            "allow_leaving_before": "00:00",
            "overtime": "00:00",
            "undertime": "00:00",
            "allow_breaks": "00:00",
            "begin_date": "2024-02-08",
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
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc:"Вторник",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc:"Среда",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc: "Четверг",
                    "intervals": [],
                    title: "Рабочее время: 00ч 00м"
                },
                {
                    desc: "Пятница",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        },
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc: "Суббота",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
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
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                }
            ]
        }
    },
    shift1: {
        name: 'shiftName1',
        description: 'shiftDescription1',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
        db: {
            "name": "shiftName1",
            "work_schedule_type_id": 3,
            "comment": "shiftDescription1",
            "allow_coming_later": "00:00",
            "allow_leaving_before": "00:00",
            "overtime": "00:00",
            "undertime": "00:00",
            "allow_breaks": "00:00",
            "begin_date": "2023-06-01",
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
                            "begin": 82800,
                            "end": 86400,
                            jumpRight: true,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 01ч 00м"
                },
                {
                    desc:"День 2",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 82800,
                            jumpLeft: true,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 00м"
                },
                {
                    desc: "День 3",
                    "intervals": [
                        {
                            "begin": 36000,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 46800,
                            "type": 0
                        },
                        {
                            "begin": 50400,
                            "end": 54000,
                            "type": 0
                        },
                        {
                            "begin": 57600,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 68400,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 09ч 00м"
                },
            ]
        }
    },
    shift2: {
        name: 'shiftName2',
        description: 'shiftDescription2',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
        intervals: {
            day1: {
                name: 'День 1',
                time: 'Рабочее время: 12ч 00м',
                interval1: {
                    begin: '12:00'
                },
            },
            day2: {
                name: 'День 2',
                time: 'Рабочее время: 12ч 00м',
                interval1: {
                    end: '12:00'
                },
            },
            day3: {
                name: 'День 3',
                time: 'Рабочее время: 23ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '13:00'
                },
                interval2: {
                    begin: '14:00',
                    end: '24:00'
                },
            },
            day4: {
                name: 'День 4',
                time: 'Рабочее время: 00ч 00м',
            },
            setting: {
                firstEntranceAndLastExit: true,
                arrival: {
                    hour: '23',
                    minute: '59'
                },
                less: {
                    hour: '23',
                    minute: '59'
                },
                early: {
                    hour: '23',
                    minute: '59'
                },
                overtime: {
                    hour: '23',
                    minute: '59'
                },
            }
        },
        date: {
            day: '31',
            month: 'Август',
            year: '2023',
            date: '2023-08-31'
        }
    },
    attendance1: {
        name: 'attendanceName1',
        description: 'attendanceDescription1',
        rooms: {
            room1: {
                name: 'room1',
                work: false,
                noWork: true
            },
            room2: {
                name: 'room2',
                work: true,
                noWork: false
            },
            room3: {
                name: 'room3',
                work: false,
                noWork: true
            }
        },
    },
    attendance2: {
        name: 'attendanceName2',
        description: 'attendanceDescription2',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
    },
    violation1: {
        name: 'violationName1',
        description: 'violationDescription1',
        intervals: {
            day1: {
                name: 'Понедельник',
                time: 'Обязательные интервалы: 23ч 59м | Интервалы для перерывов: 0ч 0м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day2: {
                name: 'Вторник',
                time: 'Обязательные интервалы: 23ч 59м | Интервалы для перерывов: 0ч 0м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day3: {
                name: 'Среда',
                time: 'Обязательные интервалы: 23ч 59м | Интервалы для перерывов: 0ч 0м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day4: {
                name: 'Четверг',
                time: 'Обязательные интервалы: 00ч 00м | Интервалы для перерывов: 0ч 0м',
            },
            day5: {
                name: 'Пятница',
                time: 'Обязательные интервалы: 08ч 00м | Рабочее время: 11ч 0м | Интервалы для перерывов: 03ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
            day6: {
                name: 'Суббота',
                time: 'Обязательные интервалы: 08ч 00м | Рабочее время: 11ч 0м | Интервалы для перерывов: 03ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
            day7: {
                name: 'Воскресенье',
                time: 'Обязательные интервалы: 08ч 00м | Рабочее время: 11ч 0м | Интервалы для перерывов: 03ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
        },
        setting: {
            arrival: {
                hour: '00',
                minute: '00'
            },
            less: {
                hour: '00',
                minute: '00'
            },
            early: {
                hour: '00',
                minute: '00'
            },
            overtime: {
                hour: '00',
                minute: '00'
            },
        },
        db: {
            "name": "violationName1",
            "work_schedule_type_id": 5,
            "comment": "violationDescription1",
            "allow_coming_later": "00:00",
            "allow_leaving_before": "00:00",
            "overtime": "00:00",
            "undertime": "00:00",
            "allow_breaks": "00:00",
            "begin_date": "2024-02-08",
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
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
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
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
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
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
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
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
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
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
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
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
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
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                }
            ]
        }
    },
    violation2: {
        name: 'violationName2',
        description: 'violationDescription2',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
        intervals: {
            day1: {
                name: 'Понедельник',
                time: 'Обязательные интервалы: 01ч 59м | Рабочее время: 15ч 0м | Интервалы для перерывов: 22ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '01:00'
                },
                interval2: {
                    begin: '23:00',
                    end: '23:59'
                },
            },
            day2: {
                name: 'Вторник',
                time: 'Обязательные интервалы: 00ч 00м | Интервалы для перерывов: 0ч 0м',
            },
            day3: {
                name: 'Среда',
                time: 'Обязательные интервалы: 02ч 59м | Рабочее время: 15ч 0м | Интервалы для перерывов: 21ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '01:00'
                },
                interval2: {
                    begin: '09:00',
                    end: '10:00'
                },
                interval3: {
                    begin: '23:00',
                    end: '23:59'
                },
            },
            day4: {
                name: 'Четверг',
                time: 'Обязательные интервалы: 00ч 00м | Интервалы для перерывов: 0ч 0м',
            },
            day5: {
                name: 'Пятница',
                time: 'Обязательные интервалы: 03ч 59м | Рабочее время: 15ч 0м | Интервалы для перерывов: 20ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '01:00'
                },
                interval2: {
                    begin: '09:00',
                    end: '10:00'
                },
                interval3: {
                    begin: '12:00',
                    end: '13:00'
                },
                interval4: {
                    begin: '23:00',
                    end: '23:59'
                },
            },
            day6: {
                name: 'Суббота',
                time: 'Обязательные интервалы: 15ч 00м | Рабочее время: 15ч 0м | Интервалы для перерывов: 08ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '09:01'
                },
                interval2: {
                    begin: '18:00',
                    end: '23:59'
                },
            },
            day7: {
                name: 'Воскресенье',
                time: 'Обязательные интервалы: 02ч 59м | Рабочее время: 15ч 0м | Интервалы для перерывов: 21ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '01:00'
                },
                interval2: {
                    begin: '09:00',
                    end: '10:00'
                },
                interval3: {
                    begin: '23:00',
                    end: '23:59'
                },
            },
        },
        setting: {
            lunch: {
                hour: '08',
                minute: '59'
            },
            arrival: {
                hour: '23',
                minute: '59'
            },
            less: {
                hour: '23',
                minute: '59'
            },
            early: {
                hour: '23',
                minute: '59'
            },
            overtime: {
                hour: '23',
                minute: '59'
            },
        }
    },
    balance1: {
        name: 'balanceName1',
        description: 'balanceDescription1',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: false
            },
            room3: {
                name: 'room3',
                work: false,
                noWork: false,
            }
        },
        days: {
            day1: 'ПН'
        }
    },
    balance2: {
        name: 'balanceName2',
        description: 'balanceDescription2',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
        days: {
            day1: 'ПН',
            day2: 'ВТ',
            day3: 'СР',
            day4: 'ЧТ',
            day5: 'ПТ',
            day6: 'СБ',
            day7: 'ВС',
        },
        setting: {
            lunch: {
                hour: '01',
                minute: '59'
            },
            workTime: {
                hour: '09',
                minute: '00'
            },
            weekTime: {
                hour: '98',
                minute: '00'
            },
            lately: {
                hour: '09',
                minute: '00'
            },
            early: {
                hour: '18',
                minute: '00'
            },
            maxTime: {
                hour: '23',
                minute: '59'
            },
        }
    },
}