const tests = require('../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../ui/src/decorates/other/clearMemory');
const data = require('../../../ui/src/tests/regression.ui.tests/data');
console.log = () => function () {};

// Персонал / Сотрудники - вкладки: Действующие, Уволенные
data.addDataStaff();
tests.staffUi.other.addStaffMinParams();
tests.staffUi.other.addStaffTabelDuplicateMinParams();
tests.staffUi.other.addCardStaffMinParams();
tests.staffUi.other.addCardDuplicateStaffMinParams();
tests.staffUi.other.deleteCardStaffMinParams();
tests.staffUi.other.blockCardStaffMinParams();
tests.staffUi.other.unblockCardStaffMinParams();
tests.staffUi.other.addBarcodeStaffMinParams();
tests.staffUi.other.addBarcodeDuplicateStaffMinParams();
tests.staffUi.other.deleteBarcodeStaffMinParams();
tests.staffUi.other.dimissedRestoreStaffMinParams();
tests.staffUi.other.dimissedStaff();
tests.staffUi.other.deleteStaff();
clearMemory();

tests.staffUi.other.addStaffMaxParams();
tests.staffUi.other.printCardStaffMaxParams();
tests.staffUi.other.printDesignCardStaffMaxParams();
tests.staffUi.other.printBarcodeStaffMaxParams();
tests.staffUi.other.printTableStaffMaxParams();
tests.staffUi.other.exportStaffXLSXMaxParams();
tests.staffUi.other.exportStaffCSVMaxParams();
tests.staffUi.other.dimissedStaffMaxParams();
tests.staffUi.other.openDimissedStaffMaxParams();
tests.staffUi.other.printCardStaffDimissedMaxParams();
tests.staffUi.other.printTableStaffDimissedMaxParams();
tests.staffUi.other.exportTableStaffDimissedXLSXMaxParams();
tests.staffUi.other.exportTableStaffDimissedCSVMaxParams();
tests.staffUi.other.restoreStaffDimissedEditParamsMaxParams();
tests.staffUi.other.editStaffMaxParams();
tests.staffUi.other.dimissedStaff();
tests.staffUi.other.deleteStaff();
clearMemory();

data.addDataStaffFilter();
tests.staffUi.other.searchFilterStaffActive();
tests.staffUi.other.divisionFilterStaffActive();
tests.staffUi.other.cardSearchStaffActive();
data.deleteDataStaffFilter();

tests.staffUi.other.importMinParamsActive();
tests.staffUi.other.importMaxParamsActive();
tests.staffUi.other.importFailedParamsActive();
data.deleteDataStaff();
clearMemory();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Персонал / Графики работы
data.addDataSchedule();
tests.scheduleUi.otherSchedule.editWeek();
tests.scheduleUi.otherSchedule.editWeekInvalidParams();
tests.scheduleUi.otherSchedule.addWeekNoParams();
tests.scheduleUi.otherSchedule.copyWeek();
tests.scheduleUi.otherSchedule.deleteSchedule();
tests.scheduleUi.otherSchedule.deleteSchedule();
tests.scheduleUi.otherSchedule.noStr();

tests.scheduleUi.otherSchedule.editShift();
tests.scheduleUi.otherSchedule.editShiftInvalidParams();
tests.scheduleUi.otherSchedule.addShiftNoParams();
tests.scheduleUi.otherSchedule.copyShift();
tests.scheduleUi.otherSchedule.deleteSchedule();
tests.scheduleUi.otherSchedule.deleteSchedule();
tests.scheduleUi.otherSchedule.noStr();
clearMemory();

tests.scheduleUi.otherSchedule.addAttendance();
tests.scheduleUi.otherSchedule.editAttendance();
tests.scheduleUi.otherSchedule.copyAttendance();
tests.scheduleUi.otherSchedule.addDuplicateAttendance();
tests.scheduleUi.otherSchedule.deleteSchedule();
tests.scheduleUi.otherSchedule.deleteSchedule();
tests.scheduleUi.otherSchedule.noStr();

tests.scheduleUi.otherSchedule.editViolation();
tests.scheduleUi.otherSchedule.editViolationInvalidParams();
tests.scheduleUi.otherSchedule.addViolationNoParams();
tests.scheduleUi.otherSchedule.copyViolation();
tests.scheduleUi.otherSchedule.deleteSchedule();
tests.scheduleUi.otherSchedule.deleteSchedule();
tests.scheduleUi.otherSchedule.noStr();
clearMemory();

tests.scheduleUi.otherSchedule.addBalance();
tests.scheduleUi.otherSchedule.editBalance();
tests.scheduleUi.otherSchedule.copyBalance();
tests.scheduleUi.otherSchedule.deleteSchedule();
tests.scheduleUi.otherSchedule.deleteSchedule();

tests.scheduleUi.otherSchedule.searchFilter();
tests.scheduleUi.otherSchedule.deleteStaffSchedule();
tests.scheduleUi.otherSchedule.noStr();
data.deleteDataSchedule();
clearMemory();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Персонал / Подразделения
data.addDataDivision();
tests.divisionUi.other.add();
tests.divisionUi.other.edit();
tests.divisionUi.other.print();
tests.divisionUi.other.printTree();
tests.divisionUi.other.exportXLSX();
tests.divisionUi.other.exportCSV();
tests.divisionUi.other.searchFilter();
tests.divisionUi.other.addDuplicate();
tests.divisionUi.other.deletedFailedHead();
data.addDataStaffDivision();
tests.divisionUi.other.deletedFailedStaff();
data.deleteDataStaffDivision();
tests.divisionUi.other.importFile();
tests.divisionUi.other.importFailed();
tests.divisionUi.other.deleted();
data.deleteDataDivision();
clearMemory();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Персонал / Должности
tests.positionUi.other.add();
tests.positionUi.other.addDuplicate();
tests.positionUi.other.edit();
tests.positionUi.other.printTable();
tests.positionUi.other.exportXLSX();
tests.positionUi.other.exportCSV();
tests.positionUi.other.importFile();
tests.positionUi.other.search();
tests.positionUi.other.importFailed();
data.addDataStaffPosition();
tests.positionUi.other.deletedStaff();
data.deleteDataStaffPosition();
tests.positionUi.other.deleted();
clearMemory();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Персонал / Праздничные дни
tests.holiday.other.addHoliday();
tests.holiday.other.addPreHoliday();
tests.holiday.other.addMark();
tests.holiday.other.addWork();
tests.holiday.other.yearFilter();
tests.holiday.other.reset();
tests.holiday.other.addCalendar();
tests.holiday.other.reset();
clearMemory();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Персонал / Дополнительные данные - вкладки: Сотруднки, Посетители
tests.additionalDataUi.otherStaff.add();
tests.additionalDataUi.otherStaff.edit();
tests.additionalDataUi.otherStaff.deleted();

tests.additionalDataUi.otherVisitor.add();
tests.additionalDataUi.otherVisitor.edit();
tests.additionalDataUi.otherVisitor.deleted();
clearMemory();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

closeBrowser();
