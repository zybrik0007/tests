const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Бюро пропусков / Отчет по посетителям

// Добавление данных для тестов
tests.visitorReportUI.other.addDataVisitorReport();

// Тесты
tests.visitorReportUI.test.checkData();
tests.visitorReportUI.test.filterDate();
tests.visitorReportUI.test.divisionFilter();
tests.visitorReportUI.test.filterSearch();
tests.visitorReportUI.test.printTable();
tests.visitorReportUI.test.exportXLSX();
tests.visitorReportUI.test.exportCSV();
tests.visitorReportUI.test.resetFilter();


// Удаление данных для тестов
tests.visitorReportUI.other.deleteDataVisitorReport();

// Закрытие браузера и соединения с БД
closeBrowser();