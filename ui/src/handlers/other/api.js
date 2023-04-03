const request = require('request')
const entry = require('../../../../entry')
const formData = require('form-data');


//api запрос
const prRequest = (options) => {
    return new Promise((resolve) => {
        request(options, function (error, response, body) {

            if (error) {
                console.log('error:', error)
                resolve ({
                    error: true,
                    description: 'Ошибка отправки api запроса.',
                })
            }

            if(body.error) {
                resolve({
                    error: true,
                    description: 'api запроса выполнен с ошибкой.',
                    text: body,
                })
            }

            resolve({
                error: false,
                description: 'Выполнен api запрос.',
                text: body
            })
        });
    })
}

//Опции для put запросов
const putOptions = (options) => {
    return {
        method: 'put',
        url: entry.address + options.api,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${options.token}`
        },
        body: options.body,
        json: true,
    }
}

//Добавление должностей по количеству
const putManyPosition = async (num, token) => {
    const array = [...Array(num).keys()].map(item => item + 1)
    const promises = array.map(item => prRequest(putOptions({
        token,
        api: 'api/positions',
        body: {
            name: 'PositionName ' + item,
            comment: 'PositionDescription ' + item,
        }})))

    const put = await Promise.all(promises)
    const filter = put.filter(item => item.error !== true)

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении должностей.'
        }
    }

    return {
        error: false,
        description: 'Должности добавлены.',
    }
}

//Добавление должностей массивом
const putArrayPosition = async (array, token) => {
    const promises = array.map(item => prRequest(putOptions({
        token,
        api: 'api/positions',
        body: item
    })))

    const put = await Promise.all(promises)
    const filter = put.filter(item => item.error !== true)

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении должностей.'
        }
    }

    return {
        error: false,
        description: 'Должности добавлены.',
    }
}

//Откат базы данных
const rebase = async () => {
    const base64encodedData = Buffer.from(entry.managerLogin + ':' + entry.managerPassword).toString('base64');
    const formDataExt = new formData();
    formDataExt.append('filename', entry.bd)

    const opts = {
        method: 'post',
        url: entry.manager + 'restoreDatabaseBackupItem',
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Basic ' + base64encodedData,
            ...formDataExt.getHeaders(),
        },
        body: formDataExt,
    }

    const promise = () => {
        return new Promise((resolve) => {
            return request(opts, function (error) {

                if(error) {
                    console.log('error: ', error)
                    resolve({
                        error: true,
                        description: 'Ошибка отката базы данных.'
                    })
                }

                resolve({
                    error: false,
                    description: 'Выполнен откат базы данных.'
                })
            })
        })
    }

    return await promise()

}



module.exports = {
    putManyPosition,
    putArrayPosition,
    rebase
}