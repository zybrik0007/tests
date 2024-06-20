const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    initAdd: ({timeout}) => it('Отображение страницы добавления Реакции на события.',
        async () => await dec.simple(page.eventactionChange.initAdd,
            [timeout],
            page.eventactionChange)),

    initEdit: ({timeout}) => it('Отображение страницы редактирования Реакции на события.',
        async () => await dec.simple(page.eventactionChange.initEdit,
            [timeout],
            page.eventactionChange)),

    addCondition: ({icon, timeout}) => it('Нажатие кнопки Добавить условие.',
        async () => await dec.simple(page.eventactionChange.addCondition,
            [icon, timeout],
            page.eventactionChange)),

    addAction: ({icon, timeout}) => it('Нажатие кнопки Добавить действие.',
        async () => await dec.simple(page.eventactionChange.addAction,
            [icon, timeout],
            page.eventactionChange)),

    deleteCondition: ({icon, num, timeout}) => it(`Нажатие кнопки Удалить условие - ${num}.`,
        async () => await dec.simple(page.eventactionChange.deleteCondition,
            [icon, num, timeout],
            page.eventactionChange)),

    deleteAction: ({icon, num, timeout}) => it(`Нажатие кнопки Удалить действие - ${num}.`,
        async () => await dec.simple(page.eventactionChange.deleteAction,
            [icon, num, timeout],
            page.eventactionChange)),

    conditionColumnName: ({name, timeout}) => it(`В заглавии колонки Условия отображается - "${name}".`,
        async () => await dec.simpleText(page.eventactionChange.conditionColumnName,
            [timeout],
            name,
            page.eventactionChange)),

    actionColumnName: ({name, timeout}) => it(`В заглавии колонки Действие отображается - "${name}".`,
        async () => await dec.simpleText(page.eventactionChange.actionColumnName,
            [timeout],
            name,
            page.eventactionChange)),

    conditionTitle: ({num, title, timeout}) => it(`Заглавие условия ${num} равно "${title}".`,
        async () => await dec.simpleText(page.eventactionChange.conditionTitle,
            [num, timeout],
            title,
            page.eventactionChange)),

    actionTitle: ({num, title, timeout}) => it(`Заглавие действия ${num} равно "${title}".`,
        async () => await dec.simpleText(page.eventactionChange.actionTitle,
            [num, timeout],
            title,
            page.eventactionChange)),

    conditionName: ({num, name, timeout}) => it(`Описание условия ${num} равно "${name}".`,
        async () => await dec.simpleText(page.eventactionChange.conditionName,
            [num, timeout],
            name,
            page.eventactionChange)),

    actionName: ({num, name, timeout}) => it(`Описание действия ${num} равно "${name}".`,
        async () => await dec.simpleText(page.eventactionChange.actionName,
            [num, timeout],
            name,
            page.eventactionChange)),
}
