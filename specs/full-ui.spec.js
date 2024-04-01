const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');

tests.documentUi.otherJustification.addDocument();
tests.documentUi.otherJustification.editDocument();
tests.documentUi.otherJustification.deleteDocument();

tests.documentUi.otherOvertime.addDocument();
tests.documentUi.otherOvertime.editDocument();
tests.documentUi.otherOvertime.deleteDocument();

tests.documentUi.otherExplanatory.addDocument();
tests.documentUi.otherExplanatory.editDocument();
tests.documentUi.otherExplanatory.deleteDocument();
closeBrowser();

/*
data.addDataControlAccess();
tests.identifiersUi.otherAll().exportXLSX();
data.deleteDataControlAccess();
closeBrowser();*/
