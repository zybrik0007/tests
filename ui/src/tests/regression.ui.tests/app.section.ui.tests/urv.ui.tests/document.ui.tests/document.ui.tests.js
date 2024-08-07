const {describe} = require('mocha');

const entry = require('../../../../../../../entry');
const but = require('../../../../../dictionaries/button-icon');
const decorate = require('../../../../../decorates');
const data = require('./document.data');

const befJustification = () => decorate.befAft.before.beforeDocumentJustification();
const befOvertime = () => decorate.befAft.before.beforeDocumentOvertime();
const befExplanatory = () => decorate.befAft.before.beforeDocumentExplanatory();
const aft = () => decorate.befAft.after.after();

const test = (type, text) => {

    const addDocument = () => describe(text + ' Добавление.', () => {
        if(type === 'justification') {
            describe('Добавление', () => {
                befJustification();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.docJustification.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Название документа',
                    placeholder: '',
                    value: data.doc.justification.name,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: 'Номер для сортировки',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Номер для сортировки',
                    placeholder: '',
                    value: data.doc.justification.sortNumber,
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: 'Код документа буквенный',
                    placeholder: '',
                    value: data.doc.justification.codeArticle,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: 'Код документа числовой',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Код документа числовой',
                    placeholder: '',
                    value: data.doc.justification.codeNumber,
                    timeout: entry.max
                });

                decorate.el.select.iconXpand({
                    title: 'Добавлять к рабочему времени',
                    value: 'Нет',
                    text: data.doc.justification.addWorkTime,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Способ исчисления',
                    value: 'В рабочих днях',
                    text: data.doc.justification.workCount,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modal.docJustification.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы и параметров', () => {
                befJustification();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Название типа документа',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.doc.justification.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Порядок сортировки',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.doc.justification.sortNumber,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Код документа буквенный',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.doc.justification.codeArticle,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Код документа числовой',
                        strNumber: 1,
                        cellNumber: 4,
                        value: data.doc.justification.codeNumber,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Добавляется к рабочему времени',
                        strNumber: 1,
                        cellNumber: 5,
                        value: data.doc.justification.addWorkTime,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Способ исчисления',
                        strNumber: 1,
                        cellNumber: 6,
                        value: data.doc.justification.workCount,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.docJustification.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название документа',
                        placeholder: '',
                        value: data.doc.justification.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Номер для сортировки',
                        placeholder: '',
                        value: data.doc.justification.sortNumber,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Код документа буквенный',
                        placeholder: '',
                        value: data.doc.justification.codeArticle,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Код документа числовой',
                        placeholder: '',
                        value: data.doc.justification.codeNumber,
                        timeout: entry.max
                    });
                    decorate.el.select.getText({
                        title: 'Добавлять к рабочему времени',
                        value: data.doc.justification.addWorkTime,
                        timeout: entry.max
                    });
                    decorate.el.select.getText({
                        title: 'Способ исчисления',
                        value: data.doc.justification.workCount,
                        timeout: entry.max
                    });
                    decorate.modal.docJustification.closeHandler({
                        timeout: entry.max
                    });
                    decorate.modal.docJustification.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }

        if(type === 'overtime') {
            describe('Добавление', () => {
                befOvertime();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.docOvertime.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Имя',
                    placeholder: '',
                    value: data.doc.overtime.name,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: 'Номер для сортировки',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Номер для сортировки',
                    placeholder: '',
                    value: data.doc.overtime.sortNumber,
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: 'Буквенный код',
                    placeholder: '',
                    value: data.doc.overtime.codeArticle,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: 'Цифровой код',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Цифровой код',
                    placeholder: '',
                    value: data.doc.overtime.codeNumber,
                    timeout: entry.max
                });

                decorate.el.select.iconXpand({
                    title: 'Сверхурочные в праздничные и выходные дни',
                    value: 'Нет',
                    text: data.doc.overtime.over,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modal.docOvertime.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы и параметров', () => {
                befOvertime();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Название типа документа',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.doc.overtime.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Порядок сортировки',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.doc.overtime.sortNumber,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Код документа буквенный',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.doc.overtime.codeArticle,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Код документа числовой',
                        strNumber: 1,
                        cellNumber: 4,
                        value: data.doc.overtime.codeNumber,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Сверхурочные в праздничные и выходные дни',
                        strNumber: 1,
                        cellNumber: 5,
                        value: 'Сверхурочные',
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.docOvertime.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя',
                        placeholder: '',
                        value: data.doc.overtime.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Номер для сортировки',
                        placeholder: '',
                        value: data.doc.overtime.sortNumber,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Буквенный код',
                        placeholder: '',
                        value: data.doc.overtime.codeArticle,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Цифровой код',
                        placeholder: '',
                        value: data.doc.overtime.codeNumber,
                        timeout: entry.max
                    });
                    decorate.el.select.getText({
                        title: 'Сверхурочные в праздничные и выходные дни',
                        value: data.doc.overtime.over,
                        timeout: entry.max
                    });
                    decorate.modal.docOvertime.closeHandler({
                        timeout: entry.max
                    });
                    decorate.modal.docOvertime.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }

        if(type === 'explanatory') {
            describe('Добавление', () => {
                befExplanatory();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.docExplanatory.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Имя',
                    placeholder: '',
                    value: data.doc.explanatory.name,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modal.docExplanatory.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы и параметров', () => {
                befExplanatory();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Название',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.doc.explanatory.name,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.docExplanatory.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя',
                        placeholder: '',
                        value: data.doc.explanatory.name,
                        timeout: entry.max
                    });
                    decorate.modal.docExplanatory.closeHandler({
                        timeout: entry.max
                    });
                    decorate.modal.docExplanatory.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }
    });

    const editDocument = () => describe(text + ' Редактирование.', () => {
        if(type === 'justification') {
            describe('Редактирование', () => {
                befJustification();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.modal.docJustification.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.input.backSpace({
                    title: 'Название документа',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название документа',
                    placeholder: '',
                    value: data.doc.justificationUpdate.name,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: 'Номер для сортировки',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Номер для сортировки',
                    placeholder: '',
                    value: data.doc.justificationUpdate.sortNumber,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: 'Код документа буквенный',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Код документа буквенный',
                    placeholder: '',
                    value: data.doc.justificationUpdate.codeArticle,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: 'Код документа числовой',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Код документа числовой',
                    placeholder: '',
                    value: data.doc.justificationUpdate.codeNumber,
                    timeout: entry.max
                });

                decorate.el.select.iconXpand({
                    title: 'Добавлять к рабочему времени',
                    value: data.doc.justification.addWorkTime,
                    text: data.doc.justificationUpdate.addWorkTime,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Способ исчисления',
                    value: 'В рабочих днях',
                    text: data.doc.justificationUpdate.workCount,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modal.docJustification.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы и параметров', () => {
                befJustification();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Название типа документа',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.doc.justificationUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Порядок сортировки',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.doc.justificationUpdate.sortNumber,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Код документа буквенный',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.doc.justificationUpdate.codeArticle,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Код документа числовой',
                        strNumber: 1,
                        cellNumber: 4,
                        value: data.doc.justificationUpdate.codeNumber,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Добавляется к рабочему времени',
                        strNumber: 1,
                        cellNumber: 5,
                        value: data.doc.justificationUpdate.addWorkTime,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Способ исчисления',
                        strNumber: 1,
                        cellNumber: 6,
                        value: data.doc.justificationUpdate.workCount,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.docJustification.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название документа',
                        placeholder: '',
                        value: data.doc.justificationUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Номер для сортировки',
                        placeholder: '',
                        value: data.doc.justificationUpdate.sortNumber,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Код документа буквенный',
                        placeholder: '',
                        value: data.doc.justificationUpdate.codeArticle,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Код документа числовой',
                        placeholder: '',
                        value: data.doc.justificationUpdate.codeNumber,
                        timeout: entry.max
                    });
                    decorate.el.select.getText({
                        title: 'Добавлять к рабочему времени',
                        value: data.doc.justificationUpdate.addWorkTime,
                        timeout: entry.max
                    });
                    decorate.el.select.getText({
                        title: 'Способ исчисления',
                        value: data.doc.justificationUpdate.workCount,
                        timeout: entry.max
                    });
                    decorate.modal.docJustification.closeHandler({
                        timeout: entry.max
                    });
                    decorate.modal.docJustification.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }

        if(type === 'overtime') {
            describe('Редактирование', () => {
                befOvertime();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.modal.docOvertime.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.input.backSpace({
                    title: 'Имя',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Имя',
                    placeholder: '',
                    value: data.doc.overtimeUpdate.name,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: 'Номер для сортировки',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Номер для сортировки',
                    placeholder: '',
                    value: data.doc.overtimeUpdate.sortNumber,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: 'Буквенный код',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Буквенный код',
                    placeholder: '',
                    value: data.doc.overtimeUpdate.codeArticle,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: 'Цифровой код',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Цифровой код',
                    placeholder: '',
                    value: data.doc.overtimeUpdate.codeNumber,
                    timeout: entry.max
                });

                decorate.el.select.iconXpand({
                    title: 'Сверхурочные в праздничные и выходные дни',
                    value: data.doc.overtime.over,
                    text: data.doc.overtimeUpdate.over,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modal.docOvertime.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы и параметров', () => {
                befOvertime();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Название типа документа',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.doc.overtimeUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Порядок сортировки',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.doc.overtimeUpdate.sortNumber,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Код документа буквенный',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.doc.overtimeUpdate.codeArticle,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Код документа числовой',
                        strNumber: 1,
                        cellNumber: 4,
                        value: data.doc.overtimeUpdate.codeNumber,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Сверхурочные в праздничные и выходные дни',
                        strNumber: 1,
                        cellNumber: 5,
                        value: data.doc.overtimeUpdate.over,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.docOvertime.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя',
                        placeholder: '',
                        value: data.doc.overtimeUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Номер для сортировки',
                        placeholder: '',
                        value: data.doc.overtimeUpdate.sortNumber,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Буквенный код',
                        placeholder: '',
                        value: data.doc.overtimeUpdate.codeArticle,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Цифровой код',
                        placeholder: '',
                        value: data.doc.overtimeUpdate.codeNumber,
                        timeout: entry.max
                    });
                    decorate.el.select.getText({
                        title: 'Сверхурочные в праздничные и выходные дни',
                        value: data.doc.overtimeUpdate.over,
                        timeout: entry.max
                    });
                    decorate.modal.docOvertime.closeHandler({
                        timeout: entry.max
                    });
                    decorate.modal.docOvertime.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }

        if(type === 'explanatory') {
            describe('Редактирование', () => {
                befExplanatory();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.modal.docExplanatory.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.backSpace({
                    title: 'Имя',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Имя',
                    placeholder: '',
                    value: data.doc.explanatoryUpdate.name,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modal.docExplanatory.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы и параметров', () => {
                befExplanatory();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Название',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.doc.explanatoryUpdate.name,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.docExplanatory.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя',
                        placeholder: '',
                        value: data.doc.explanatoryUpdate.name,
                        timeout: entry.max
                    });
                    decorate.modal.docExplanatory.closeHandler({
                        timeout: entry.max
                    });
                    decorate.modal.docExplanatory.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }
    });

    const deleteDocument = () => describe(text + ' Удаление.', () => {
        if(type === 'justification') {
            describe('Удаление', () => {
                befJustification();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.urvDocumentDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.urvDocumentDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы', () => {
                befJustification();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Название типа документа',
                    strNumber: 1,
                    cellNumber: 1,
                    value: 'Сокращенная продолжительность рабочего времени против нормальной продолжительности рабочего ' +
                        'дня в случаях, предусмотренных законодательством',
                    timeout: entry.max
                });
            });
        }

        if(type === 'overtime') {
            describe('Удаление', () => {
                befOvertime();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.urvDocumentDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.urvDocumentDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы', () => {
                befOvertime();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Название типа документа',
                    strNumber: 1,
                    cellNumber: 1,
                    value: 'Продолжительность работы в выходные и нерабочие праздничные дни',
                    timeout: entry.max
                });
            });
        }

        if(type === 'explanatory') {
            describe('Удаление', () => {
                befExplanatory();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.urvDocumentDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.urvDocumentDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы', () => {
                befExplanatory();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: 'Отпуск без сохранения ЗП',
                    timeout: entry.max
                });
            });
        }
    });

    return {
        addDocument,
        editDocument,
        deleteDocument
    }
};

module.exports = {
    testJustification: test('justification', 'УРВ / Оправдательные документы - вкладка "Оправдательные"'),
    testOvertime: test('overtime', 'УРВ / Оправдательные документы - вкладка "Сверхурочные"'),
    testExplanatory: test('explanatory', 'УРВ / Оправдательные документы - вкладка "Объяснительные"'),
}