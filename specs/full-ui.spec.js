const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');


//data.addDataVisitorReport();
tests.templateUi.other.holiday();
/*tests.visitorReportUi.other.checkData();
tests.visitorReportUi.other.filterDate();
tests.visitorReportUi.other.divisionFilter();
tests.visitorReportUi.other.filterSearch();
tests.visitorReportUi.other.printTable();
tests.visitorReportUi.other.exportXLSX();
tests.visitorReportUi.other.exportCSV();*/


closeBrowser();


