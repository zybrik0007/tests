const tests = require('../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../ui/src/decorates/other/closeBrowser');
const data = require('../../ui/src/tests/regression.ui.tests/data');
const clearMemory = require('../../ui/src/decorates/other/clearMemory');
//console.log = () => function () {};

// УРВ
data.addURV();

// УРВ / Журнал отрабоатнного времени
tests.workedJournalUi.other.calculateСurrentWorkedJournal();
tests.workedJournalUi.other.calculationDateWorkedJournal();
tests.workedJournalUi.other.checkCalculationWorkedJournal();
tests.workedJournalUi.other.printTableWorkedJournal();
tests.workedJournalUi.other.exportWorkedJournalXLSX();
tests.workedJournalUi.other.exportWorkedJournalCSV();
clearMemory();
tests.workedJournalUi.other.documentCalculationWorkedJournal();
tests.workedJournalUi.other.deleteCompositeDocumentWorkedJournal();
tests.workedJournalUi.other.staffDeptWorkedJournal();
tests.workedJournalUi.other.divisionFilterWorkedJournal();
tests.workedJournalUi.other.searchFilterWorkedJournal();
tests.workedJournalUi.other.resetFilter();
clearMemory();

// УРВ / Оправдательные документы
tests.documentUi.otherJustification.addDocument();
tests.documentUi.otherJustification.editDocument();
tests.documentUi.otherJustification.deleteDocument();

tests.documentUi.otherOvertime.addDocument();
tests.documentUi.otherOvertime.editDocument();
tests.documentUi.otherOvertime.deleteDocument();

tests.documentUi.otherExplanatory.addDocument();
tests.documentUi.otherExplanatory.editDocument();
tests.documentUi.otherExplanatory.deleteDocument();
clearMemory();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// УРВ / Формирование табеля
data.deleteURVDocument();
data.addURVDocument();
tests.workedJournalUi.other.calculationDateWorkedJournal();
tests.timesheetUi.other.checkTimesheet();
tests.timesheetUi.other.showMinuteTimesheet();
tests.timesheetUi.other.downloadXLSXTimesheet();
tests.timesheetUi.other.filterDivisionTimesheet();
tests.timesheetUi.other.filterDateTimesheet();
clearMemory();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// УРВ / Отчеты по дисциплине
data.deleteURVDocument();
tests.workedJournalUi.other.calculateСurrentWorkedJournal();
tests.workedJournalUi.other.calculationDateWorkedJournal();

//УРВ / Отчеты по дисциплине - вкладка Нарушители
tests.disciplineReportsUi.otherViolator.checkTable();
tests.disciplineReportsUi.otherViolator.printTable();
tests.disciplineReportsUi.otherViolator.exportXLSX();
tests.disciplineReportsUi.otherViolator.exportCSV();
tests.disciplineReportsUi.otherViolator.divisionFilter();
tests.disciplineReportsUi.otherViolator.searchFilter();
tests.disciplineReportsUi.otherViolator.resetFilter();
clearMemory();

//УРВ / Отчеты по дисциплине - вкладка Присутствующие на данный момент
tests.disciplineReportsUi.otherPresence.checkTable();
tests.disciplineReportsUi.otherPresence.printTable();
tests.disciplineReportsUi.otherPresence.exportXLSX();
tests.disciplineReportsUi.otherPresence.exportCSV();
tests.disciplineReportsUi.otherPresence.divisionFilter();
tests.disciplineReportsUi.otherPresence.searchFilter();

//УРВ / Отчеты по дисциплине - вкладка Отсутствующие сегодня
tests.disciplineReportsUi.otherAbsent.checkTable();
tests.disciplineReportsUi.otherAbsent.printTable();
tests.disciplineReportsUi.otherAbsent.exportXLSX();
tests.disciplineReportsUi.otherAbsent.exportCSV();
tests.disciplineReportsUi.otherAbsent.divisionFilter();
tests.disciplineReportsUi.otherAbsent.searchFilter();
clearMemory();

