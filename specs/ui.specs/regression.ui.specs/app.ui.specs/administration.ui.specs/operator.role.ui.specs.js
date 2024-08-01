const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Администрирование / Операторы, Администрирование / Роли и права Операторы

// Добавление данных для тестов
tests.operatorRoleUI.other.addDataRoleOperator();

// Тесты
tests.operatorRoleUI.testRole().add();
tests.operatorRoleUI.testOperator().add();
tests.operatorRoleUI.testRole().edit();
tests.operatorRoleUI.testOperator().edit();
tests.operatorRoleUI.testOperator().block();
tests.operatorRoleUI.testOperator().unblock();
tests.operatorRoleUI.testOperator().addFailed();
tests.operatorRoleUI.testRole().deleteFailed();
tests.operatorRoleUI.testRole().addDuplicate();
tests.operatorRoleUI.testOperator().addDuplicate();
tests.operatorRoleUI.testRole().copy();
tests.operatorRoleUI.testOperator().copy();
tests.operatorRoleUI.testRole().search();
tests.operatorRoleUI.testOperator().search();
tests.operatorRoleUI.testOperator().deleted();
tests.operatorRoleUI.testRole().deleted();

// Удаление данных для тестов
tests.operatorRoleUI.other.deleteDataRoleOperator();

// Закрытие браузера и соединения с БД
closeBrowser();