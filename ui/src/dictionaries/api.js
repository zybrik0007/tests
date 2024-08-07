const request = require('request');
const entry = require('../../../entry');
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
    console.log(array)
    console.log(array[0].items)
    const promises = array.map(item => prRequest(putOptions({
        token,
        api: 'api/accessSchedules/timeZone',
        body: item,
    })));

    console.log('promises', promises)

    const put = await Promise.all(promises);
    console.log('put', put)
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
    console.log('array, obj, token', array, obj, token)
    const promises = array.map(item => prRequest({
        method: 'delete',
        url: entry.address + 'api/users/additionalFields/' + item.id,
        qs: obj,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        }
    }));

    console.log('promises', await Promise.all(promises))

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
    try {
        const get = await Promise.resolve(prRequest(getOptions({
            token,
            api: 'api/divisions/list',
            qs: {}
        })));

        const filter = JSON.parse(get.text).filter(item => item.id !== 1);
        return {
            error: false,
            description: 'Получение списка подразделений.',
            text: filter,
        };
    } catch {
        return {
            error: true,
            description: '`ОШИБКА. Получение списка подразделений.'
        }
    }

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

// Добавление шаблона доступа
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

    console.log(put)

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
    try {
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
        const filter = put.filter(item => item.error !== true);
        if(array.length !== filter.length) {
            return {
                error: true,
                description: 'ОШИБКА. Добавление не всех графиков.'
            };
        }

        return {
            error: false,
            description: 'Графики работы добавлены.'
        };

    } catch {
        return {
            error: true,
            description: 'ОШИБКА. Добавление графиков работы.'
        };
    }
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

// Добавление посетителя
const putVisitor = async (array, token) => {
    console.log(array)
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
    console.log('put: ', put)

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
        method: 'delete',
        url: entry.address + 'api/positions/' + item,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        }
    }));

    const deleted = await Promise.all(promises);

    return {
        error: false,
        description: `Должности удалены.`,
        text: deleted,
    };
};

//Добавление помещений
const putRoom = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'put',
        url: entry.address +'api/rooms',
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
            description: 'Ошибки при добавлении помещений.'
        };
    }

    return {
        error: false,
        description: 'Помещения добавлены.'
    };
};

//Получение списка помещений
const getRoom = async (token) => {
    const get = await Promise.resolve(prRequest(getOptions({
        token,
        api: 'api/rooms/list',
        qs: {}
    })));

    return {
        error: false,
        description: `Получение списка помещений.`,
        text: JSON.parse(get.text),
    };
};

// Удаление помещения
const deleteRoom = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'delete',
        url: entry.address + 'api/rooms/' + item,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        }
    }));

    const deleted = await Promise.all(promises);

    return {
        error: false,
        description: `Помещения удалены.`,
        text: deleted,
    };
};

//Добавление устройств
const putDevice = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'put',
        url: entry.address +'api/devices',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: [item],
        json: true,
    }));

    const put = await Promise.all(promises);

    const filter = put.filter(item => item.error !== true);

    if(array.length !== filter.length) {
        return {
            error: true,
            description: 'Ошибки при добавлении устройств.'
        };
    }

    return {
        error: false,
        description: 'Устройства добавлены.'
    };
};

//Получение списка устройств
const getDevice = async (token) => {
    const get = await Promise.resolve(prRequest(getOptions({
        token,
        api: 'api/devices',
        qs: {}
    })));

    return {
        error: false,
        description: `Получение списка устройств.`,
        text: JSON.parse(get.text),
    };
};

// Удаление списка устройств
const deleteDevice = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'delete',
        url: entry.address + 'api/devices/' + item,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        }
    }));

    const deleted = await Promise.all(promises);

    return {
        error: false,
        description: `Устройства удалены.`,
        text: deleted,
    };
};

// Добавление устройств в помещение
const addDeviceInRoom = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'post',
        url: entry.address + 'api/devices/' + item.deviceId + '/attach',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: {
            "accessZoneId": item.roomId
        },
        json: true
    }));

    const post = await Promise.all(promises);

    return {
        error: false,
        description: `Устройство добавлено в помещение.`,
        text: post,
    };
};

// Удаление устройств в помещение
const deleteDeviceInRoom = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'post',
        url: entry.address + 'api/devices/' + item + '/detach',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        }
    }));

    const post = await Promise.all(promises);

    return {
        error: false,
        description: `Устройство удалено из помещения.`,
        text: post,
    };
};

// Получение списка шаблонов доступа
const getTemplate = async (token) => {
    const get = await Promise.resolve(prRequest(getOptions({
        token,
        api: 'api/accessTemplates/list',
        qs: {}
    })));

    return {
        error: false,
        description: `Получение списка шаблонов доступа.`,
        text: JSON.parse(get.text),
    };
};

// Удаление шаблона доступа
const deleteTemplate = async (array, token) => {
    const promises = array.map(item => prRequest({
        method: 'delete',
        url: entry.address + 'api/accessTemplates/' + item,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        }
    }));

    const deleted = await Promise.all(promises);
    console.log(deleted)

    return {
        error: false,
        description: `Шаблоны доступа удалены.`,
        text: deleted,
    };
};

// Изменение вечернего времени
const postEveningTime = async (time, token) => {
    const promise = prRequest({
        method: 'post',
        url: entry.address + 'api/taSchedule/eveningTime',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: time,
        json: true
    });

    const post = await Promise.all([promise]);

    return {
        error: false,
        description: `Вечернее время изменено.`,
        text: post,
    };
};

// Изменение ночного времени
const postNightTime = async (time, token) => {
    const promise = prRequest({
        method: 'post',
        url: entry.address + 'api/taSchedule/nightTime',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: time,
        json: true
    });

    const post = await Promise.all([promise]);

    return {
        error: false,
        description: `Ночное время изменено.`,
        text: post,
    };
};

// Добавление прадничного дня
const putHoliday = async (date, token) => {
    const promise = prRequest({
        method: 'put',
        url: entry.address +'api/taSchedule/holidays',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        body: date,
        json: true,
    });

    const put = await Promise.all([promise]);

    if(put.error) {
        return {
            error: true,
            description: 'Праздничный день не добавлен.'
        };
    }

    return {
        error: false,
        description: 'Праздничный день добавлен.'
    };
};

// Удаление прадничного дня
const deleteHoliday = async (year, token) => {
    const promise = prRequest({
        method: 'post',
        url: entry.address + 'api/taSchedule/holidays/clear?year=' + year,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
        },
        json: true
    });

    const post = await Promise.all([promise]);

    return {
        error: false,
        description: `Удаление праздничных дней.`,
        text: post,
    };
};

module.exports = {
    putManyPosition,
    putArrayPosition,
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
    deletePosition,
    putRoom,
    getRoom,
    deleteRoom,
    putDevice,
    getDevice,
    deleteDevice,
    addDeviceInRoom,
    deleteDeviceInRoom,
    getTemplate,
    deleteTemplate,
    postEveningTime,
    postNightTime,
    putHoliday,
    deleteHoliday
};