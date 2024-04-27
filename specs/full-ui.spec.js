const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');


//tests.configurationUi.otherDevice.addDeviceIP();
//tests.configurationUi.otherDevice.activateDevice();
//tests.configurationUi.otherDevice.deactivateDevice();
//tests.configurationUi.otherDevice.fireAlarmDevice();
//tests.configurationUi.otherDevice.blockFireAlarmDevice();
//tests.configurationUi.otherDevice.addDeviceSearch();
//tests.configurationUi.otherDevice.deleteDevice();
//tests.configurationUi.otherRoom.addRoom();
//tests.configurationUi.otherRoom.editRoom();
//tests.configurationUi.otherRoom.addChildrenRoom();
//tests.configurationUi.otherRoom.addDuplicateRoom();
//tests.configurationUi.otherRoom.deleteParentRoom();
//tests.configurationUi.otherRoom.addDeviceIP();
//tests.configurationUi.otherRoom.addDeviceInRoom();
//tests.configurationUi.otherRoom.deleteRoomAndDevice();
//tests.configurationUi.otherRoom.activateDevice();
//tests.configurationUi.otherRoom.fireAlarmDevice();
//tests.configurationUi.otherRoom.blockFireAlarmDevice();
//tests.configurationUi.otherRoom.exportXLSX();
//tests.configurationUi.otherRoom.exportCSV();
//tests.configurationUi.otherDevice.exportXLSX();
//tests.configurationUi.otherDevice.exportCSV();

//data.deleteURV();
data.addURV();



closeBrowser();


