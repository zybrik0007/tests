const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Контроль доступа / Отчет о проходах

// Добавление данных для тестов
tests.premiseAccessUI.other.addDataControlAccess();

// Тесты

// Котроль доступа / Отчет о проходах / вкладка Все
tests.premiseAccessUI.testAll().checkData();
tests.premiseAccessUI.testAll().filterDate();
tests.premiseAccessUI.testAll().filterDivision();
tests.premiseAccessUI.testAll().filterDivisionForm();
tests.premiseAccessUI.testAll().filterRoom();
tests.premiseAccessUI.testAll().filterRoomForm();
tests.premiseAccessUI.testAll().filterSearch();
tests.premiseAccessUI.testAll().printTable();
tests.premiseAccessUI.testAll().exportXLSX();
tests.premiseAccessUI.testAll().exportCSV();

// Котроль доступа / Отчет о проходах / вкладка Сотрудники
tests.premiseAccessUI.testStaff().checkData();
tests.premiseAccessUI.testStaff().filterDate();
tests.premiseAccessUI.testStaff().filterDivision();
tests.premiseAccessUI.testStaff().filterDivisionForm();
tests.premiseAccessUI.testStaff().filterRoom();
tests.premiseAccessUI.testStaff().filterRoomForm();
tests.premiseAccessUI.testStaff().filterSearch();
tests.premiseAccessUI.testStaff().printTable();
tests.premiseAccessUI.testStaff().exportXLSX();
tests.premiseAccessUI.testStaff().exportCSV();

// Котроль доступа / Отчет о проходах / вкладка Посетители
tests.premiseAccessUI.testVisitor().checkData();
tests.premiseAccessUI.testVisitor().filterDate();
tests.premiseAccessUI.testVisitor().filterDivision();
tests.premiseAccessUI.testVisitor().filterDivisionForm();
tests.premiseAccessUI.testVisitor().filterRoom();
tests.premiseAccessUI.testVisitor().filterRoomForm();
tests.premiseAccessUI.testVisitor().filterSearch();
tests.premiseAccessUI.testVisitor().printTable();
tests.premiseAccessUI.testVisitor().exportXLSX();
tests.premiseAccessUI.testVisitor().exportCSV();

// Удаление данных для тестов
tests.premiseAccessUI.other.deleteDataControlAccess();

// Закрытие браузера и соединения с БД
closeBrowser();