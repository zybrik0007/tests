const path = require('path')
const {generationSpec, removeSpecs, generationJSON, integrateJSON} = require('../../other/module-spec-generation');

const arrayDivision = [
    {
        name: 'divisionUi.add.addMinParams.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.add.addMinParams()`
    },
    {
        name: 'divisionUi.add.addMaxParams.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.add.addMaxParams()`
    },
    {
        name: 'divisionUi.add.addFormsMaxParams.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.add.addFormsMaxParams()`
    },
    {
        name: 'divisionUi.add.addIncludeProgression.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.add.addIncludeProgression()`
    },
    {
        name: 'divisionUi.add.addDuplicateOneLevel.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.add.addDuplicateOneLevel()`
    },
    {
        name: 'divisionUi.add.addDuplicateTwoLevel.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.add.addDuplicateTwoLevel()`
    },
    {
        name: 'divisionUi.add.addNoName.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.add.addNoName()`
    },
    {
        name: 'divisionUi.edit.editMinParams.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.edit.editMinParams()`
    },
    {
        name: 'divisionUi.edit.editMaxParams.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.edit.editMaxParams()`
    },
    {
        name: 'divisionUi.edit.editAllParamsMaxParams.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.edit.editAllParamsMaxParams()`
    },
    {
        name: 'divisionUi.edit.editAllParamsFormsMaxParams.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.edit.editAllParamsFormsMaxParams()`
    },
    {
        name: 'divisionUi.edit.editHideShow.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.edit.editHideShow()`
    },
    {
        name: 'divisionUi.edit.editDuplicateOneLevel.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.edit.editDuplicateOneLevel()`
    },
    {
        name: 'divisionUi.edit.editDuplicateTwoLevel.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.edit.editDuplicateTwoLevel()`
    },
    {
        name: 'divisionUi.delete.deleteLevelOne.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.delete.deleteLevelOne()`
    },
    {
        name: 'divisionUi.delete.deleteLevelOneFailed.spec.js',
        script: `require('../../../../../ui/src/handlers/module-specs').divisionUi.delete.deleteLevelTwo()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwo.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.delete.deleteLevelOneFailed()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwoFailed.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.delete.deleteLevelTwoFailed()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwoFailed.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.delete.deleteStaffFailed()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwoFailed.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.delete.deleteVisitorFailed()`
    },
    {
        name: 'divisionUi.service.addDivision.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.service.addDivision()`
    },
    {
        name: 'divisionUi.service.editDivision.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.service.editDivision()`
    },
    {
        name: 'divisionUi.service.deleteDivision.spec.js',
        script: `require('../../../../../ui/src/handlers/module-specs').divisionUi.service.deleteDivision()`
    },
    {
        name: 'divisionUi.print.printMinParams.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.print.printMinParams()`
    },
    {
        name: 'divisionUi.print.printMaxParams.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.print.printMaxParams()`
    },
    {
        name: 'divisionUi.printTree.printTreeMinParams.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.printTree.printTreeMaxParams()`
    },
    {
        name: 'divisionUi.printTree.printTreeMinParams.spec.js',
        script: `console.log = function () {};\nrequire('../../../../../ui/src/handlers/module-specs').divisionUi.printTree.printTreeMaxParams()`
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

