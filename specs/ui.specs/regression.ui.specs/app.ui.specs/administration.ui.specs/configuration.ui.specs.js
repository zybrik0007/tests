const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Администрирование / Конфигурация

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

// Закрытие браузера и соединения с БД
closeBrowser();
