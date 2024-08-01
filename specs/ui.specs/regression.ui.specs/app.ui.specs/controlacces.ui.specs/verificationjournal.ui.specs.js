const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Контроль доступа / Журнал верификации

// Добавление данных для тестов
tests.verificationJournalUI.other.addDataControlAccess();

// Тесты
tests.verificationJournalUI.test.checkData();
tests.verificationJournalUI.test.filterDate();
tests.verificationJournalUI.test.filterUser();
tests.verificationJournalUI.test.filterSearch();
tests.verificationJournalUI.test.printTable();
tests.verificationJournalUI.test.exportXLSX();
tests.verificationJournalUI.test.exportCSV();
tests.verificationJournalUI.test.updateData();

// Удаление данных для тестов
tests.verificationJournalUI.other.deleteDataControlAccess();

// Закрытие браузера и соединения с БД
closeBrowser();