const entry = require('../../../../../../../entry');

module.exports = {
    rooms: {
        room1: 'room1',
        room2: 'room2'
    },
    camera: {
        name: 'camera1',
        ip: '172.17.0.1',
        port: '8333',
        login: 'admin',
        password: 'admin1',
        template: 'AXIS - All (mjpeg_over_http)'
    },
    device: {
        name: entry.device_name_2,
        ip: entry.device_ip_2
    }
}