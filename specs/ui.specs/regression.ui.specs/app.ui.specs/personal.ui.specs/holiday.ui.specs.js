const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Персонал / Праздничные дни

// Тесты
tests.holidayUI.test.addHoliday();
tests.holidayUI.test.addPreHoliday();
tests.holidayUI.test.addMark();
tests.holidayUI.test.addWork();
tests.holidayUI.test.yearFilter();
tests.holidayUI.test.reset();
tests.holidayUI.test.addCalendar();
tests.holidayUI.test.reset();

// Закрытие браузера и соединения с БД
closeBrowser();