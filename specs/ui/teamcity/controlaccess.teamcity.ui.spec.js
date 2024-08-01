const tests = require('../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../ui/src/decorates/other/clearMemory');
const data = require('../../../ui/src/tests/regression.ui.tests/data');
console.log = () => function () {};

//// Раздел Контроль доступа
// Котроль доступа: Отчет о проходах. Общие проверки без данных
tests.premiseAccessUi.otherAll().display();
tests.premiseAccessUi.otherStaff().display();
tests.premiseAccessUi.otherVisitor().display();

// Котроль доступа: Журнал верификации. Общие проверки без данных
tests.verificationJournalUi.other().display();

// Котроль доступа: Отчет по доступу в помещения. Общие проверки без данных
tests.premisesAccessReportUi.otherAll().display();
tests.premisesAccessReportUi.otherStaff().display();
tests.premisesAccessReportUi.otherVisitor().display();

// Котроль доступа: Местонахождение. Общие проверки без данных
tests.whereAboutsUi.otherAll().display();
tests.whereAboutsUi.otherStaff().display();
tests.whereAboutsUi.otherVisitor().display();

// Котроль доступа: Выданные идентификаторы. Общие проверки без данных
tests.identifiersUi.otherAll().display();
tests.identifiersUi.otherStaff().display();
tests.identifiersUi.otherVisitor().display();
clearMemory();

// Добавление данных
data.addDataControlAccess();

// Котроль доступа / Отчет о проходах / вкладка Все
tests.premiseAccessUi.otherAll().checkData();
tests.premiseAccessUi.otherAll().filterDate();
tests.premiseAccessUi.otherAll().filterDivision();
tests.premiseAccessUi.otherAll().filterDivisionForm();
tests.premiseAccessUi.otherAll().filterRoom();
tests.premiseAccessUi.otherAll().filterRoomForm();
tests.premiseAccessUi.otherAll().filterSearch();
tests.premiseAccessUi.otherAll().printTable();
tests.premiseAccessUi.otherAll().exportXLSX();
tests.premiseAccessUi.otherAll().exportCSV();

// Котроль доступа / Отчет о проходах / вкладка Сотрудники
tests.premiseAccessUi.otherStaff().checkData();
tests.premiseAccessUi.otherStaff().filterDate();
tests.premiseAccessUi.otherStaff().filterDivision();
tests.premiseAccessUi.otherStaff().filterDivisionForm();
tests.premiseAccessUi.otherStaff().filterRoom();
tests.premiseAccessUi.otherStaff().filterRoomForm();
tests.premiseAccessUi.otherStaff().filterSearch();
tests.premiseAccessUi.otherStaff().printTable();
tests.premiseAccessUi.otherStaff().exportXLSX();
tests.premiseAccessUi.otherStaff().exportCSV();

// Котроль доступа / Отчет о проходах / вкладка Посетители
tests.premiseAccessUi.otherVisitor().checkData();
tests.premiseAccessUi.otherVisitor().filterDate();
tests.premiseAccessUi.otherVisitor().filterDivision();
tests.premiseAccessUi.otherVisitor().filterDivisionForm();
tests.premiseAccessUi.otherVisitor().filterRoom();
tests.premiseAccessUi.otherVisitor().filterRoomForm();
tests.premiseAccessUi.otherVisitor().filterSearch();
tests.premiseAccessUi.otherVisitor().printTable();
tests.premiseAccessUi.otherVisitor().exportXLSX();
tests.premiseAccessUi.otherVisitor().exportCSV();
clearMemory();

// Котроль доступа: Журнал верификации.
tests.verificationJournalUi.other().checkData();
tests.verificationJournalUi.other().filterDate();
tests.verificationJournalUi.other().filterUser();
tests.verificationJournalUi.other().filterSearch();
tests.verificationJournalUi.other().printTable();
tests.verificationJournalUi.other().exportXLSX();
tests.verificationJournalUi.other().exportCSV();
tests.verificationJournalUi.other().updateData();
clearMemory();

// Котроль доступа / Отчет по доступу в помещения / вкладка Все
tests.premisesAccessReportUi.otherAll().checkData();
tests.premisesAccessReportUi.otherAll().filterDivision();
tests.premisesAccessReportUi.otherAll().filterDivisionForm();
tests.premisesAccessReportUi.otherAll().filterSearch();
tests.premisesAccessReportUi.otherAll().printTable();
tests.premisesAccessReportUi.otherAll().exportXLSX();
tests.premisesAccessReportUi.otherAll().exportCSV();

// Котроль доступа / Отчет по доступу в помещения / вкладка Сотрудники
tests.premisesAccessReportUi.otherStaff().checkData();
tests.premisesAccessReportUi.otherStaff().filterDivision();
tests.premisesAccessReportUi.otherStaff().filterDivisionForm();
tests.premisesAccessReportUi.otherStaff().filterSearch();
tests.premisesAccessReportUi.otherStaff().printTable();
tests.premisesAccessReportUi.otherStaff().exportXLSX();
tests.premisesAccessReportUi.otherStaff().exportCSV();

