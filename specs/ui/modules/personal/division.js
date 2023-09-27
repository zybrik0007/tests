const tests = require('../../../../ui/src/handlers/module-specs/specs/personal/division-ui');
const closeBrowser = require('../../../../ui/src/handlers/other/closeBrowser');

console.log('process.env: ', process.env);

console.log = () => function () {};

// Отображение
JSON.parse(process.env.b001divisionUiDisplay) ? tests.display() : '';

// Добавление
JSON.parse(process.env.b002divisionUiAddAddMinParams) ? tests.add.addMinParams() : '';
JSON.parse(process.env.b003divisionUiAddAddMaxParams) ? tests.add.addMaxParams() : '';
JSON.parse(process.env.b004divisionUiAddAddFormsMaxParams) ? tests.add.addFormsMaxParams() : '';
JSON.parse(process.env.b005divisionUiAddAddIncludeProgression) ? tests.add.addIncludeProgression() : '';
JSON.parse(process.env.b006divisionUiAddAddDuplicateOneLevel) ? tests.add.addDuplicateOneLevel(): '';
JSON.parse(process.env.b007divisionUiAddAddDuplicateTwoLevel) ? tests.add.addDuplicateTwoLevel(): '';
JSON.parse(process.env.b008divisionUiAddAddNoName) ? tests.add.addNoName(): '';

// Редактирвоание
JSON.parse(process.env.b009divisionUiEditEditMinParams) ? tests.edit.editMinParams(): '';
JSON.parse(process.env.b010divisionUiEditEditMaxParams) ? tests.edit.editMaxParams(): '';
JSON.parse(process.env.b011divisionUiEditEditAllParamsMaxParams) ? tests.edit.editAllParamsMaxParams(): '';
JSON.parse(process.env.b012divisionUiEditEditAllParamsFormsMaxParams) ? tests.edit.editAllParamsFormsMaxParams(): '';
JSON.parse(process.env.b013divisionUiEditEditHideShow) ? tests.edit.editHideShow(): '';
JSON.parse(process.env.b014divisionUiEditEditDuplicateOneLevel) ? tests.edit.editDuplicateOneLevel(): '';
JSON.parse(process.env.b015divisionUiEditEditDuplicateTwoLevel) ? tests.edit.editDuplicateTwoLevel(): '';
JSON.parse(process.env.b016divisionUiEditEditNoName) ? tests.edit.editNoName(): '';

// Удаление
JSON.parse(process.env.b017divisionUiDeleteDeleteLevelOne) ? tests.delete.deleteLevelOne(): '';
JSON.parse(process.env.b018divisionUiDeleteDeleteLevelOneFailed) ? tests.delete.deleteLevelOneFailed(): '';
JSON.parse(process.env.b019divisionUiDeleteDeleteLevelTwo) ? tests.delete.deleteLevelTwo(): '';
JSON.parse(process.env.b020divisionUiDeleteDeleteLevelTwoFailed) ? tests.delete.deleteLevelTwoFailed(): '';
JSON.parse(process.env.b021divisionUiDeleteDeleteStaffFailed) ? tests.delete.deleteStaffFailed(): '';
JSON.parse(process.env.b022divisionUiDeleteDeleteVisitorFailed) ? tests.delete.deleteVisitorFailed(): '';

// Администраторы системы
JSON.parse(process.env.b023divisionUiServiceAddDivision) ? tests.service.addDivision(): '';
JSON.parse(process.env.b024divisionUiServiceEditDivision) ? tests.service.editDivision(): '';
JSON.parse(process.env.b025divisionUiServiceDeleteDivision) ? tests.service.deleteDivision(): '';

// Печать
JSON.parse(process.env.b026divisionUiPrintPrintMinParams) ? tests.print.printMinParams(): '';
JSON.parse(process.env.b027divisionUiPrintPrintMaxParams) ? tests.print.printMaxParams(): '';

