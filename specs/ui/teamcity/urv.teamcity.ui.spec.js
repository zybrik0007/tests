const tests = require('../../../ui/src/handlers/module-specs');
const closeBrowser = require('../../../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../../../ui/src/handlers/other/clearMemory');
const data = require('../../../ui/src/handlers/module-specs/data');
console.log = () => function () {};

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
data.deleteURVDocument();
clearMemory();

// УРВ / Формирование табеля
data.addURVDocument();
tests.workedJournalUi.other.calculationDateWorkedJournal();
tests.timesheetUi.other.checkTimesheet();
tests.timesheetUi.other.showMinuteTimesheet();
tests.timesheetUi.other.downloadXLSXTimesheet();
tests.timesheetUi.other.filterDivisionTimesheet();
tests.timesheetUi.other.filterDateTimesheet();
data.deleteURVDocument();
clearMemory();

// УРВ / Отчёт УРВ
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
data.deleteURVDocument();
data.deleteURV();
clearMemory();
closeBrowser();