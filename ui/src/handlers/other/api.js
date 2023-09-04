const request = require('request')
const entry = require('../../../../entry')
const formData = require('form-data');


//api запрос
const prRequest = (options) => {
    return new Promise((resolve) => {
        request(options, function (error, response, body) {

            if (error) {
                console.log(error)
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
    });
};

// Опции для put запросов
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
};

// Опции для get запросов
const getOptions = (options) => {
    return {
        method: 'get',
        url: entry.address + options.api,
        qs: options.qs,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${options.token}`
        }
    }
}

// Опции для delete запросов
const deleteOptions = (options) => {
    return {
        method: 'delete',
        url: entry.address + options.api,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${options.token}`
        }
    }
}

// Получение списка Временных критерий по типу
const getAccessSchedules = async (obj, token) => {
    const get = await Promise.resolve(prRequest(getOptions({
        token,
        api: 'api/accessSchedules/list',
        qs: obj
    })));

    return {
        error: false,
        description: `Получение временные критерии с типом ${obj.type}.`,
        text: get.text
    }
};

// Удаление временных критериев доступа массивом
const deleteAccessSchedule = async (array, token) => {
    const promises = array.map(item => prRequest(deleteOptions({
        token,
        api: `api/accessSchedules/${item.id}`
    })));

    const deleted = await Promise.all(promises);

    return {
        error: false,
        description: 'Временные зоны удалены'
    }
}

// Добавление массивом временных критериев доступа - Временные зоны
const putArrayTimeZone = async (array, token) => {
    const promises = array.map(item => prRequest(putOptions({
        token,
        api: 'api/accessSchedules/timeZone',
        body: item,
    })))

    const put = await Promise.all(promises)
    const filter = put.filter(item => item.error !== true)

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении временных зон.'
        }
    }

    return {
        error: false,
        description: 'Временные зоны добавлены.'
    }

}

// Добавление массивом временных критериев доступа - Недельный график
const putArrayWeek = async (array, token) => {
    const promises = array.map(item => prRequest(putOptions({
        token,
        api: 'api/accessSchedules/weekly',
        body: item,
    })))

    const put = await Promise.all(promises)
    const filter = put.filter(item => item.error !== true)

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении врменных критериев - недельный график.'
        }
    }

    return {
        error: false,
        description: 'Временные критерии - недельный грфки добавлены.'
    }

}

// Добавление массивом временных критериев доступа - Скользящий посуточный график
const putArraySTZ = async (array, token) => {
    const promises = array.map(item => prRequest(putOptions({
        token,
        api: 'api/accessSchedules/flexDay',
        body: item,
    })))

    const put = await Promise.all(promises)
    const filter = put.filter(item => item.error !== true)

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении врменных критериев - скользящий посуточный график.'
        }
    }

    return {
        error: false,
        description: 'Временные критерии - скользящии посуточные графики добавлены.'
    }
}

// Добавление массивом временных критериев доступа - Скользящий понедельный график
const putArraySW = async (array, token) => {
    const promises = array.map(item => prRequest(putOptions({
        token,
        api: 'api/accessSchedules/flexWeekly',
        body: item,
    })))

    const put = await Promise.all(promises)
    const filter = put.filter(item => item.error !== true)

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении врменных критериев - скользящий понедельный график.'
        }
    }

    return {
        error: false,
        description: 'Временные критерии - скользящии понедельные графики добавлены.'
    }
}

// Добавление должностей по количеству
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

// Добавление должностей массивом
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
        description: 'Должности добавлены.'
    }
}

// Получение списка добавленных "Дополнтельных данных"
const getAdditionalData = async (obj, token) => {
    const get = await Promise.resolve(prRequest(getOptions({
        token,
        api: 'api/users/additionalFields',
        qs: obj
    })));

    return {
        error: false,
        description: `Получение временные критерии с типом ${obj.type}.`,
        text: get.text
    }
};

