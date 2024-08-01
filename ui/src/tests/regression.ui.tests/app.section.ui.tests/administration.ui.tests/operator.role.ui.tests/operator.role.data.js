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
    designs: {
        design1: {
            name: `'design1'`,
            data: `'{"backgroundColor":"#ffffff","backgroundImage":"none","items":[],"version":"2.0.0","scale":1}'`,
            user_type: `'1'`
        },
        design2: {
            name: `'design2'`,
            data: `'{"backgroundColor":"#ffffff","backgroundImage":"none","items":[],"version":"2.0.0","scale":1}'`,
            user_type: `'1'`
        },
        design3: {
            name: `'design3'`,
            data: `'{"backgroundColor":"#ffffff","backgroundImage":"none","items":[],"version":"2.0.0","scale":1}'`,
            user_type: `'1'`
        }
    },
    verify: {
        verify1: {
            is_const: `'0'`,
            name: `'verify1'`,
            comment: `''`,
            field_visibility_staff: `'{"fio":true,"tabel_number":true,"division_name":true,"position_name":true,"schedule_name":true,"template_name":true}'`,
            field_visibility_visitor: `'{"fio":true,"division_name":true,"template_name":true,"accompanying":true,"supporting_document":true,"supporting_document_number":true}'`
        },
        verify2: {
            is_const: `'0'`,
            name: `'verify2'`,
            comment: `''`,
            field_visibility_staff: `'{"fio":true,"tabel_number":true,"division_name":true,"position_name":true,"schedule_name":true,"template_name":true}'`,
            field_visibility_visitor: `'{"fio":true,"division_name":true,"template_name":true,"accompanying":true,"supporting_document":true,"supporting_document_number":true}'`
        },
        verify3: {
            is_const: `'0'`,
            name: `'verify3'`,
            comment: `''`,
            field_visibility_staff: `'{"fio":true,"tabel_number":true,"division_name":true,"position_name":true,"schedule_name":true,"template_name":true}'`,
            field_visibility_visitor: `'{"fio":true,"division_name":true,"template_name":true,"accompanying":true,"supporting_document":true,"supporting_document_number":true}'`
        }
    },
    plan: {
        plan1: {
            name: `'plan1'`,
            property: `'{"className":"Project","floor":0,"id":1718809211525.6067,"name":"plan1","devices":[],"items":[{"className":"Floor","width":2000,"height":2000,"scaleModeIdx":2,"position":"topLeft","hubs":[],"bg":{"bgType":"texture","bgValue":"floor/lines_1.png"},"id":1718809211526.8171,"name":"Новая схема 1","items":[{"className":"Room","accessZone":null,"bg":{"bgType":"color","bgValue":"rgba(211,211,211,1)","borderValue":"rgba(105,105,105,1)","borderSize":4},"id":1718809225895.2014,"name":"Новая комната 1","items":[{"className":"Wall","id":1718809225897.6348,"type":"Line","items":[{"className":"Point","id":1718809225900.1533,"x":0,"y":0}]},{"className":"Wall","id":1718809225901.852,"type":"Line","items":[{"className":"Point","id":1718809225902.5696,"x":300,"y":0}]},{"className":"Wall","id":1718809225902.6404,"type":"Line","items":[{"className":"Point","id":1718809225903.9536,"x":300,"y":300}]},{"className":"Wall","id":1718809225905.716,"type":"Line","items":[{"className":"Point","id":1718809225905.237,"x":0,"y":300}]}]}]}]}'`,
            event_filter: `'{"filterStrategy":"or","filterEventSubcategories":{},"filterDevices":{},"eventSubcategoriesColors":{},"roomColors":{"0":"rgba(14,213,255,1)","1":"rgba(178,255,204,1)","2":"rgba(255,139,145,1)","3":"rgba(253,255,108,1)","4":"rgba(253,255,108,1)","5":"rgba(255,139,145,1)","6":"rgba(255,139,145,1)","7":"rgba(253,255,108,1)"}}'`
        },
        plan2: {
            name: `'plan2'`,
            property: `'{"className":"Project","floor":0,"id":1718799336395.0344,"name":"plan2","items":[{"className":"Floor","width":2000,"height":2000,"scaleModeIdx":2,"position":"topLeft","hubs":[],"bg":{"bgType":"texture","bgValue":"floor/lines_1.png"},"id":1718799336395.4333,"name":"Новая схема 1","items":[{"className":"Room","accessZone":null,"bg":{"bgType":"color","bgValue":"rgba(211,211,211,1)","borderValue":"rgba(105,105,105,1)","borderSize":4},"id":1718799344692.3604,"name":"Новая комната 1","items":[{"className":"Wall","id":1718799344694.6174,"type":"Line","items":[{"className":"Point","id":1718799344695.6462,"x":0,"y":0}]},{"className":"Wall","id":1718799344696.5786,"type":"Line","items":[{"className":"Point","id":1718799344696.2961,"x":300,"y":0}]},{"className":"Wall","id":1718799344696.634,"type":"Line","items":[{"className":"Point","id":1718799344696.4988,"x":300,"y":300}]},{"className":"Wall","id":1718799344697.6697,"type":"Line","items":[{"className":"Point","id":1718799344697.1191,"x":0,"y":300}]}]}]},{"className":"Floor","width":2000,"height":2000,"scaleModeIdx":2,"position":"topLeft","hubs":[],"bg":{"bgType":"texture","bgValue":"floor/lines_1.png"},"id":1718799337632.2576,"name":"Новая схема 2","items":[{"className":"Room","accessZone":null,"bg":{"bgType":"color","bgValue":"rgba(211,211,211,1)","borderValue":"rgba(105,105,105,1)","borderSize":4},"id":1718799346398.0134,"name":"Новая комната 2","items":[{"className":"Wall","id":1718799346398.7847,"type":"Line","items":[{"className":"Point","id":1718799346398.827,"x":0,"y":0}]},{"className":"Wall","id":1718799346399.8257,"type":"Line","items":[{"className":"Point","id":1718799346399.644,"x":300,"y":0}]},{"className":"Wall","id":1718799346399.3398,"type":"Line","items":[{"className":"Point","id":1718799346399.8494,"x":300,"y":300}]},{"className":"Wall","id":1718799346399.1558,"type":"Line","items":[{"className":"Point","id":1718799346399.4456,"x":0,"y":300}]}]}]},{"className":"Floor","width":2000,"height":2000,"scaleModeIdx":2,"position":"topLeft","hubs":[],"bg":{"bgType":"texture","bgValue":"floor/lines_1.png"},"id":1718799339232.761,"name":"Новая схема 3","items":[{"className":"Room","accessZone":null,"bg":{"bgType":"color","bgValue":"rgba(211,211,211,1)","borderValue":"rgba(105,105,105,1)","borderSize":4},"id":1718799351440.4607,"name":"Новая комната 3","items":[{"className":"Wall","id":1718799351440.1663,"type":"Line","items":[{"className":"Point","id":1718799351441.236,"x":0,"y":0}]},{"className":"Wall","id":1718799351441.7007,"type":"Line","items":[{"className":"Point","id":1718799351441.7576,"x":300,"y":0}]},{"className":"Wall","id":1718799351441.4211,"type":"Line","items":[{"className":"Point","id":1718799351441.6895,"x":300,"y":300}]},{"className":"Wall","id":1718799351441.105,"type":"Line","items":[{"className":"Point","id":1718799351442.6243,"x":0,"y":300}]}]}]}],"devices":[]}'`,
            event_filter: `'{"filterStrategy":"or","filterEventSubcategories":{},"filterDevices":{},"eventSubcategoriesColors":{},"roomColors":{"0":"rgba(14,213,255,1)","1":"rgba(178,255,204,1)","2":"rgba(255,139,145,1)","3":"rgba(253,255,108,1)","4":"rgba(253,255,108,1)","5":"rgba(255,139,145,1)","6":"rgba(255,139,145,1)","7":"rgba(253,255,108,1)"}}'`
        },
    },
    role1: {
        name: 'roleName1',
        description: 'roleDescription1'
    },
    role2: {
        name: 'roleName2',
        description: 'roleDescription2'
    },
    role3: {
        name: 'roleName2 (копия)',
        description: 'roleDescription3'
    },
    staff1: {
        last_name: 'staff',
        first_name: 'name',
        middle_name: '1',
        tabel_number: '1',
        hiring_date: '2023-01-01',
        division: 1,
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
        division: 1,
        begin_datetime: '2023-01-01 00:00:00',
        end_datetime: '2033-01-01 00:00:00',
        identifier: [{identifier:"2", is_universal: true}],
    },
    operator1: {
        fio: 'staff name 1',
        role: 'roleName1',
        login: 'usertest1',
        password: 'usertest1'
    },
    operator2: {
        fio: 'staff name 2',
        role: 'roleName2',
        login: 'usertest2',
        password: 'usertest2'
    },
    operator2: {
        fio: 'staff name 2',
        role: 'roleName2',
        login: 'usertest2',
        password: 'usertest2'
    },
    design: {
        design1: 'design1',
        design2: 'design2',
        design3: 'design3'
    },
    verif: {
        verify1: 'verify1',
        verify2: 'verify2',
        verify3: 'verify3'
    },
    plans: {
        plan1: 'plan1',
        plan2: 'plan2'
    }
}