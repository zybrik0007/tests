const tests = require('../../../ui/src/handlers/module-specs');
const closeBrowser = require('../../../ui/src/handlers/other/closeBrowser');
const data = require('../../../ui/src/handlers/module-specs/data');
const decorate = require('../../../ui/src/decorates');
console.log = () => function () {};

// Бюро пропусков / Посетители
// Бюро пропусков / Посетители - вкладка - Заказанные
data.addDataVisitor();
tests.visitorUi.otherVisitorOrder.addVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.printTableVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.printBarcodeVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.printDesignCardVisitorMaxParams();
decorate.page.base.refresh();
tests.visitorUi.otherVisitorOrder.exportXLSXVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.exportCSVVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.currentVisitorMaxParamsFromOrder();
tests.visitorUi.otherVisitorOrder.archiveVisitorMaxParamsFromOrder();
tests.visitorUi.otherVisitorOrder.addBarcodeVisitorMaxParams();
decorate.page.base.refresh();
tests.visitorUi.otherVisitorOrder.addBarcodeDuplicateVisitor();
tests.visitorUi.otherVisitorOrder.addCardVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.addCardDuplicateVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.editVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.toArchiveVisitor();
decorate.page.base.refresh();

// Бюро пропусков / Посетители - вкладка - Архив
tests.visitorUi.otherVisitorArchive.deleteVisitor();

// Бюро пропусков / Посетители - вкладка - Действующие
tests.visitorUi.otherVisitorActive.addVisitorMaxParams();
tests.visitorUi.otherVisitorActive.printTableVisitorMaxParams();
tests.visitorUi.otherVisitorActive.printBarcodeVisitorMaxParams();
tests.visitorUi.otherVisitorActive.printDesignCardVisitorMaxParams();
decorate.page.base.refresh();
tests.visitorUi.otherVisitorActive.exportXLSXVisitorMaxParams();
tests.visitorUi.otherVisitorActive.exportCSVVisitorMaxParams();
tests.visitorUi.otherVisitorActive.blockCardVisitorMaxParams();
tests.visitorUi.otherVisitorActive.unblockCardVisitorMaxParams();
tests.visitorUi.otherVisitorActive.archiveVisitorMaxParamsFromActive();
decorate.page.base.refresh();

// Бюро пропусков / Посетители - вкладка - Архив
tests.visitorUi.otherVisitorArchive.printTableVisitorMaxParams();
tests.visitorUi.otherVisitorArchive.exportXLSXVisitorMaxParams();
tests.visitorUi.otherVisitorArchive.exportCSVVisitorMaxParams();
tests.visitorUi.otherVisitorArchive.returnVisitorMaxParamsToActive();
decorate.page.base.refresh();

// Бюро пропусков / Посетители - вкладка - Действующие
tests.visitorUi.otherVisitorActive.addBarcodeVisitorMaxParams();
tests.visitorUi.otherVisitorActive.editVisitorMaxParams();
tests.visitorUi.otherVisitorActive.toArchiveVisitor();

// Бюро пропусков / Посетители - вкладка - Архив
tests.visitorUi.otherVisitorArchive.deleteVisitor();

// Бюро пропусков / Посетители - вкладка - Заказанные
tests.visitorUi.otherVisitorOrder.importMinParams();
decorate.page.base.refresh();
tests.visitorUi.otherVisitorOrder.importMaxParams();
tests.visitorUi.otherVisitorOrder.importFailed();

// Бюро пропусков / Посетители - вкладка - Действующие
tests.visitorUi.otherVisitorActive.importMinParams();
tests.visitorUi.otherVisitorActive.importMaxParams();
tests.visitorUi.otherVisitorActive.importFailed();
decorate.page.base.refresh();

// Бюро пропусков / Посетители - вкладка - Заказанные
tests.visitorUi.otherVisitorOrder.addDataVisitorFilter();
tests.visitorUi.otherVisitorOrder.divisionFilterVisitor();
tests.visitorUi.otherVisitorOrder.searchFilterVisitorActive();
tests.visitorUi.otherVisitorOrder.deleteDataVisitorFilter();

// Бюро пропусков / Посетители - вкладка - Действующие
tests.visitorUi.otherVisitorActive.addDataVisitorFilter();
decorate.page.base.refresh();
tests.visitorUi.otherVisitorActive.divisionFilterVisitor();
tests.visitorUi.otherVisitorActive.searchFilterVisitorActive();
tests.visitorUi.otherVisitorActive.deleteDataVisitorFilter();
data.deleteDataVisitor();


// Бюро пропусков / Сотрудники
// Бюро пропусков / Сотрудники
data.addDataStaff();
decorate.page.base.refresh();
tests.staffUi.otherPass.addStaffMinParams();
tests.staffUi.otherPass.addCardStaffMinParams();
tests.staffUi.otherPass.deleteCardStaffMinParams();
tests.staffUi.otherPass.blockCardStaffMinParams();
tests.staffUi.otherPass.unblockCardStaffMinParams();
decorate.page.base.refresh();
tests.staffUi.otherPass.addBarcodeStaffMinParams();
tests.staffUi.otherPass.deleteBarcodeStaffMinParams();
tests.staffUi.otherPass.editStaffMaxParams();
tests.staffUi.otherPass.printTableStaffMaxParams();
tests.staffUi.otherPass.printBarcodeStaffMaxParams();
decorate.page.base.refresh();
tests.staffUi.otherPass.printDesignCardStaffMaxParams();
tests.staffUi.otherPass.dimissedRestoreStaffMinParams();
tests.staffUi.otherPass.exportStaffXLSXMaxParams();
tests.staffUi.otherPass.exportStaffCSVMaxParams();
tests.staffUi.other.dimissedStaff();
tests.staffUi.other.deleteStaff();
decorate.page.base.refresh();

data.addDataStaffFilter();
tests.staffUi.otherPass.searchFilterStaffActive();
tests.staffUi.otherPass.divisionFilterStaffActive();
tests.staffUi.otherPass.cardSearchStaffActive();
data.deleteDataStaffFilter();
decorate.page.base.refresh();

closeBrowser();
