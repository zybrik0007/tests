const tests = require('../../ui/src/handlers/module-specs');
const closeBrowser = require('../../ui/src/handlers/other/closeBrowser');
const data = require('../../ui/src/handlers/module-specs/data');
console.log = () => function () {};

// Администрирование
tests.configurationUi.otherDevice.addDeviceIP();
tests.configurationUi.otherDevice.activateDevice();
tests.configurationUi.otherDevice.fireAlarmDevice();
tests.configurationUi.otherDevice.blockFireAlarmDevice();
tests.configurationUi.otherDevice.deactivateDevice();
tests.configurationUi.otherDevice.deleteDevice();
tests.configurationUi.otherDevice.addDeviceSearch();
tests.configurationUi.otherDevice.deleteDevice();
tests.configurationUi.otherDevice.addCamera();
tests.configurationUi.otherDevice.editCamera();
tests.configurationUi.otherDevice.addBiosmart();
tests.configurationUi.otherDevice.deleteBiosmart();
tests.configurationUi.otherDevice.addTrassir();
tests.configurationUi.otherDevice.deleteTrassir();
tests.configurationUi.otherDevice.addAxxon();
tests.configurationUi.otherDevice.deleteAxxon();
tests.configurationUi.otherDevice.addBolid()
tests.configurationUi.otherDevice.deleteBolid();
tests.configurationUi.otherDevice.displayLockCTL14();
tests.configurationUi.otherDevice.displayLockCL15();
tests.configurationUi.otherDevice.displayObjectCL15();
tests.configurationUi.otherDevice.displayMobileTerminal();
tests.configurationUi.otherDevice.addDeviceIPFailed();

tests.configurationUi.otherRoom.addRoom();
tests.configurationUi.otherRoom.editRoom();
tests.configurationUi.otherRoom.addChildrenRoom();
tests.configurationUi.otherRoom.addDuplicateRoom();
tests.configurationUi.otherRoom.deleteParentRoom();
tests.configurationUi.otherRoom.addDeviceIP();
tests.configurationUi.otherRoom.addDeviceInRoom();
tests.configurationUi.otherRoom.deleteRoomAndDevice();
tests.configurationUi.otherRoom.activateDevice();
tests.configurationUi.otherRoom.deactivateDevice();
tests.configurationUi.otherRoom.activateDevice();
tests.configurationUi.otherRoom.fireAlarmDevice();
tests.configurationUi.otherRoom.blockFireAlarmDevice();

tests.configurationUi.otherRoom.exportXLSX();
tests.configurationUi.otherRoom.exportCSV();
tests.configurationUi.otherDevice.exportXLSX();
tests.configurationUi.otherDevice.exportCSV();

tests.configurationUi.otherDevice.filterIP();
tests.configurationUi.otherDevice.filterName();
tests.configurationUi.otherDevice.filterType();

tests.configurationUi.otherRoom.filterIP();
tests.configurationUi.otherRoom.filterName();
tests.configurationUi.otherRoom.filterType();

tests.configurationUi.otherRoom.deleteRoomDevice();
tests.configurationUi.otherDevice.deleteCamera();

tests.configurationUi.otherRoom.importRoom();
tests.configurationUi.otherRoom.importRoomFailed();
tests.configurationUi.otherRoom.deleteRooms();

tests.configurationUi.otherEvent.addEvent();
tests.configurationUi.otherEvent.addCheckEvent();
tests.configurationUi.otherEvent.addDuplicateEvent();
tests.configurationUi.otherEvent.deleteEvent();
tests.configurationUi.otherEvent.deleteCheckEvent();

tests.configurationUi.otherDevice.deleteDevice();

tests.configurationUi.otherCamera.addCameraTemplate();
tests.configurationUi.otherCamera.checkCameraTemplate();
tests.configurationUi.otherCamera.addCameraTemplateDuplicate();
tests.configurationUi.otherCamera.editCameraTemplate();
tests.configurationUi.otherCamera.deleteCameraTemplate();

tests.configurationUi.otherSystem.displaySystem();

closeBrowser();