const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Бюро пропусков / Шаблона доступа

// Добавление данных для тестов
tests.templateUI.other.addDataTemplate();

// Тесты
tests.templateUI.testZone.edit();
tests.templateUI.testWeek.add();
tests.templateUI.testWeek.edit();
tests.templateUI.testSlideTZ.add();
tests.templateUI.testSlideTZ.edit();
tests.templateUI.testSlideW.add();
tests.templateUI.testSlideW.edit();
tests.templateUI.testWeek.searchFilter();
tests.templateUI.test.searchType();
tests.templateUI.testZone.deletedFailedAccess();
tests.templateUI.testWeek.deletedFailedAccess();
tests.templateUI.testTemplate.add();
tests.templateUI.test.addDuplicate();
tests.templateUI.testSlideTZ.deleteFailedTemplate();
tests.templateUI.testSlideW.deleteFailedTemplate();
tests.templateUI.testTemplate.edit();
tests.templateUI.testSlideTZ.deleted();
tests.templateUI.testSlideW.deleted();
tests.templateUI.testWeek.deleteFailedTemplate();
tests.templateUI.testTemplate.copy();
tests.templateUI.testTemplate.searchFilter();

// Добавление данных для тестирования удаления используемого шаблона
tests.templateUI.other.addDataStaffTemplate();
// Тесты
tests.templateUI.testTemplate.deleteFailedTemplate();
// Удаление данных для тестирования удаления используемого шаблона
tests.templateUI.other.deleteDataStaffTemplate();

// Тесты
tests.templateUI.testTemplate.deleted();
tests.templateUI.testWeek.deleted();
tests.templateUI.testZone.deleted();
tests.templateUI.test.deleteServiceFailed();
tests.templateUI.test.editServiceFailed();
tests.templateUI.test.holiday();
tests.templateUI.testZone.addFailed();
tests.templateUI.testWeek.addFailed();
tests.templateUI.testSlideTZ.addFailed();
tests.templateUI.testSlideW.addFailed();
tests.templateUI.testTemplate.addFailed();
tests.templateUI.testCommission.commission();

// Удаление данных для тестов
tests.templateUI.other.deleteDataTemplate();

// Закрытие браузера и соединения с БД
closeBrowser();