const {expect} = require('chai');
const page = require('../pages')
const el = require('../elements')
const entry = require('../../../entry')
const url = require('../dictionaries/url')

/*Авторизация*/
const auth = async (login, password) => {
    const open = await page.base.open(url.authUrl)
    console.log(open.description)
    expect(open.error).to.equal(false)

    const log = await el.input.sendKeys('Логин', '', login, entry.max)
    console.log(log.description)
    expect(log.error).to.equal(false)

    const pas = await el.input.sendKeys('Пароль', '', password, entry.max)
    console.log(pas.description)
    expect(pas.error).to.equal(false)

    const buttonHandler = await el.button.handler('Войти в систему', entry.max)
    console.log(buttonHandler.description)
    expect(buttonHandler.error).to.equal(false)

    const address = await page.base.urlCompare(url.staffPresentUrl, entry.max)
    console.log(address.description)
    expect(address.error).to.equal(false)
}

/*Отсутствие анимаций*/
const animation = async () => {
    const noError = await el.error.errorNoList(entry.max)
    console.log(noError.description)
    expect(noError.error).to.equal(false)

    const noSuccess = await el.success.successNoList(entry.max)
    console.log(noSuccess.description)
    expect(noSuccess.error).to.equal(false)

    const noLoader = await el.loader.loaderLargeNoElement(entry.max)
    console.log(noLoader.description)
    expect(noLoader.error).to.equal(false)
}

/*Выход*/
const exit = async () => {
    await animation()

    const profileHandler = await el.header.profileHandler(entry.max)
    console.log(profileHandler.description)
    expect(profileHandler.error).to.equal(false)

    const menu = await el.header.menu(entry.max)
    console.log(menu.description)
    expect(menu.error).to.equal(false)

    const exitHandler = await el.header.exitHandler(entry.max)
    console.log(exitHandler.description)
    expect(exitHandler.error).to.equal(false)

    const open = await page.base.open(url.authUrl)
    console.log(open.description)
    expect(open.error).to.equal(false)

    const address = await page.base.urlCompare(url.authUrl, entry.max)
    console.log(address.description)
    expect(address.error).to.equal(false)
}

/*Проверка на утверждение*/
const simple = async (func, array, context = false) => {
    const data = await func.bind(context)(...array);
    console.log(data.description)
    expect(data.error).to.equal(false)
}

/*Проверка на отрицание*/
const simpleFalse = async(func, array, context = false) => {
    const data = await func.bind(context)(...array);
    expect(data.error).to.equal(true)
}

/*Проверка на положительный текст*/
const simpleText = async (func, array, text, context = false) => {
    const data = await func.bind(context)(...array)
    console.log(data.description)
    expect(data.error).to.equal(false)
    expect(data.text.trim()).to.equal(text)
}



module.exports = {
    auth,
    animation,
    exit,
    simple,
    simpleFalse,
    simpleText
}