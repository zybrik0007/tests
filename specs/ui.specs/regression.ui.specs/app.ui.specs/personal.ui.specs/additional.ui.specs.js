const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Персонал / Дополнительные данные

// Персонал / Дополнительные данные - вкладка Сотрудник

// Тесты
tests.additionalDataUI.testStaff.add();
tests.additionalDataUI.testStaff.edit();
tests.additionalDataUI.testStaff.deleted();

// Персонал / Дополнительные данные - вкладка Посетители

// Тесты
tests.additionalDataUI.testVisitor.add();
tests.additionalDataUI.testVisitor.edit();
tests.additionalDataUI.testVisitor.deleted();

// Закрытие браузера и соединения с БД
closeBrowser();