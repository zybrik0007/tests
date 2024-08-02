const entry = require('../../../../entry');
const tests = require('../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../ui/src/decorates/other/clearMemory');

// Персонал / Сотрудники
if (true) {
    // Добавление данных для тестов
    tests.staffUI.other.addDataStaff();

    // Тесты
    tests.staffUI.test.addStaffMinParams();
    tests.staffUI.test.addStaffTabelDuplicateMinParams();
    tests.staffUI.test.addCardStaffMinParams();
    tests.staffUI.test.addCardDuplicateStaffMinParams();
    tests.staffUI.test.deleteCardStaffMinParams();
    tests.staffUI.test.blockCardStaffMinParams();
    tests.staffUI.test.unblockCardStaffMinParams();
    tests.staffUI.test.addBarcodeStaffMinParams();
    tests.staffUI.test.addBarcodeDuplicateStaffMinParams();
    tests.staffUI.test.deleteBarcodeStaffMinParams();
    tests.staffUI.test.dimissedRestoreStaffMinParams();
    tests.staffUI.test.dimissedStaff();
    tests.staffUI.test.deleteStaff();
    tests.staffUI.test.addStaffMaxParams();
    tests.staffUI.test.printCardStaffMaxParams();
    tests.staffUI.test.printDesignCardStaffMaxParams();
    tests.staffUI.test.printBarcodeStaffMaxParams();
    tests.staffUI.test.printTableStaffMaxParams();
    tests.staffUI.test.exportStaffXLSXMaxParams();
    tests.staffUI.test.exportStaffCSVMaxParams();
    tests.staffUI.test.dimissedStaffMaxParams();
    tests.staffUI.test.openDimissedStaffMaxParams();
    tests.staffUI.test.printCardStaffDimissedMaxParams();
    tests.staffUI.test.printTableStaffDimissedMaxParams();
    tests.staffUI.test.exportTableStaffDimissedXLSXMaxParams();
    tests.staffUI.test.exportTableStaffDimissedCSVMaxParams();
    tests.staffUI.test.restoreStaffDimissedEditParamsMaxParams();
    tests.staffUI.test.editStaffMaxParams();
    tests.staffUI.test.dimissedStaff();
    tests.staffUI.test.deleteStaff();

    // Добавление данных для тестирования фильтров
    tests.staffUI.other.addDataStaffFilter();

    // Тесы фильтров
    tests.staffUI.test.searchFilterStaffActive();
    tests.staffUI.test.divisionFilterStaffActive();
    tests.staffUI.test.cardSearchStaffActive();

    // Удаление данных для тестирования фильтров
    tests.staffUI.other.deleteDataStaffFilter();

    // Тесты импорта
    tests.staffUI.test.importMinParamsActive();
    tests.staffUI.test.importMaxParamsActive();
    tests.staffUI.test.importFailedParamsActive();

    // Удаление данных для тестов
    tests.staffUI.other.deleteDataStaff();
}
//--------------------------------------------------------------------------------------------------------------------//


// Персонал / Графики работы
if (true) {
    // Добавление данных для тестов
    tests.scheduleUI.other.addDataSchedule();

    // Тесты
    tests.scheduleUI.test.editWeek();
    tests.scheduleUI.test.editWeekInvalidParams();
    tests.scheduleUI.test.addWeekNoParams();
    tests.scheduleUI.test.copyWeek();
    tests.scheduleUI.test.deleteSchedule();
    tests.scheduleUI.test.deleteSchedule();
    tests.scheduleUI.test.noStr();

    tests.scheduleUI.test.editShift();
    tests.scheduleUI.test.editShiftInvalidParams();
    tests.scheduleUI.test.addShiftNoParams();
    tests.scheduleUI.test.copyShift();
    tests.scheduleUI.test.deleteSchedule();
    tests.scheduleUI.test.deleteSchedule();
    tests.scheduleUI.test.noStr();

    tests.scheduleUI.test.addAttendance();
    tests.scheduleUI.test.editAttendance();
    tests.scheduleUI.test.copyAttendance();
    tests.scheduleUI.test.addDuplicateAttendance();
    tests.scheduleUI.test.deleteSchedule();
    tests.scheduleUI.test.deleteSchedule();
    tests.scheduleUI.test.noStr();

    tests.scheduleUI.test.editViolation();
    tests.scheduleUI.test.editViolationInvalidParams();
    tests.scheduleUI.test.addViolationNoParams();
    tests.scheduleUI.test.copyViolation();
    tests.scheduleUI.test.deleteSchedule();
    tests.scheduleUI.test.deleteSchedule();
    tests.scheduleUI.test.noStr();

    tests.scheduleUI.test.addBalance();
    tests.scheduleUI.test.editBalance();
    tests.scheduleUI.test.copyBalance();
    tests.scheduleUI.test.deleteSchedule();
    tests.scheduleUI.test.deleteSchedule();

    // Добавление данных для проверки фильтра поиска
    tests.scheduleUI.other.addSearchFilterData();
    // Тесты поиска
    tests.scheduleUI.test.searchFilter();
    // Удаление данных для проверки фильтра поиска
    tests.scheduleUI.other.deleteSearchFilterData();

    // Добавление данных для проверки удаления используемого графика работы
    tests.scheduleUI.other.addStaffData();
    // Тесты удаления
    tests.scheduleUI.test.deleteStaffSchedule();
    // Удаление данных для проверки удаления используемого графика работы
    tests.scheduleUI.other.deleteStaffData();

    // Удаление данных для тестов
    tests.scheduleUI.other.deleteDataSchedule();
}
//--------------------------------------------------------------------------------------------------------------------//


