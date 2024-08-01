const tests = require('../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../ui/src/decorates/other/clearMemory');

// Бюро пропусков / Посетители
if (true) {
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
    tests.visitorUI.testVisitorOrder.currentVisitorMaxParamsFromOrder();
    tests.visitorUI.testVisitorOrder.archiveVisitorMaxParamsFromOrder();
    tests.visitorUI.testVisitorOrder.addBarcodeVisitorMaxParams();
    tests.visitorUI.testVisitorOrder.addBarcodeDuplicateVisitor();
    tests.visitorUI.testVisitorOrder.addCardVisitorMaxParams();
    tests.visitorUI.testVisitorOrder.addCardDuplicateVisitorMaxParams();
    tests.visitorUI.testVisitorOrder.editVisitorMaxParams();
    tests.visitorUI.testVisitorOrder.toArchiveVisitor();

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

    // Бюро пропусков / Посетители - вкладка - Архив
    tests.visitorUI.testVisitorArchive.printTableVisitorMaxParams();
    tests.visitorUI.testVisitorArchive.exportXLSXVisitorMaxParams();
    tests.visitorUI.testVisitorArchive.exportCSVVisitorMaxParams();
    tests.visitorUI.testVisitorArchive.returnVisitorMaxParamsToActive();

    // Бюро пропусков / Посетители - вкладка - Действующие
    tests.visitorUI.testVisitorActive.addBarcodeVisitorMaxParams();
    tests.visitorUI.testVisitorActive.editVisitorMaxParams();
    tests.visitorUI.testVisitorActive.toArchiveVisitor();

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

    // Бюро пропусков / Посетители - вкладка - Заказанные

    // Добавление данных для проверки фильтров
    tests.visitorUI.testVisitorOrder.addDataVisitorFilter();
    // Тесты
    tests.visitorUI.testVisitorOrder.divisionFilterVisitor();
    tests.visitorUI.testVisitorOrder.searchFilterVisitorActive();
    // Удаление данных для проверки фильтров
    tests.visitorUI.testVisitorOrder.deleteDataVisitorFilter();

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
}
//--------------------------------------------------------------------------------------------------------------------//


// Бюро пропусков / Сотрудники
if (true) {
    // Добавление данных для тестов
    tests.staffUI.other.addDataStaff();

    tests.staffUI.testPass.addStaffMinParams();
    tests.staffUI.testPass.addCardStaffMinParams();
    tests.staffUI.testPass.deleteCardStaffMinParams();
    tests.staffUI.testPass.blockCardStaffMinParams();
    tests.staffUI.testPass.unblockCardStaffMinParams();
    tests.staffUI.testPass.addBarcodeStaffMinParams();
    tests.staffUI.testPass.deleteBarcodeStaffMinParams();
    tests.staffUI.testPass.editStaffMaxParams();
    tests.staffUI.testPass.printTableStaffMaxParams();
    tests.staffUI.testPass.printBarcodeStaffMaxParams();
    tests.staffUI.testPass.printDesignCardStaffMaxParams();
    tests.staffUI.testPass.dimissedRestoreStaffMinParams();
    tests.staffUI.testPass.exportStaffXLSXMaxParams();
    tests.staffUI.testPass.exportStaffCSVMaxParams();
    tests.staffUI.test.dimissedStaff();
    tests.staffUI.test.deleteStaff();

    // Добавление данных для проверки фильтров поиск, подразделение, карта
    tests.staffUI.other.addDataStaffFilter();
    // Тесты
    tests.staffUI.testPass.searchFilterStaffActive();
    tests.staffUI.testPass.divisionFilterStaffActive();
    tests.staffUI.testPass.cardSearchStaffActive();
    // Удаление данных для проверки фильтров поиск, подразделение, карта
    tests.staffUI.other.deleteDataStaffFilter();

    // Удаление данных для тестов
    tests.staffUI.other.deleteDataStaff();
}
//--------------------------------------------------------------------------------------------------------------------//


