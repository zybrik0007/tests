const tests = require('../../ui/src/handlers/module-specs');
const closeBrowser = require('../../ui/src/handlers/other/closeBrowser');
const data = require('../../ui/src/handlers/module-specs/data');
//console.log = () => function () {};

// Заказ пропуска / Заказ пропуска
// Заказ пропуска / Заказ пропуска / Заказ пропуска
data.addDataVisitor();
tests.visitorUi.otherVisitorPassOrder.addVisitorMaxParams();
tests.visitorUi.otherVisitorPassOrder.printTableVisitorMaxParams();
tests.visitorUi.otherVisitorPassOrder.exportXLSXVisitorMaxParams();
tests.visitorUi.otherVisitorPassOrder.exportCSVVisitorMaxParams();
tests.visitorUi.otherVisitorPassOrder.archiveVisitorMaxParamsFromOrder();
tests.visitorUi.otherVisitorPassOrder.toArchiveVisitor();

// Заказ пропуска / Заказ пропуска / Архив
tests.visitorUi.otherVisitorPassArchive.printTableVisitorMaxParams();
tests.visitorUi.otherVisitorPassArchive.exportXLSXVisitorMaxParams();
tests.visitorUi.otherVisitorPassArchive.exportCSVVisitorMaxParams();
tests.visitorUi.otherVisitorPassArchive.deleteVisitor();

// Заказ пропуска / Заказ пропуска / Заказ пропуска
tests.visitorUi.otherVisitorPassOrder.importMinParams();
tests.visitorUi.otherVisitorPassOrder.importMaxParams();
tests.visitorUi.otherVisitorPassOrder.importFailed();

// Заказ пропуска / Заказ пропуска / Заказ пропуска
tests.visitorUi.otherVisitorPassOrder.addDataVisitorFilter();
tests.visitorUi.otherVisitorPassOrder.divisionFilterVisitor();
tests.visitorUi.otherVisitorPassOrder.searchFilterVisitorActive();
tests.visitorUi.otherVisitorPassOrder.deleteDataVisitorFilter();
data.deleteDataVisitor();

closeBrowser();