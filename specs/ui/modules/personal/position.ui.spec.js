const tests = require('../../../../ui/src/handlers/module-specs/specs/personal/position-ui');
const closeBrowser = require('../../../../ui/src/handlers/other/closeBrowser');

console.log = () => function () {};

// Отображение
JSON.parse(process.env.b001positionUiDisplay) ? tests.display() : '';

// Добавление
JSON.parse(process.env.b002positionUiAddMinParams) ? tests.add.addMinParams() : '';
JSON.parse(process.env.b003positionUiAddMaxParams) ? tests.add.addMaxParams() : '';
JSON.parse(process.env.b004positionUiAddNoParams) ? tests.add.addNoParams() : '';
JSON.parse(process.env.b005positionUiAddNoName) ? tests.add.addNoName() : '';
JSON.parse(process.env.b006positionUiAddDuplicate) ? tests.add.addDuplicate() : '';

// Редактирвоание
JSON.parse(process.env.b007positionUiEditMinParams) ? tests.edit.editMinParams() : '';
JSON.parse(process.env.b008positionUiEditMaxParams) ? tests.edit.editMaxParams() : '';
JSON.parse(process.env.b009positionUiEditAllParams) ? tests.edit.editAllParams() : '';
JSON.parse(process.env.b010positionUiEditDuplicate) ? tests.edit.editDuplicate() : '';
clearMemory();

// Удаление
JSON.parse(process.env.b011positionUiDeleteOne) ? tests.delete.deleteOne() : '';
JSON.parse(process.env.b012positionUiDeleteTwo) ? tests.delete.deleteTwo() : '';
JSON.parse(process.env.b012qpositionUiDeleteStaff) ? tests.delete.deleteStaff() : '';

// Печать
JSON.parse(process.env.b013positionUiPrint) ? tests.print() : '';

//Экспорт
JSON.parse(process.env.b014positionUiExportxlsxNoHeaderSystem) ? tests.export.xlsxNoHeaderSystem() : '';
JSON.parse(process.env.b015positionUiExportxlsxHeaderSystem) ? tests.export.xlsxHeaderSystem() : '';
JSON.parse(process.env.b016positionUiExportxlsxHeaderNameSystem) ? tests.export.xlsxHeaderNameSystem() : '';
JSON.parse(process.env.b017positionUiExportxlsxNoHeaderName) ? tests.export.xlsxNoHeaderName() : '';
JSON.parse(process.env.b018positionUiExportxlsxHeaderName) ? tests.export.xlsxHeaderName() : '';
JSON.parse(process.env.b019positionUiExportxlsxHeaderNameName) ? tests.export.xlsxHeaderNameName() : '';
JSON.parse(process.env.b020positionUiExportcsvSystem) ? tests.export.csvSystem() : '';
JSON.parse(process.env.b021positionUiExportcsvName) ? tests.export.csvName() : '';
clearMemory();

// Импорт
JSON.parse(process.env.b022positionUiImportXLSX) ? tests.import.importXLSX() : '';
JSON.parse(process.env.b023positionUiImportXLS) ? tests.import.importXLS() : '';
JSON.parse(process.env.b024positionUiImportXLSXNoNameFile) ? tests.import.importXLSXNoNameFile() : '';
JSON.parse(process.env.b025positionUiImportXLSXPartly) ? tests.import.importXLSXPartly() : '';

//Фильтр Поиск
JSON.parse(process.env.b026positionUiFilterSearch) ? tests.filterSearch() : '';

// Тесты сортировки по столбцам
JSON.parse(process.env.b027positionUiSort) ? tests.sort() : '';

// Тесты проверки отображений записей и перехода по страницам
JSON.parse(process.env.b028positionUiFooter) ? tests.footer() : '';
clearMemory();

closeBrowser();



