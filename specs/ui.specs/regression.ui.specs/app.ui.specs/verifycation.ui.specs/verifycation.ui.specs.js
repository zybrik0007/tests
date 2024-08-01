const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Верификация.

// Добавление данных для тестов
tests.verifyUI.other.addDataVerify();

// Тесты

// Верификация / Верификация
tests.verifyUI.testVerify.display();

// Верификация / Конфигурация верификации
tests.verifyUI.testConfig.addConfig();
tests.verifyUI.testConfig.editConfig();
tests.verifyUI.testConfig.addDuplicate();
tests.verifyUI.testConfig.addFailed();
tests.verifyUI.testConfig.searchFilter();
tests.verifyUI.testConfig.deleted();

// Удаление данных для тестов
tests.verifyUI.other.deleteDataVerify();

// Закрытие браузера и соединения с БД
closeBrowser();
