const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Контроль доступа / Выданные идентификаторы

// Добавление данных для тестов
tests.identifiersUI.other.addDataControlAccess();

// Тесты

// Котроль доступа / Выданные идентификаторы / вкладка Все
tests.identifiersUI.testAll().checkData();
tests.identifiersUI.testAll().filterDate();
tests.identifiersUI.testAll().filterDivision();
tests.identifiersUI.testAll().filterDivisionForm();
tests.identifiersUI.testAll().filterSearch();
tests.identifiersUI.testAll().printTable();
tests.identifiersUI.testAll().exportXLSX();
tests.identifiersUI.testAll().exportCSV();

// Котроль доступа / Выданные идентификаторы / вкладка Сотрудники
tests.identifiersUI.testStaff().checkData();
tests.identifiersUI.testStaff().filterDate();
tests.identifiersUI.testStaff().filterDivision();
tests.identifiersUI.testStaff().filterDivisionForm();
tests.identifiersUI.testStaff().filterSearch();
tests.identifiersUI.testStaff().printTable();
tests.identifiersUI.testStaff().exportXLSX();
tests.identifiersUI.testStaff().exportCSV();

// Котроль доступа / Выданные идентификаторы / вкладка Посетители
tests.identifiersUI.testVisitor().checkData();
tests.identifiersUI.testVisitor().filterDate();
tests.identifiersUI.testVisitor().filterDivision();
tests.identifiersUI.testVisitor().filterDivisionForm();
tests.identifiersUI.testVisitor().filterSearch();
tests.identifiersUI.testVisitor().printTable();
tests.identifiersUI.testVisitor().exportXLSX();
tests.identifiersUI.testVisitor().exportCSV();

// Котроль доступа / Выданные идентификаторы / вкладка Все
tests.identifiersUI.testAll().deleteIdentifier();

// Котроль доступа / Выданные идентификаторы / вкладка Сотрудники
tests.identifiersUI.testStaff().deleteIdentifier();

// Котроль доступа / Выданные идентификаторы / вкладка Посетители
tests.identifiersUI.testVisitor().deleteIdentifier();

// Удаление данных для тестов
tests.identifiersUI.other.deleteDataControlAccess();

// Закрытие браузера и соединения с БД
closeBrowser();