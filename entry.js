module.exports = {
    browser: process.env.a100browser,
    headless: JSON.parse(process.env.a102headless),
    width: Number(process.env.a113width),
    height: Number(process.env.a114height),
    address: process.env.a101address,
    user: process.env.a110user,
    login: process.env.a111admLogin,
    password: process.env.a112admPassword,
    customLogin: process.env.a103login,
    customPassword: process.env.a104password,
    manager: 'http://localhost:49000/',
    managerLogin: 'admin',
    managerPassword: '123456',
    bd: 'selenium_3-2023-04-27-13-17-38_postgres.sql',
    download: process.env.a108directory,
    failedExport: process.env.a109failedExport,
    max: Number(process.env.a106max),
    min: Number(process.env.a105min),
    upload: Number(process.env.a107upload),
    buttonTime: 3000,
    device_name_1: 'Контроллер замка CL05.2',
    device_ip_1: '10.0.77.28',
    device_name_2: 'Контроллер CL15',
    device_ip_2: '10.1.221.41',
}