// Удаление "Дополнтельных данных"
const deleteAdditionalData = async (array, obj, token) => {
    const promises = array.map(item => prRequest({
        method: 'delete',
        url: entry.address + 'api/users/additionalFields/' + item.id,
        qs: obj,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        }
    }));

    await Promise.all(promises);

    return {
        error: false,
        description: 'Дополнительные данные удалены.'
    }
};

// Добавление "Дополнтельных данных"
const putAdditionalData = async (array, obj, token) => {

    const promises = array.map(item => prRequest({
        method: 'put',
        url: entry.address +'api/users/additionalFields',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        qs: obj,
        body: item,
        json: true,
    }));

    const put = await Promise.all(promises);

    const filter = put.filter(item => item.error !== true);

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении дополнительных данных.'
        };
    }

    return {
        error: false,
        description: 'Дополнптельные данные добавлены.'
    };
};

// Добавление подразделения
const putDivision = async (array, token) => {

    const promises = array.map(item => prRequest({
        method: 'put',
        url: entry.address +'api/divisions',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: item,
        json: true,
    }));

    const put = await Promise.all(promises);

    const filter = put.filter(item => item.error !== true);

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении подразделений.'
        };
    }

    return {
        error: false,
        description: 'Подразделения добавлены.'
    };
};

// Получение списка подразделений
const getDivision = async (token) => {
    const get = await Promise.resolve(prRequest(getOptions({
        token,
        api: 'api/divisions/list',
        qs: {}
    })));
    const filter = JSON.parse(get.text).filter(item => item.id !== 1);

    return {
        error: false,
        description: `Получение списка подразделений.`,
        text: filter,
    };
};

// Удаление списка подразделений
const deleteDivision = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'delete',
        url: entry.address + 'api/divisions/' + item,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        }
    }));

    await Promise.all(promises);

    return {
        error: false,
        description: 'Подразделения удалены.'
    };
};

// Добавление шаблна доступа
const putAccessTemplate = async (array, token) => {

    const promises = array.map(item => prRequest({
        method: 'put',
        url: entry.address +'api/accessTemplates',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: item,
        json: true,
    }));

    const put = await Promise.all(promises);

    const filter = put.filter(item => item.error !== true);

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при шаблонов доступа.'
        };
    }

    return {
        error: false,
        description: 'Шаблона доступа добавлены.'
    };
};

//Получение списка шаблнов доступа
const getAccessTemplate = async (token) => {
    const get = await Promise.resolve(prRequest(getOptions({
        token,
        api: 'api/accessTemplates/list',
        qs: {}
    })));

    return {
        error: false,
        description: `Получение списка гарфиков работы.`,
        text: JSON.parse(get.text),
    };
};

//Удаление шаблона доступа
const deleteAccessTemplate = async (array, token) => {

    const promises = array.map(item => prRequest({
        method: 'delete',
        url: entry.address + 'api/accessTemplates/' + item,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        }
    }));

    await Promise.all(promises);

    return {
        error: false,
        description: 'Шаблоны доступа удалены.'
    };
};

// Добавление сотрудника
const putStaff = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'put',
        url: entry.address +'api/users/staff',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: item,
        json: true,
    }));

    const put = await Promise.all(promises);

    const filter = put.filter(item => item.error !== true);

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении сотрудников.'
        };
    }

    return {
        error: false,
        description: 'Сотрудники добавлены.'
    };
};

//Получение списка сотруднкиов
const getStaff = async (token) => {
    const get = await Promise.resolve(prRequest(getOptions({
        token,
        api: 'api/users/staff/list',
        qs: {}
    })));

    return {
        error: false,
        description: `Получение списка сотрудников.`,
        text: JSON.parse(get.text),
    };
};

