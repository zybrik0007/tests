const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. УРВ / Отчеты по дисциплине.

// Добавление данных для тестов
tests.disciplineReportsUI.other.addURV();

// Выполнение расчетов для тестов
tests.workedJournalUI.test.calculateСurrentWorkedJournal();
tests.workedJournalUI.test.calculationDateWorkedJournal();

// Тесты

// УРВ / Отчеты по дисциплине - вкладка Нарушители
tests.disciplineReportsUI.testViolator.checkTable();
tests.disciplineReportsUI.testViolator.printTable();
tests.disciplineReportsUI.testViolator.exportXLSX();
tests.disciplineReportsUI.testViolator.exportCSV();
tests.disciplineReportsUI.testViolator.divisionFilter();
tests.disciplineReportsUI.testViolator.searchFilter();
tests.disciplineReportsUI.testViolator.resetFilter();

// УРВ / Отчеты по дисциплине - вкладка Присутствующие на данный момент
tests.disciplineReportsUI.testPresence.checkTable();
tests.disciplineReportsUI.testPresence.printTable();
tests.disciplineReportsUI.testPresence.exportXLSX();
tests.disciplineReportsUI.testPresence.exportCSV();
tests.disciplineReportsUI.testPresence.divisionFilter();
tests.disciplineReportsUI.testPresence.searchFilter();

// УРВ / Отчеты по дисциплине - вкладка Отсутствующие сегодня
tests.disciplineReportsUI.testAbsent.checkTable();
tests.disciplineReportsUI.testAbsent.printTable();
tests.disciplineReportsUI.testAbsent.exportXLSX();
tests.disciplineReportsUI.testAbsent.exportCSV();
tests.disciplineReportsUI.testAbsent.divisionFilter();
tests.disciplineReportsUI.testAbsent.searchFilter();

// УРВ / Отчеты по дисциплине - вкладка Опоздавшие сегодня
tests.disciplineReportsUI.testLate.checkTable();
tests.disciplineReportsUI.testLate.printTable();
tests.disciplineReportsUI.testLate.exportXLSX();
tests.disciplineReportsUI.testLate.exportCSV();
tests.disciplineReportsUI.testLate.divisionFilter();
tests.disciplineReportsUI.testLate.searchFilter();

// УРВ / Отчеты по дисциплине - вкладка Ушедшие раньше сегодня
tests.disciplineReportsUI.testEarly.checkTable();
tests.disciplineReportsUI.testEarly.printTable();
tests.disciplineReportsUI.testEarly.exportXLSX();
tests.disciplineReportsUI.testEarly.exportCSV();
tests.disciplineReportsUI.testEarly.divisionFilter();
tests.disciplineReportsUI.testEarly.searchFilter();

// УРВ / Отчеты по дисциплине - вкладка Переработка
tests.disciplineReportsUI.testOverwork.checkTable();
tests.disciplineReportsUI.testOverwork.printTable();
tests.disciplineReportsUI.testOverwork.exportXLSX();
tests.disciplineReportsUI.testOverwork.exportCSV();
tests.disciplineReportsUI.testOverwork.divisionFilter();
tests.disciplineReportsUI.testOverwork.searchFilter();
tests.disciplineReportsUI.testOverwork.resetFilter();

// Удаление данных для тестов
tests.disciplineReportsUI.other.deleteURV();

// Закрытие браузера и соединения с БД
closeBrowser();