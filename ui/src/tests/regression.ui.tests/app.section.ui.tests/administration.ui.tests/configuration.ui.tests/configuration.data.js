module.exports = {
    rooms: {
        room1: 'room1',
        room2: 'room2',
        room3: 'room3'
    },
    device: {
        name: 'Контроллер замка CL05',
        ip: '10.10.5.10',
        obj: {
            "device_type": 16,
            "ip_addr": "10.10.5.10",
            "mac_addr": "02:42:2f:97:86:32"
        }
    },
    camera: {
        name: 'camera1',
        name2: 'camera2',
        ip: '172.17.0.1',
        port: '8333',
        login: 'admin',
        password: 'admin1',
        template: 'AXIS - All (mjpeg_over_http)'
    },
    biosmart: {
        name: 'biosmart1',
        ip: '172.17.0.2',
        port: '8333',
        login: 'admin',
        password: 'admin1',
    },
    trassir: {
        name: 'trassir1',
        ip: '172.17.0.3',
        port: '8333',
        http: '333',
        sdk: 'admin1',
        login: 'admin',
        password: 'admin1',
    },
    axxon: {
        name: 'axon1',
        ip: '172.17.0.4',
        port: '8333',
        https: true,
        login: 'admin',
        password: 'admin1',
    },
    bolid: {
        name: 'bolid1',
        address: '3',
        type: 'Шлюз ModBus TCP',
        ip: '172.17.0.5',
        port: '8333',
    },
    lockCTL14: {
        name: 'Шлюз CТL14',
        cell: 'Шлюз',
        algorithm: 'Мягкий',
        time: '100',
        error: 'Заданы не все параметры шлюза'
    },
    lockCL15: {
        name: 'Шлюз CL15',
        cell: 'Шлюз',
        algorithm: 'Мягкий',
        time: '100',
        error: 'Заданы не все параметры шлюза'
    },
    objectCL15: {
        name: 'Составной объект CL15',
        cell: 'Составной объект',
        algorithm: 'Турникет',
        controller1: 'Не выбрано',
        controller2: 'Не выбрано',
        error: 'Заданы не все параметры шлюза'
    },
    event: {
        name1: 'Нормализация входа',
        name2: 'Test name2'
    },
    cameraTemplate1: {
        maker: 'ACTi',
        model: 'model1',
        video: 'video1',
        type: 'mjpeg_over_http',
        template: 'ACTi - model1 (mjpeg_over_http)'
    },
    cameraTemplate2: {
        maker: 'TRASSIR',
        model: 'model2',
        video: 'video2',
        type: 'mjpeg_over_http',
    },
}