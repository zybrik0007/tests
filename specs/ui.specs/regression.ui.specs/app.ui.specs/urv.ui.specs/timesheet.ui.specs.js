const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. УРВ / Формирование табеля.

// Добавление данных для тестов
tests.timesheetUI.other.addURV();
tests.timesheetUI.other.addURVDocument();

// Выполнение расчетов для тестов
tests.workedJournalUI.test.calculateСurrentWorkedJournal();
tests.workedJournalUI.test.calculationDateWorkedJournal();

//Тесты
tests.timesheetUI.test.checkTimesheet();
tests.timesheetUI.test.showMinuteTimesheet();
tests.timesheetUI.test.downloadXLSXTimesheet();
tests.timesheetUI.test.filterDivisionTimesheet();
tests.timesheetUI.test.filterDateTimesheet();

// Удаление данных для тестов
tests.timesheetUI.other.deleteURV();

// Закрытие браузера и соединения с БД
closeBrowser();