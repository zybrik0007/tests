const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');

tests.holiday.other.addHoliday();
tests.holiday.other.addPreHoliday();
tests.holiday.other.addMark();
tests.holiday.other.addWork();
tests.holiday.other.yearFilter();
tests.holiday.other.reset();
tests.holiday.other.addCalendar();
tests.holiday.other.reset();
closeBrowser();


