const tests = require('../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../ui/src/decorates/other/clearMemory');


// Контроль доступа / Отчет о проходах
if (true) {
    // Добавление данных для тестов
    tests.premiseAccessUI.other.addDataControlAccess();

    // Тесты

    // Котроль доступа / Отчет о проходах / вкладка Все
    tests.premiseAccessUI.testAll().checkData();
    tests.premiseAccessUI.testAll().filterDate();
    tests.premiseAccessUI.testAll().filterDivision();
    tests.premiseAccessUI.testAll().filterDivisionForm();
    tests.premiseAccessUI.testAll().filterRoom();
    tests.premiseAccessUI.testAll().filterRoomForm();
    tests.premiseAccessUI.testAll().filterSearch();
    tests.premiseAccessUI.testAll().printTable();
    tests.premiseAccessUI.testAll().exportXLSX();
    tests.premiseAccessUI.testAll().exportCSV();

    // Котроль доступа / Отчет о проходах / вкладка Сотрудники
    tests.premiseAccessUI.testStaff().checkData();
    tests.premiseAccessUI.testStaff().filterDate();
    tests.premiseAccessUI.testStaff().filterDivision();
    tests.premiseAccessUI.testStaff().filterDivisionForm();
    tests.premiseAccessUI.testStaff().filterRoom();
    tests.premiseAccessUI.testStaff().filterRoomForm();
    tests.premiseAccessUI.testStaff().filterSearch();
    tests.premiseAccessUI.testStaff().printTable();
    tests.premiseAccessUI.testStaff().exportXLSX();
    tests.premiseAccessUI.testStaff().exportCSV();

    // Котроль доступа / Отчет о проходах / вкладка Посетители
    tests.premiseAccessUI.testVisitor().checkData();
    tests.premiseAccessUI.testVisitor().filterDate();
    tests.premiseAccessUI.testVisitor().filterDivision();
    tests.premiseAccessUI.testVisitor().filterDivisionForm();
    tests.premiseAccessUI.testVisitor().filterRoom();
    tests.premiseAccessUI.testVisitor().filterRoomForm();
    tests.premiseAccessUI.testVisitor().filterSearch();
    tests.premiseAccessUI.testVisitor().printTable();
    tests.premiseAccessUI.testVisitor().exportXLSX();
    tests.premiseAccessUI.testVisitor().exportCSV();

    // Удаление данных для тестов
    tests.premiseAccessUI.other.deleteDataControlAccess();
}
//--------------------------------------------------------------------------------------------------------------------//


// Контроль доступа / Управление устройствами
if (true) {
    // Добавление данных для тестов
    tests.deviceManagementUI.other.addDataDeviceManagement();

    // Тесты

    // Контроль доступа / Управление устройствами - вкладка Помещения
    tests.deviceManagementUI.testRoom.display();
    tests.deviceManagementUI.testRoom.giveAlarm();
    tests.deviceManagementUI.testRoom.resetAlarm();
    tests.deviceManagementUI.testRoom.modeClose();
    tests.deviceManagementUI.testRoom.modeOpen();
    tests.deviceManagementUI.testRoom.modeControl();
    tests.deviceManagementUI.testRoom.IUOpen();
    tests.deviceManagementUI.testRoom.IUClose();
    tests.deviceManagementUI.testRoom.addSecurity();
    tests.deviceManagementUI.testRoom.removeSecurity();
    tests.deviceManagementUI.testRoom.giveAlarm();
    tests.deviceManagementUI.testRoom.removeAlarm();
    tests.deviceManagementUI.testRoom.displayZone();
    tests.deviceManagementUI.testRoom.activate();
    tests.deviceManagementUI.testRoom.normalize();
    tests.deviceManagementUI.testRoom.searchIP();
    tests.deviceManagementUI.testRoom.searchName();
    tests.deviceManagementUI.testRoom.searchType();

    // Контроль доступа / Управление устройствами - вкладка Устройства
    tests.deviceManagementUI.testDevice.display();
    tests.deviceManagementUI.testDevice.giveAlarm();
    tests.deviceManagementUI.testDevice.resetAlarm();
    tests.deviceManagementUI.testDevice.modeClose();
    tests.deviceManagementUI.testDevice.modeOpen();
    tests.deviceManagementUI.testDevice.modeControl();
    tests.deviceManagementUI.testDevice.IUOpen();
    tests.deviceManagementUI.testDevice.IUClose();
    tests.deviceManagementUI.testDevice.addSecurity();
    tests.deviceManagementUI.testDevice.removeSecurity();
    tests.deviceManagementUI.testDevice.giveAlarm();
    tests.deviceManagementUI.testDevice.removeAlarm();
    tests.deviceManagementUI.testDevice.displayZone();
    tests.deviceManagementUI.testDevice.activate();
    tests.deviceManagementUI.testDevice.normalize();
    tests.deviceManagementUI.testDevice.searchIP();
    tests.deviceManagementUI.testDevice.searchName();
    tests.deviceManagementUI.testDevice.searchType();

    // Удаление данных для тестов
    tests.deviceManagementUI.other.deleteDataDeviceManagement();
}
//--------------------------------------------------------------------------------------------------------------------//


