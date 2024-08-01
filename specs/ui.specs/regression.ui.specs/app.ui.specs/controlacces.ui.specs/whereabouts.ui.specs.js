const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Контроль доступа / Местонахождение

// Добавление данных для тестов
tests.whereAboutsUI.other.addDataControlAccess();

// Тесты

// Котроль доступа / Местонахождение / вкладка Все
tests.whereAboutsUI.testAll().checkData();
tests.whereAboutsUI.testAll().filterDate();
tests.whereAboutsUI.testAll().filterDivision();
tests.whereAboutsUI.testAll().filterDivisionForm();
tests.whereAboutsUI.testAll().filterSearch();
tests.whereAboutsUI.testAll().printTable();
tests.whereAboutsUI.testAll().exportXLSX();
tests.whereAboutsUI.testAll().exportCSV();
tests.whereAboutsUI.testAll().updateData();

// Котроль доступа / Местонахождение / вкладка Сотрудники
tests.whereAboutsUI.testStaff().checkData();
tests.whereAboutsUI.testStaff().filterDate();
tests.whereAboutsUI.testStaff().filterDivision();
tests.whereAboutsUI.testStaff().filterDivisionForm();
tests.whereAboutsUI.testStaff().filterSearch();
tests.whereAboutsUI.testStaff().printTable();
tests.whereAboutsUI.testStaff().exportXLSX();
tests.whereAboutsUI.testStaff().exportCSV();
tests.whereAboutsUI.testStaff().updateData();

// Котроль доступа / Местонахождение / вкладка Посетители
tests.whereAboutsUI.testVisitor().checkData();
tests.whereAboutsUI.testVisitor().filterDate();
tests.whereAboutsUI.testVisitor().filterDivision();
tests.whereAboutsUI.testVisitor().filterDivisionForm();
tests.whereAboutsUI.testVisitor().filterSearch();
tests.whereAboutsUI.testVisitor().printTable();
tests.whereAboutsUI.testVisitor().exportXLSX();
tests.whereAboutsUI.testVisitor().exportCSV();
tests.whereAboutsUI.testVisitor().updateData();

// Удаление данных для тестов
tests.whereAboutsUI.other.deleteDataControlAccess();

// Закрытие браузера и соединения с БД
closeBrowser();