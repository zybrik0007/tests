const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Администрирование / Задания

// Добавление данных для тестов
tests.configurationUI.testDevice.addDeviceIP();
tests.configurationUI.testDevice.activateDevice();

// Тесты
tests.taskUI.test.addTask();
tests.taskUI.test.editTask();
tests.taskUI.test.editTaskUpdate();
tests.taskUI.test.searchFilter();
tests.taskUI.test.deleteTask();
tests.taskUI.test.addFailed();

// Удаление данных для тестов
tests.configurationUI.testDevice.deleteDevice();

// Закрытие браузера и соединения с БД
closeBrowser();