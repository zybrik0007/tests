const tests = require('../../../ui/src/handlers/module-specs');
const closeBrowser = require('../../../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../../../ui/src/handlers/other/clearMemory');
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
tests.visitorUi.otherVisitorOrder.exportXLSXVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.exportCSVVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.currentVisitorMaxParamsFromOrder();
tests.visitorUi.otherVisitorOrder.archiveVisitorMaxParamsFromOrder();
tests.visitorUi.otherVisitorOrder.addBarcodeVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.addBarcodeDuplicateVisitor();
tests.visitorUi.otherVisitorOrder.addCardVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.addCardDuplicateVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.editVisitorMaxParams();
tests.visitorUi.otherVisitorOrder.toArchiveVisitor();

// Бюро пропусков / Посетители - вкладка - Архив
tests.visitorUi.otherVisitorArchive.deleteVisitor();
clearMemory();

// Бюро пропусков / Посетители - вкладка - Действующие
tests.visitorUi.otherVisitorActive.addVisitorMaxParams();
tests.visitorUi.otherVisitorActive.printTableVisitorMaxParams();
tests.visitorUi.otherVisitorActive.printBarcodeVisitorMaxParams();
tests.visitorUi.otherVisitorActive.printDesignCardVisitorMaxParams();
tests.visitorUi.otherVisitorActive.exportXLSXVisitorMaxParams();
tests.visitorUi.otherVisitorActive.exportCSVVisitorMaxParams();
tests.visitorUi.otherVisitorActive.blockCardVisitorMaxParams();
tests.visitorUi.otherVisitorActive.unblockCardVisitorMaxParams();
tests.visitorUi.otherVisitorActive.archiveVisitorMaxParamsFromActive();

// Бюро пропусков / Посетители - вкладка - Архив
tests.visitorUi.otherVisitorArchive.printTableVisitorMaxParams();
tests.visitorUi.otherVisitorArchive.exportXLSXVisitorMaxParams();
tests.visitorUi.otherVisitorArchive.exportCSVVisitorMaxParams();
tests.visitorUi.otherVisitorArchive.returnVisitorMaxParamsToActive();
clearMemory();

// Бюро пропусков / Посетители - вкладка - Действующие
tests.visitorUi.otherVisitorActive.addBarcodeVisitorMaxParams();
tests.visitorUi.otherVisitorActive.editVisitorMaxParams();
tests.visitorUi.otherVisitorActive.toArchiveVisitor();

// Бюро пропусков / Посетители - вкладка - Архив
tests.visitorUi.otherVisitorArchive.deleteVisitor();

// Бюро пропусков / Посетители - вкладка - Заказанные
tests.visitorUi.otherVisitorOrder.importMinParams();
tests.visitorUi.otherVisitorOrder.importMaxParams();
tests.visitorUi.otherVisitorOrder.importFailed();
clearMemory();

// Бюро пропусков / Посетители - вкладка - Действующие
tests.visitorUi.otherVisitorActive.importMinParams();
tests.visitorUi.otherVisitorActive.importMaxParams();
tests.visitorUi.otherVisitorActive.importFailed();

// Бюро пропусков / Посетители - вкладка - Заказанные
tests.visitorUi.otherVisitorOrder.addDataVisitorFilter();
tests.visitorUi.otherVisitorOrder.divisionFilterVisitor();
tests.visitorUi.otherVisitorOrder.searchFilterVisitorActive();
tests.visitorUi.otherVisitorOrder.deleteDataVisitorFilter();

// Бюро пропусков / Посетители - вкладка - Действующие
tests.visitorUi.otherVisitorActive.addDataVisitorFilter();
tests.visitorUi.otherVisitorActive.divisionFilterVisitor();
tests.visitorUi.otherVisitorActive.searchFilterVisitorActive();
tests.visitorUi.otherVisitorActive.deleteDataVisitorFilter();
data.deleteDataVisitor();
clearMemory();


