const {By, until} = require('selenium-webdriver')
var driver = require('../../../webdriver-middleware')

//Базовая страница
class BasePage {

    constructor() {
        global.driver = driver
    }

    //Открытие страницы по url
    async open(event) {
        return await driver.get(event)
            .then(() => {return {error: false, description: ''}})
            .catch((err) => {return {error: true, description: `Не открыто приложение с адресом ${event}`}})
    }

    //Закртие страницы по url
    async close() {
        return await driver.quit()
            .then(() => {return {error: false, description: 'Выполнено закрытие браузера'}})
            .catch(() => {return {error: true, description: 'Не выполнено закрытие браузера'}})
    }

    //Совпаление заглавий
    async titleCompare(event, timeout) {
        return await driver.wait(until.titleIs(event), timeout)
            .then(() => {return {error: false, description: 'Заглавие страницы валидно'}})
            .catch(() => {return {error: true, description: 'Заглавие страницы не валидно'}})
    }

    //Совпадение url
    async urlCompare(event, timeout) {
        return await driver.wait(until.urlIs(event), timeout)
            .then(() => {return {error: false, description: `Открыта страница с адресом ${event}`}})
            .catch(() => {return {error: true, description: `Не открыта страница с адресом ${event}`}})
    }

    //xpath

    //Элемент локально находится на странице
    async xpathLocated(event, description, timeout) {
        const element = By.xpath(event)
        return await driver.wait(until.elementLocated(element), timeout)
            .then(() => {return {error: false, description: `Located. ${description}`}})
            .catch(() => {return {error: true, description: `Ошибка. Located. ${description}`}})
    }

    //Элемент виден на странице
    async xpathDisplayed(event, description, timeout) {
        const element = By.xpath(event)
        return await driver.wait(until.elementLocated(element), timeout).isDisplayed()
            .then(() => {return {error: false, description: `Displayed. ${description}`}})
            .catch(() => {return {error: true, description: `Ошибка. Displayed. ${description}`}})
    }

    //Элемент доступен на странице
    async xpathEnabled(event, description, timeout) {
        const element = By.xpath(event)
        return await driver.wait(until.elementLocated(element), timeout).isEnabled()
            .then(() => {return {error: false, description: `Enabled. ${description}`}})
            .catch(() => {return {error: true, description: `Ошибка. Enabled. ${description}`}})
    }

    //Элемент локально находится, виден и доступен на странице
    async xpathElement(event, description, timeout) {
        const elementLocated = await this.xpathLocated(event, description, timeout)
        if(elementLocated.error) {
            return elementLocated
        }

        const elementDisplayed = await this.xpathDisplayed(event, description, timeout)
        if(elementDisplayed.error) {
            return elementDisplayed
        }

        const elementEnabled = await this.xpathEnabled(event, description, timeout)
        if(elementEnabled.error) {
            return elementEnabled
        }

        return {
            error: false,
            description,
        }
    }

    //Нажатие по элементу
    async xpathHandler(event, description, timeout) {
        const elementLocated = await this.xpathLocated(event, description, timeout)
        if(elementLocated.error) {
            return elementLocated
        }

        const elementDisplayed = await this.xpathDisplayed(event, description, timeout)
        if(elementDisplayed.error) {
            return elementDisplayed
        }

        const elementEnabled = await this.xpathEnabled(event, description, timeout)
        if(elementEnabled.error) {
            return elementEnabled
        }

        const element = By.xpath(event)
        const handler = await driver.wait(until.elementLocated(element), timeout).click()
            .then(() => {return {error: false, description}})
            .catch(() => {return {error: true, description: `Ошибка. ${description}`}})

        return handler
    }

    //Получение текста из элемента
    async xpathGetText(event, description, timeout) {
        const elementLocated = await this.xpathLocated(event, description, timeout)
        if(elementLocated.error) {
            return elementLocated
        }

        const elementDisplayed = await this.xpathDisplayed(event, description, timeout)
        if(elementDisplayed.error) {
            return elementDisplayed
        }

        const elementEnabled = await this.xpathEnabled(event, description, timeout)
        if(elementEnabled.error) {
            return elementEnabled
        }

        const element = By.xpath(event)

        return await driver.wait(until.elementLocated(element), timeout).getText()
            .then(text => {return {error: false, description, text}})
            .catch(() => {return {error: true, description: `Ошибка. ${description}`, text: ''}})
    }

