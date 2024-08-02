const tests = require('../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Заказ пропуска / Заказ пропуска

// Добавление данных для тестов
tests.visitorUI.other.addDataVisitor();

// Заказ пропуска / Заказ пропуска - вкладка Заказ пропуска
tests.visitorUI.testVisitorPassOrder.addVisitorMaxParams();
tests.visitorUI.testVisitorPassOrder.printTableVisitorMaxParams();
tests.visitorUI.testVisitorPassOrder.exportXLSXVisitorMaxParams();
tests.visitorUI.testVisitorPassOrder.exportCSVVisitorMaxParams();
tests.visitorUI.testVisitorPassOrder.archiveVisitorMaxParamsFromOrder();
tests.visitorUI.testVisitorPassOrder.toArchiveVisitor();

// Заказ пропуска / Заказ пропуска - вкладка Архив
tests.visitorUI.testVisitorPassArchive.printTableVisitorMaxParams();
tests.visitorUI.testVisitorPassArchive.exportXLSXVisitorMaxParams();
tests.visitorUI.testVisitorPassArchive.exportCSVVisitorMaxParams();
tests.visitorUI.testVisitorPassArchive.deleteVisitor();

// Заказ пропуска / Заказ пропуска - вкладка Заказ пропуска
tests.visitorUI.testVisitorPassOrder.importMinParams();
tests.visitorUI.testVisitorPassOrder.importMaxParams();
tests.visitorUI.testVisitorPassOrder.importFailed();

// Заказ пропуска / Заказ пропуска - вкладка Заказ пропуска
tests.visitorUI.testVisitorPassOrder.addDataVisitorFilter();
tests.visitorUI.testVisitorPassOrder.divisionFilterVisitor();
tests.visitorUI.testVisitorPassOrder.searchFilterVisitorActive();
tests.visitorUI.testVisitorPassOrder.deleteDataVisitorFilter();

// Удаление данных для тестов
tests.visitorUI.other.deleteDataVisitor();

// Закрытие браузера и соединения с БД
closeBrowser();