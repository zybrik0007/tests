const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');
// Регрессионные UI тесты. Персонал / Подразделения

// Добавление данных для тестов
tests.divisionUI.other.addDataDivision();

// Тесты
tests.divisionUI.test.add();
tests.divisionUI.test.edit();
tests.divisionUI.test.print();
tests.divisionUI.test.printTree();
tests.divisionUI.test.exportXLSX();
tests.divisionUI.test.exportCSV();
tests.divisionUI.test.searchFilter();
tests.divisionUI.test.addDuplicate();
tests.divisionUI.test.deletedFailedHead();

// Добавление данных для тестирования удаления используемого подразделения
tests.divisionUI.other.addDataStaffDivision();
// Тесты удаления
tests.divisionUI.test.deletedFailedStaff();
// Удаление данных для тестирования удаления используемого подразделения
tests.divisionUI.other.deleteDataStaffDivision();

// Тесты импорта
tests.divisionUI.test.importFile();
tests.divisionUI.test.importFailed();

// Тесты удаления
tests.divisionUI.test.deleted();

// Удаление данных для тестов
tests.divisionUI.other.deleteDataDivision();

// Закрытие браузера и соединения с БД
closeBrowser();