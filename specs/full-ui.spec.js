const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');


tests.staffUi.other.importMinParamsActive();
tests.staffUi.other.importMaxParamsActive();
tests.staffUi.other.importFailedParamsActive();
data.deleteDataStaff();

closeBrowser();

/*
data.addDataControlAccess();
tests.identifiersUi.otherAll().exportXLSX();
data.deleteDataControlAccess();
closeBrowser();*/