// Удаление сотрудника
const deleteStaff = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'post',
        url: entry.address + 'api/users/staff/' + item,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: {
            "is_removed": 1
        },
        json: true
    }));

    const deleted = await Promise.all(promises);

    return {
        error: false,
        description: `Сотрудники удалены`,
        text: deleted,
    };
};

// Добавление графика работы
const putSchedule = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'put',
        url: entry.address +'api/taSchedule',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: item,
        json: true,
    }));

    const put = await Promise.all(promises);
    console.log('put: ', put)

    const filter = put.filter(item => item.error !== true);

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлени графиков работы.'
        };
    }

    return {
        error: false,
        description: 'Графики работы добавлены.'
    };
};

//Получение списка графиков работы
const getSchedule = async (token) => {
    const get = await Promise.resolve(prRequest(getOptions({
        token,
        api: 'api/taSchedule/list',
        qs: {}
    })));

    return {
        error: false,
        description: `Получение списка графиков работы.`,
        text: JSON.parse(get.text),
    };
};

// Удаление графика работы
const deleteSchedule = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'delete',
        url: entry.address + 'api/taSchedule/' + item,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        }
    }));

    await Promise.all(promises);

    return {
        error: false,
        description: 'Графики работы удалены.'
    };
};

// Добавлене посетителя
const putVisitor = async (array, token) => {

    const promises = array.map(item => prRequest({
        method: 'put',
        url: entry.address +'api/users/visitor',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: item,
        json: true,
    }));

    const put = await Promise.all(promises);

    const filter = put.filter(item => item.error !== true);

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении посетителей.'
        };
    }

    return {
        error: false,
        description: 'Посетители добавлены.'
    };
};

//Получение списка посетителей
const getVisitor = async (token) => {
    const get = await Promise.resolve(prRequest(getOptions({
        token,
        api: 'api/users/visitor/list',
        qs: {}
    })));

    return {
        error: false,
        description: `Получение списка посетителей.`,
        text: JSON.parse(get.text),
    };
};

// Удаление посетителя
const deleteVisitor = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'post',
        url: entry.address + 'api/users/visitor/' + item,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: {
            "is_removed": 1
        },
        json: true
    }));

    const deleted = await Promise.all(promises);

    return {
        error: false,
        description: `Посетители удалены`,
        text: deleted,
    };
};

// Добавления должности
const putPosition = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'put',
        url: entry.address +'api/positions',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: item,
        json: true,
    }));

    const put = await Promise.all(promises);

    const filter = put.filter(item => item.error !== true);

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении должностей.'
        };
    }

    return {
        error: false,
        description: 'Должности добавлены.'
    };
};

// Получение списка должностей
const getPosition= async (token) => {
    const get = await Promise.resolve(prRequest(getOptions({
        token,
        api: 'api/positions/list',
        qs: {}
    })));

    return {
        error: false,
        description: `Получение списка должностей.`,
        text: JSON.parse(get.text),
    };
};

// Удаление должности
const deletePosition = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'post',
        url: entry.address + 'api/positions/' + item,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: {
            "is_removed": 1
        },
        json: true
    }));

    const deleted = await Promise.all(promises);

    return {
        error: false,
        description: `Должности удалены.`,
        text: deleted,
    };
};

// Откат базы данных
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
    };

    return await promise()

};



module.exports = {
    putManyPosition,
    putArrayPosition,
    rebase,
    getAccessSchedules,
    deleteAccessSchedule,
    putArrayTimeZone,
    putArrayWeek,
    putArraySTZ,
    putArraySW,
    getAdditionalData,
    deleteAdditionalData,
    putAdditionalData,
    putDivision,
    getDivision,
    deleteDivision,
    putAccessTemplate,
    getAccessTemplate,
    deleteAccessTemplate,
    putStaff,
    getStaff,
    deleteStaff,
    putSchedule,
    getSchedule,
    deleteSchedule,
    putVisitor,
    getVisitor,
    deleteVisitor,
    putPosition,
    getPosition,
    deletePosition
};