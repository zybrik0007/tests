const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Персонал / Графики работы.

// Добавление данных для тестов
tests.scheduleUI.other.addDataSchedule();

// Тесты
tests.scheduleUI.test.editWeek();
tests.scheduleUI.test.editWeekInvalidParams();
tests.scheduleUI.test.addWeekNoParams();
tests.scheduleUI.test.copyWeek();
tests.scheduleUI.test.deleteSchedule();
tests.scheduleUI.test.deleteSchedule();
tests.scheduleUI.test.noStr();

tests.scheduleUI.test.editShift();
tests.scheduleUI.test.editShiftInvalidParams();
tests.scheduleUI.test.addShiftNoParams();
tests.scheduleUI.test.copyShift();
tests.scheduleUI.test.deleteSchedule();
tests.scheduleUI.test.deleteSchedule();
tests.scheduleUI.test.noStr();

tests.scheduleUI.test.addAttendance();
tests.scheduleUI.test.editAttendance();
tests.scheduleUI.test.copyAttendance();
tests.scheduleUI.test.addDuplicateAttendance();
tests.scheduleUI.test.deleteSchedule();
tests.scheduleUI.test.deleteSchedule();
tests.scheduleUI.test.noStr();

tests.scheduleUI.test.editViolation();
tests.scheduleUI.test.editViolationInvalidParams();
tests.scheduleUI.test.addViolationNoParams();
tests.scheduleUI.test.copyViolation();
tests.scheduleUI.test.deleteSchedule();
tests.scheduleUI.test.deleteSchedule();
tests.scheduleUI.test.noStr();

tests.scheduleUI.test.addBalance();
tests.scheduleUI.test.editBalance();
tests.scheduleUI.test.copyBalance();
tests.scheduleUI.test.deleteSchedule();
tests.scheduleUI.test.deleteSchedule();

// Добавление данных для проверки фильтра поиска
tests.scheduleUI.other.addSearchFilterData();
// Тесты поиска
tests.scheduleUI.test.searchFilter();
// Удаление данных для проверки фильтра поиска
tests.scheduleUI.other.deleteSearchFilterData();

// Добавление данных для проверки удаления используемого графика работы
tests.scheduleUI.other.addStaffData();
// Тесты удаления
tests.scheduleUI.test.deleteStaffSchedule();
// Удаление данных для проверки удаления используемого графика работы
tests.scheduleUI.other.deleteStaffData();

// Удаление данных для тестов
tests.scheduleUI.other.deleteDataSchedule();

// Закрытие браузера и соединения с БД
closeBrowser();