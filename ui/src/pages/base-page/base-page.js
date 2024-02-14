const {By, until, Key} = require('selenium-webdriver');
const {Select} = require('selenium-webdriver');
var driver = require('../../../webdriver-middleware');

//Базовая страница
class BasePage {

    constructor() {
        global.driver = driver
    }

    //Открытие страницы по url
    async open(event) {
        return await driver.get(event)
            .then(() => {return {error: false, description: ''}})
            .catch(() => {return {error: true, description: `Не открыто приложение с адресом ${event}`}})
    }

    //Закртие страницы по url
    async closeDriver() {
        return await driver.quit()
            .then(() => {return {error: false, description: 'Выполнено закрытие браузера'}})
            .catch((err) => {
                console.log('err', err)
                return {error: true, description: 'Не выполнено закрытие браузера'
                }})
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

    //Частично совпадение url
    async urlContains(event, timeout) {
        return await driver.wait(until.urlContains(event), timeout)
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

        /* const element = By.xpath(event)
         return await driver.wait(until.elementLocated(element), timeout).click()
             .then(() => {return {error: false, description}})
             .catch((err) => {
                 console.log('err: ', err);
                 return {error: true, description: `Ошибка. ${description}`}
             });*/
        const element = await driver.findElement(By.xpath(event));
        return await driver.actions().click(element).perform()
            .then(() => {
                return {
                    error: false, description
                }
            })
            .catch((err) => {
                console.log('err: ', err);
                return {error: true, description: `Ошибка. ${description}`}
            });
    }

    // Двойное нажатие по элементу
    async xpathDbHandler(event, description, timeout) {
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

/*        const element = By.xpath(event)
        return await driver.wait(until.elementLocated(element), timeout).doubleClick()
            .then(() => {return {error: false, description}})
            .catch(() => {return {error: true, description: `Ошибка. ${description}`}})*/


        const element = await driver.findElement(By.xpath(event))
        return await driver.actions().doubleClick(element).perform()
            .then(() => {return{error: false, description}})
            .catch(() => {return {error: true, description: `Ошибка. ${description}`}})
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
            .catch(() => {
                return {error: true, description: `Ошибка. ${description}`}})
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
            await this.loading(1000)
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
        let timer = timeout
        while (timer > 0) {
            const element = await driver.findElements(By.xpath(event)).catch(error => error)
            if (element.length === size) {
                return {
                    error: false,
                    description,
                }
            }
            await this.loading(1000);
            timer -= 1000;
        }

        return {
            error: true,
            description: `Ошибка. ${description}`,
        }
    }

    //Ожидание
    async loading(event) {
        return await driver.sleep(event)
            .then(() => {return {error: false, description: `Выполнено ожидание "${event}".`}})
            .catch(() => {return {error: false, description: `Не выполнено ожидание "${event}".`}})
    }

    //Обвновление страницы
    async refresh() {
        return await driver.navigate().refresh()
            .then(() => {return {error: false, description: 'Выполнено обновление страницы.'}})
            .catch(() => {return {error: false, description: 'Не выполнено обновление страницы.'}})
    }

    //Удаление Local Storage
    async clearLocalStorage() {
        return await driver.executeScript('return window.localStorage.clear();')
            .then(() => {
                return {
                    error: false,
                    description: 'Выполнена очистка Local Storage',
                }
            })
            .catch(() => {
                return {
                    error: true,
                    description: 'Не выполнена очистка Local Storage',
                }
            })
    }

    //Запись в Local Storage
    async setLocalStorage(key, value) {
        const set = await driver.executeScript(`return window.localStorage.setItem('${key}', '${value}');`)
            .then(() => {
                return {
                    error: false,
                    description: `Добавление в Local Storage ключ ${key} со значением ${value}.`,
                }
            })
            .catch(() => {
                return {
                    error: true,
                    description: `Ошибка. Добавление в Local Storage ключ ${key} со значением ${value}.`,
                }
            })
        await this.refresh()
        return set
    }

    //Получение значения куки
    async getCookie(event) {
        return await driver.manage().getCookie(event)
            .then(cook => {
                return {
                    error: false,
                    text: cook.value
                }
            })
            .catch((e) => {
                console.log(e)
                return {
                    error: true,
                    text: '',
                }
            })
    }

    //Удаление все значение кнопкой Backspace
    async backSpaceFullHandler(event, description, timeout) {
        const xpathElement = await this.xpathElement(event, description, timeout)
        if(xpathElement.error) {
            return xpathElement
        }

        while(true) {
            const xpathGetAttribute = await this.xpathGetAttribute(event, description, 'value', timeout);
            if(xpathGetAttribute.error) {
                return xpathGetAttribute
            }

            if(!xpathGetAttribute.text) {
                return {
                    error: false,
                    description
                }
            }

            const array = xpathGetAttribute.text.split('').map(() => Key.BACK_SPACE);
            const element = driver.findElement(By.xpath(event));
            await driver.actions().click(element).sendKeys(Key.chord(...array)).perform()
                .then(() => {return{error: false, description}})
                .catch(() => {return {error: true, description: `Ошибка. ${description}`}})
        }
    }
    
    //Нажатеи Enter
    async enter() {
        return driver.actions().sendKeys(Key.ENTER).perform()
            .then(() => {return{error: false, description: 'Нажатие Enter.'}})
            .catch(() => {return {error: true, description: 'Ошибка. Нажатие Enter.'}})
    }

    //Нажатие Control + элемент
    async xpathControlHandler(event, description, timeout) {
        const xpathElement = await this.xpathElement(event, description, timeout)
        if(xpathElement.error) {
            return xpathElement
        }

        const element = await driver.findElement(By.xpath(event))
        return await driver.actions().keyDown(Key.CONTROL).click(element).keyUp(Key.CONTROL).perform()
            .then(() => {return{error: false, description}})
            .catch(() => {return {error: true, description: `Ошибка. ${description}`}})
    }

    //Нажатие левой кнопки мышли и вправо (работает только в Firefox)
    async xpathClickMouseSlideRight(event, description, x, y, duration, timeout) {
        const xpathElement = await this.xpathElement(event, description, timeout)
        if(xpathElement.error) {
            return xpathElement
        }

        const element = await driver.findElement(By.xpath(event))
        return await driver.actions({async: true})
            //.move({origin: element, x: 0, y: 0, duration})
            .move({origin: element, duration})
            .press()
            .move({origin: element, x, y, duration})
            .release()
            .perform()
            .then(() => {return{error: false, description}})
            .catch(() => {return {error: true, description: `Ошибка. ${description}`}})
    }

    async script(event, description) {
        return await driver.executeScript(event)
            .then(() => {return {error: false, description}})
            .catch(() => {return {error: false, description: `Ошибка. ${description}`}})
    }

    async xpathSelectPutText(event, value, description) {
        const selectElement = await driver.findElement(By.xpath(event));
        const select = new Select(selectElement);
        return await select.selectByVisibleText(value)
            .then(() => {return {error: false, description}})
            .catch(() => {return {error: true, description: `Ошибка. ${description}`}})
    }

    async xpathSelectGetText(event, description) {
        const selectElement = await driver.findElement(By.xpath(event));
        const select = new Select(selectElement);
        return await select.getAllSelectedOptions()
            .then((text) => {return {error: false, text, description}})
            .catch(() => {return {error: true, text: '', description: `Ошибка. ${description}`}})
    }
}

module.exports = BasePage
