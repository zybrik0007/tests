const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');

data.deleteDataTemplate();
//data.addDataTemplate();
data.addDataTemplate()
tests.templateUi.otherZone.edit();
tests.templateUi.otherWeek.add();
tests.templateUi.otherWeek.edit();
tests.templateUi.otherSlideTZ.add();
tests.templateUi.otherSlideTZ.edit();
tests.templateUi.otherSlideW.add();
tests.templateUi.otherSlideW.edit();
tests.templateUi.otherWeek.searchFilter();
tests.templateUi.other.searchType();
tests.templateUi.otherZone.deletedFailedAccess();
tests.templateUi.otherWeek.deletedFailedAccess();
tests.templateUi.otherTemplate.add();
tests.templateUi.other.addDuplicate();
tests.templateUi.otherSlideTZ.deleteFailedTemplate();
tests.templateUi.otherSlideW.deleteFailedTemplate();
tests.templateUi.otherTemplate.edit();
tests.templateUi.otherSlideTZ.deleted();
tests.templateUi.otherSlideW.deleted();
tests.templateUi.otherWeek.deleteFailedTemplate();
tests.templateUi.otherTemplate.copy();
tests.templateUi.otherTemplate.searchFilter();
data.addDataStaffTemplate();
tests.templateUi.otherTemplate.deleteFailedTemplate();
data.deleteDataStaffTemplate();
tests.templateUi.otherTemplate.deleted();
tests.templateUi.otherWeek.deleted();
tests.templateUi.otherZone.deleted();
tests.templateUi.other.deleteServiceFailed();
tests.templateUi.other.editServiceFailed();
tests.templateUi.other.holiday();
tests.templateUi.otherZone.addFailed();
tests.templateUi.otherWeek.addFailed();
tests.templateUi.otherSlideTZ.addFailed();
tests.templateUi.otherSlideW.addFailed();
tests.templateUi.otherTemplate.addFailed();
tests.templateUi.otherCommission.commission();
data.deleteDataTemplate();

closeBrowser();