// Бюро пропусков / Сотрудники
data.addDataStaff();
tests.staffUi.otherPass.addStaffMinParams();
tests.staffUi.otherPass.addCardStaffMinParams();
tests.staffUi.otherPass.deleteCardStaffMinParams();
tests.staffUi.otherPass.blockCardStaffMinParams();
tests.staffUi.otherPass.unblockCardStaffMinParams();
tests.staffUi.otherPass.addBarcodeStaffMinParams();
tests.staffUi.otherPass.deleteBarcodeStaffMinParams();
tests.staffUi.otherPass.editStaffMaxParams();
tests.staffUi.otherPass.printTableStaffMaxParams();
tests.staffUi.otherPass.printBarcodeStaffMaxParams();
tests.staffUi.otherPass.printDesignCardStaffMaxParams();
tests.staffUi.otherPass.dimissedRestoreStaffMinParams();
tests.staffUi.otherPass.exportStaffXLSXMaxParams();
tests.staffUi.otherPass.exportStaffCSVMaxParams();
tests.staffUi.other.dimissedStaff();
tests.staffUi.other.deleteStaff();
clearMemory();

data.addDataStaffFilter();
tests.staffUi.otherPass.searchFilterStaffActive();
tests.staffUi.otherPass.divisionFilterStaffActive();
tests.staffUi.otherPass.cardSearchStaffActive();
data.deleteDataStaffFilter();
data.deleteDataStaff();
clearMemory();


// Бюро пропусков / Шаблоны доступа
data.addDataTemplate()
tests.templateUi.otherZone.edit();
tests.templateUi.otherWeek.add();
tests.templateUi.otherWeek.edit();
tests.templateUi.otherSlideTZ.add();
tests.templateUi.otherSlideTZ.edit();
tests.templateUi.otherSlideW.add();
tests.templateUi.otherSlideW.edit();
tests.templateUi.otherWeek.searchFilter();
tests.templateUi.other.searchType();
clearMemory();
tests.templateUi.otherZone.deletedFailedAccess();
tests.templateUi.otherWeek.deletedFailedAccess();
tests.templateUi.otherTemplate.add();
tests.templateUi.other.addDuplicate();
tests.templateUi.otherSlideTZ.deleteFailedTemplate();
tests.templateUi.otherSlideW.deleteFailedTemplate();
tests.templateUi.otherTemplate.edit();
tests.templateUi.otherSlideTZ.deleted();
tests.templateUi.otherSlideW.deleted();
tests.templateUi.otherWeek.deleteFailedTemplate();
clearMemory();
tests.templateUi.otherTemplate.copy();
tests.templateUi.otherTemplate.searchFilter();
data.addDataStaffTemplate();
tests.templateUi.otherTemplate.deleteFailedTemplate();
data.deleteDataStaffTemplate();
tests.templateUi.otherTemplate.deleted();
tests.templateUi.otherWeek.deleted();
tests.templateUi.otherZone.deleted();
tests.templateUi.other.deleteServiceFailed();
tests.templateUi.other.editServiceFailed();
tests.templateUi.other.holiday();
tests.templateUi.otherZone.addFailed();
tests.templateUi.otherWeek.addFailed();
clearMemory();
tests.templateUi.otherSlideTZ.addFailed();
tests.templateUi.otherSlideW.addFailed();
tests.templateUi.otherTemplate.addFailed();
tests.templateUi.otherCommission.commission();
data.deleteDataTemplate();


// Бюро пропусков / Дизайн пропуска
data.addDataDesign();
tests.designUi.otherStaff.add();
tests.designUi.otherVisitor.add();
tests.designUi.otherStaff.edit();
tests.designUi.otherVisitor.edit();
tests.designUi.otherStaff.copy();
tests.designUi.otherVisitor.copy();
tests.designUi.other.typeFilter();
tests.designUi.other.deleted();
data.deleteDataDesign();


closeBrowser();
