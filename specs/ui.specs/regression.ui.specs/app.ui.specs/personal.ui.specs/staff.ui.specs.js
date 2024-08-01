const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Персонал / Сотрудники.

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

// Закрытие браузера и соединения с БД
closeBrowser();