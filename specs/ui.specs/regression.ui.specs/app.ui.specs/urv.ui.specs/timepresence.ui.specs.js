const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. УРВ / Время присуствия.

// Добавление данных для тестов
tests.timePresenceUI.other.addURV();

// Выполнение расчетов для тестов
tests.workedJournalUI.test.calculateСurrentWorkedJournal();
tests.workedJournalUI.test.calculationDateWorkedJournal();

// Тесты
tests.timePresenceUI.test.checkTable();
tests.timePresenceUI.test.printTable();
tests.timePresenceUI.test.exportXLSX();
tests.timePresenceUI.test.exportCSV();
tests.timePresenceUI.test.divisionFilter();
tests.timePresenceUI.test.searchFilter();
tests.timePresenceUI.testr.resetFilter();

// Удаление данных для тестов
tests.timePresenceUI.other.deleteURV();

// Закрытие браузера и соединения с БД
closeBrowser();