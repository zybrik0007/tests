const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');

// Котроль доступа / Выданные идентификаторы / вкладка Все
//data.deleteDataControlAccess();
//data.addDataControlAccess();

tests.identifiersUi.otherStaff().filterDate();
tests.identifiersUi.otherAll().filterDate();
tests.identifiersUi.otherVisitor().filterDate();

/*// Котроль доступа / Выданные идентификаторы / вкладка Все
tests.identifiersUi.otherAll().checkData();
tests.identifiersUi.otherAll().filterDate();
tests.identifiersUi.otherAll().filterDivision();
tests.identifiersUi.otherAll().filterDivisionForm();
tests.identifiersUi.otherAll().filterSearch();
tests.identifiersUi.otherAll().printTable();
tests.identifiersUi.otherAll().exportXLSX();
tests.identifiersUi.otherAll().exportCSV();

// Котроль доступа / Выданные идентификаторы / вкладка Сотрудники
tests.identifiersUi.otherStaff().checkData();
tests.identifiersUi.otherStaff().filterDate();
tests.identifiersUi.otherStaff().filterDivision();
tests.identifiersUi.otherStaff().filterDivisionForm();
tests.identifiersUi.otherStaff().filterSearch();
tests.identifiersUi.otherStaff().printTable();
tests.identifiersUi.otherStaff().exportXLSX();
tests.identifiersUi.otherStaff().exportCSV();

// Котроль доступа / Выданные идентификаторы / вкладка Посетители
tests.identifiersUi.otherVisitor().checkData();
tests.identifiersUi.otherVisitor().filterDate();
tests.identifiersUi.otherVisitor().filterDivision();
tests.identifiersUi.otherVisitor().filterDivisionForm();
tests.identifiersUi.otherVisitor().filterSearch();
tests.identifiersUi.otherVisitor().printTable();
tests.identifiersUi.otherVisitor().exportXLSX();
tests.identifiersUi.otherVisitor().exportCSV();

// Котроль доступа / Выданные идентификаторы / вкладка Все
tests.identifiersUi.otherAll().deleteIdentifier();

// Котроль доступа / Выданные идентификаторы / вкладка Сотрудники
tests.identifiersUi.otherStaff().deleteIdentifier();

// Котроль доступа / Выданные идентификаторы / вкладка Посетители
tests.identifiersUi.otherVisitor().deleteIdentifier();*/


//tests.templateUi.otherZone.edit();
//data.deleteURV();
closeBrowser();


