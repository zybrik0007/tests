module.exports = {
    browser: process.env.a100browser || 'chrome',
    headless: process.env.a102headless ? JSON.parse(process.env.a102headless) : false,
    width: Number(process.env.a113width) || 1920,
    height: Number(process.env.a114height) || 1080,
    address: process.env.a101address || 'http://localhost/',
    user: process.env.a110user || 'Администратор',
    login: process.env.a111admLogin || 'adm',
    password: process.env.a112admPassword || 'admin1',
    customLogin: process.env.a103login || 'adm',
    customPassword: process.env.a104password || 'admin1',
    manager: 'http://localhost:49000/',
    managerLogin: 'admin',
    managerPassword: '123456',
    bd: 'selenium_3-2023-04-27-13-17-38_postgres.sql',
    download: process.env.a108directory || '/home/qwe/Загрузки/',
    failedExport: process.env.a109failedExport || 'unimported.xlsx',
    max: Number(process.env.a106max) || 30000,
    min: Number(process.env.a105min) || 2000,
    upload: Number(process.env.a107upload) || 50000,
    buttonTime: 3000,
    device_name_1: 'Контроллер замка CL05.2',
    device_ip_1: '10.0.77.28',
    device_name_2: 'Контроллер CL15',
    device_ip_2: '10.1.221.41',
    db: {
        type: 'mysql',
        host: '172.17.0.50',
        user: 'admin',
        password: '123456',
        database: 'perco_selenium_14'
    }
}

