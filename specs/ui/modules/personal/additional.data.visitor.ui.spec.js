const tests = require('../../../../ui/src/tests/regression.ui.tests/app.section.ui.tests/personal.ui.tests/additionaldata.ui.tests/additionaldata.ui.tests').visitor;
const closeBrowser = require('../../../../ui/src/decorates/other/closeBrowser');
const clearMemory = require('../../../../ui/src/decorates/other/clearMemory');


console.log = () => function () {};

// Отображение
JSON.parse(process.env.b001additionalDataUiDisplay) ? tests.display() : '';

// Добавление
JSON.parse(process.env.b002additionalDataUiAddTypeTextMinParams) ? tests.add.typeTextMinParams() : '';
JSON.parse(process.env.b003additionalDataUiAddTypeTextMaxParams) ? tests.add.typeTextMaxParams() : '';
JSON.parse(process.env.b004additionalDataUiAddTypeTextNoName) ? tests.add.typeTextNoName() : '';
JSON.parse(process.env.b005additionalDataUiAddTypeTextDuplicate) ? tests.add.typeTextDuplicate() : '';
JSON.parse(process.env.b006additionalDataUiAddTypeGraficMinParams) ? tests.add.typeGraficMinParams() : '';
JSON.parse(process.env.b007additionalDataUiAddTypeGraficMaxParams) ? tests.add.typeGraficMaxParams() : '';
JSON.parse(process.env.b008additionalDataUiAddTypeGraficNoName) ? tests.add.typeGraficNoName() : '';
JSON.parse(process.env.b009additionalDataUiAddTypeGraficDuplicate) ? tests.add.typeGraficDuplicate() : '';
JSON.parse(process.env.b010additionalDataUiAddTypeSelectMinParams) ? tests.add.typeSelectMinParams() : '';
JSON.parse(process.env.b011additionalDataUiAddTypeSelectMaxParams) ? tests.add.typeSelectMaxParams() : '';
JSON.parse(process.env.b012additionalDataUiAddTypeSelectNoName) ? tests.add.typeSelectNoName() : '';
JSON.parse(process.env.b013additionalDataUiAddTypeSelectDeleteBox) ? tests.add.typeSelectDeleteBox() : '';
JSON.parse(process.env.b014additionalDataUiAddTypeSelectNoValueBoxMinParams) ?
    tests.add.typeSelectNoValueBoxMinParams() : '';
JSON.parse(process.env.b015additionalDataUiAddTypeSelectNoValueBoxMaxParams) ?
    tests.add.typeSelectNoValueBoxMaxParams() : '';
clearMemory();
JSON.parse(process.env.b016additionalDataUiAddTypeSelectDuplicate) ? tests.add.typeSelectDuplicate() : '';
JSON.parse(process.env.b017additionalDataUiAddTypeCheckboxMinParams) ? tests.add.typeCheckboxMinParams() : '';
JSON.parse(process.env.b018additionalDataUiAddTypeCheckboxMaxParams) ? tests.add.typeCheckboxMaxParams() : '';
JSON.parse(process.env.b019additionalDataUiAddTypeCheckboxNoName) ? tests.add.typeCheckboxNoName() : '';
JSON.parse(process.env.b020additionalDataUiAddTypeCheckboxDuplicate) ? tests.add.typeCheckboxDuplicate() : '';
JSON.parse(process.env.b021additionalDataUiAddTypeDateMinParams) ? tests.add.typeDateMinParams() : '';
JSON.parse(process.env.b022additionalDataUiAddTypeDateMaxParams) ? tests.add.typeDateMaxParams() : '';
JSON.parse(process.env.b023additionalDataUiAddTypeDateNoName) ? tests.add.typeDateNoName() : '';
JSON.parse(process.env.b024additionalDataUiAddTypeDateDuplicate) ? tests.add.typeDateDuplicate() : '';
JSON.parse(process.env.b025additionalDataUiAddTypeDateTimeMinParams) ? tests.add.typeDateTimeMinParams() : '';
JSON.parse(process.env.b026additionalDataUiAddTypeDateTimeMaxParams) ? tests.add.typeDateTimeMaxParams() : '';
JSON.parse(process.env.b027additionalDataUiAddTypeDateTimeNoName) ? tests.add.typeDateTimeNoName() : '';
JSON.parse(process.env.b028additionalDataUiAddTypeDateTimeDuplicate) ? tests.add.typeDateTimeDuplicate() : '';
JSON.parse(process.env.b029additionalDataUiAddTextLimit) ? tests.add.textLimit() : '';
JSON.parse(process.env.b030additionalDataUiAddGraficLimit) ? tests.add.graficLimit() : '';
clearMemory();

