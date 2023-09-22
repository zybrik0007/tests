const {generationSpec, removeSpecs, generationJSON, integrateJSON} = require('../../other/module-spec-generation');
const pathFile = 'console.log = function () {};\nrequire(\'../../../../../ui/src/handlers/module-specs\')'

const arrayDivision = [
    {
        name: 'divisionUi.display.spec.js',
        script: `${pathFile}.divisionUi.display()`
    },
    {
        name: 'divisionUi.add.addMinParams.spec.js',
        script: `${pathFile}.divisionUi.add.addMinParams()`
    },
    {
        name: 'divisionUi.add.addMaxParams.spec.js',
        script: `${pathFile}.divisionUi.add.addMaxParams()`
    },
    {
        name: 'divisionUi.add.addFormsMaxParams.spec.js',
        script: `${pathFile}.divisionUi.add.addFormsMaxParams()`
    },
    {
        name: 'divisionUi.add.addIncludeProgression.spec.js',
        script: `${pathFile}.divisionUi.add.addIncludeProgression()`
    },
    {
        name: 'divisionUi.add.addDuplicateOneLevel.spec.js',
        script: `${pathFile}.divisionUi.add.addDuplicateOneLevel()`
    },
    {
        name: 'divisionUi.add.addDuplicateTwoLevel.spec.js',
        script: `${pathFile}.divisionUi.add.addDuplicateTwoLevel()`
    },
    {
        name: 'divisionUi.add.addNoName.spec.js',
        script: `${pathFile}.divisionUi.add.addNoName()`
    },
    {
        name: 'divisionUi.edit.editMinParams.spec.js',
        script: `${pathFile}.divisionUi.edit.editMinParams()`
    },
    {
        name: 'divisionUi.edit.editMaxParams.spec.js',
        script: `${pathFile}.divisionUi.edit.editMaxParams()`
    },
    {
        name: 'divisionUi.edit.editAllParamsMaxParams.spec.js',
        script: `${pathFile}.divisionUi.edit.editAllParamsMaxParams()`
    },
    {
        name: 'divisionUi.edit.editAllParamsFormsMaxParams.spec.js',
        script: `${pathFile}.divisionUi.edit.editAllParamsFormsMaxParams()`
    },
    {
        name: 'divisionUi.edit.editHideShow.spec.js',
        script: `${pathFile}.divisionUi.edit.editHideShow()`
    },
    {
        name: 'divisionUi.edit.editDuplicateOneLevel.spec.js',
        script: `${pathFile}.divisionUi.edit.editDuplicateOneLevel()`
    },
    {
        name: 'divisionUi.edit.editNoName.spec.js',
        script: `${pathFile}.divisionUi.edit.editNoName()`
    },
    {
        name: 'divisionUi.edit.editDuplicateTwoLevel.spec.js',
        script: `${pathFile}.divisionUi.edit.editDuplicateTwoLevel()`
    },
    {
        name: 'divisionUi.delete.deleteLevelOne.spec.js',
        script: `${pathFile}.divisionUi.delete.deleteLevelOne()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwo.spec.js',
        script: `${pathFile}.divisionUi.delete.deleteLevelTwo()`
    },
    {
        name: 'divisionUi.delete.deleteLevelOneFailed.spec.js',
        script: `${pathFile}.divisionUi.delete.deleteLevelOneFailed()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwoFailed.spec.js',
        script: `${pathFile}.divisionUi.delete.deleteLevelTwoFailed()`
    },
    {
        name: 'divisionUi.delete.deleteStaffFailed.spec.js',
        script: `${pathFile}.divisionUi.delete.deleteStaffFailed()`
    },
    {
        name: 'divisionUi.delete.deleteVisitorFailed.spec.js',
        script: `${pathFile}.divisionUi.delete.deleteVisitorFailed()`
    },
    {
        name: 'divisionUi.service.addDivision.spec.js',
        script: `${pathFile}.divisionUi.service.addDivision()`
    },
    {
        name: 'divisionUi.service.editDivision.spec.js',
        script: `${pathFile}.divisionUi.service.editDivision()`
    },
    {
        name: 'divisionUi.service.deleteDivision.spec.js',
        script: `${pathFile}.divisionUi.service.deleteDivision()`
    },
    {
        name: 'divisionUi.print.printMinParams.spec.js',
        script: `${pathFile}.divisionUi.print.printMinParams()`
    },
    {
        name: 'divisionUi.print.printMaxParams.spec.js',
        script: `${pathFile}.divisionUi.print.printMaxParams()`
    },
    {
        name: 'divisionUi.printTree.printTreeMinParams.spec.js',
        script: `${pathFile}.divisionUi.printTree.printTreeMaxParams()`
    },
    {
        name: 'divisionUi.printTree.printTreeMaxParams.spec.js',
        script: `${pathFile}.divisionUi.printTree.printTreeMaxParams()`
    },

    {
        name: 'divisionUi.export.minXLSX.systemNameNoHead.spec.js',
        script: `${pathFile}.divisionUi.export.minXLSX.systemNameNoHead()`
    },
    {
        name: 'divisionUi.export.minXLSX.systemNameAddHead.spec.js',
        script: `${pathFile}.divisionUi.export.minXLSX.systemNameAddHead()`
    },
    {
        name: 'divisionUi.export.minXLSX.systemNameItHead.spec.js',
        script: `${pathFile}.divisionUi.export.minXLSX.systemNameItHead()`
    },
    {
        name: 'divisionUi.export.minXLSX.nameNoHead.spec.js',
        script: `${pathFile}.divisionUi.export.minXLSX.nameNoHead()`
    },
    {
        name: 'divisionUi.export.minXLSX.nameAddHead.spec.js',
        script: `${pathFile}.divisionUi.export.minXLSX.nameAddHead()`
    },
    {
        name: 'divisionUi.export.minXLSX.nameItHead.spec.js',
        script: `${pathFile}.divisionUi.export.minXLSX.nameItHead()`
    },

    {
        name: 'divisionUi.export.maxXLSX.systemNameNoHead.spec.js',
        script: `${pathFile}.divisionUi.export.maxXLSX.systemNameNoHead()`
    },
    {
        name: 'divisionUi.export.maxXLSX.systemNameAddHead.spec.js',
        script: `${pathFile}.divisionUi.export.maxXLSX.systemNameAddHead()`
    },
    {
        name: 'divisionUi.export.maxXLSX.systemNameItHead.spec.js',
        script: `${pathFile}.divisionUi.export.maxXLSX.systemNameItHead()`
    },
    {
        name: 'divisionUi.export.maxXLSX.nameNoHead.spec.js',
        script: `${pathFile}.divisionUi.export.maxXLSX.nameNoHead()`
    },
    {
        name: 'divisionUi.export.maxXLSX.nameAddHead.spec.js',
        script: `${pathFile}.divisionUi.export.maxXLSX.nameAddHead()`
    },
    {
        name: 'divisionUi.export.maxXLSX.nameItHead.spec.js',
        script: `${pathFile}.divisionUi.export.maxXLSX.nameItHead()`
    },

    {
        name: 'divisionUi.export.minCSV.systemNameNoHead.spec.js',
        script: `${pathFile}.divisionUi.export.minCSV.systemNameNoHead()`
    },
    {
        name: 'divisionUi.export.minCSV.nameNoHead.spec.js',
        script: `${pathFile}.divisionUi.export.minCSV.nameNoHead()`
    },

    {
        name: 'divisionUi.export.maxCSV.systemNameNoHead.spec.js',
        script: `${pathFile}.divisionUi.export.maxCSV.systemNameNoHead()`
    },
    {
        name: 'divisionUi.export.maxCSV.nameNoHead.spec.js',
        script: `${pathFile}.divisionUi.export.maxCSV.nameNoHead()`
    },

    {
        name: 'divisionUi.import.importXLSXMinParams.spec.js',
        script: `${pathFile}.divisionUi.import.importXLSXMinParam()`
    },
    {
        name: 'divisionUi.import.importXLSMinParams.spec.js',
        script: `${pathFile}.divisionUi.import.importXLSMinParams()`
    },
    {
        name: 'divisionUi.import.importXLSXMaxParams.spec.js',
        script: `${pathFile}.divisionUi.importXLSXMaxParams()`
    },
    {
        name: 'divisionUi.import.importXLSXMaxParamsNoName.spec.js',
        script: `${pathFile}.divisionUi.import.importXLSXMaxParamsNoName()`
    },
    {
        name: 'divisionUi.import.importXLSXMaxParamsNoParams.spec.js',
        script: `${pathFile}.divisionUi.import.importXLSXMaxParamsNoParams()`
    },
    {
        name: 'divisionUi.import.importProgression.spec.js',
        script: `${pathFile}.divisionUi.import.importProgression()`
    },
    {
        name: 'divisionUi.import.importDuplicateOneLevel.spec.js',
        script: `${pathFile}.divisionUi.import.importDuplicateOneLevel()`
    },
    {
        name: 'divisionUi.import.importDuplicateTwoLevel.spec.js',
        script: `${pathFile}.divisionUi.import.importDuplicateTwoLevel()`
    },
    {
        name: 'divisionUi.import.filterSearch.spec.js',
        script: `${pathFile}.divisionUi.filterSearch()`
    },
];

removeSpecs('../../../../../specs/ui/modules/personal/division/');

generationSpec(arrayDivision, '../../../../../specs/ui/modules/personal/division/');

generationJSON({
    pathSpec: '../../../../../specs/ui/modules/personal/division/',
    pathJson: '../json-specs/json/division-ui-json.json',
    pathPackage: 'specs/ui/modules/personal/division/'
});

integrateJSON('../module-specs/json-specs/json/division-ui-json.json');

