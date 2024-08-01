const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. УРВ / Отчет УРВ.

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

// Закрытие браузера и соединения с БД
closeBrowser();