// Редактирвоание
JSON.parse(process.env.b031additionalDataUiEditTypeTextMinParams) ? tests.edit.typeTextMinParams() : '';
JSON.parse(process.env.b032additionalDataUiEditTypeTextMaxParams) ? tests.edit.typeTextMaxParams() : '';
JSON.parse(process.env.b033additionalDataUiEditTypeTextEditAllMaxParams) ? tests.edit.typeTextEditAllMaxParams() : '';
JSON.parse(process.env.b034additionalDataUiEditTypeTextRemoveName) ? tests.edit.typeTextRemoveName() : '';
JSON.parse(process.env.b035additionalDataUiEditTypeTextDuplicate) ? tests.edit.typeTextDuplicate() : '';
JSON.parse(process.env.b036additionalDataUiEditTypeGraficMinParams) ? tests.edit.typeGraficMinParams() : '';
JSON.parse(process.env.b037additionalDataUiEditTypeGraficMaxParams) ? tests.edit.typeGraficMaxParams() : '';
JSON.parse(process.env.b038additionalDataUiEditTypeGraficEditAllMaxParams) ? tests.edit.typeGraficEditAllMaxParams():'';
JSON.parse(process.env.b039additionalDataUiEditTypeGraficRemoveName) ? tests.edit.typeGraficRemoveName() : '';
JSON.parse(process.env.b040additionalDataUiEditTypeGraficDuplicate) ? tests.edit.typeGraficDuplicate() : '';
JSON.parse(process.env.b041additionalDataUiEditTypeSelectMinParams) ? tests.edit.typeSelectMinParams() : '';
JSON.parse(process.env.b042additionalDataUiEditTypeSelectMaxParams) ? tests.edit.typeSelectMaxParams() : '';
JSON.parse(process.env.b043additionalDataUiEditTypeSelectEditAllMaxParams) ? tests.edit.typeSelectEditAllMaxParams():'';
JSON.parse(process.env.b044additionalDataUiEditTypeSelectRemoveValueMinParams)
    ? tests.edit.typeSelectRemoveValueMinParams() : '';
JSON.parse(process.env.b045additionalDataUiEditTypeSelectRemoveValueMaxParams)
    ? tests.edit.typeSelectRemoveValueMaxParams() : '';