//УРВ / Отчеты по дисциплине - вкладка Опоздавшие сегодня
tests.disciplineReportsUi.otherLate.checkTable();
tests.disciplineReportsUi.otherLate.printTable();
tests.disciplineReportsUi.otherLate.exportXLSX();
tests.disciplineReportsUi.otherLate.exportCSV();
tests.disciplineReportsUi.otherLate.divisionFilter();
tests.disciplineReportsUi.otherLate.searchFilter();

//УРВ / Отчеты по дисциплине - вкладка Ушедшие раньше сегодня
tests.disciplineReportsUi.otherEarly.checkTable();
tests.disciplineReportsUi.otherEarly.printTable();
tests.disciplineReportsUi.otherEarly.exportXLSX();
tests.disciplineReportsUi.otherEarly.exportCSV();
tests.disciplineReportsUi.otherEarly.divisionFilter();
tests.disciplineReportsUi.otherEarly.searchFilter();
clearMemory();

//УРВ / Отчеты по дисциплине - вкладка Переработка
tests.disciplineReportsUi.otherOverwork.checkTable();
tests.disciplineReportsUi.otherOverwork.printTable();
tests.disciplineReportsUi.otherOverwork.exportXLSX();
tests.disciplineReportsUi.otherOverwork.exportCSV();
tests.disciplineReportsUi.otherOverwork.divisionFilter();
tests.disciplineReportsUi.otherOverwork.searchFilter();
tests.disciplineReportsUi.otherOverwork.resetFilter();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// УРВ / Отчёт УРВ
data.deleteURVDocument();
data.addURVDocument();
tests.reportsUi.other.calculationDateReports();
tests.reportsUi.other.checkCalculationReports();
tests.reportsUi.other.printReports();
tests.reportsUi.other.exportReportsXLSX();
tests.reportsUi.other.exportReportsCSV();
tests.reportsUi.other.checkCalculationNoNullReports();
tests.reportsUi.other.documentCalculateReports();
clearMemory();
tests.reportsUi.other.deleteDocumentReports();
tests.reportsUi.other.staffDeptWorkedReports();
tests.reportsUi.other.periodCalculationReports();
tests.reportsUi.other.divisionFilterReports();
tests.reportsUi.other.searchFilterReports();
tests.reportsUi.other.resetFilter();
clearMemory();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// УРВ / Время присутствия
data.deleteURVDocument();
tests.workedJournalUi.other.calculationDateWorkedJournal();
tests.timePresenceUi.other.checkTable();
tests.timePresenceUi.other.printTable();
tests.timePresenceUi.other.exportXLSX();
tests.timePresenceUi.other.exportCSV();
tests.timePresenceUi.other.divisionFilter();
tests.timePresenceUi.other.searchFilter();
tests.timePresenceUi.other.resetFilter();
clearMemory();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// УРВ / Выданные документы
data.deleteURVDocument();
data.addURVDocument();

// УРВ / Выданные документы вкладка Оправдательные
tests.supportingUi.otherSupport.checkTable();
tests.supportingUi.otherSupport.printTable();
tests.supportingUi.otherSupport.exportXLSX();
tests.supportingUi.otherSupport.exportCSV();
tests.supportingUi.otherSupport.divisionFilter();
tests.supportingUi.otherSupport.searchFilter();
tests.supportingUi.otherSupport.resetFilter();
clearMemory();

// УРВ / Выданные документы вкладка Сверхурочные
tests.supportingUi.otherPaid.checkTable();
tests.supportingUi.otherPaid.printTable();
tests.supportingUi.otherPaid.exportXLSX();
tests.supportingUi.otherPaid.exportCSV();
tests.supportingUi.otherPaid.divisionFilter();
tests.supportingUi.otherPaid.searchFilter();
tests.supportingUi.otherPaid.resetFilter();
clearMemory();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
data.deleteURVDocument();
data.deleteURV();
closeBrowser();