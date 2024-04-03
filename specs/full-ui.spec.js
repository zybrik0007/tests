const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');

/*data.deleteURVDocument();
data.deleteURV();
data.addURV();
tests.workedJournalUi.other.calculationDateWorkedJournal();
tests.workedJournalUi.other.documentCalculationWorkedJournal();
tests.workedJournalUi.other.deleteCompositeDocumentWorkedJournal();
data.deleteURVDocument();
data.addURVDocument();
data.deleteURVDocument();
tests.workedJournalUi.other.calculationDateWorkedJournal();*/
//tests.disciplineReportsUi.otherOverwork.exportXLSX();
//tests.disciplineReportsUi.otherOverwork.exportCSV();

//data.deleteURVDocument();
//tests.workedJournalUi.other.calculationDateWorkedJournal();
//data.addDataVisitor();
tests.visitorUi.otherVisitorOrder.addVisitorMaxParams();

closeBrowser();

/*
data.addDataControlAccess();
tests.identifiersUi.otherAll().exportXLSX();
data.deleteDataControlAccess();
closeBrowser();*/
