const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Бюро пропусков / Дизайн пропуска

// Добавление данных для тестов
tests.designUI.other.addDataDesign();

// Тесты
tests.designUI.testStaff.add();
tests.designUI.testVisitor.add();
tests.designUI.testStaff.edit();
tests.designUI.testVisitor.edit();
tests.designUI.testStaff.copy();
tests.designUI.testVisitor.copy();
tests.designUI.test.typeFilter();
tests.designUI.test.deleted();

// Удаление данных для тестов
tests.designUI.other.deleteDataDesign();

// Закрытие браузера и соединения с БД
closeBrowser();