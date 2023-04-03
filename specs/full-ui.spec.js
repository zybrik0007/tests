const {describe} = require('mocha')
const tests = require('../ui/src/handlers/soft')

describe('Проверка функционала', () => {

    describe('Проверка раздела "Персонал."', () => {
        tests.positionUi.main()
    })

})