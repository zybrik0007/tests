const tests = require('../../ui/src/handlers/module-specs');
const closeBrowser = require('../../ui/src/handlers/other/closeBrowser');
const data = require('../../ui/src/handlers/module-specs/data');
console.log = () => function () {};

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

data.addDataStaffFilter();
tests.staffUi.otherPass.searchFilterStaffActive();
tests.staffUi.otherPass.divisionFilterStaffActive();
tests.staffUi.otherPass.cardSearchStaffActive();
data.deleteDataStaffFilter();

closeBrowser();