// Печать дерева
JSON.parse(process.env.b028divisionUiPrintTreePrintTreeMinParams) ? tests.printTree.printTreeMinParams(): '';
JSON.parse(process.env.b029divisionUiPrintTreePrintTreeMaxParams) ? tests.printTree.printTreeMaxParams(): '';

// Экспорт
JSON.parse(process.env.b030divisionUiExportMinXLSXSystemNameNoHead) ? tests.export.minXLSX.systemNameNoHead(): '';
JSON.parse(process.env.b031divisionUiExportMinXLSXSystemNameAddHead) ? tests.export.minXLSX.systemNameAddHead(): '';
JSON.parse(process.env.b032divisionUiExportMinXLSXSystemNameItHead) ? tests.export.minXLSX.systemNameItHead(): '';
JSON.parse(process.env.b033divisionUiExportMinXLSXNameNoHead) ? tests.export.minXLSX.nameNoHead(): '';
JSON.parse(process.env.b034divisionUiExportMinXLSXNameAddHead) ? tests.export.minXLSX.nameAddHead(): '';
JSON.parse(process.env.b035divisionUiExportMinXLSXNameItHead) ? tests.export.minXLSX.nameItHead(): '';
JSON.parse(process.env.b036divisionUiExportMaxXLSXSystemNameNoHead) ? tests.export.maxXLSX.systemNameNoHead(): '';
JSON.parse(process.env.b037divisionUiExportMaxXLSXSystemNameAddHead) ? tests.export.maxXLSX.systemNameAddHead(): '';
JSON.parse(process.env.b038divisionUiExportMaxXLSXSystemNameItHead) ? tests.export.maxXLSX.systemNameItHead(): '';
JSON.parse(process.env.b039divisionUiExportMaxXLSXNameNoHead) ? tests.export.maxXLSX.nameNoHead(): '';
JSON.parse(process.env.b040divisionUiExportMaxXLSXNameAddHead) ? tests.export.maxXLSX.nameAddHead(): '';
JSON.parse(process.env.b041divisionUiExportMaxXLSXNameItHead) ? tests.export.maxXLSX.nameItHead(): '';
JSON.parse(process.env.b042divisionUiExportMinCSVSystemNameNoHead) ? tests.export.minCSV.systemNameNoHead(): '';
JSON.parse(process.env.b043divisionUiExportMinCSVNameNoHead) ? tests.export.minCSV.nameNoHead(): '';
JSON.parse(process.env.b044divisionUiExportMaxCSVSystemNameNoHead) ? tests.export.maxCSV.systemNameNoHead(): '';
JSON.parse(process.env.b045divisionUiExportMaxCSVNameNoHead) ? tests.export.maxCSV.nameNoHead(): '';

// Импорт
JSON.parse(process.env.b046divisionUiImportImportXLSXMinParams) ? tests.import.importXLSXMinParams(): '';
JSON.parse(process.env.b047divisionUiImportImportXLSMinParams) ? tests.import.importXLSMinParams(): '';
JSON.parse(process.env.b048divisionUiImportImportXLSXMaxParams) ? tests.import.importXLSXMaxParams(): '';
JSON.parse(process.env.b049divisionUiImportImportXLSXMaxParamsNoName) ? tests.import.importXLSXMaxParamsNoName(): '';
JSON.parse(process.env.b050divisionUiImportImportXLSXMaxParamsNoParams) ? tests.import.importXLSXMaxParamsNoParams():'';
JSON.parse(process.env.b051divisionUiImportImportProgression) ? tests.import.importProgression(): '';
JSON.parse(process.env.b052divisionUiImportImportDuplicateOneLevel) ? tests.import.importDuplicateOneLevel(): '';
JSON.parse(process.env.b053divisionUiImportImportDuplicateTwoLevel) ? tests.import.importDuplicateTwoLevel(): '';

//Фильтр Поиск
JSON.parse(process.env.b054divisionUiFilterSearch) ? tests.filterSearch(): '';

closeBrowser();






