// Контроль доступа / Журнал верификации
if (true) {
    // Добавление данных для тестов
    tests.verificationJournalUI.other.addDataControlAccess();

    // Тесты
    tests.verificationJournalUI.test.checkData();
    tests.verificationJournalUI.test.filterDate();
    tests.verificationJournalUI.test.filterUser();
    tests.verificationJournalUI.test.filterSearch();
    tests.verificationJournalUI.test.printTable();
    tests.verificationJournalUI.test.exportXLSX();
    tests.verificationJournalUI.test.exportCSV();
    tests.verificationJournalUI.test.updateData();

    // Удаление данных для тестов
    tests.verificationJournalUI.other.deleteDataControlAccess();
}
//--------------------------------------------------------------------------------------------------------------------//


// Контроль доступа / Отчет по доступу в помещения
if (true) {
    // Добавление данных для тестов
    tests.premisesAccessReportUI.other.addDataControlAccess();

    // Тесты

    // Котроль доступа / Отчет по доступу в помещения / вкладка Все
    tests.premisesAccessReportUI.testAll().checkData();
    tests.premisesAccessReportUI.testAll().filterDivision();
    tests.premisesAccessReportUI.testAll().filterDivisionForm();
    tests.premisesAccessReportUI.testAll().filterSearch();
    tests.premisesAccessReportUI.testAll().printTable();
    tests.premisesAccessReportUI.testAll().exportXLSX();
    tests.premisesAccessReportUI.testAll().exportCSV();

    // Котроль доступа / Отчет по доступу в помещения / вкладка Сотрудники
    tests.premisesAccessReportUI.testStaff().checkData();
    tests.premisesAccessReportUI.testStaff().filterDivision();
    tests.premisesAccessReportUI.testStaff().filterDivisionForm();
    tests.premisesAccessReportUI.testStaff().filterSearch();
    tests.premisesAccessReportUI.testStaff().printTable();
    tests.premisesAccessReportUI.testStaff().exportXLSX();
    tests.premisesAccessReportUI.testStaff().exportCSV();

    // Котроль доступа / Отчет по доступу в помещения / вкладка Посетители
    tests.premisesAccessReportUI.testVisitor().checkData();
    tests.premisesAccessReportUI.testVisitor().filterDivision();
    tests.premisesAccessReportUI.testVisitor().filterDivisionForm();
    tests.premisesAccessReportUI.testVisitor().filterSearch();
    tests.premisesAccessReportUI.testVisitor().printTable();
    tests.premisesAccessReportUI.testVisitor().exportXLSX();
    tests.premisesAccessReportUI.testVisitor().exportCSV();

    // Удаление данных для тестов
    tests.premisesAccessReportUI.other.deleteDataControlAccess();
}
//--------------------------------------------------------------------------------------------------------------------//


