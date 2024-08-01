const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Бюро пропусков / Посетители

// Добавление данных для тестов
tests.visitorUI.other.addDataVisitor();

// Тесты

// Бюро пропусков / Посетители - вкладка - Заказанные
tests.visitorUI.testVisitorOrder.addVisitorMaxParams();
tests.visitorUI.testVisitorOrder.printTableVisitorMaxParams();
tests.visitorUI.testVisitorOrder.printBarcodeVisitorMaxParams();
tests.visitorUI.testVisitorOrder.printDesignCardVisitorMaxParams();
tests.visitorUI.testVisitorOrder.exportXLSXVisitorMaxParams();
tests.visitorUI.testVisitorOrder.exportCSVVisitorMaxParams();
clearMemory();
tests.visitorUI.testVisitorOrder.currentVisitorMaxParamsFromOrder();
tests.visitorUI.testVisitorOrder.archiveVisitorMaxParamsFromOrder();
tests.visitorUI.testVisitorOrder.addBarcodeVisitorMaxParams();
tests.visitorUI.testVisitorOrder.addBarcodeDuplicateVisitor();
tests.visitorUI.testVisitorOrder.addCardVisitorMaxParams();
tests.visitorUI.testVisitorOrder.addCardDuplicateVisitorMaxParams();
tests.visitorUI.testVisitorOrder.editVisitorMaxParams();
tests.visitorUI.testVisitorOrder.toArchiveVisitor();
clearMemory();
// Бюро пропусков / Посетители - вкладка - Архив
tests.visitorUI.testVisitorArchive.deleteVisitor();

// Бюро пропусков / Посетители - вкладка - Действующие
tests.visitorUI.testVisitorActive.addVisitorMaxParams();
tests.visitorUI.testVisitorActive.printTableVisitorMaxParams();
tests.visitorUI.testVisitorActive.printBarcodeVisitorMaxParams();
tests.visitorUI.testVisitorActive.printDesignCardVisitorMaxParams();
tests.visitorUI.testVisitorActive.exportXLSXVisitorMaxParams();
tests.visitorUI.testVisitorActive.exportCSVVisitorMaxParams();
tests.visitorUI.testVisitorActive.blockCardVisitorMaxParams();
tests.visitorUI.testVisitorActive.unblockCardVisitorMaxParams();
tests.visitorUI.testVisitorActive.archiveVisitorMaxParamsFromActive();
clearMemory();
// Бюро пропусков / Посетители - вкладка - Архив
tests.visitorUI.testVisitorArchive.printTableVisitorMaxParams();
tests.visitorUI.testVisitorArchive.exportXLSXVisitorMaxParams();
tests.visitorUI.testVisitorArchive.exportCSVVisitorMaxParams();
tests.visitorUI.testVisitorArchive.returnVisitorMaxParamsToActive();

// Бюро пропусков / Посетители - вкладка - Действующие
tests.visitorUI.testVisitorActive.addBarcodeVisitorMaxParams();
tests.visitorUI.testVisitorActive.editVisitorMaxParams();
tests.visitorUI.testVisitorActive.toArchiveVisitor();
clearMemory();
// Бюро пропусков / Посетители - вкладка - Архив
tests.visitorUI.testVisitorArchive.deleteVisitor();

// Бюро пропусков / Посетители - вкладка - Заказанные
tests.visitorUI.testVisitorOrder.importMinParams();
tests.visitorUI.testVisitorOrder.importMaxParams();
tests.visitorUI.testVisitorOrder.importFailed();

// Бюро пропусков / Посетители - вкладка - Действующие
tests.visitorUI.testVisitorActive.importMinParams();
tests.visitorUI.testVisitorActive.importMaxParams();
tests.visitorUI.testVisitorActive.importFailed();
clearMemory();
// Бюро пропусков / Посетители - вкладка - Заказанные

// Добавление данных для проверки фильтров
tests.visitorUI.testVisitorOrder.addDataVisitorFilter();
// Тесты
tests.visitorUI.testVisitorOrder.divisionFilterVisitor();
tests.visitorUI.testVisitorOrder.searchFilterVisitorActive();
// Удаление данных для проверки фильтров
tests.visitorUI.testVisitorOrder.deleteDataVisitorFilter();
clearMemory();
// Бюро пропусков / Посетители - вкладка - Действующие

// Добавление данных для проверки фильтров
tests.visitorUI.testVisitorActive.addDataVisitorFilter();
// Тесты
tests.visitorUI.testVisitorActive.divisionFilterVisitor();
tests.visitorUI.testVisitorActive.searchFilterVisitorActive();
// Удаление данных для проверки фильтров
tests.visitorUI.testVisitorActive.deleteDataVisitorFilter();

// Удаление данных для тестов
tests.visitorUI.other.deleteDataVisitor();

// Закрытие браузера и соединения с БД
closeBrowser();