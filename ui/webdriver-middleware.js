const {Builder} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')


const {browser, headless, width, height} = require('../entry')

//Обработчик настройки selenium драйвера
const middleware = () => {

    //Браузер хром с headless
    if(browser === 'chrome' && headless) {
        return new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options()
                .addArguments('--headless=new')
                .addArguments("--remote-allow-origins=*")
                .windowSize({width: width, height: height}))
            .build()
    }

    //Браузер хром без headless
    if(browser === 'chrome' && !headless) {
        return new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options()
                .addArguments("--remote-allow-origins=*")
                .windowSize({width: width, height: height}))
            .build()

    }

    //firefox хром с headless
    if(browser === 'firefox' && headless) {
        return new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(new firefox.Options()
                .addArguments('--headless')
                .windowSize({width: width, height: height}))
            .build()
    }

    //firefox хром без headless
    if(browser === 'firefox' && !headless) {
        return new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(new firefox.Options()
                .windowSize({width: width, height: height}))
            .build()
    }
}

module.exports = middleware()


