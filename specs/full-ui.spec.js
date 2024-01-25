const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const data = require('../ui/src/handlers/module-specs/data');

//data.deleteDataControlAccess();
data.addDataControlAccess();


// Удаление данных
//data.deleteDataControlAccess();
tests.identifiersUi.otherAll().deleteIdentifier();


//data.deleteDataControlAccess();

closeBrowser();