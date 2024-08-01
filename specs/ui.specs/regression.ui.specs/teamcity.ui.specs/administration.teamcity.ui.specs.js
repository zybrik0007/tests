const tests = require('../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../ui/src/decorates/other/clearMemory');


// Администрирование / Конфигурация
if (true) {
    // Тесты
    tests.configurationUI.testDevice.addDeviceIP();
    tests.configurationUI.testDevice.activateDevice();
    tests.configurationUI.testDevice.fireAlarmDevice();
    tests.configurationUI.testDevice.blockFireAlarmDevice();
    tests.configurationUI.testDevice.deactivateDevice();
    tests.configurationUI.testDevice.deleteDevice();
    tests.configurationUI.testDevice.addDeviceSearch();
    tests.configurationUI.testDevice.deleteDevice();
    tests.configurationUI.testDevice.addCamera();
    tests.configurationUI.testDevice.editCamera();
    tests.configurationUI.testDevice.addBiosmart();
    tests.configurationUI.testDevice.deleteBiosmart();
    tests.configurationUI.testDevice.addTrassir();
    tests.configurationUI.testDevice.deleteTrassir();
    tests.configurationUI.testDevice.addAxxon();
    tests.configurationUI.testDevice.deleteAxxon();
    tests.configurationUI.testDevice.addBolid()
    tests.configurationUI.testDevice.deleteBolid();
    tests.configurationUI.testDevice.displayLockCTL14();
    tests.configurationUI.testDevice.displayLockCL15();
    tests.configurationUI.testDevice.displayObjectCL15();
    tests.configurationUI.testDevice.displayMobileTerminal();
    tests.configurationUI.testDevice.addDeviceIPFailed();

    tests.configurationUI.testRoom.addRoom();
    tests.configurationUI.testRoom.editRoom();
    tests.configurationUI.testRoom.addChildrenRoom();
    tests.configurationUI.testRoom.addDuplicateRoom();
    tests.configurationUI.testRoom.deleteParentRoom();
    tests.configurationUI.testRoom.addDeviceIP();
    tests.configurationUI.testRoom.addDeviceInRoom();
    tests.configurationUI.testRoom.deleteRoomAndDevice();
    tests.configurationUI.testRoom.activateDevice();
    tests.configurationUI.testRoom.deactivateDevice();
    tests.configurationUI.testRoom.activateDevice();
    tests.configurationUI.testRoom.fireAlarmDevice();
    tests.configurationUI.testRoom.blockFireAlarmDevice();

    tests.configurationUI.testRoom.exportXLSX();
    tests.configurationUI.testRoom.exportCSV();
    tests.configurationUI.testDevice.exportXLSX();
    tests.configurationUI.testDevice.exportCSV();

    tests.configurationUI.testDevice.filterIP();
    tests.configurationUI.testDevice.filterName();
    tests.configurationUI.testDevice.filterType();

    tests.configurationUI.testRoom.filterIP();
    tests.configurationUI.testRoom.filterName();
    tests.configurationUI.testRoom.filterType();

    tests.configurationUI.testRoom.deleteRoomDevice();
    tests.configurationUI.testDevice.deleteCamera();

    tests.configurationUI.testRoom.importRoom();
    tests.configurationUI.testRoom.importRoomFailed();
    tests.configurationUI.testRoom.deleteRooms();

    tests.configurationUI.testEvent.addEvent();
    tests.configurationUI.testEvent.addCheckEvent();
    tests.configurationUI.testEvent.addDuplicateEvent();
    tests.configurationUI.testEvent.deleteEvent();
    tests.configurationUI.testEvent.deleteCheckEvent();

    tests.configurationUI.testDevice.deleteDevice();

    tests.configurationUI.testCamera.addCameraTemplate();
    tests.configurationUI.testCamera.checkCameraTemplate();
    tests.configurationUI.testCamera.addCameraTemplateDuplicate();
    tests.configurationUI.testCamera.editCameraTemplate();
    tests.configurationUI.testCamera.deleteCameraTemplate();

    tests.configurationUI.testSystem.displaySystem();
}
//--------------------------------------------------------------------------------------------------------------------//


// Администрирование / События системы
if (true) {
    // Добавление данных для тестов
    tests.configurationUI.testDevice.addDeviceIP();
    tests.configurationUI.testDevice.activateDevice();

    // Тесты
    tests.eventUI.test.updateData();
    tests.eventUI.test.filterDate();
    tests.eventUI.test.exportXLSX();
    tests.eventUI.test.exportCSV();
    tests.eventUI.test.print();
    tests.eventUI.test.filterSearch();
    tests.eventUI.test.resetFilter();

    // Удаление данных для тестов
    tests.configurationUI.testDevice.deleteDevice();
}
//--------------------------------------------------------------------------------------------------------------------//


// Администрирование / Реакции на события
if (true) {
    // Добавление данных для тестов
    tests.configurationUI.testDevice.addDeviceIP();
    tests.configurationUI.testDevice.activateDevice();

    // Тесты
    tests.eventactionUI.test.addEvent();
    tests.eventactionUI.test.addDuplicate();
    tests.eventactionUI.test.checkTurnOnEvent();
    tests.eventactionUI.test.checkTurnOffEvent();
    tests.eventactionUI.test.editEvent();
    tests.eventactionUI.test.addEventDevice();
    tests.eventactionUI.test.editEventDevice();
    tests.eventactionUI.test.searchFilter();
    tests.eventactionUI.test.deleteEvents();
    tests.eventactionUI.test.addFailed();

    // Удаление данных для тестов
    tests.configurationUI.testDevice.deleteDevice();
}
//--------------------------------------------------------------------------------------------------------------------//


// Администрирование / Задания
if (true) {
    // Добавление данных для тестов
    tests.configurationUI.testDevice.addDeviceIP();
    tests.configurationUI.testDevice.activateDevice();

// Тесты
    tests.taskUI.test.addTask();
    tests.taskUI.test.editTask();
    tests.taskUI.test.editTaskUpdate();
    tests.taskUI.test.searchFilter();
    tests.taskUI.test.deleteTask();
    tests.taskUI.test.addFailed();

// Удаление данных для тестов
    tests.configurationUI.testDevice.deleteDevice();
}
//--------------------------------------------------------------------------------------------------------------------//


// Администрирование / Операторы; Администрирование / Роли м права операторов
if (true) {
    // Добавление данных для тестов
    tests.operatorRoleUI.other.addDataRoleOperator();

    // Тесты
    tests.operatorRoleUI.testRole().add();
    tests.operatorRoleUI.testOperator().add();
    tests.operatorRoleUI.testRole().edit();
    tests.operatorRoleUI.testOperator().edit();
    tests.operatorRoleUI.testOperator().block();
    tests.operatorRoleUI.testOperator().unblock();
    tests.operatorRoleUI.testOperator().addFailed();
    tests.operatorRoleUI.testRole().deleteFailed();
    tests.operatorRoleUI.testRole().addDuplicate();
    tests.operatorRoleUI.testOperator().addDuplicate();
    tests.operatorRoleUI.testRole().copy();
    tests.operatorRoleUI.testOperator().copy();
    tests.operatorRoleUI.testRole().search();
    tests.operatorRoleUI.testOperator().search();
    tests.operatorRoleUI.testOperator().deleted();
    tests.operatorRoleUI.testRole().deleted();

    // Удаление данных для тестов
    tests.operatorRoleUI.other.deleteDataRoleOperator();
}
//--------------------------------------------------------------------------------------------------------------------//

// Закрытие браузера и соединения с БД
closeBrowser();