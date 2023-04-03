const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')
const xpand = new (require('./select-xpand'))

class Footer extends BasePage {
    constructor() {
        super();
        this.first = {
            name: 'go to first page',
            description: 'Переход на первую страницу',
        }
        this.pre = {
            name: 'go to previous page',
            description: 'Переход на предыдующую страницу',
        }
        this.next = {
            name: 'go to next page',
            description: 'Переход на следующую страницу',
        }
        this.last = {
            name: 'go to last page',
            description: 'Переход на последнюю страницу'
        }
    }

    async selectGetText(timeout) {
        return await this.xpathGetText(elements.footerSelectActiveCount,
            'Получение значения числа выбранного для отображения количества записей в таблице.',
            timeout)
    }

    async countGetText(timeout) {
        return await this.xpathGetText(elements.footerCount,
            'Получение значения числа всех записей в таблице',
            timeout)
    }

    async selectHandler(text, timeout) {
        const selectHandler = await this.xpathHandler(elements.footerSelectActiveCount,
            'Нажатие по настройки выбора количества страниц',
            timeout)

        if(selectHandler.error) {
            return selectHandler
        }

        await this.loading(500)

        const xpandOpen = await xpand.xpand(timeout)
        if(xpandOpen.error) {
            return xpandOpen
        }

        const xpandSelect = await xpand.handler(text, timeout)
        if(xpandSelect.error) {
            return xpandSelect
        }

        const xpandClose = await xpand.xpandNoElement(timeout)
        if(xpandClose.error) {
            return xpandClose
        }

        await this.loading(500)

        return {
            error: false,
            description: `Выбрано отображение "${text}" страниц.`,
        }

    }

    async page(num, timeout) {
        return await this.xpathElement(elements.footerPage(num),
            `Отображение страницы с номером "${num}".`,
            timeout)
    }

    async noPage(num, timeout) {
        return await this.xpathNoElement(elements.footerPage(num),
            `Отсуствие страницы с номером "${num}".`,
            timeout)
    }

    async pageActive(num, timeout) {
        return await this.xpathElement(elements.footerPageActive(num),
            `Страница с номером "${num}" активна.`,
            timeout)
    }

    async pageHandler(num, timeout) {
        return await this.xpathHandler(elements.footerPage(num),
            `Нажатие по стринце с номером ${num}`,
            timeout)
    }

    async pageIconActive(icon, timeout) {
        return await this.xpathElement(elements.footerPageIconActive(icon.name),
            `Кнопка "${icon.description}" активна.`,
            timeout)
    }

    async pageIconDisabled(icon, timeout) {
        return await this.xpathElement(elements.footerPageIconDisabled(icon.name),
            `Кнопка "${icon.description}" не активна.`,
            timeout)
    }

    async pageIconHandler(icon, timeout) {
        return await this.xpathHandler(elements.footerPageIcon(icon.name),
            `Нажатие "${icon.description}".`,
            timeout)
    }

    async pageNoArea(timeout) {
        return await this.xpathElement(elements.footerPageArea,
            'Отсутствие кнопок переключения страниц.',
            timeout)
    }


}

module.exports = Footer