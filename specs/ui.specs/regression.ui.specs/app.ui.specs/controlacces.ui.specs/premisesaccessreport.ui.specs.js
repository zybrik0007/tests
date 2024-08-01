const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Контроль доступа / Отчет по доступу в помещение

// Добавление данных для тестов
tests.premisesAccessReportUI.other.addDataControlAccess();

// Тесты

// Котроль доступа / Отчет по доступу в помещения / вкладка Все
tests.premisesAccessReportUI.testAll().checkData();
tests.premisesAccessReportUI.testAll().filterDivision();
tests.premisesAccessReportUI.testAll().filterDivisionForm();
tests.premisesAccessReportUI.testAll().filterSearch();
tests.premisesAccessReportUI.testAll().printTable();
tests.premisesAccessReportUI.testAll().exportXLSX();
tests.premisesAccessReportUI.testAll().exportCSV();

// Котроль доступа / Отчет по доступу в помещения / вкладка Сотрудники
tests.premisesAccessReportUI.testStaff().checkData();
tests.premisesAccessReportUI.testStaff().filterDivision();
tests.premisesAccessReportUI.testStaff().filterDivisionForm();
tests.premisesAccessReportUI.testStaff().filterSearch();
tests.premisesAccessReportUI.testStaff().printTable();
tests.premisesAccessReportUI.testStaff().exportXLSX();
tests.premisesAccessReportUI.testStaff().exportCSV();

// Котроль доступа / Отчет по доступу в помещения / вкладка Посетители
tests.premisesAccessReportUI.testVisitor().checkData();
tests.premisesAccessReportUI.testVisitor().filterDivision();
tests.premisesAccessReportUI.testVisitor().filterDivisionForm();
tests.premisesAccessReportUI.testVisitor().filterSearch();
tests.premisesAccessReportUI.testVisitor().printTable();
tests.premisesAccessReportUI.testVisitor().exportXLSX();
tests.premisesAccessReportUI.testVisitor().exportCSV();

// Удаление данных для тестов
tests.premisesAccessReportUI.other.deleteDataControlAccess();

// Закрытие браузера и соединения с БД
closeBrowser();