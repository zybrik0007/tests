const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');



tests.positionUi.other.add();
tests.positionUi.other.edit();
tests.positionUi.other.printTable();
tests.positionUi.other.exportXLSX();
tests.positionUi.other.exportCSV();
tests.positionUi.other.importFile();
tests.positionUi.other.search();
tests.positionUi.other.importFailed();
data.addDataStaffPosition();
tests.positionUi.other.deletedStaff();
data.deleteDataStaffPosition();
tests.positionUi.other.deleted();



closeBrowser();


