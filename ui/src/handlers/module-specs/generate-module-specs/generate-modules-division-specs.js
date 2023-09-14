const path = require('path')
const {generationSpec, removeSpecs, generationJSON, integrateJSON} = require('../../other/module-spec-generation');
const pathFile = 'console.log = function () {};\nrequire(\'../../../../../ui/src/handlers/module-specs\')'

const arrayDivision = [
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
        name: 'divisionUi.edit.editDuplicateTwoLevel.spec.js',
        script: `${pathFile}.divisionUi.edit.editDuplicateTwoLevel()`
    },
    {
        name: 'divisionUi.delete.deleteLevelOne.spec.js',
        script: `${pathFile}.divisionUi.delete.deleteLevelOne()`
    },
    {
        name: 'divisionUi.delete.deleteLevelOneFailed.spec.js',
        script: `${pathFile}.divisionUi.delete.deleteLevelTwo()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwo.spec.js',
        script: `${pathFile}.divisionUi.delete.deleteLevelOneFailed()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwoFailed.spec.js',
        script: `${pathFile}.divisionUi.delete.deleteLevelTwoFailed()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwoFailed.spec.js',
        script: `${pathFile}.divisionUi.delete.deleteStaffFailed()`
    },
    {
        name: 'divisionUi.delete.deleteLevelTwoFailed.spec.js',
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
        name: 'divisionUi.printTree.printTreeMinParams.spec.js',
        script: `${pathFile}.divisionUi.printTree.printTreeMaxParams()`
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

