//const {describe} = require('mocha')
const tests = require('../ui/src/handlers/module-specs').positionUi

// Отображение
//tests.display();

// Добавление
//tests.add.addMinParams()
//tests.add.addMaxParams()
//tests.add.addNoParams()
//tests.add.addNoName()
//tests.add.addDuplicate()

// Редактирвоание
//tests.edit.editMinParams()
//tests.edit.editMaxParams()
//tests.edit.editAllParams()
//tests.edit.editDuplicate()

// Удаление
tests.delete.deleteOne()
tests.delete.deleteTwo()

// Печать
tests.print()

//Экспорт
tests.export.xlsxNoHeaderSystem()
tests.export.xlsxHeaderSystem()
tests.export.xlsxHeaderNameSystem()
tests.export.xlsxNoHeaderName()
tests.export.xlsxHeaderName()
tests.export.xlsxHeaderNameName()
tests.export.csvSystem()
tests.export.csvName()

// Импорт
tests.import.importXLSX()
tests.import.importXLS()
tests.import.importXLSXNoNameFile()
tests.import.importXLSXPartly()

//Фильтр Поиск
tests.filterSearch()

// Тесты сортировки по столбцам
tests.sort()

// Тесты проверки отображений записей и перехода по страницам
tests.footer()







