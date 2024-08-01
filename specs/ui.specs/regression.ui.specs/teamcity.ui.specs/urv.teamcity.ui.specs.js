const tests = require('../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../ui/src/decorates/other/clearMemory');


// УРВ / Журнал отработанного времени
if (true) {
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
}
//--------------------------------------------------------------------------------------------------------------------//


// УРВ / Оправдательные документы
if (true) {
    // Тесты
    tests.documentUI.testJustification.addDocument();
    tests.documentUI.testJustification.editDocument();
    tests.documentUI.testJustification.deleteDocument();

    tests.documentUI.testOvertime.addDocument();
    tests.documentUI.testOvertime.editDocument();
    tests.documentUI.testOvertime.deleteDocument();

    tests.documentUI.testExplanatory.addDocument();
    tests.documentUI.testExplanatory.editDocument();
    tests.documentUI.testExplanatory.deleteDocument();
}
//--------------------------------------------------------------------------------------------------------------------//


// УРВ / Формирование табеля
if (true) {
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
}
//--------------------------------------------------------------------------------------------------------------------//


// УРВ / Отчеты по дисциплине
if (true) {
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
}
//--------------------------------------------------------------------------------------------------------------------//


// УРВ / Отчет УРВ
if (true) {
    // Добавление данных для тестов
    tests.reportsUI.other.addURV();
    tests.reportsUI.other.addURVDocument();

    // Тесты
    tests.reportsUI.test.calculationDateReports();
    tests.reportsUI.test.checkCalculationReports();
    tests.reportsUI.test.printReports();
    tests.reportsUI.test.exportReportsXLSX();
    tests.reportsUI.test.exportReportsCSV();
    tests.reportsUI.test.checkCalculationNoNullReports();
    tests.reportsUI.test.documentCalculateReports();
    tests.reportsUI.test.deleteDocumentReports();
    tests.reportsUI.test.staffDeptWorkedReports();
    tests.reportsUI.test.periodCalculationReports();
    tests.reportsUI.test.divisionFilterReports();
    tests.reportsUI.test.searchFilterReports();
    tests.reportsUI.test.resetFilter();

    // Удаление данных для тестов
    tests.reportsUI.other.deleteURV();
}
//--------------------------------------------------------------------------------------------------------------------//


// УРВ / Время присуствия
if (true) {
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
}
//--------------------------------------------------------------------------------------------------------------------//


// УРВ / Выданные документы
if (true) {
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
}
//--------------------------------------------------------------------------------------------------------------------//


// Закрытие браузера и соединения с БД
closeBrowser();