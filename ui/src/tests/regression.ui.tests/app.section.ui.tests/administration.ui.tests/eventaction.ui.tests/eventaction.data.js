module.exports = {
    condition: 'Условия',
    action: 'Действие',
    eventaction1: {
        name: 'eventaction1',
        condition: 'Добавление должности',
        conditionTitle: 'Событие',
        conditionDescription: 'Содержит "Работа с должностями" → "Добавление должности"',
        request: 'test',
        actionTitle: 'Выполнить http-запрос',
        actionDescription: 'Выполнить ч.ttp-запрос: test',
        eventName: 'Выполнение рассылки',
        eventBody: 'Тип: http, Статус: Ошибка запроса: test\n' +
            'Закрыть',
    },
    eventaction2: {
        name: 'eventaction2',
        condition: 'Удаление должности',
        conditionTitle: 'Событие',
        conditionDescription: 'Содержит "Работа с должностями" → "Удаление должности"',
        request: 'test2',
        actionTitle: 'Выполнить http-запрос',
        actionDescription: 'Выполнить ч.ttp-запрос: test2',
        eventName: 'Выполнение рассылки',
        eventBody: 'Тип: http, Статус: Ошибка запроса: test2\n' +
            'Закрыть',
    },
    eventaction3: {
        name: 'eventaction3',
        device: 'Контроллер CL15',
        resource: 'Контроллер',
        condition: 'Активизация датчика вскрытия корпуса',
        action: 'Маскировать вход',
        contact: 'Вход №3 - In3',
        type: 'Время после срабатывания',
        time: 'Бесконечность'
    },
    eventaction4: {
        name: 'eventaction4',
        device: 'Вход №3 - In3',
        resource: 'Вход №3 - In3',
        condition: 'Активизация входа',
        action: 'Активизировать выход',
        contact: 'Выход №1 - NO1/C1/NC1',
        type: 'Время срабатывания',
        time: 'Секунды'
    },
    position1: 'position1',
    position2: 'position2',
    positionEvent: 'Добавление должности'
}