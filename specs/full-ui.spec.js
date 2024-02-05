const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const data = require('../ui/src/handlers/module-specs/data');


data.addDataVisitor();
//tests.visitorUi.otherVisitorOrder.addVisitorMaxParams();
//tests.visitorUi.otherVisitorOrder.archiveVisitorMaxParamsFromOrder();
//tests.visitorUi.otherVisitorOrder.addBarcodeVisitorMaxParams();
//tests.visitorUi.otherVisitorOrder.addBarcodeDuplicateVisitor();
data.deleteDataVisitor();

closeBrowser();