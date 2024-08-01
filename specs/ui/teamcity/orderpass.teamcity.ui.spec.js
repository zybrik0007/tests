const tests = require('../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../ui/src/decorates/other/clearMemory');
const data = require('../../../ui/src/tests/regression.ui.tests/data');
console.log = () => function () {};

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
clearMemory();

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
clearMemory();

closeBrowser();