clearMemory();
JSON.parse(process.env.b046additionalDataUiEditTypeSelectRemoveName) ? tests.edit.typeSelectRemoveName() : '';
JSON.parse(process.env.b047additionalDataUiEditTypeSelectDuplicate) ? tests.edit.typeSelectDuplicate() : '';
JSON.parse(process.env.b048additionalDataUiEditTypeCheckboxMinParams) ? tests.edit.typeCheckboxMinParams() : '';
JSON.parse(process.env.b049additionalDataUiEditTypeCheckboxMaxParams) ? tests.edit.typeCheckboxMaxParams() : '';
JSON.parse(process.env.b050additionalDataUiEditTypeCheckboxEditAllParams) ? tests.edit.typeCheckboxEditAllParams() : '';
JSON.parse(process.env.b051additionalDataUiEditTypeCheckboxRemoveName) ? tests.edit.typeCheckboxRemoveName() : '';
JSON.parse(process.env.b052additionalDataUiEditTypeCheckboxDuplicate) ? tests.edit.typeCheckboxDuplicate() : '';
JSON.parse(process.env.b053additionalDataUiEditTypeDateMinParams) ? tests.edit.typeDateMinParams() : '';
clearMemory();
JSON.parse(process.env.b054additionalDataUiEditTypeDateMaxParams) ? tests.edit.typeDateMaxParams() : '';
JSON.parse(process.env.b055additionalDataUiEditTypeDateEditAllMaxParams) ? tests.edit.typeDateEditAllMaxParams() : '';
JSON.parse(process.env.b056additionalDataUiEditTypeDateRemoveName) ? tests.edit.typeDateRemoveName() : '';
JSON.parse(process.env.b057additionalDataUiEditTypeDateDuplicate) ? tests.edit.typeDateDuplicate() : '';
JSON.parse(process.env.b058additionalDataUiEditTypeDateTimeMinParams) ? tests.edit.typeDateTimeMinParams() : '';
JSON.parse(process.env.b059additionalDataUiEditTypeDateTimeMaxParams) ? tests.edit.typeDateTimeMaxParams() : '';
JSON.parse(process.env.b060additionalDataUiEditDateTimeEditAllMaxParams) ? tests.edit.typeDateTimeEditAllMaxParams():'';
JSON.parse(process.env.b061additionalDataUiEditTypeDateTimeRemoveName) ? tests.edit.typeDateTimeRemoveName() : '';
JSON.parse(process.env.b062additionalDataUiEditTypeDateTimeDuplicate) ? tests.edit.typeDateTimeDuplicate() : '';
clearMemory();

// Удаление
JSON.parse(process.env.b063additionalDataUiDeleteTypeTextDelete) ? tests.delete.typeTextDelete() : '';
JSON.parse(process.env.b064additionalDataUiDeleteTypeGraficDelete) ? tests.delete.typeGraficDelete() : '';
JSON.parse(process.env.b065additionalDataUiDeleteTypeSelectDelete) ? tests.delete.typeSelectDelete() : '';
JSON.parse(process.env.b066additionalDataUiDeleteTypeCheckboxDelete) ? tests.delete.typeCheckboxDelete() : '';
JSON.parse(process.env.b067additionalDataUiDeleteTypeDateDelete) ? tests.delete.typeDateDelete() : '';
JSON.parse(process.env.b068additionalDataUiDeleteDateTimeDelete) ? tests.delete.typeDateTimeDelete() : '';
clearMemory();

// Служебные поля
JSON.parse(process.env.b069additionalDataUiServicePhotoEditName) ? tests.service.photoEditName() : '';
JSON.parse(process.env.b070additionalDataUiServicePhotoEditDescription) ? tests.service.photoEditDescription() : '';
JSON.parse(process.env.b071additionalDataUiServicePhotoDelete) ? tests.service.photoDelete() : '';
JSON.parse(process.env.b072additionalDataUiServicePinCodeEditName) ? tests.service.pinCodeEditName() : '';
JSON.parse(process.env.b073additionalDataUiServicePinCodeEditDescription) ? tests.service.pinCodeEditDescription() : '';
JSON.parse(process.env.b074additionalDataUiServicePinCodeDelete) ? tests.service.pinCodeDelete() : '';
JSON.parse(process.env.b075additionalDataUiServiceEmailEditName) ? tests.service.emailEditName() : '';
JSON.parse(process.env.b076additionalDataUiServiceEmailEditDescription) ? tests.service.emailEditDescription() : '';
JSON.parse(process.env.b077additionalDataUiServiceEmailDelete) ? tests.service.emailDelete() : '';

// Тесты сортировки по столбцам
JSON.parse(process.env.b078additionalDataUiSort) ? tests.sort() : '';
clearMemory();

closeBrowser();






