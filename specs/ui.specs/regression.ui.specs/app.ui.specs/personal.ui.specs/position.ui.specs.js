const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Персонал / Должности.

// Тесты
tests.positionUI.test.add();
tests.positionUI.test.addDuplicate();
tests.positionUI.test.edit();
tests.positionUI.test.printTable();
tests.positionUI.test.exportXLSX();
tests.positionUI.test.exportCSV();
tests.positionUI.test.importFile();
tests.positionUI.test.search();
tests.positionUI.test.importFailed();

// Добавление данных для тестирования удаления используемой должности
tests.positionUI.other.addDataStaffPosition();
// Тесты удаления
tests.positionUI.test.deletedStaff();
// Удаление данных для тестирования удаления используемой должности
tests.positionUI.other.deleteDataStaffPosition();

// Тесты удаления
tests.positionUI.test.deleted();

// Закрытие браузера и соединения с БД
closeBrowser();