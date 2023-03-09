const chromeDriver = require('chromedriver')
const firefoxDriver = require('geckodriver')
const {Builder} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')
const {browser, headless, width, height} = require('../entry')


const middleware = () => {

    if(browser === 'chrome' && headless) {
        return new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().addArguments('--headless=new').windowSize({width: width, height: height}))
            .build()
    }

    if(browser === 'chrome' && !headless) {
        return new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().windowSize({width: width, height: height}))
            .build()
    }

    if(browser === 'firefox' && headless) {
        return new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(new firefox.Options().addArguments('--headless').windowSize({width: width, height: height}))
            .build()
    }

    if(browser === 'firefox' && !headless) {
        return new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(new firefox.Options().windowSize({width: width, height: height}))
            .build()
    }
}

module.exports = middleware()