// Котроль доступа / Отчет по доступу в помещения / вкладка Посетители
tests.premisesAccessReportUi.otherVisitor().checkData();
tests.premisesAccessReportUi.otherVisitor().filterDivision();
tests.premisesAccessReportUi.otherVisitor().filterDivisionForm();
tests.premisesAccessReportUi.otherVisitor().filterSearch();
tests.premisesAccessReportUi.otherVisitor().printTable();
tests.premisesAccessReportUi.otherVisitor().exportXLSX();
tests.premisesAccessReportUi.otherVisitor().exportCSV();
clearMemory();

// Котроль доступа / Местонахождение / вкладка Все
tests.whereAboutsUi.otherAll().checkData();
tests.whereAboutsUi.otherAll().filterDate();
tests.whereAboutsUi.otherAll().filterDivision();
tests.whereAboutsUi.otherAll().filterDivisionForm();
tests.whereAboutsUi.otherAll().filterSearch();
tests.whereAboutsUi.otherAll().printTable();
tests.whereAboutsUi.otherAll().exportXLSX();
tests.whereAboutsUi.otherAll().exportCSV();
tests.whereAboutsUi.otherAll().updateData();

// Котроль доступа / Местонахождение / вкладка Сотрудники
tests.whereAboutsUi.otherStaff().checkData();
tests.whereAboutsUi.otherStaff().filterDate();
tests.whereAboutsUi.otherStaff().filterDivision();
tests.whereAboutsUi.otherStaff().filterDivisionForm();
tests.whereAboutsUi.otherStaff().filterSearch();
tests.whereAboutsUi.otherStaff().printTable();
tests.whereAboutsUi.otherStaff().exportXLSX();
tests.whereAboutsUi.otherStaff().exportCSV();
tests.whereAboutsUi.otherStaff().updateData();

// Котроль доступа / Местонахождение / вкладка Посетители
tests.whereAboutsUi.otherVisitor().checkData();
tests.whereAboutsUi.otherVisitor().filterDate();
tests.whereAboutsUi.otherVisitor().filterDivision();
tests.whereAboutsUi.otherVisitor().filterDivisionForm();
tests.whereAboutsUi.otherVisitor().filterSearch();
tests.whereAboutsUi.otherVisitor().printTable();
tests.whereAboutsUi.otherVisitor().exportXLSX();
tests.whereAboutsUi.otherVisitor().exportCSV();
tests.whereAboutsUi.otherVisitor().updateData();
clearMemory();

// Котроль доступа / Выданные идентификаторы / вкладка Все
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
tests.identifiersUi.otherVisitor().deleteIdentifier();

// Удаление данных
data.deleteDataControlAccess();
clearMemory();

// Котроль доступа / Управление устройствами / вкладка Помещения
tests.deviceManagementUi.addDevice();
tests.deviceManagementUi.addCamera();
tests.deviceManagementUi.activateDevice();
data.addDataDeviceManagement();

tests.deviceManagementUi.otherRoom.display();
tests.deviceManagementUi.otherRoom.giveAlarm();
tests.deviceManagementUi.otherRoom.resetAlarm();
tests.deviceManagementUi.otherRoom.modeClose();
tests.deviceManagementUi.otherRoom.modeOpen();
tests.deviceManagementUi.otherRoom.modeControl();
tests.deviceManagementUi.otherRoom.IUOpen();
tests.deviceManagementUi.otherRoom.IUClose();
tests.deviceManagementUi.otherRoom.addSecurity();
tests.deviceManagementUi.otherRoom.removeSecurity();
tests.deviceManagementUi.otherRoom.giveAlarm();
tests.deviceManagementUi.otherRoom.removeAlarm();
tests.deviceManagementUi.otherRoom.displayZone();
tests.deviceManagementUi.otherRoom.activate();
tests.deviceManagementUi.otherRoom.normalize();
tests.deviceManagementUi.otherRoom.searchIP();
tests.deviceManagementUi.otherRoom.searchName();
tests.deviceManagementUi.otherRoom.searchType();
clearMemory();

// Котроль доступа / Управление устройствами / вкладка Устройства
tests.deviceManagementUi.otherDevice.display();
tests.deviceManagementUi.otherDevice.giveAlarm();
tests.deviceManagementUi.otherDevice.resetAlarm();
tests.deviceManagementUi.otherDevice.modeClose();
tests.deviceManagementUi.otherDevice.modeOpen();
tests.deviceManagementUi.otherDevice.modeControl();
tests.deviceManagementUi.otherDevice.IUOpen();
tests.deviceManagementUi.otherDevice.IUClose();
tests.deviceManagementUi.otherDevice.addSecurity();
tests.deviceManagementUi.otherDevice.removeSecurity();
tests.deviceManagementUi.otherDevice.giveAlarm();
tests.deviceManagementUi.otherDevice.removeAlarm();
tests.deviceManagementUi.otherDevice.displayZone();
tests.deviceManagementUi.otherDevice.activate();
tests.deviceManagementUi.otherDevice.normalize();
tests.deviceManagementUi.otherDevice.searchIP();
tests.deviceManagementUi.otherDevice.searchName();
tests.deviceManagementUi.otherDevice.searchType();

data.deleteDataDeviceManagement();
tests.deviceManagementUi.deleteDevice();
tests.deviceManagementUi.deleteCamera();
clearMemory();

closeBrowser();