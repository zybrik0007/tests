const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const data = require('../ui/src/handlers/module-specs/data');


//data.addDataVisitor();
//tests.visitorUi.otherVisitorOrder.addVisitorMaxParams();
//tests.visitorUi.otherVisitorOrder.archiveVisitorMaxParamsFromOrder();
//tests.visitorUi.otherVisitorOrder.addBarcodeVisitorMaxParams();
//tests.visitorUi.otherVisitorOrder.addBarcodeDuplicateVisitor();

//data.addDataStaff();
//tests.staffUi.other.importMinParamsActive();
//tests.staffUi.other.importMaxParamsActive();
//tests.staffUi.other.importFailedParamsActive();
data.deleteDataStaff();


//tests.scheduleUi.otherSchedule.addWeekMinParams()

closeBrowser();