// Персонал / Подразделения
if (true) {
    // Добавление данных для тестов
    tests.divisionUI.other.addDataDivision();

    // Тесты
    tests.divisionUI.test.add();
    tests.divisionUI.test.edit();
    tests.divisionUI.test.print();
    tests.divisionUI.test.printTree();
    tests.divisionUI.test.exportXLSX();
    tests.divisionUI.test.exportCSV();
    tests.divisionUI.test.searchFilter();
    tests.divisionUI.test.addDuplicate();
    tests.divisionUI.test.deletedFailedHead();

    // Добавление данных для тестирования удаления используемого подразделения
    tests.divisionUI.other.addDataStaffDivision();
    // Тесты удаления
    tests.divisionUI.test.deletedFailedStaff();
    // Удаление данных для тестирования удаления используемого подразделения
    tests.divisionUI.other.deleteDataStaffDivision();

    // Тесты импорта
    tests.divisionUI.test.importFile();
    tests.divisionUI.test.importFailed();

    // Тесты удаления
    tests.divisionUI.test.deleted();

    // Удаление данных для тестов
    tests.divisionUI.other.deleteDataDivision();
}
//--------------------------------------------------------------------------------------------------------------------//


// Персонал / Должности
if (true) {
    // Тесты
    tests.positionUI.test.add();
    tests.positionUI.test.addDuplicate();
    tests.positionUI.test.edit();
    tests.positionUI.test.printTable();
    tests.positionUI.test.exportXLSX();
    tests.positionUI.test.exportCSV();
    tests.positionUI.test.importFile();
    tests.positionUI.test.search();
    tests.positionUI.test.importFailed();

    // Добавление данных для тестирования удаления используемой должности
    tests.positionUI.other.addDataStaffPosition();
    // Тесты удаления
    tests.positionUI.test.deletedStaff();
    // Удаление данных для тестирования удаления используемой должности
    tests.positionUI.other.deleteDataStaffPosition();

    // Тесты удаления
    tests.positionUI.test.deleted();
}
//--------------------------------------------------------------------------------------------------------------------//


// Персонал / Праздничные дни
if (true) {
    // Тесты
    tests.holidayUI.test.addHoliday();
    tests.holidayUI.test.addPreHoliday();
    tests.holidayUI.test.addMark();
    tests.holidayUI.test.addWork();
    tests.holidayUI.test.yearFilter();
    tests.holidayUI.test.reset();
    tests.holidayUI.test.addCalendar();
    tests.holidayUI.test.reset();
}
//--------------------------------------------------------------------------------------------------------------------//


// Персонал / Дополнительные данные
if (true) {
    // Персонал / Дополнительные данные - вкладка Сотрудник

    // Тесты
    tests.additionalDataUI.testStaff.add();
    tests.additionalDataUI.testStaff.edit();
    tests.additionalDataUI.testStaff.deleted();

    // Персонал / Дополнительные данные - вкладка Посетители

    // Тесты
    tests.additionalDataUI.testVisitor.add();
    tests.additionalDataUI.testVisitor.edit();
    tests.additionalDataUI.testVisitor.deleted();
}
//--------------------------------------------------------------------------------------------------------------------//


// Закрытие браузера и соединения с БД
closeBrowser();