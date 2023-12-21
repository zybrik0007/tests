const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');

/*tests.scheduleUi.display();
tests.scheduleUi.add.TZMinParamsMinInterval();
tests.scheduleUi.add.TZMinParamsMaxInterval();
tests.scheduleUi.add.TZMaxParamsMaxInterval();
tests.scheduleUi.add.TZFailedTimeMinInterval();
tests.scheduleUi.add.TZFailedTimeMaxInterval();
tests.scheduleUi.add.TZMaxTimeFailed();
tests.scheduleUi.add.TZMaxIntervalFailed();
tests.scheduleUi.add.TZNoParams();
tests.scheduleUi.add.TZNoInterval();
tests.scheduleUi.add.TZNoName();
tests.scheduleUi.add.TZDuplicateTZ();
tests.scheduleUi.add.TZDuplicateWKsWKsTZ();
tests.scheduleUi.add.WMinParams();
tests.scheduleUi.add.WMinParamsMinInterval();
tests.scheduleUi.add.WMaxParams();
tests.scheduleUi.add.WNoName();
tests.scheduleUi.add.WDuplicateW();
tests.scheduleUi.add.WDuplicateTZKsWKsTZ();
tests.scheduleUi.add.STZMinParams();
tests.scheduleUi.add.STZMinEditInterval();
tests.scheduleUi.add.STZMinRemoveInterval();
tests.scheduleUi.add.STZMaxParams();
tests.scheduleUi.add.STZNoParams();
tests.scheduleUi.add.STZNoName();
tests.scheduleUi.add.STZNoInterval();
tests.scheduleUi.add.STZFailedInterval();
tests.scheduleUi.add.STZDuplicateSTZ();
tests.scheduleUi.add.STZDuplicateTZKsWsWK();
tests.scheduleUi.add.SWMinParams();
tests.scheduleUi.add.SWMinParamsDeleteWeek();
tests.scheduleUi.add.SWMaxParams();
tests.scheduleUi.add.SWSearch();
tests.scheduleUi.add.SWNoParams();
tests.scheduleUi.add.SWNoInterval();
tests.scheduleUi.add.SWNoName();
tests.scheduleUi.add.SWFailedInterval();
tests.scheduleUi.add.SWDuplicateSW();
tests.scheduleUi.add.SWDuplicateTZWSTZ();

tests.scheduleUi.edit.TZAddParamsMinParams();
tests.scheduleUi.edit.TZRemoveParamsMaxParams();
tests.scheduleUi.edit.TZEditAllMaxParams();
tests.scheduleUi.edit.TZRemoveAllMaxParams();
tests.scheduleUi.edit.TZRemoveName();
tests.scheduleUi.edit.TZRemoveInterval();
tests.scheduleUi.edit.TZDuplicateTZ();
tests.scheduleUi.edit.TZDuplicateWSTZSW();
tests.scheduleUi.edit.WAddParamsMinParams();
tests.scheduleUi.edit.WRemoveParamsMaxParams();
tests.scheduleUi.edit.WEditMaxParams();
tests.scheduleUi.edit.WRemoveName();
tests.scheduleUi.edit.WDuplicateW();
tests.scheduleUi.edit.WDuplicateTZSTZSW();
tests.scheduleUi.edit.STZAddParamsMinParams();
tests.scheduleUi.edit.STZRemoveParamsMaxParams();
tests.scheduleUi.edit.STZEditALLParamsMaxParams();
tests.scheduleUi.edit.STZEditNoName();
tests.scheduleUi.edit.STZEditNoNInterval();
tests.scheduleUi.edit.STZDuplicateSTZ();
tests.scheduleUi.edit.STZDuplicateTZKsWsWK();
tests.scheduleUi.edit.SWEditMinParams();
tests.scheduleUi.edit.SWEditMaxParams();
tests.scheduleUi.edit.SWEditAllParams();
tests.scheduleUi.edit.SWEditRemoveName();
tests.scheduleUi.edit.SWEditRemoveInterval();
tests.scheduleUi.edit.SWDuplicateSW();
tests.scheduleUi.edit.SWDuplicateTZWSTZ();


tests.scheduleUi.delete.deleteTZ();
tests.scheduleUi.delete.deleteW();
tests.scheduleUi.delete.deleteSTZ();
tests.scheduleUi.delete.deleteSW();
tests.scheduleUi.delete.deleteTZinW();
tests.scheduleUi.delete.deleteTZinSTZ();
tests.scheduleUi.delete.deleteWinSW();

tests.scheduleUi.holiday.addIntervalMin();
tests.scheduleUi.holiday.editMaxParams();
tests.scheduleUi.holiday.addDuplicate();
tests.scheduleUi.holiday.deleteHoliday();

tests.scheduleUi.service.editNameAlways();
tests.scheduleUi.service.editDescriptionAlways();
tests.scheduleUi.service.deleteAlways();
tests.scheduleUi.service.editNameNever();
tests.scheduleUi.service.editDescriptionNever();
tests.scheduleUi.service.deleteNever();

tests.scheduleUi.search();

tests.scheduleUi.footer();

tests.scheduleUi.type();*/

