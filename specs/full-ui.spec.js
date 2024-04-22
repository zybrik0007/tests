const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');



data.deleteURVDocument();
data.addURVDocument();
tests.reportsUi.other.calculationDateReports();
tests.reportsUi.other.checkCalculationReports();
tests.reportsUi.other.printReports();
tests.reportsUi.other.exportReportsXLSX();
tests.reportsUi.other.exportReportsCSV();
tests.reportsUi.other.checkCalculationNoNullReports();
tests.reportsUi.other.documentCalculateReports();

closeBrowser();


