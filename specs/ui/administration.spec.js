const tests = require('../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../ui/src/decorates/other/closeBrowser');
const data = require('../../ui/src/tests/regression.ui.tests/data');
const clearMemory = require('../../ui/src/decorates/other/clearMemory');
console.log = () => function () {};

// Администрирование / Конфигурация
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
clearMemory();

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
clearMemory();

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
clearMemory();

// Администрирование / События системы
tests.configurationUi.otherDevice.addDeviceIP();
tests.configurationUi.otherDevice.activateDevice();
tests.eventUi.other().updateData();
tests.eventUi.other().filterDate();
tests.eventUi.other().exportXLSX();
tests.eventUi.other().exportCSV();
tests.eventUi.other().print();
tests.eventUi.other().filterSearch();
tests.eventUi.other().resetFilter();
tests.configurationUi.otherDevice.deleteDevice();

// Администрирование / Реакции на события
tests.configurationUi.otherDevice.addDeviceIP();
tests.configurationUi.otherDevice.activateDevice();
tests.eventactionUi.other.addEvent();
tests.eventactionUi.other.addDuplicate();
tests.eventactionUi.other.checkTurnOnEvent();
tests.eventactionUi.other.checkTurnOffEvent();
tests.eventactionUi.other.editEvent();
tests.eventactionUi.other.addEventDevice();
tests.eventactionUi.other.editEventDevice();
tests.eventactionUi.other.searchFilter();
tests.eventactionUi.other.deleteEvents();
tests.eventactionUi.other.addFailed();
tests.configurationUi.otherDevice.deleteDevice();
clearMemory();

// Администрирование / Задания
tests.configurationUi.otherDevice.addDeviceIP();
tests.configurationUi.otherDevice.activateDevice();
tests.taskUi.other.addTask();
tests.taskUi.other.editTask();
tests.taskUi.other.editTaskUpdate();
tests.taskUi.other.searchFilter();
tests.taskUi.other.deleteTask();
tests.taskUi.other.addFailed();
tests.configurationUi.otherDevice.deleteDevice();

// Операторы
// Роли и права операторов
data.addDataRoleOperator();
tests.operatorRoleUi.otherRole().add();
tests.operatorRoleUi.otherOperator().add();
tests.operatorRoleUi.otherRole().edit();
tests.operatorRoleUi.otherOperator().edit();
tests.operatorRoleUi.otherOperator().block();
tests.operatorRoleUi.otherOperator().unblock();
tests.operatorRoleUi.otherOperator().addFailed();
tests.operatorRoleUi.otherRole().deleteFailed();
tests.operatorRoleUi.otherRole().addDuplicate();
tests.operatorRoleUi.otherOperator().addDuplicate();
tests.operatorRoleUi.otherRole().copy();
tests.operatorRoleUi.otherOperator().copy();
tests.operatorRoleUi.otherRole().search();
tests.operatorRoleUi.otherOperator().search();
tests.operatorRoleUi.otherOperator().deleted();
tests.operatorRoleUi.otherRole().deleted();
data.deleteDataRoleOperator();

closeBrowser();