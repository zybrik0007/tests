const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. УРВ / Журнал отработанного времени.

// Добавление данных для тестов
tests.workedJournalUI.other.addURV();

// Тесты
tests.workedJournalUI.test.calculateСurrentWorkedJournal();
tests.workedJournalUI.test.calculationDateWorkedJournal();
tests.workedJournalUI.test.checkCalculationWorkedJournal();
tests.workedJournalUI.test.printTableWorkedJournal();
tests.workedJournalUI.test.exportWorkedJournalXLSX();
tests.workedJournalUI.test.exportWorkedJournalCSV();
tests.workedJournalUI.test.documentCalculationWorkedJournal();
tests.workedJournalUI.test.deleteCompositeDocumentWorkedJournal();
tests.workedJournalUI.test.staffDeptWorkedJournal();
tests.workedJournalUI.test.divisionFilterWorkedJournal();
tests.workedJournalUI.test.searchFilterWorkedJournal();
tests.workedJournalUI.test.resetFilter();

// Удаление данных для тестов
tests.workedJournalUI.other.deleteURV();

// Закрытие браузера и соединения с БД
closeBrowser();