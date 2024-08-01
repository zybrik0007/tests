const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Администрирование / Реакции на события

// Добавление данных для тестов
tests.configurationUI.testDevice.addDeviceIP();
tests.configurationUI.testDevice.activateDevice();

// Тесты
tests.eventactionUI.test.addEvent();
tests.eventactionUI.test.addDuplicate();
tests.eventactionUI.test.checkTurnOnEvent();
tests.eventactionUI.test.checkTurnOffEvent();
tests.eventactionUI.test.editEvent();
tests.eventactionUI.test.addEventDevice();
tests.eventactionUI.test.editEventDevice();
tests.eventactionUI.test.searchFilter();
tests.eventactionUI.test.deleteEvents();
tests.eventactionUI.test.addFailed();

// Удаление данных для тестов
tests.configurationUI.testDevice.deleteDevice();

// Закрытие браузера и соединения с БД
closeBrowser();