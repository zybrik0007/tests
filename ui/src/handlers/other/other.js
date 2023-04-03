const {describe, it, before, after} = require('mocha')

const entry = require('../../../../entry')
const page = require('../../pages')
const el = require('../../elements')
const dec = require('../../dictionaries/decorate')
const sec = require('../../dictionaries/section')
const sub = require('../../dictionaries/subsection')

//Откат базы данных
const rebase = () => {
    describe('Откат базы данных', () => {

        it('Выполнение отката базы данных', async () => await dec.rebase())

    })
}

//Проверка настройки количества записей и перехода по страницам
const footer = (nameHead, nameCell, str, cell, bef, aft) => {

    describe('Проверка первичного отображения', () => {

        bef()

        aft()

        it('Отображение "20" в настройке количества записей', async () => dec.simpleText(el.footer.selectGetText,
            [entry.max],
            '20',
            el.footer))

        it('Отображение "100 записей" в количестве страниц', async () => dec.simpleText(el.footer.countGetText,
            [entry.max],
            '100 записей',
            el.footer))

        it('Отображение "Переход на первую страницу" не активен', async () => dec.simple(el.footer.pageIconDisabled,
            [el.footer.first, entry.max],
            el.footer))

        it('Отображение "Переход на предыдущую страницу" не активен', async () => dec.simple(el.footer.pageIconDisabled,
            [el.footer.pre, entry.max],
            el.footer))

        it('Отображение "Страница 1" активен', async () => dec.simple(el.footer.pageActive,
            [1, entry.max],
            el.footer))

        it('Отображение "Страница 2"', async () => dec.simple(el.footer.page,
            [2, entry.max],
            el.footer))

        it('Отображение "Страница 3"', async () => dec.simple(el.footer.page,
            [3, entry.max],
            el.footer))

        it('Отображение "Страница 4"', async () => dec.simple(el.footer.page,
            [4, entry.max],
            el.footer))

        it('Отображение "Страница 5"', async () => dec.simple(el.footer.page,
            [5, entry.max],
            el.footer))

        it('Отображение "Переход на следующую страницу" активен', async () => dec.simple(el.footer.pageIconActive,
            [el.footer.next, entry.max],
            el.footer))

        it('Отображение "Переход на последнюю страницу" активен', async () => dec.simple(el.footer.pageIconActive,
            [el.footer.last, entry.max],
            el.footer))

    })

    describe('Проверка настройки количества 50 страниц ', () => {

        bef()

        aft()

        describe('Отображения страниц', () => {

            it('Настройка 50 страниц', async () => {
                await dec.simple(el.footer.selectHandler,
                    ['50', entry.max],
                    el.footer)
            })

            it('Отображение 50 записей в таблице', async () => dec.simple(el.table.size,
                [50, entry.max],
                el.table))

            it('Отображение "50" в настройке количества записей', async () => dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '50',
                el.footer))

            it('Отображение "Переход на первую страницу" не активен', async () => dec.simple(el.footer.pageIconDisabled,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" не активен', async () => dec.simple(el.footer.pageIconDisabled,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1" активен', async () => dec.simple(el.footer.pageActive,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2"', async () => dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отсутствует отображение "Страница 3"', async () => dec.simple(el.footer.noPage,
                [3, entry.max],
                el.footer))

            it('Отсутствует отображение "Страница 4"', async () => dec.simple(el.footer.noPage,
                [4, entry.max],
                el.footer))

            it('Отсутствует отображение "Страница 5"', async () => dec.simple(el.footer.noPage,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

        })

    })

    describe('Проверка настройки количества 100 страниц ', () => {

        bef()

        aft()

        describe('Отображения страниц', () => {

            it('Настройка 100 страниц', async () => {
                await dec.simple(el.footer.selectHandler,
                    ['100', entry.max],
                    el.footer)
            })

            it('Отображение 100 записей в таблице', async () => dec.simple(el.table.size,
                [100, entry.max],
                el.table))

            it('Отображение "100" в настройке количества записей', async () => dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '100',
                el.footer))

            it('Отсутсвие кнопок страниц', async () => await dec.simple(el.footer.pageNoArea,
                [entry.max],
                el.footer))
        })

    })

    describe('Проверка настройки количества 20 страниц ', () => {

        before('Вход и открытие подраздела "Должности"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
            await dec.simple(page.position.init, [entry.max], page.position)
        })

        after('Выход', async () => await dec.exit())

        describe('Отображения страниц', () => {

            it('Настройка 20 страниц', async () => {
                await dec.simple(el.footer.selectHandler,
                    ['20', entry.max],
                    el.footer)
            })

            it('Отображение 20 записей в таблице', async () => dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" не активен', async () => dec.simple(el.footer.pageIconDisabled,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" не активен', async () => dec.simple(el.footer.pageIconDisabled,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1" активен', async () => dec.simple(el.footer.pageActive,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2"', async () => dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3"', async () => dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

        })

    })

    describe('Проверка перехода по страницам', () => {

        bef()

        aft()

        describe('Сортировка тестируемого столбца столбца по возрастанию', () => {

            it('Нажатие по заглавию столбца', async () => await dec.simple(el.table.headHandler,
                [nameHead, cell, entry.max],
                el.table))

            it('Столбец отсортирован по возрастанию', async () => await dec.simple(el.table.headSortAsc,
                [nameHead, cell, entry.max],
                el.table))

            it('Отсуствиие анимаций', async () => await dec.animation())

        })

        describe('Проверка нажатия "Страница 2"', () => {

            it('Нажатие "Страница 2"', async () => await dec.simple(el.footer.pageHandler,
                [2, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2" активна', async () => await dec.simple(el.footer.pageActive,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3"', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 27`,
                el.table))
        })

        describe('Проверка нажатия "Страница 3"', () => {

            it('Нажатие "Страница 3"', async () => await dec.simple(el.footer.pageHandler,
                [3, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 3"', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3" активна', async () => await dec.simple(el.footer.pageActive,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 45`,
                el.table))
        })

        describe('Проверка нажатия "Страница 4"', () => {

            it('Нажатие "Страница 4"', async () => await dec.simple(el.footer.pageHandler,
                [4, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 3"', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3" ', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4" активна', async () => await dec.simple(el.footer.pageActive,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 63`,
                el.table))
        })

        describe('Проверка нажатия "Страница 5"', () => {

            it('Нажатие "Страница 5"', async () => await dec.simple(el.footer.pageHandler,
                [5, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 3"', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3" ', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5" активна', async () => await dec.simple(el.footer.pageActive,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 81`,
                el.table))
        })

        describe('Проверка нажатия "Страница 1"', () => {

            it('Нажатие "Страница 1"', async () => await dec.simple(el.footer.pageHandler,
                [1, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1" активна', async () => await dec.simple(el.footer.pageActive,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 3"', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3"', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 1`,
                el.table))

        })

        describe('Проверка нажатия "Переход на следующую страницу" (2 страница)', () => {

            it('Нажатие "Переход на следующую страницу"', async () => await dec.simple(el.footer.pageIconHandler,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2" активна', async () => await dec.simple(el.footer.pageActive,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3"', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 27`,
                el.table))
        })

        describe('Проверка нажатия "Переход на следующую страницу" (3 страница)', () => {

            it('Нажатие "Переход на следующую страницу"', async () => await dec.simple(el.footer.pageIconHandler,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2"', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3" активна', async () => await dec.simple(el.footer.pageActive,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 45`,
                el.table))
        })

        describe('Проверка нажатия "Переход на следующую страницу" (4 страница)', () => {

            it('Нажатие "Переход на следующую страницу"', async () => await dec.simple(el.footer.pageIconHandler,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2"', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3" ', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4" активна', async () => await dec.simple(el.footer.pageActive,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 63`,
                el.table))
        })

        describe('Проверка нажатия "Переход на следующую страницу" (5 страница)', () => {

            it('Нажатие "Переход на следующую страницу"', async () => await dec.simple(el.footer.pageIconHandler,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2"', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3" ', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5" активна', async () => await dec.simple(el.footer.pageActive,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 81`,
                el.table))
        })

        describe('Проверка нажатия "Переход на предыдущую страницу" (4 страница)', () => {

            it('Нажатие "Переход на предыдущую страницу"', async () => await dec.simple(el.footer.pageIconHandler,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2"', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3" ', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4" активна', async () => await dec.simple(el.footer.pageActive,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 63`,
                el.table))
        })

        describe('Проверка нажатия "Переход на предыдущую страницу" (3 страница)', () => {

            it('Нажатие "Переход на предыдущую страницу"', async () => await dec.simple(el.footer.pageIconHandler,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2"', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3" активна', async () => await dec.simple(el.footer.pageActive,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 45`,
                el.table))
        })

        describe('Проверка нажатия "Переход на предыдущую страницу" (2 страница)', () => {

            it('Нажатие "Переход на предыдущую страницу"', async () => await dec.simple(el.footer.pageIconHandler,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2" активна', async () => await dec.simple(el.footer.pageActive,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3"', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 27`,
                el.table))
        })

        describe('Проверка нажатия "Переход на предыдущую страницу" (1 страница)', () => {

            it('Нажатие "Переход на предыдущую страницу"', async () => await dec.simple(el.footer.pageIconHandler,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1" активна', async () => await dec.simple(el.footer.pageActive,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2" ', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3"', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 1`,
                el.table))
        })

        describe('Проверка нажатия "Переход на последнюю страницу"', () => {

            it('Нажатие "Переход на последнюю страницу"', async () => await dec.simple(el.footer.pageIconHandler,
                [el.footer.last, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настройке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1"', async () => await dec.simple(el.footer.page,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2"', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3" ', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5" активна', async () => await dec.simple(el.footer.pageActive,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 81`,
                el.table))
        })

        describe('Проверка нажатия "Переход на первую страницу"', () => {

            it('Нажатие "Переход на первую страницу"', async () => await dec.simple(el.footer.pageIconHandler,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение 20 записей в таблице', async () => await dec.simple(el.table.size,
                [20, entry.max],
                el.table))

            it('Отображение "20" в настроке количества записей', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer))

            it('Отображение "100 записей" в количестве страниц', async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                '100 записей',
                el.footer))

            it('Отображение "Переход на первую страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.first, entry.max],
                el.footer))

            it('Отображение "Переход на предыдущую страницу" не активен', async () => await dec.simple(el.footer.pageIconDisabled,
                [el.footer.pre, entry.max],
                el.footer))

            it('Отображение "Страница 1" активна', async () => await dec.simple(el.footer.pageActive,
                [1, entry.max],
                el.footer))

            it('Отображение "Страница 2" ', async () => await dec.simple(el.footer.page,
                [2, entry.max],
                el.footer))

            it('Отображение "Страница 3"', async () => await dec.simple(el.footer.page,
                [3, entry.max],
                el.footer))

            it('Отображение "Страница 4"', async () => await dec.simple(el.footer.page,
                [4, entry.max],
                el.footer))

            it('Отображение "Страница 5"', async () => await dec.simple(el.footer.page,
                [5, entry.max],
                el.footer))

            it('Отображение "Переход на следующую страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.next, entry.max],
                el.footer))

            it('Отображение "Переход на последнюю страницу" активен', async () => await dec.simple(el.footer.pageIconActive,
                [el.footer.last, entry.max],
                el.footer))

            it('Проверка изменения значения в таблице', async () => await dec.simpleText(el.table.cellGetText,
                [nameHead, str, cell, entry.max],
                `${nameCell} 1`,
                el.table))

        })

        describe('Удаление Local Storage', () => {

            it('Удаление данных из Local Storage', async () => await dec.simple(page.base.clearLocalStorage,
                [],
                page.base))

        })

    })
}

module.exports = {
    rebase,
    footer,
}