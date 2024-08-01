const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Администрирование / События системы

// Добавление данных для тестов
tests.configurationUI.testDevice.addDeviceIP();
tests.configurationUI.testDevice.activateDevice();

// Тесты
tests.eventUI.test.updateData();
tests.eventUI.test.filterDate();
tests.eventUI.test.exportXLSX();
tests.eventUI.test.exportCSV();
tests.eventUI.test.print();
tests.eventUI.test.filterSearch();
tests.eventUI.test.resetFilter();

// Удаление данных для тестов
tests.configurationUI.testDevice.deleteDevice();

// Закрытие браузера и соединения с БД
closeBrowser();