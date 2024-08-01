const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Бюро пропусков / Сотрудники

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

// Закрытие браузера и соединения с БД
closeBrowser();