// Бюро пропусков / Шаблоны доступа
if (true) {
    // Добавление данных для тестов
    tests.templateUI.other.addDataTemplate();

    // Тесты
    tests.templateUI.testZone.edit();
    tests.templateUI.testWeek.add();
    tests.templateUI.testWeek.edit();
    tests.templateUI.testSlideTZ.add();
    tests.templateUI.testSlideTZ.edit();
    tests.templateUI.testSlideW.add();
    tests.templateUI.testSlideW.edit();
    tests.templateUI.testWeek.searchFilter();
    tests.templateUI.test.searchType();
    tests.templateUI.testZone.deletedFailedAccess();
    tests.templateUI.testWeek.deletedFailedAccess();
    tests.templateUI.testTemplate.add();
    tests.templateUI.test.addDuplicate();
    tests.templateUI.testSlideTZ.deleteFailedTemplate();
    tests.templateUI.testSlideW.deleteFailedTemplate();
    tests.templateUI.testTemplate.edit();
    tests.templateUI.testSlideTZ.deleted();
    tests.templateUI.testSlideW.deleted();
    tests.templateUI.testWeek.deleteFailedTemplate();
    tests.templateUI.testTemplate.copy();
    tests.templateUI.testTemplate.searchFilter();

    // Добавление данных для тестирования удаления используемого шаблона
    tests.templateUI.other.addDataStaffTemplate();
    // Тесты
    tests.templateUI.testTemplate.deleteFailedTemplate();
    // Удаление данных для тестирования удаления используемого шаблона
    tests.templateUI.other.deleteDataStaffTemplate();

    // Тесты
    tests.templateUI.testTemplate.deleted();
    tests.templateUI.testWeek.deleted();
    tests.templateUI.testZone.deleted();
    tests.templateUI.test.deleteServiceFailed();
    tests.templateUI.test.editServiceFailed();
    tests.templateUI.test.holiday();
    tests.templateUI.testZone.addFailed();
    tests.templateUI.testWeek.addFailed();
    tests.templateUI.testSlideTZ.addFailed();
    tests.templateUI.testSlideW.addFailed();
    tests.templateUI.testTemplate.addFailed();
    tests.templateUI.testCommission.commission();

    // Удаление данных для тестов
    tests.templateUI.other.deleteDataTemplate();
}
//--------------------------------------------------------------------------------------------------------------------//


// Бюро пропусков / Дизайн пропуска
if (true) {
    // Добавление данных для тестов
    tests.designUI.other.addDataDesign();

    // Тесты
    tests.designUI.testStaff.add();
    tests.designUI.testVisitor.add();
    tests.designUI.testStaff.edit();
    tests.designUI.testVisitor.edit();
    tests.designUI.testStaff.copy();
    tests.designUI.testVisitor.copy();
    tests.designUI.test.typeFilter();
    tests.designUI.test.deleted();

    // Удаление данных для тестов
    tests.designUI.other.deleteDataDesign();
}
//--------------------------------------------------------------------------------------------------------------------//


// Бюро пропусков / Отчет по посетителя
if (true) {
    // Добавление данных для тестов
    tests.visitorReportUI.other.addDataVisitorReport();

    // Тесты
    tests.visitorReportUI.other.checkData();
    tests.visitorReportUI.test.filterDate();
    tests.visitorReportUI.test.divisionFilter();
    tests.visitorReportUI.test.filterSearch();
    tests.visitorReportUI.test.printTable();
    tests.visitorReportUI.test.exportXLSX();
    tests.visitorReportUI.test.exportCSV();
    tests.visitorReportUI.test.resetFilter();
    tests.visitorReportUI.other.deleteDataVisitorReport();

    // Удаление данных для тестов
    tests.visitorReportUI.other.addDataVisitorReport();
}
//--------------------------------------------------------------------------------------------------------------------//


// Закрытие браузера и соединения с БД
closeBrowser();