// Контроль доступа / Местохождение
if (true) {
    // Добавление данных для тестов
    tests.whereAboutsUI.other.addDataControlAccess();

    // Тесты

    // Котроль доступа / Местонахождение / вкладка Все
    tests.whereAboutsUI.testAll().checkData();
    tests.whereAboutsUI.testAll().filterDate();
    tests.whereAboutsUI.testAll().filterDivision();
    tests.whereAboutsUI.testAll().filterDivisionForm();
    tests.whereAboutsUI.testAll().filterSearch();
    tests.whereAboutsUI.testAll().printTable();
    tests.whereAboutsUI.testAll().exportXLSX();
    tests.whereAboutsUI.testAll().exportCSV();
    tests.whereAboutsUI.testAll().updateData();

    // Котроль доступа / Местонахождение / вкладка Сотрудники
    tests.whereAboutsUI.testStaff().checkData();
    tests.whereAboutsUI.testStaff().filterDate();
    tests.whereAboutsUI.testStaff().filterDivision();
    tests.whereAboutsUI.testStaff().filterDivisionForm();
    tests.whereAboutsUI.testStaff().filterSearch();
    tests.whereAboutsUI.testStaff().printTable();
    tests.whereAboutsUI.testStaff().exportXLSX();
    tests.whereAboutsUI.testStaff().exportCSV();
    tests.whereAboutsUI.testStaff().updateData();

    // Котроль доступа / Местонахождение / вкладка Посетители
    tests.whereAboutsUI.testVisitor().checkData();
    tests.whereAboutsUI.testVisitor().filterDate();
    tests.whereAboutsUI.testVisitor().filterDivision();
    tests.whereAboutsUI.testVisitor().filterDivisionForm();
    tests.whereAboutsUI.testVisitor().filterSearch();
    tests.whereAboutsUI.testVisitor().printTable();
    tests.whereAboutsUI.testVisitor().exportXLSX();
    tests.whereAboutsUI.testVisitor().exportCSV();
    tests.whereAboutsUI.testVisitor().updateData();

    // Удаление данных для тестов
    tests.whereAboutsUI.other.deleteDataControlAccess();
}
//--------------------------------------------------------------------------------------------------------------------//


// Контроль доступа / Выданные идентификаторы
if (true) {
    // Добавление данных для тестов
    tests.identifiersUI.other.addDataControlAccess();

    // Тесты

    // Котроль доступа / Выданные идентификаторы / вкладка Все
    tests.identifiersUI.testAll().checkData();
    tests.identifiersUI.testAll().filterDate();
    tests.identifiersUI.testAll().filterDivision();
    tests.identifiersUI.testAll().filterDivisionForm();
    tests.identifiersUI.testAll().filterSearch();
    tests.identifiersUI.testAll().printTable();
    tests.identifiersUI.testAll().exportXLSX();
    tests.identifiersUI.testAll().exportCSV();

    // Котроль доступа / Выданные идентификаторы / вкладка Сотрудники
    tests.identifiersUI.testStaff().checkData();
    tests.identifiersUI.testStaff().filterDate();
    tests.identifiersUI.testStaff().filterDivision();
    tests.identifiersUI.testStaff().filterDivisionForm();
    tests.identifiersUI.testStaff().filterSearch();
    tests.identifiersUI.testStaff().printTable();
    tests.identifiersUI.testStaff().exportXLSX();
    tests.identifiersUI.testStaff().exportCSV();

    // Котроль доступа / Выданные идентификаторы / вкладка Посетители
    tests.identifiersUI.testVisitor().checkData();
    tests.identifiersUI.testVisitor().filterDate();
    tests.identifiersUI.testVisitor().filterDivision();
    tests.identifiersUI.testVisitor().filterDivisionForm();
    tests.identifiersUI.testVisitor().filterSearch();
    tests.identifiersUI.testVisitor().printTable();
    tests.identifiersUI.testVisitor().exportXLSX();
    tests.identifiersUI.testVisitor().exportCSV();

    // Котроль доступа / Выданные идентификаторы / вкладка Все
    tests.identifiersUI.testAll().deleteIdentifier();

    // Котроль доступа / Выданные идентификаторы / вкладка Сотрудники
    tests.identifiersUI.testStaff().deleteIdentifier();

    // Котроль доступа / Выданные идентификаторы / вкладка Посетители
    tests.identifiersUI.testVisitor().deleteIdentifier();

    // Удаление данных для тестов
    tests.identifiersUI.other.deleteDataControlAccess();
}
//--------------------------------------------------------------------------------------------------------------------//


// Закрытие браузера и соединения с БД
closeBrowser();