    //Получение значения аттрибута
    async xpathGetAttribute(event, description, attribute, timeout) {
        const elementLocated = await this.xpathLocated(event, description, timeout)
        if(elementLocated.error) {
            return elementLocated
        }

        const elementDisplayed = await this.xpathDisplayed(event, description, timeout)
        if(elementDisplayed.error) {
            return elementDisplayed
        }

        const elementEnabled = await this.xpathEnabled(event, description, timeout)
        if(elementEnabled.error) {
            return elementEnabled
        }

        const element = By.xpath(event)
        return await driver.wait(until.elementLocated(element), timeout).getAttribute(attribute)
            .then(text => {return {error: false, description, text}})
            .catch(() => {return {error: true, description: `Ошибка. ${description}`, text: ''}})

    }

    //Запись данных в input
    async xpathSendKeys(event, description, text, timeout) {
        const elementLocated = await this.xpathLocated(event, description, timeout)
        if(elementLocated.error) {
            return elementLocated
        }

        const elementDisplayed = await this.xpathDisplayed(event, description, timeout)
        if(elementDisplayed.error) {
            return elementDisplayed
        }

        const elementEnabled = await this.xpathEnabled(event, description, timeout)
        if(elementEnabled.error) {
            return elementEnabled
        }

        const element = By.xpath(event)
        return await driver.wait(until.elementLocated(element), timeout).sendKeys(text)
            .then(() => {return {error: false, description}})
            .catch(() => {return {error: true, description: `Ошибка. ${description}`}})
    }

    //Удаление данных в input
    async xpathClear(event, description, timeout) {
        const elementLocated = await this.xpathLocated(event, description, timeout)
        if(elementLocated.error) {
            return elementLocated
        }

        const elementDisplayed = await this.xpathDisplayed(event, description, timeout)
        if(elementDisplayed.error) {
            return elementDisplayed
        }

        const elementEnabled = await this.xpathEnabled(event, description, timeout)
        if(elementEnabled.error) {
            return elementEnabled
        }

        const element = By.xpath(event)
        return await driver.wait(until.elementLocated(element), timeout).clear()
            .then(() => {return {error: false, description}})
            .catch(() => {return {error: true, description: `Ошибка. ${description}`}})
    }

    //У элемента стиль display none
    async xpathCssDisplayNone(event, description, timeout) {
        let time = timeout
        while (time > 0) {
            const elementLocated = await this.xpathLocated(event, description, timeout)
            if(elementLocated.error) {
                return elementLocated
            }

            const element = By.xpath(event)
            const elementStyle = await driver
                .wait(until.elementLocated(element), timeout).getCssValue('display')

            if(elementStyle === 'none') {
                return {
                    error: false,
                    description,
                }
            }
            time -= 1000
        }

        return {
            error: true,
            description: `Ошибка. ${description}`,
        }
    }

    //Отсутствие элемента
    async xpathNoElement(event, description, timeout) {
        let timer = timeout
        while (timer > 0) {
            const element = await driver.findElement(By.xpath(event)).catch(error => error)
            if(element instanceof Error) {
                return {
                    error: false,
                    description,
                }
            }
            timer -= 1000
            await this.loading(1000)
        }
        return {
            error: true,
            description: `Ошибка. ${description}`,
        }
    }

    //Элементов отображает заданное количество
    async xpathList(event, description, size, timeout) {
        const element = await driver.findElement(By.xpath(event)).catch(error => error)

        if(size === 0) {
            return {
                error: false,
                description,
            }
        }

        if(element instanceof Error) {
            return {
                error: true,
                description: `Ошибка. ${description}`,
            }
        }

        let timer = timeout
        while (timer > 0) {
            const arr = await driver.wait(until.elementsLocated(By.xpath(event)), timeout)
            if (arr.length === size) {
                return {
                    error: false,
                    description,
                }
            }
            await this.loading(1000)
            timer -= 1000
        }

        return {
            error: true,
            description: `Ошибка. ${description}`,
        }
    }

    //Ожидание
    async loading(event) {
        await driver.sleep(event)
    }

    //Обвновление страницы
    async refresh() {
        return await driver.navigate().refresh()
            .then(() => {return {error: false, description: 'Выполнено обновление страницы.'}})
            .catch(() => {return {error: false, description: 'Не выполнено обновление страницы.'}})
    }

}

module.exports = BasePage
