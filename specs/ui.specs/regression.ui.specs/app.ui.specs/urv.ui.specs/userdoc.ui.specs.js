const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. УРВ / Выданные документы.

// Добавление данных для тестов
tests.userdocUI.other.addURV();
tests.userdocUI.other.addURVDocument();

// Выполнение расчетов для тестов
tests.workedJournalUI.test.calculateСurrentWorkedJournal();
tests.workedJournalUI.test.calculationDateWorkedJournal();

// УРВ / Выданные документы вкладка Оправдательные
tests.userdocUI.testSupport.testSupport.checkTable();
tests.userdocUI.testSupport.testSupport.printTable();
tests.userdocUI.testSupport.testSupport.exportXLSX();
tests.userdocUI.testSupport.testSupport.exportCSV();
tests.userdocUI.testSupport.testSupport.divisionFilter();
tests.userdocUI.testSupport.testSupport.searchFilter();
tests.userdocUI.testSupport.testSupport.resetFilter();

// УРВ / Выданные документы вкладка Сверхурочные
tests.userdocUI.testSupport.testPaid.checkTable();
tests.userdocUI.testSupport.testPaid.printTable();
tests.userdocUI.testSupport.testPaid.exportXLSX();
tests.userdocUI.testSupport.testPaid.exportCSV();
tests.userdocUI.testSupport.testPaid.divisionFilter();
tests.userdocUI.testSupport.testPaid.searchFilter();
tests.userdocUI.testSupport.testPaid.resetFilter();

// Удаление данных для тестов
tests.userdocUI.other.deleteURV();

// Закрытие браузера и соединения с БД
closeBrowser();