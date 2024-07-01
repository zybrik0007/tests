const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const imp = require('../../../../upload-files');
const oth = require('../../../other/other');
const api = require('../../../other/api');
const deleteData = require('../../../other/deleteData');
const decItApi = require('../../../../dictionaries/decorate-it-api');
const decorate = require('../../../../decorates');
const db = require('../../../../database');
const data = require('../../data').dataPosition;


const bef = () => before('Вход и открытие подраздела "Должности"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword)
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
    await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
    await dec.simple(page.position.init, [entry.max], page.position)
});
const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exitNoLoader();
});

const other = () => {

    const add = () => describe('Персонал / Должности. Добавление.', () => {
        describe('Добавление', () => {
            bef();
            aft();
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.addPosition.init({
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.position1.name,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.addPosition.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должности',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.position1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 2,
                    value: '',
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
                decorate.modal.editPosition.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.getValue({
                    title: 'Название',
                    placeholder: '',
                    value: data.position1.name,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Описание',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.editPosition.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.editPosition.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        });
    });

    const addDuplicate = () => describe('Персонал / Должности. Попытка дублирования.', () => {
        bef();
        aft();
        decorate.el.butIcBefore.handler({
            icon: but.add,
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.modal.addPosition.init({
            timeout: entry.max
        });
        decorate.el.input.sendKeys({
            title: 'Название',
            placeholder: '',
            value: data.position1.name,
            timeout: entry.max
        });
        decorate.el.button.handler({
            name: 'Сохранить',
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.error.error({
            text: 'Должность с таким названием уже существует',
            timeout: entry.max
        });
        decorate.modal.addPosition.closeHandler({
            timeout: entry.max
        });
        decorate.modal.addPosition.initClose({
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
    });

    const edit = () => describe('Персонал / Должности. Редактирование.', () => {
        describe('Редактирование', () => {
            bef();
            aft();
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
            decorate.modal.editPosition.init({
                timeout: entry.max
            });
            decorate.el.input.backSpace({
                title: 'Название',
                placeholder: '',
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.position2.name,
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: 'Описание',
                placeholder: '',
                value: data.position2.description,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.editPosition.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должности',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.position2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.position2.description,
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
                decorate.modal.editPosition.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.getValue({
                    title: 'Название',
                    placeholder: '',
                    value: data.position2.name,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Описание',
                    placeholder: '',
                    value: data.position2.description,
                    timeout: entry.max
                });
                decorate.modal.editPosition.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.editPosition.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        });
    });

    const printTable = () => describe('Персонал / Должности. Проверка печати таблицы.', () => {
        bef();
        aft();

        describe('Открытие печатной формы', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.handler({
                name: 'Печать таблицы',
                timeout: entry.max
            });
            decorate.modal.printTable.init({
                timeout: entry.max
            });
        });

        describe('Проверка строки 1', () => {
            decorate.modal.printTable.cellGetText({
                head: 'Должности',
                str: 1,
                cell: 1,
                value: data.position2.name,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Описание',
                str: 1,
                cell: 2,
                value: data.position2.description,
                timeout: entry.max
            });
        });

        describe('Закрытие печатной формы', () => {
            decorate.modal.printTable.closeHandler({
                timeout: entry.max
            });
            decorate.modal.printTable.initClose({
                timeout: entry.max
            });
        });
    });

    const exportXLSX = () => describe('Персонал / Должности. Проверка экспорта в XLSX.', () => {
        const params = {
            nameFile: 'position.xlsx',
            json: [
                { 'Отчет "Должности"': 'Должность', __EMPTY: 'Описание' },
                {
                    'Отчет "Должности"': 'positionName2',
                    __EMPTY: 'positionDescription2'
                }
            ]
        }

        bef();
        aft();

        describe('Экспорт', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.handler({
                name: 'Экспорт',
                timeout: entry.max
            });
            decorate.modal.exportData.init({
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Выберите тип файла для экспорта',
                value: 'XLSX',
                text: 'XLSX',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Имя выходного файла',
                placeholder: 'Определяется системой',
                value: '',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Заголовок',
                value: 'Добавить заголовок к файлу',
                text: 'Добавить заголовок к файлу',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Экспортировать',
                timeout: entry.max
            });
            decorate.modal.exportData.initClose({
                timeout: entry.max
            });
        });

        describe('Проверка файла', () => {
            decorate.el.file.display({
                file: params.nameFile,
                timeout: entry.upload
            });
            decorate.el.file.comparison({
                file: params.nameFile,
                json: params.json
            });
            decorate.el.file.delete({
                file: params.nameFile,
                timeout: entry.upload
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const exportCSV = () => describe('Персонал / Должности. Проверка экспорта в CSV.', () => {
        const params = {
            nameFile: 'position.csv',
            json: [
                { 'Должность': 'positionName2', 'Описание': 'positionDescription2' }
            ]
        }

        bef();
        aft();

        describe('Экспорт', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.handler({
                name: 'Экспорт',
                timeout: entry.max
            });
            decorate.modal.exportData.init({
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Выберите тип файла для экспорта',
                value: 'XLSX',
                text: 'CSV',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Имя выходного файла',
                placeholder: 'Определяется системой',
                value: '',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Экспортировать',
                timeout: entry.max
            });
            decorate.modal.exportData.initClose({
                timeout: entry.max
            });
        });

        describe('Проверка файла', () => {
            decorate.el.file.display({
                file: params.nameFile,
                timeout: entry.upload
            });
            decorate.el.file.comparison({
                file: params.nameFile,
                json: params.json
            });
            decorate.el.file.delete({
                file: params.nameFile,
                timeout: entry.upload
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const importFile = () => describe('Персонал / Должности. Проверка импорта.', () => {
        describe('Импорт', () => {
            bef();
            aft();
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.handler({
                name: 'Импорт из XLS, XLSX',
                timeout: entry.max
            });
            decorate.modal.importFile.init({
                timeout: entry.max
            });
            decorate.modal.importFile.uploadFile({
                src: imp.position.importPosition,
                timeout: entry.upload
            });
            decorate.el.select.iconXpand({
                title: 'Должность',
                value: '',
                text: 'Должность1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Описание',
                value: '',
                text: 'Описание1',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Далее',
                timeout: entry.max
            });
            decorate.el.button.button({
                name: 'Готово',
                timeout: entry.max
            });
            decorate.modal.importFile.bodyGetText({
                value: 'Импорт завершен',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Готово',
                timeout: entry.max
            });
            decorate.modal.importFile.initClose({
                timeout: entry.max
            });
        });

        describe('Проверка', () => {
            bef();
            aft();
            decorate.el.table.size({
                strCount: 2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Должности',
                strNumber: 1,
                cellNumber: 1,
                value: data.position1.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Описание',
                strNumber: 1,
                cellNumber: 2,
                value: data.position1.description,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Должности',
                strNumber: 2,
                cellNumber: 1,
                value: data.position2.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Описание',
                strNumber: 2,
                cellNumber: 2,
                value: data.position2.description,
                timeout: entry.max
            });
        });
    });

    const search = () => describe('Персонал / Должности. Проверка филтра "Поиск".', () => {

        bef();
        aft();

        describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
            decorate.el.table.size({
                strCount: 2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Должности',
                strNumber: 1,
                cellNumber: 1,
                value: data.position1.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Должности',
                strNumber: 2,
                cellNumber: 1,
                value: data.position2.name,
                timeout: entry.max
            });
        });

        describe(`Ввод в фильтр "${data.position2.name}"`, () => {
            decorate.el.input.sendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.position2.name,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы после измпользования фильтра "Поиск..."', () => {
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Должности',
                strNumber: 1,
                cellNumber: 1,
                value: data.position2.name,
                timeout: entry.max
            });
        });

        describe(`Удаление "${data.position2.name}" из фильтра "Поиск..." и проверка таблицы`, () => {
            decorate.el.input.backSpace({
                title: '',
                placeholder: 'Поиск...',
                timeout: entry.max
            });
            dec.animation();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.table.size({
                strCount: 2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Должности',
                strNumber: 1,
                cellNumber: 1,
                value: data.position1.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Должности',
                strNumber: 2,
                cellNumber: 1,
                value: data.position2.name,
                timeout: entry.max
            });
        });
    });

    const importFailed = () => describe('Персонал / Должности. Проверка импорта с ошибкой - дублирование.', () => {
        const params = {
            fileName: 'unimported.xlsx',
            json: [
                {
                    'Отчет "Неимпортированные данные"': 'Должность1',
                    __EMPTY: 'Описание1',
                    __EMPTY_1: 'Ошибка'
                },
                {
                    'Отчет "Неимпортированные данные"': 'positionName2',
                    __EMPTY: 'positionDescription2',
                    __EMPTY_1: 'Такая должность уже существует'
                }
            ]
        }

        bef();
        aft();

        describe('Импорт', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.handler({
                name: 'Импорт из XLS, XLSX',
                timeout: entry.max
            });
            decorate.modal.importFile.init({
                timeout: entry.max
            });
            decorate.modal.importFile.uploadFile({
                src: imp.position.importPositionFailed,
                timeout: entry.upload
            });
            decorate.el.select.iconXpand({
                title: 'Должность',
                value: '',
                text: 'Должность1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Описание',
                value: '',
                text: 'Описание1',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Далее',
                timeout: entry.max
            });
            decorate.el.button.button({
                name: 'Экспорт остатка в файл',
                timeout: entry.max
            });
            decorate.modal.importFile.bodyGetText({
                value: 'Импорт завершен. 1 записей из 1 не было импортировано',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Экспорт остатка в файл',
                timeout: entry.max
            });
            decorate.modal.importFile.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы', () => {
            decorate.el.table.size({
                strCount: 2,
                timeout: entry.max
            });
        });

        describe('Проверка файла с ошибками', () => {
            decorate.el.file.display({
                file: params.fileName,
                timeout: entry.upload
            });
            decorate.el.file.comparison({
                file: params.fileName,
                json: params.json
            });
            decorate.el.file.delete({
                file: params.fileName,
                timeout: entry.upload
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const deleted = () => describe('Персонал / Должности. Удаление.', () => {

        describe('Удаление должсноти 1', () => {
            bef();
            aft();
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Удалить',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Удаление должсноти 2', () => {
            bef();
            aft();
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Удалить',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы', () => {
            bef();
            aft();
            decorate.el.table.noStr({
                timeout: entry.max
            });
        });
    });

    const deletedStaff = () => describe('Персонал / Должности. Удаление должности, добавленной сотруднику.', () => {
        bef();
        aft();
        decorate.el.table.strHandler({
            strNumber: 1,
            timeout: entry.max
        });
        decorate.el.butIcBefore.handler({
            icon: but.delete,
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.button.handler({
            name: 'Удалить',
            timeout: entry.max
        });
        decorate.el.error.error({
            text: 'Должность используется и не может быть удалена',
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
    });

    return {
        add,
        addDuplicate,
        edit,
        printTable,
        exportXLSX,
        exportCSV,
        importFile,
        search,
        importFailed,
        deleted,
        deletedStaff
    }
}


module.exports = {
    other: other(),
    befPosition: () => bef()
}
