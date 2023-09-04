const {describe} = require('mocha')
const tests = require('../ui/src/handlers/soft')

describe('Проверка функционала', () => {

    describe('Проверка раздела "Персонал."', () => {
        tests.divisionUi.add.addDuplicateOneLevel()
        //tests.additionalDataUi.staff.main()
        //tests.additionalDataUi.staff.add.typeSelectDeleteBox()
        //tests.additionalDataUi.visitor.main()
    });
});