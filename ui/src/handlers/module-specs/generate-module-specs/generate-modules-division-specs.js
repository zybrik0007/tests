const path = require('path')
const {generationSpec, removeSpecs, generationJSON, integrateJSON} = require('../../other/module-spec-generation');

const arrayDivision = [
    {
        name: 'divisionUi.add.addMinParams.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.add.addMinParams()`
    },
    {
        name: 'divisionUi.add.addMaxParams.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.add.addMaxParams()`
    },
    {
        name: 'divisionUi.add.addFormsMaxParams.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.add.addFormsMaxParams()`
    },
    {
        name: 'divisionUi.add.addIncludeProgression.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.add.addIncludeProgression()`
    },
    {
        name: 'divisionUi.add.addDuplicateOneLevel.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.add.addDuplicateOneLevel()`
    },
    {
        name: 'divisionUi.add.addDuplicateTwoLevel.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.add.addDuplicateTwoLevel()`
    },
    {
        name: 'divisionUi.add.addNoName.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.add.addNoName()`
    },
    {
        name: 'divisionUi.edit.editMinParams.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.edit.editMinParams()`
    },
    {
        name: 'divisionUi.edit.editMaxParams.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.edit.editMaxParams()`
    },
    {
        name: 'divisionUi.edit.editAllParamsMaxParams.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.edit.editAllParamsMaxParams()`
    },
    {
        name: 'divisionUi.edit.editAllParamsFormsMaxParams.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.edit.editAllParamsFormsMaxParams()`
    },
    {
        name: 'divisionUi.edit.editHideShow.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.edit.editHideShow()`
    },
    {
        name: 'divisionUi.edit.editDuplicateOneLevel.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.edit.editDuplicateOneLevel()`
    },
    {
        name: 'divisionUi.edit.editDuplicateTwoLevel.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.edit.editDuplicateTwoLevel()`
    },
    {
        name: 'divisionUi.delete.deleteLevelOne.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.delete.deleteLevelOne()`
    },
    {
        name: 'divisionUi.delete.deleteLevelOneFailed.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.delete.deleteLevelTwo()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwo.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.delete.deleteLevelOneFailed()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwoFailed.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.delete.deleteLevelTwoFailed()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwoFailed.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.delete.deleteStaffFailed()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwoFailed.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.delete.deleteVisitorFailed()`
    },
    {
        name: 'divisionUi.service.addDivision.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.service.addDivision()`
    },
    {
        name: 'divisionUi.service.editDivision.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.service.editDivision()`
    },
    {
        name: 'divisionUi.service.deleteDivision.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.service.deleteDivision()`
    },
    {
        name: 'divisionUi.print.printMinParams.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.print.printMinParams()`
    },
    {
        name: 'divisionUi.print.printMaxParams.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.print.printMaxParams()`
    },
    {
        name: 'divisionUi.printTree.printTreeMinParams.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.printTree.printTreeMaxParams()`
    },
    {
        name: 'divisionUi.printTree.printTreeMinParams.spec.js',
        script: `require('../../../../../ui/src/handlers/soft').divisionUi.printTree.printTreeMaxParams()`
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

