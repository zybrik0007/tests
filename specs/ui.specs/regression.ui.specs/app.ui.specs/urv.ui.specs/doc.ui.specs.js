const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. УРВ / Оправдательные документы.

// Тесты
tests.documentUI.testJustification.addDocument();
tests.documentUI.testJustification.editDocument();
tests.documentUI.testJustification.deleteDocument();

tests.documentUI.testOvertime.addDocument();
tests.documentUI.testOvertime.editDocument();
tests.documentUI.testOvertime.deleteDocument();

tests.documentUI.testExplanatory.addDocument();
tests.documentUI.testExplanatory.editDocument();
tests.documentUI.testExplanatory.deleteDocument();

// Закрытие браузера и соединения с БД
closeBrowser();