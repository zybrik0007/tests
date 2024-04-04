const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');

//data.addDataVisitor();
tests.visitorUi.otherVisitorPassOrder.addVisitorMaxParams();
tests.visitorUi.otherVisitorPassOrder.exportXLSXVisitorMaxParams();
tests.visitorUi.otherVisitorPassOrder.exportCSVVisitorMaxParams();
data.deleteDataVisitor();

closeBrowser();

/*
data.addDataControlAccess();
tests.identifiersUi.otherAll().exportXLSX();
data.deleteDataControlAccess();
closeBrowser();*/