//tests.scheduleUi.add.STZMinEditInterval();

/*tests.scheduleUi.edit.TZAddParamsMinParams();
tests.scheduleUi.edit.TZRemoveParamsMaxParams();
tests.scheduleUi.edit.TZEditAllMaxParams();
tests.scheduleUi.edit.TZRemoveAllMaxParams();
tests.scheduleUi.edit.TZRemoveName();
tests.scheduleUi.edit.TZRemoveInterval();
tests.scheduleUi.edit.TZDuplicateTZ();
tests.scheduleUi.edit.TZDuplicateWSTZSW();
tests.scheduleUi.edit.WAddParamsMinParams();
tests.scheduleUi.edit.WRemoveParamsMaxParams();
tests.scheduleUi.edit.WEditMaxParams();
tests.scheduleUi.edit.WRemoveName();
tests.scheduleUi.edit.WDuplicateW();
tests.scheduleUi.edit.WDuplicateTZSTZSW();
tests.scheduleUi.edit.STZAddParamsMinParams();
tests.scheduleUi.edit.STZRemoveParamsMaxParams();
tests.scheduleUi.edit.STZEditALLParamsMaxParams();
tests.scheduleUi.edit.STZEditNoName();
tests.scheduleUi.edit.STZEditNoNInterval();
tests.scheduleUi.edit.STZDuplicateSTZ();
tests.scheduleUi.edit.STZDuplicateTZKsWsWK();
tests.scheduleUi.edit.SWEditMinParams();
tests.scheduleUi.edit.SWEditMaxParams();
tests.scheduleUi.edit.SWEditAllParams();
tests.scheduleUi.edit.SWEditRemoveName();
tests.scheduleUi.edit.SWEditRemoveInterval();
tests.scheduleUi.edit.SWDuplicateSW();
tests.scheduleUi.edit.SWDuplicateTZWSTZ();*/

//tests.templateUi.addParams();


//tests.scheduleUi.add.STZMinEditInterval();
//tests.scheduleUi.add.SWNoInterval();
//tests.scheduleUi.add.SWFailedInterval();
//tests.scheduleUi.edit.SWEditMaxParams();
//tests.scheduleUi.edit.SWEditRemoveName();
//tests.divisionUi.import.importXLSXMaxParamsNoName();

//tests.templateUi.add.addMinParams();
//tests.templateUi.deleteParams();

//tests.premiseAccessUi.addData();
/*tests.premiseAccessUi.otherAll().printTable();
tests.premiseAccessUi.otherAll().exportCSV();
tests.premiseAccessUi.otherStaff().exportCSV();
tests.premiseAccessUi.otherStaff().printTable();
tests.premiseAccessUi.otherStaff().exportXLSX();
tests.premiseAccessUi.otherStaff().exportCSV();
tests.premiseAccessUi.otherVisitor().printTable();
tests.premiseAccessUi.otherVisitor().exportXLSX();
tests.premiseAccessUi.otherVisitor().exportCSV();*/
//tests.verificationJournalUi.other().exportXLSX();
//require('../ui/src/handlers/module-specs/data').addDataControlAccess();
//tests.premiseAccessUi.otherAll().exportXLSX();
tests.divisionUi.add.addFormsMaxParams();
//require('../ui/src/handlers/module-specs/data').deleteDataControlAccess();



closeBrowser();