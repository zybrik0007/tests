const tests = require('../../../../../ui/src/tests/regression.ui.tests');
const closeBrowser = require('../../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../../ui/src/decorates/other/clearMemory');

// Регрессионные UI тесты. Контроль доступа / Управление устройствами

// Добавление данных для тестов
tests.deviceManagementUI.other.addDataDeviceManagement();

// Тесты

// Контроль доступа / Управление устройствами - вкладка Помещения
tests.deviceManagementUI.testRoom.display();
tests.deviceManagementUI.testRoom.giveAlarm();
tests.deviceManagementUI.testRoom.resetAlarm();
tests.deviceManagementUI.testRoom.modeClose();
tests.deviceManagementUI.testRoom.modeOpen();
tests.deviceManagementUI.testRoom.modeControl();
tests.deviceManagementUI.testRoom.IUOpen();
tests.deviceManagementUI.testRoom.IUClose();
tests.deviceManagementUI.testRoom.addSecurity();
tests.deviceManagementUI.testRoom.removeSecurity();
tests.deviceManagementUI.testRoom.giveAlarm();
tests.deviceManagementUI.testRoom.removeAlarm();
tests.deviceManagementUI.testRoom.displayZone();
tests.deviceManagementUI.testRoom.activate();
tests.deviceManagementUI.testRoom.normalize();
tests.deviceManagementUI.testRoom.searchIP();
tests.deviceManagementUI.testRoom.searchName();
tests.deviceManagementUI.testRoom.searchType();

// Контроль доступа / Управление устройствами - вкладка Устройства
tests.deviceManagementUI.testDevice.display();
tests.deviceManagementUI.testDevice.giveAlarm();
tests.deviceManagementUI.testDevice.resetAlarm();
tests.deviceManagementUI.testDevice.modeClose();
tests.deviceManagementUI.testDevice.modeOpen();
tests.deviceManagementUI.testDevice.modeControl();
tests.deviceManagementUI.testDevice.IUOpen();
tests.deviceManagementUI.testDevice.IUClose();
tests.deviceManagementUI.testDevice.addSecurity();
tests.deviceManagementUI.testDevice.removeSecurity();
tests.deviceManagementUI.testDevice.giveAlarm();
tests.deviceManagementUI.testDevice.removeAlarm();
tests.deviceManagementUI.testDevice.displayZone();
tests.deviceManagementUI.testDevice.activate();
tests.deviceManagementUI.testDevice.normalize();
tests.deviceManagementUI.testDevice.searchIP();
tests.deviceManagementUI.testDevice.searchName();
tests.deviceManagementUI.testDevice.searchType();

// Удаление данных для тестов
tests.deviceManagementUI.other.deleteDataDeviceManagement();

// Закрытие браузера и соединения с БД
closeBrowser();