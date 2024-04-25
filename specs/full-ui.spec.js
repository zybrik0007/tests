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

//data.addDataVisitorReport();
tests.visitorReportUi.other.exportXLSX();


closeBrowser();


