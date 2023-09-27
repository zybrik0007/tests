const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const api = require('../../../other/api');
const imp = require('../../../../upload-files');
const deleteData = require('../../../other/deleteData');

const bef = () => before('���� � �������� ���������� "�������������"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.per.division, entry.max], el.subsection);
    await dec.simple(page.division.init, [entry.max], page.division);
});

const aft = () => after('�����', async () => await dec.exit());

//api ���������� �������������
const addDivision = (obj) => it('���������� �������������', async () => {
    const cook = await page.base.getCookie('token');
    await dec.simple(api.putDivision,
        [[obj], cook.text],
        api.putDivision);
});

// api ���������� ������� �������
const addAccessTemplate = (name, description) => it('���������� ������� �������', async () => {
    const cook = await page.base.getCookie('token');
    const obj ={
        name: name,
        comment: description,
        access: [
            {
                access_zone_id: 1,
                template_type: 0,
                rights: {
                    schedule_type_id: 1,
                    schedule_id: 1,
                    right_type: 1,
                    commission_type: 0,
                    is_guard: 0,
                    is_verify: 0,
                    is_antipass: 0,
                    commission_group_1: 0,
                    commission_group_2: 0,
                    verify_po_schedule: 0,
                    verify_vvu_schedule: 0,
                    verify_pdu_schedule: 0,
                    verify_alcobarier_schedule: 0
                }
            }
        ]
    };
    await dec.simple(api.putAccessTemplate,
        [[obj], cook.text],
        api.putAccessTemplate);
});

// api ���������� ����������
const addStaff = (lastName, firstName, middleName, divisionId, date) => it('���������� ����������', async () => {
    const cook = await page.base.getCookie('token');
    const obj = {
        "last_name": lastName,
        "first_name": firstName,
        "middle_name": middleName,
        "division": divisionId,
        "hiring_date": date,
    };
    await dec.simple(api.putStaff,
        [[obj], cook.text],
        api.putStaff);
});

// api ���������� ������� ������
const addSchedule = (name, description) => it('���������� ������� ������', async () => {
    const cook = await page.base.getCookie('token');
    const obj = {
        "name": name,
        "work_schedule_type_id": 4,
        "comment": description
    };
    await dec.simple(api.putSchedule,
        [[obj], cook.text],
        api.putSchedule);
});

// api �������� �������� ������
const deleteParams = () => describe('�������� �������� ������', () => {

    aft();
    bef();

    deleteData.deleteAccess();
    deleteData.deleteSchedule();
    deleteData.deleteStaff();
    deleteData.deleteVisitor();
    deleteData.deleteDivision();

});

//����������� ���������
const display = () => describe(`����������� �������� "�������������".`, () => {

    bef();
    aft();

    it('����������� "title", "url"', async () => await dec.simple(page.division.init,
        [entry.max],
        page.division));

    it('����������� ������� "��������" - �������', async () => await dec.simple(el.section.active,
        [sec.per, entry.max],
        el.section));

    it('����������� ���������� "�������������" - �������', async () => await dec.simple(el.subsection.active,
        [sub.per.division, entry.max],
        el.section));

    it('����������� "��������" � �������� ���������', async () => await dec.simpleText(el.subsection.headerGetText,
        [entry.max],
        '��������',
        el.subsection));

    it('����������� "�������������" � ��������', async () => await dec.simpleText(el.header.getText,
        [entry.max],
        '�������������',
        el.header));

    it('����������� ��� ������������ � ��������', async () => await dec.simpleText(el.header.userGetText,
        [entry.max],
        entry.user,
        el.header));

    it('����������� ������ "��������" - �������', async () => await dec.simple(el.butIcBefore.active,
        [but.add, entry.max],
        el.butIcBefore));

    it('����������� ������ "�������������" - �� �������', async () => await dec.simple(el.butIcBefore.disabled,
        [but.edit, entry.max],
        el.butIcBefore));

    it('����������� ������ "�������" - �� �������', async () => await dec.simple(el.butIcBefore.disabled,
        [but.delete, entry.max],
        el.butIcBefore));

    it('����������� ������ "����" - �������', async () => await dec.simple(el.butIcBefore.active,
        [but.menu, entry.max],
        el.butIcBefore));

    it('����������� ������� "�����..."', async () => await dec.simple(el.input.input,
        ['', '�����...', entry.max],
        el.input));

    it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
        [but.menu, entry.max],
        el.butIcBefore));

    it('����������� "����"', async () => await dec.simple(el.menu.menu,
        [entry.max],
        el.menu));

    it('����������� "������ �������" - �������', async () => await dec.simple(el.menu.itemActive,
        ['������ �������', entry.max],
        el.menu));

    it('����������� "������ ������" - �������', async () => await dec.simple(el.menu.itemActive,
        ['������ ������', entry.max],
        el.menu));

    it('����������� "�������" - �������', async () => await dec.simple(el.menu.itemActive,
        ['�������', entry.max],
        el.menu));

    it('����������� "������ �� XLS, XLSX" - �������', async () => await dec.simple(el.menu.itemActive,
        ['������ �� XLS, XLSX', entry.max],
        el.menu));

    it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
        [[ "�������������� �������"], entry.max],
        page.division));
});

// ����� ����������
const add = () => {

    // ���������� ������������� � ��������� ������������� � ����������� ����������� ����������.
    const addMinParams = () => describe('�������������. ����������. ���������� ������������ 1 ������ � ������������� '+
        '2 ������ � ����������� ����������� ����������.', () => {

        const params = {
            name1: 'addMinParamsName1',
            name2: 'addMinParamsName2',
        };

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[ "�������������� �������"], entry.max],
                page.division));

        });

        describe('���������� �������������', () => {
            bef();
            aft();

            describe('���������� ������������� 1 ������', () => {

                it('������� ����� "��������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('���� "�������������"', async () => await dec.simple(el.input.sendKeys,
                    ['�������������', '', params.name1, entry.max],
                    el.input));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('������������ ������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

            });

            describe('���������� ������������� 2 ������', () => {

                it('������� �� ������������� 1 ������', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('������������� 1 ������ �������', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('������� ����� "��������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('���� "�������������"', async () => await dec.simple(el.input.sendKeys,
                    ['�������������', '', params.name2, entry.max],
                    el.input));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('������������ ������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));
            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));
            });
        });

        describe('�������� ����������', () => {

            bef();
            aft();

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������������', '', entry.max],
                    params.name1,
                    el.input));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleFalse(el.selectMulti.getText,
                    ['������ ������� ��� ����������', 1, entry.min],
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������������', '', entry.max],
                    params.name2,
                    el.input));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleFalse(el.selectMulti.getText,
                    ['������ ������� ��� ����������', 1, entry.min],
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));

                it('������� ������ �������� ���������� ����', async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                    [entry.max],
                    el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });

        });

        deleteParams();

    });

    // ���������� ������������� � ��������� ������������� � ������������ ����������� ����������.
    const addMaxParams = () => describe('�������������. ����������. ���������� ������������� 1 ������ � ������������� ' +
        '2 ������ � ������������ ����������� ����������.', () => {

        const params = {
            division1: {
                name: 'addMaxParamsName1',
                phone: 'addMaxParamsPhone1',
                description: 'addMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'addMaxParamsName2',
                phone: 'addMaxParamsPhone2',
                description: 'addMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
        };

        describe('API - ����������', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[ "�������������� �������"], entry.max],
                page.division));

        });

        describe('���������� �������������', () => {
            bef();
            aft();

            describe('���������� ������������� 1 ������', () => {

                it('������� ����� "��������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('���� "�������������"', async () => await dec.simple(el.input.sendKeys,
                    ['�������������', '', params.division1.name, entry.max],
                    el.input));

                it('���� "�������"', async () => await dec.simple(el.input.sendKeys,
                    ['�������', '', params.division1.phone, entry.max],
                    el.input));

                it('���� "��������"', async () => await dec.simple(el.input.sendKeys,
                    ['��������', '', params.division1.description, entry.max],
                    el.input));

                it('����� "��������������"', async () => await dec.simple(el.select.iconXpand,
                    ['��������������', '',
                        `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('����� �������� 1 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.division1.template1, entry.max],
                        el.selectMulti));

                it('����� �������� 2 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.division1.template2, entry.max],
                        el.selectMulti));

                it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                    ['������ ������� ��� ����������', '', params.division1.template3, entry.max],
                    el.select));

                it('����� "������ ������"', async () => await dec.simple(el.select.iconXpand,
                    ['������ ������', '', params.division1.schedule, entry.max],
                    el.select));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('������������ ������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

            });

            describe('���������� ������������� 2 ������', () => {

                it('������� �� ������������� 1 ������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� 1 ������ �������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "��������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('���� "�������������"', async () => await dec.simple(el.input.sendKeys,
                    ['�������������', '', params.division2.name, entry.max],
                    el.input));

                it('���� "�������"', async () => await dec.simple(el.modal.divisionAdd.inputSendKeys,
                    ['�������', '', params.division2.phone, entry.max],
                    el.modal.divisionAdd));

                it('���� "��������"', async () => await dec.simple(el.modal.divisionAdd.inputSendKeys,
                    ['��������', '', params.division2.description, entry.max],
                    el.modal.divisionAdd));

                it('����� "��������������"', async () => await dec.simple(el.select.iconXpand,
                    ['��������������', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    el.select));

                it('�������� �������� 2 � "������ ������� ��� ����������"',
                    async () => await  dec.simple(el.selectMulti.delete,
                        ['������ ������� ��� ����������', 2, entry.max],
                        el.selectMulti));

                it('�������� �������� 1 � "������ ������� ��� ����������"',
                    async () => await  dec.simple(el.selectMulti.delete,
                        ['������ ������� ��� ����������', 1, entry.max],
                        el.selectMulti));

                it('����� �������� 1 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.division2.template1, entry.max],
                        el.selectMulti));

                it('����� �������� 2 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.division2.template2, entry.max],
                        el.selectMulti));

                it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                    ['������ ������� ��� ����������', params.division1.template3,
                        params.division2.template3, entry.max],
                    el.select));

                it('����� "������ ������"', async () => await dec.simple(el.select.iconXpand,
                    ['������ ������', params.division1.schedule, params.division2.schedule, entry.max],
                    el.select));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('������������ ������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('�������� ����������', () => {

            bef();
            aft();

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                    ['������ ������� ��� ����������',  params.division1.template3, entry.max],
                    params.division1.template3,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();

    });

    // ���������� ������������� � ��������� ������������� � ������������ ����������� ����������, ����� ����� ������:
    // ���������������, ������� ������� ��� ����������, ������� ������� ��� �����������, ������� �������.
    const addFormsMaxParams = () => describe('�������������. ����������. ���������� ������������� � ��������� ' +
        '������������� � ������������ ����������� ����������, ����� ����� ������: ���������������, ' +
        '������� ������� ��� ����������, ������� ������� ��� �����������, ������� �������.', () => {

        const params = {
            division1: {
                name: 'addFormsMaxParamsName1',
                phone: 'addFormsMaxParamsPhone1',
                description: 'addFormsMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'addFormsMaxParamsName2',
                phone: 'addFormsMaxParamsPhone2',
                description: 'addFormsMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
        };

        describe('API - ����������', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('����������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[ "�������������� �������"], entry.max],
                page.division));

        });

        describe('���������� �������������', () => {
            bef();
            aft();

            describe('���������� ������������� 1 ������', () => {

                it('������� ����� "��������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('���� "�������������"', async () => await dec.simple(el.input.sendKeys,
                    ['�������������', '', params.division1.name, entry.max],
                    el.input));

                it('���� "�������"', async () => await dec.simple(el.input.sendKeys,
                    ['�������', '', params.division1.phone, entry.max],
                    el.input));

                it('���� "��������"', async () => await dec.simple(el.input.sendKeys,
                    ['��������', '', params.division1.description, entry.max],
                    el.input));

                it('������� ������ ���� � ������ "��������������"', async () => await dec.simple(el.select.iconMenu,
                    ['��������������', '', entry.max],
                    el.select));

                it('����������� ���������� ���� "��������������"',
                    async () => await dec.simple(el.modal.divisionAdd.initStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ����������',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division1.fio.lastName} ${params.division1.fio.firstName}`, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('�������� "��������������"', async () => await  dec.simple(el.select.select,
                    ["��������������",
                        `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('������� ������ ���� � ������ "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconMenu,
                        ['������ ������� ��� ����������', entry.max],
                        el.selectMulti));

                it('����������� ���������� ���� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ������ ������� 1',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division1.template1}`, entry.max],
                        el.modal.divisionAdd));

                it('����� ������ ������� 2',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division1.template2}`, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('������� ������ ���� � ������ "������ ������� ��� ����������"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['������ ������� ��� ����������', '', entry.max],
                        el.select));

                it('����������� ���������� ���� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateUser,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ������ �������',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.division1.template3, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('�������� "������ ������� ��� ����������"', async () => await  dec.simple(el.select.select,
                    ["������ ������� ��� ����������", params.division1.template3, entry.max],
                    el.select));

                it('������� ������ ���� � ������ "������ ������"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['������ ������', '', entry.max],
                        el.select));

                it('����������� ���������� ���� "������ ������"',
                    async () => await dec.simple(el.modal.divisionAdd.initSchedule,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ������ �������',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.division1.schedule, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('�������� "������ ������"', async () => await  dec.simple(el.select.select,
                    ["������ ������", params.division1.schedule, entry.max],
                    el.select));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('������������ ������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

            });

            describe('���������� ������������� 2 ������', () => {

                it('������� �� ������������� 1 ������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� 1 ������ �������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "��������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('���� "�������������"', async () => await dec.simple(el.input.sendKeys,
                    ['�������������', '', params.division2.name, entry.max],
                    el.input));

                it('���� "�������"', async () => await dec.simple(el.modal.divisionAdd.inputSendKeys,
                    ['�������', '', params.division2.phone, entry.max],
                    el.modal.divisionAdd));

                it('���� "��������"', async () => await dec.simple(el.modal.divisionAdd.inputSendKeys,
                    ['��������', '', params.division2.description, entry.max],
                    el.modal.divisionAdd));

                it('������� ������ ���� � ������ "��������������"', async () => await dec.simple(el.select.iconMenu,
                    ['��������������',
                        `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('����������� ���������� ���� "��������������"',
                    async () => await dec.simple(el.modal.divisionAdd.initStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ����������',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division2.fio.lastName} ${params.division2.fio.firstName}`, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simple(el.selectMulti.iconClear,
                    ['������ ������� ��� ����������', entry.max],
                    el.selectMulti));

                it('������� ������ ���� � ������ "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconMenu,
                        ['������ ������� ��� ����������', entry.max],
                        el.selectMulti));

                it('����������� ���������� ���� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ������ ������� 1',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division2.template1}`, entry.max],
                        el.modal.divisionAdd));

                it('����� ������ ������� 2',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division2.template2}`, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('������� ������ ���� � ������ "������ ������� ��� ����������"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['������ ������� ��� ����������', params.division1.template3, entry.max],
                        el.select));

                it('����������� ���������� ���� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateUser,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ������ �������',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.division2.template3, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('������� ������ ���� � ������ "������ ������"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['������ ������', params.division1.schedule, entry.max],
                        el.select));

                it('����������� ���������� ���� "������ ������"',
                    async () => await dec.simple(el.modal.divisionAdd.initSchedule,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ������ �������',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.division2.schedule, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('������������ ������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('�������� ����������', () => {

            bef();
            aft();

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.division1.template3, entry.max],
                        params.division1.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();

    });

    // ���������� 5 ������������� 1 ������ � ������������ ���������������� ����������� �� 5.
    const addIncludeProgression =() => describe('�������������. ����������. ���������� 5 ������������� 1 ������ ' +
        '� ���������� ��������������� ' + '����������� �� 5.', () => {

        const params = {
            array: [...Array(5).keys()].map(item1 => {
                return [...Array(item1 + 1).keys()].map(item2 => {
                    return 'addIncludeProgressionName' + (item1 + 1) +  (item2 + 1)
                });
            }),
        };

        describe('���������� �������������', () => {
            bef();
            aft();

            params.array.forEach((item1) => {
                let arr =[];
                item1.forEach((item2, index2) => {
                    describe(`���������� ������������� ${index2 + 1} ������ - ${item2}`, () => {

                        if(index2 > 0) {
                            it(`������� �� ������������� ${index2} ������ - ${item1[index2 - 1]}`,
                                async () => await dec.simple(page.division.handler,
                                    [arr, entry.max],
                                    page.division));

                            it(`������������� ${index2} ������ - ${item1[index2 - 1]} �������`,
                                async () => await dec.simple(page.division.selected,
                                    [item1[index2 - 1], entry.max],
                                    page.division));
                        }

                        it('������� ����� "��������"', async () => await dec.simple(el.butIcBefore.handler,
                            [but.add, entry.max],
                            el.butIcBefore));

                        it('����������� ���������� ���� "�������� �������������"',
                            async () => await  dec.simple(el.modal.divisionAdd.init,
                                [entry.max],
                                el.modal.divisionAdd));

                        it('���� "�������������"', async () => {
                            await dec.simple(el.input.sendKeys,
                                ['�������������', '', item2, entry.max],
                                el.input)
                        });

                        it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                            ["���������", entry.max],
                            el.button));

                        it('����������� ��������� "������������� ������� ���������!"',
                            async () => await dec.simple(el.success.success,
                                ['������������� ������� ���������!', entry.max],
                                el.success));

                        it('���������� ���������� ���� "�������� �������������"',
                            async () => await  dec.simple(el.modal.divisionAdd.initClose,
                                [entry.max],
                                el.modal.divisionAdd));

                        it('������������ ������������ �������������', async () => {
                            arr.push(item2);
                            await dec.simple(page.division.division,
                                [arr, entry.max],
                                page.division)
                        });

                    });
                });
            });

        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 16 �������������', async () => await dec.simple(page.division.size,
                    [16, entry.max],
                    page.division));

                params.array.forEach((item1) => {
                    let arr =[];
                    item1.forEach((item2, index2) => {
                        it(`������������ ������������� ${index2 + 1} ������ - ${item2}`, async () => {
                            arr.push(item2);
                            await dec.simple(page.division.division,
                                [arr, entry.max],
                                page.division)
                        });
                    });
                });

            });


        });

        deleteParams();
    });

    // ������� ������������ ��������� ������������� � �������������.
    const addDuplicateOneLevel = () => describe('�������������. ����������. ������� ������������ ������������� ' +
        '1 ������ � ������������� 1 ������.', () => {

        const params = {
                name: 'addDuplicateOneLevelName',
                error: '������ ������������� ��� ����������'
            };

        describe('API - ����������', () => {
                bef();
                aft();
                const obj = {
                    parent_id: 0,
                    name: params.name,
                };
                addDivision(obj);
            });

        describe('�������� ������ �������������', () => {

                bef();
                aft();

                it('����������� 2 ������������', async () => await dec.simple(page.division.size,
                    [2, entry.max],
                    page.division));

                it('����������� ������������ �������������', async ()=> await dec.simple(page.division.division,
                    [[params.name], entry.max],
                    page.division));
            });

        describe('���������� �������������', () => {
                bef();
                aft();

                it('������� ����� "��������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('���� "�������������"', async () => await dec.simple(el.input.sendKeys,
                    ['�������������', '', params.name, entry.max],
                    el.input));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ������ "������ ������������� ��� ����������"',
                    async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.error));

                it('���������� ���� "�������� �������������" �� �������',
                    async () => await  dec.simpleFalse(el.modal.divisionAdd.initClose,
                        [entry.min],
                        el.modal.divisionAdd));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionAdd.closeHandler,
                        [entry.max],
                        el.modal.divisionAdd));

                it('���������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));
            });

        describe('�������� ������ �������������', () => {

                bef();
                aft();

                it('����������� 2 ������������', async () => await dec.simple(page.division.size,
                    [2, entry.max],
                    page.division));

            });

        deleteParams();
    });

    // ������� ������������ ��������� ������������� � ���������.
    const addDuplicateTwoLevel = () => describe('�������������. ����������. ������� ������������ ������������� ' +
        '1 ������ � ������������� 2 ������.', () => {

        const params = {
                name1: 'addDuplicateTwoLevelName1',
                name2: 'addDuplicateTwoLevelName2',
                error: '������ ������������� ��� ����������'
            };

        describe('API - ����������', () => {
                bef();
                aft();

                describe('���������� ������������� 1 ������', () => {
                    const obj = {
                        parent_id: 0,
                        name: params.name1,
                    };
                    addDivision(obj);
                });

                describe('���������� ������������� 2 ������', () => {
                    it('���������� �������������', async () => {
                        const cook = await page.base.getCookie('token');
                        const get = await api.getDivision(cook.text);
                        const obj = {
                            parent_id: get.text[0]['id'],
                            name: params.name2
                        };
                        await dec.simple(api.putDivision,
                            [[obj], cook.text],
                            api.putDivision);
                    });
                });
            });

        describe('�������� ������ �������������', () => {

                bef();
                aft();

                it('����������� 3 ������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('����������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));
            });

        describe('���������� �������������', () => {
                bef();
                aft();

                it('������� ����� "��������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('���� "�������������"', async () => await dec.simple(el.input.sendKeys,
                    ['�������������', '', params.name2, entry.max],
                    el.input));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ������ "������ ������������� ��� ����������"',
                    async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.error));

                it('���������� ���� "�������� �������������" �� �������',
                    async () => await  dec.simpleFalse(el.modal.divisionAdd.initClose,
                        [entry.min],
                        el.modal.divisionAdd));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionAdd.closeHandler,
                        [entry.max],
                        el.modal.divisionAdd));

                it('���������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));
            });

        describe('�������� ������ �������������', () => {

                bef();
                aft();

                it('����������� 3 ������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('����������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.division,
                    [[params.name2], entry.max],
                    page.division));
            });

        deleteParams();
    });

    // ������� ���������� ��� ��������������.
    const addNoName = () => describe('�������������. ����������. ������� ���������� ��� "�������������".',
        () => {

        describe('�������� ������ �������������', () => {

                bef();
                aft();

                it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                    [1, entry.max],
                    page.division));

                it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                    [[ "�������������� �������"], entry.max],
                    page.division));

            });

        describe('���������� �������������', () => {
                bef();
                aft();

                it('������� ����� "��������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('������ "���������" - �� �������', async () => await dec.simple(el.button.disabled,
                    ["���������", entry.max],
                    el.button));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handlerNoActive,
                    ["���������", entry.max],
                    el.button));

                it('���������� ���� "�������� �������������" �� �������',
                    async () => await  dec.simpleFalse(el.modal.divisionAdd.initClose,
                        [entry.min],
                        el.modal.divisionAdd));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionAdd.closeHandler,
                        [entry.max],
                        el.modal.divisionAdd));

                it('���������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));
            });

        describe('�������� ������ �������������', () => {

                bef();
                aft();

                it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                    [1, entry.max],
                    page.division));

                it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                    [[ "�������������� �������"], entry.max],
                    page.division));

            });

        deleteParams();
    });

    const add = () => describe('�������������. �������� ����������.', () => {
        addMinParams();
        addMaxParams();
        addFormsMaxParams();
        addIncludeProgression();
        addDuplicateOneLevel();
        addDuplicateTwoLevel();
        addNoName();
    });

    return {
        addMinParams,
        addMaxParams,
        addFormsMaxParams,
        addIncludeProgression,
        addDuplicateOneLevel,
        addDuplicateTwoLevel,
        addNoName,
        add,
    }
};

// ����� ��������������
const edit = () => {

    // ���������� �������������� ���������� � ����������� ����������� ���������� � ������������ � �������� �������������
    // � ����������� ����������� ����������.
    const editMinParams = () => describe('�������������. ��������������. ���������� �������������� ���������� ' +
        '� ����������� ����������� ���������� � ������������� 1 ������ � ������������ 2 ������', () => {

        const params = {
            division1: {
                name: 'editMinParamsName1',
                phone: 'editMinParamsPhone1',
                description: 'editMinParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'editMinParamsName2',
                phone: 'editMinParamsPhone2',
                description: 'editMinParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
        };

        describe('API - ����������', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
            describe('���������� ������������� 1 ������', () => {
                const obj = {
                    parent_id: 0,
                    name: params.division1.name,
                };
                addDivision(obj);
            });
            describe('���������� ������������� 2 ������', () => {
                it('���������� �������������', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.division2.name
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('����������� 3 ������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('����������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));
            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));
            });
        });

        describe('�������������� �������������', () => {
            bef();
            aft();

            describe('�������������� ������������� 1 ������', () => {

                it('������� �� ������������� 1 ������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� 1 ������ �������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������', '', params.division1.phone, entry.max],
                    el.modal.divisionEdit));

                it('���� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['��������', '', params.division1.description, entry.max],
                    el.modal.divisionEdit));

                it('����� "��������������"', async () => await dec.simple(el.select.iconXpand,
                    ['��������������', '',
                        `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('����� �������� 1 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.division1.template1, entry.max],
                        el.selectMulti));

                it('����� �������� 2 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.division1.template2, entry.max],
                        el.selectMulti));

                it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                    ['������ ������� ��� ����������', '', params.division1.template3, entry.max],
                    el.select));

                it('����� "������ ������"', async () => await dec.simple(el.select.iconXpand,
                    ['������ ������', '', params.division1.schedule, entry.max],
                    el.select));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������������� ������������� 2 ������', () => {

                it('������� �� ������������� 2 ������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� 2 ������ �������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������', '', params.division2.phone, entry.max],
                    el.modal.divisionEdit));

                it('���� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['��������', '', params.division2.description, entry.max],
                    el.modal.divisionEdit));

                it('����� "��������������"', async () => await dec.simple(el.select.iconXpand,
                    ['��������������', '',
                        `${params.division2.fio.lastName} ${params.division2.fio.firstName}`, entry.max],
                    el.select));

                it('����� �������� 1 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.division2.template1, entry.max],
                        el.selectMulti));

                it('����� �������� 2 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.division2.template2, entry.max],
                        el.selectMulti));

                it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                        ['������ ������� ��� ����������', '', params.division2.template3, entry.max],
                    el.select));

                it('����� "������ ������"', async () => await dec.simple(el.select.iconXpand,
                    ['������ ������', '', params.division2.schedule, entry.max],
                    el.select));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('�������� ����������', () => {

            bef();
            aft();

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.division1.template3, entry.max],
                        params.division1.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();
    });

    // �������� �������������� ���������� � ����������� ����������� ���������� � ������������� � ��������� �������������
    // � ������������ ����������� ����������.
    const editMaxParams = () => describe('�������������. ��������������. �������� �������������� ���������� ' +
        '� ������������ ����������� ���������� � ������������� 1 ������ � ������������ 2 ������', () => {

        const params = {
            division1: {
                name: 'editMaxParamsName1',
                phone: 'editMaxParamsPhone1',
                description: 'editMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'editMaxParamsName2',
                phone: 'editMaxParamsPhone2',
                description: 'editMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
        };

        describe('API - ����������', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
            it('���������� ������������ 1 ������', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);

                const obj = {
                    "parent_id": 0,
                    "name": params.division1.name,
                    "comment": params.division1.description,
                    "accompanying": getStaff.text[0]['id'],
                    "staff_access_template": [
                        getTemplate.text[0]['id'], getTemplate.text[1]['id']
                    ],
                    "visitor_access_template": getTemplate.text[2]['id'],
                    "work_schedule": getSchedule.text[0]['id'],
                    "tel": params.division1.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
            it('���������� ������������ 2 ������', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[0]['id'],
                    "name": params.division2.name,
                    "comment": params.division2.description,
                    "accompanying": getStaff.text[1]['id'],
                    "staff_access_template": [
                        getTemplate.text[3]['id'], getTemplate.text[4]['id']
                    ],
                    "visitor_access_template": getTemplate.text[5]['id'],
                    "work_schedule": getSchedule.text[1]['id'],
                    "tel": params.division2.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('�������� ����������', () => {

            bef();
            aft();

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.division1.template3, entry.max],
                        params.division1.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        describe('�������������� �������������', () => {
            bef();
            aft();

            describe('�������������� ������������� 1 ������', () => {

                it('������� �� ������������� 1 ������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� 1 ������ �������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������', '', entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['��������', '', entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simple(el.select.iconClear,
                    ['��������������', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['������ ������� ��� ����������', entry.max],
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������� ��� ����������', params.division1.template3, entry.max],
                    el.select));

                it('�������� "������ ������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������', params.division1.schedule, entry.max],
                    el.select));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });

            describe('�������������� ������������� 2 ������', () => {

                it('������� �� ������������� 2 ������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� 2 ������ �������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������', '', entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['��������', '', entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simple(el.select.iconClear,
                    ['��������������', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    el.select));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['������ ������� ��� ����������', entry.max],
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������� ��� ����������', params.division2.template3, entry.max],
                    el.select));

                it('�������� "������ ������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������', params.division2.schedule, entry.max],
                    el.select));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('����������� 3 ������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('����������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));
            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));
            });
        });

        describe('�������� ����������', () => {

            bef();
            aft();

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', '', entry.max],
                    '',
                    el.select));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleFalse(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  '', entry.max],
                        '',
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������', '', entry.max],
                    '',
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', '', entry.max],
                    '',
                    el.select));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleFalse(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  '', entry.max],
                        '',
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������', '', entry.max],
                    '',
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();
    });

    // �������������� ���� ���������� ������������� � ��������� ������������� � ������������ ����������� ����������.
    const editAllParamsMaxParams = () => describe('�������������. ��������������. �������������� ���� ���������� ' +
        '�������������� 1 ������ � ������������ 2 ������,c ������������ ����������� ����������', () => {

        const params = {
            division1: {
                name: 'editMaxParamsName1',
                phone: 'editMaxParamsPhone1',
                description: 'editMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'editMaxParamsName2',
                phone: 'editMaxParamsPhone2',
                description: 'editMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
            divisionUpdate1: {
                name: 'editMaxParamsNameUpdate1',
                phone: 'editMaxParamsPhoneUpdate1',
                description: 'editMaxParamsDescriptionUpdate1',
                fio: {
                    lastName: 'staffUpdate',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template1Update1',
                template2: 'template1Update2',
                template3: 'template1Update3',
                schedule: 'scheduleUpdate1',
            },
            divisionUpdate2: {
                name: 'editMaxParamsNameUpdate2',
                phone: 'editMaxParamsPhoneUpdate2',
                description: 'editMaxParamsDescriptionUpdate2',
                fio: {
                    lastName: 'staffUpdate',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'templateUpdate21',
                template2: 'templateUpdate22',
                template3: 'templateUpdate23',
                schedule: 'scheduleUpdate2',
            },
        };

        describe('API - ����������', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
            it('���������� ������������ 1 ������', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);

                const obj = {
                    "parent_id": 0,
                    "name": params.division1.name,
                    "comment": params.division1.description,
                    "accompanying": getStaff.text[0]['id'],
                    "staff_access_template": [
                        getTemplate.text[0]['id'], getTemplate.text[1]['id']
                    ],
                    "visitor_access_template": getTemplate.text[2]['id'],
                    "work_schedule": getSchedule.text[0]['id'],
                    "tel": params.division1.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
            it('���������� ������������ 2 ������', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[0]['id'],
                    "name": params.division2.name,
                    "comment": params.division2.description,
                    "accompanying": getStaff.text[1]['id'],
                    "staff_access_template": [
                        getTemplate.text[3]['id'], getTemplate.text[4]['id']
                    ],
                    "visitor_access_template": getTemplate.text[5]['id'],
                    "work_schedule": getSchedule.text[1]['id'],
                    "tel": params.division2.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

            addAccessTemplate(params.divisionUpdate1.template1, '');
            addAccessTemplate(params.divisionUpdate1.template2, '');
            addAccessTemplate(params.divisionUpdate1.template3, '');
            addAccessTemplate(params.divisionUpdate2.template1, '');
            addAccessTemplate(params.divisionUpdate2.template2, '');
            addAccessTemplate(params.divisionUpdate2.template3, '');
            addSchedule(params.divisionUpdate1.schedule);
            addSchedule(params.divisionUpdate2.schedule);
            addStaff(...Object.values(params.divisionUpdate1.fio));
            addStaff(...Object.values(params.divisionUpdate2.fio));
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('�������� ����������', () => {

            bef();
            aft();

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.division1.template3, entry.max],
                        params.division1.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        describe('�������������� �������������', () => {
            bef();
            aft();

            describe('�������������� ������������� 1 ������', () => {

                it('������� �� ������������� 1 ������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� 1 ������ �������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������������', '', params.divisionUpdate1.name, entry.max],
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������', '', params.divisionUpdate1.phone, entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['��������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['��������', '', params.divisionUpdate1.description, entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simple(el.select.iconClear,
                    ['��������������', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('����� "��������������"', async () => await dec.simple(el.select.iconXpand,
                    ['��������������', '',
                        `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['������ ������� ��� ����������', entry.max],
                        el.selectMulti));

                it('����� �������� 1 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.divisionUpdate1.template1, entry.max],
                        el.selectMulti));

                it('����� �������� 2 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.divisionUpdate1.template2, entry.max],
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������� ��� ����������', params.division1.template3, entry.max],
                    el.select));

                it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                    ['������ ������� ��� ����������', '', params.divisionUpdate1.template3, entry.max],
                    el.select));

                it('�������� "������ ������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������', params.division1.schedule, entry.max],
                    el.select));

                it('����� "������ ������"', async () => await dec.simple(el.select.iconXpand,
                    ['������ ������', '', params.divisionUpdate1.schedule, entry.max],
                    el.select));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������������� ������������� 2 ������', () => {

                it('������� �� ������������� 2 ������', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� 2 ������ �������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������������', '', params.divisionUpdate2.name, entry.max],
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������', '', params.divisionUpdate2.phone, entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['��������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['��������', '', params.divisionUpdate2.description, entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simple(el.select.iconClear,
                    ['��������������', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    el.select));

                it('����� "��������������"', async () => await dec.simple(el.select.iconXpand,
                    ['��������������', '',
                        `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                        entry.max],
                    el.select));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['������ ������� ��� ����������', entry.max],
                        el.selectMulti));

                it('����� �������� 1 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.divisionUpdate2.template1, entry.max],
                        el.selectMulti));

                it('����� �������� 2 � "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['������ ������� ��� ����������', params.divisionUpdate2.template2, entry.max],
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������� ��� ����������', params.division2.template3, entry.max],
                    el.select));

                it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                    ['������ ������� ��� ����������', '', params.divisionUpdate2.template3, entry.max],
                    el.select));

                it('�������� "������ ������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������', params.division2.schedule, entry.max],
                    el.select));

                it('����� "������ ������"', async () => await dec.simple(el.select.iconXpand,
                    ['������ ������', '', params.divisionUpdate2.schedule, entry.max],
                    el.select));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate1.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.divisionUpdate1.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.divisionUpdate1.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.divisionUpdate1.template1}, ${params.divisionUpdate1.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.divisionUpdate1.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.divisionUpdate1.schedule}`,
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate2.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.divisionUpdate2.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.divisionUpdate2.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.divisionUpdate2.template1}, ${params.divisionUpdate2.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.divisionUpdate2.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.divisionUpdate2.schedule}`,
                    el.input));
            });
        });

        describe('�������� ����������', () => {

            bef();
            aft();

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.divisionUpdate1.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.divisionUpdate1.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.divisionUpdate1.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������',
                        `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                        entry.max],
                    `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.divisionUpdate1.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.divisionUpdate1.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.divisionUpdate1.template3, entry.max],
                        params.divisionUpdate1.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.divisionUpdate1.schedule, entry.max],
                    params.divisionUpdate1.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.divisionUpdate2.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.divisionUpdate2.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.divisionUpdate2.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                        entry.max],
                    `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.divisionUpdate2.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.divisionUpdate2.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.divisionUpdate2.template3, entry.max],
                        params.divisionUpdate2.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.divisionUpdate2.schedule, entry.max],
                    params.divisionUpdate2.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();
    });

    // �������������� ���� ���������� ������������� � ��������� ������������� � ������������ ����������� ����������,
    // ����� ����� ������: ���������������, ������� ������� ��� ����������, ������� ������� ��� �����������,
    // ������� �������.
    const editAllParamsFormsMaxParams = () => describe('�������������. ��������������. �������������� ���� ���������� '+
        '�������������� 1 ������ � ������������ 2 ������, c ������������ ����������� ����������, ����� ����� ������: ' +
        '"��������������", "������ ������� ��� ����������", "������ ������� ��� ����������", "������ ������".', () => {

        const params = {
            division1: {
                name: 'editMaxParamsName1',
                phone: 'editMaxParamsPhone1',
                description: 'editMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'editMaxParamsName2',
                phone: 'editMaxParamsPhone2',
                description: 'editMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
            divisionUpdate1: {
                name: 'editMaxParamsNameUpdate1',
                phone: 'editMaxParamsPhoneUpdate1',
                description: 'editMaxParamsDescriptionUpdate1',
                fio: {
                    lastName: 'staffUpdate',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template1Update1',
                template2: 'template1Update2',
                template3: 'template1Update3',
                schedule: 'scheduleUpdate1',
            },
            divisionUpdate2: {
                name: 'editMaxParamsNameUpdate2',
                phone: 'editMaxParamsPhoneUpdate2',
                description: 'editMaxParamsDescriptionUpdate2',
                fio: {
                    lastName: 'staffUpdate',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'templateUpdate21',
                template2: 'templateUpdate22',
                template3: 'templateUpdate23',
                schedule: 'scheduleUpdate2',
            },
        };

        describe('API - ����������', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
            it('���������� ������������ 1 ������', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);

                const obj = {
                    "parent_id": 0,
                    "name": params.division1.name,
                    "comment": params.division1.description,
                    "accompanying": getStaff.text[0]['id'],
                    "staff_access_template": [
                        getTemplate.text[0]['id'], getTemplate.text[1]['id']
                    ],
                    "visitor_access_template": getTemplate.text[2]['id'],
                    "work_schedule": getSchedule.text[0]['id'],
                    "tel": params.division1.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
            it('���������� ������������ 2 ������', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[0]['id'],
                    "name": params.division2.name,
                    "comment": params.division2.description,
                    "accompanying": getStaff.text[1]['id'],
                    "staff_access_template": [
                        getTemplate.text[3]['id'], getTemplate.text[4]['id']
                    ],
                    "visitor_access_template": getTemplate.text[5]['id'],
                    "work_schedule": getSchedule.text[1]['id'],
                    "tel": params.division2.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

            addAccessTemplate(params.divisionUpdate1.template1, '');
            addAccessTemplate(params.divisionUpdate1.template2, '');
            addAccessTemplate(params.divisionUpdate1.template3, '');
            addAccessTemplate(params.divisionUpdate2.template1, '');
            addAccessTemplate(params.divisionUpdate2.template2, '');
            addAccessTemplate(params.divisionUpdate2.template3, '');
            addSchedule(params.divisionUpdate1.schedule);
            addSchedule(params.divisionUpdate2.schedule);
            addStaff(...Object.values(params.divisionUpdate1.fio));
            addStaff(...Object.values(params.divisionUpdate2.fio));
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('�������� ����������', () => {

            bef();
            aft();

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.division1.template3, entry.max],
                        params.division1.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        describe('�������������� �������������', () => {

            bef();
            aft();

            describe('�������������� ������������� 1 ������', () => {

                it('������� �� ������������� 1 ������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� 1 ������ �������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������������', '', params.divisionUpdate1.name, entry.max],
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������', '', params.divisionUpdate1.phone, entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['��������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['��������', '', params.divisionUpdate1.description, entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simple(el.select.iconClear,
                    ['��������������', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('������� ������ ���� � ������ "��������������"', async () => await dec.simple(el.select.iconMenu,
                    ['��������������', '', entry.max],
                    el.select));

                it('����������� ���������� ���� "��������������"',
                    async () => await dec.simple(el.modal.divisionAdd.initStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ����������',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                            entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['������ ������� ��� ����������', entry.max],
                        el.selectMulti));

                it('������� ������ ���� � ������ "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconMenu,
                        ['������ ������� ��� ����������', entry.max],
                        el.selectMulti));

                it('����������� ���������� ���� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ������ ������� 1',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate1.template1, entry.max],
                        el.modal.divisionAdd));

                it('����� ������ ������� 2',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate1.template2, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������� ��� ����������', params.division1.template3, entry.max],
                    el.select));

                it('������� ������ ���� � ������ "������ ������� ��� ����������"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['������ ������� ��� ����������', '', entry.max],
                        el.select));

                it('����������� ���������� ���� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateUser,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ������ �������',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate1.template3, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "������ ������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������', params.division1.schedule, entry.max],
                    el.select));

                it('������� ������ ���� � ������ "������ ������"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['������ ������', '', entry.max],
                        el.select));

                it('����������� ���������� ���� "������ ������"',
                    async () => await dec.simple(el.modal.divisionAdd.initSchedule,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� "������ ������"',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate1.schedule, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });

            describe('�������������� ������������� 2 ������', () => {

                it('������� �� ������������� 2 ������', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� 2 ������ �������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������������', '', params.divisionUpdate2.name, entry.max],
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "�������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������', '', params.divisionUpdate2.phone, entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['��������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "��������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['��������', '', params.divisionUpdate2.description, entry.max],
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simple(el.select.iconClear,
                    ['��������������', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    el.select));

                it('������� ������ ���� � ������ "��������������"', async () => await dec.simple(el.select.iconMenu,
                    ['��������������', '', entry.max],
                    el.select));

                it('����������� ���������� ���� "��������������"',
                    async () => await dec.simple(el.modal.divisionAdd.initStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ����������',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                            entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['������ ������� ��� ����������', entry.max],
                        el.selectMulti));

                it('������� ������ ���� � ������ "������ ������� ��� ����������"',
                    async () => await dec.simple(el.selectMulti.iconMenu,
                        ['������ ������� ��� ����������', entry.max],
                        el.selectMulti));

                it('����������� ���������� ���� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ������ ������� 1',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate2.template1, entry.max],
                        el.modal.divisionAdd));

                it('����� ������ ������� 2',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate2.template2, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������� ��� ����������', params.division2.template3, entry.max],
                    el.select));

                it('������� ������ ���� � ������ "������ ������� ��� ����������"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['������ ������� ��� ����������', '', entry.max],
                        el.select));

                it('����������� ���������� ���� "������ ������� ��� ����������"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateUser,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� ������ �������',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate2.template3, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "������ ������"', async () => await dec.simple(el.select.iconClear,
                    ['������ ������', params.division2.schedule, entry.max],
                    el.select));

                it('������� ������ ���� � ������ "������ ������"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['������ ������', '', entry.max],
                        el.select));

                it('����������� ���������� ���� "������ ������"',
                    async () => await dec.simple(el.modal.divisionAdd.initSchedule,
                        [entry.max],
                        el.modal.divisionAdd));

                it('����� "������ ������"',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate2.schedule, entry.max],
                        el.modal.divisionAdd));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ['���������', entry.max],
                    el.button));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ��������� "������������� ������� ���������������!"',
                    async () => await dec.simple(el.success.success,
                        ['������������� ������� ���������������!', entry.max],
                        el.success));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate1.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.divisionUpdate1.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.divisionUpdate1.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.divisionUpdate1.template1}, ${params.divisionUpdate1.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.divisionUpdate1.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.divisionUpdate1.schedule}`,
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate2.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.divisionUpdate2.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.divisionUpdate2.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.divisionUpdate2.template1}, ${params.divisionUpdate2.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.divisionUpdate2.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.divisionUpdate2.schedule}`,
                    el.input));
            });
        });

        describe('�������� ����������', () => {

            bef();
            aft();

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate1.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.divisionUpdate1.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.divisionUpdate1.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.divisionUpdate1.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������',
                        `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                        entry.max],
                    `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.divisionUpdate1.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.divisionUpdate1.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.divisionUpdate1.template3, entry.max],
                        params.divisionUpdate1.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.divisionUpdate1.schedule, entry.max],
                    params.divisionUpdate1.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate2.name, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������������', '', entry.max],
                    params.divisionUpdate2.name,
                    el.modal.divisionEdit));

                it('�������� "�������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['�������', '', entry.max],
                    params.divisionUpdate2.phone,
                    el.modal.divisionEdit));

                it('�������� "��������"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['��������', '', entry.max],
                    params.divisionUpdate2.description,
                    el.modal.divisionEdit));

                it('�������� "��������������"', async () => await dec.simpleText(el.select.getText,
                    ['��������������', `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                        entry.max],
                    `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                    el.select));

                it('�������� �������� 1 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 1, entry.min],
                        params.divisionUpdate2.template1,
                        el.selectMulti));

                it('�������� �������� 2 "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['������ ������� ��� ����������', 2, entry.min],
                        params.divisionUpdate2.template2,
                        el.selectMulti));

                it('�������� "������ ������� ��� ����������"',
                    async () => await dec.simpleText(el.select.getText,
                        ['������ ������� ��� ����������',  params.divisionUpdate2.template3, entry.max],
                        params.divisionUpdate2.template3,
                        el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.select.getText,
                    ['������ ������',  params.divisionUpdate2.schedule, entry.max],
                    params.divisionUpdate2.schedule,
                    el.select));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();
    });

    // ������� - �������� ������������� � 3 ������������.
    const editHideShow = () => describe('�������������. ��������������. ������� / �������� ������������� ' +
        '� 3 ������������', () => {

        const params = {
            name1: 'editHideShowName1',
            name2: 'editHideShowName2',
            name3: 'editHideShowName3'
        };

        describe('API - ����������', () => {
            bef();
            aft();

            it('���������� ������������ 1 ������', async () => {
                const cook = await page.base.getCookie('token');
                const obj = {
                    "parent_id": 0,
                    "name": params.name1
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

            it('���������� ������������ 2 ������', async () => {
                const cook = await page.base.getCookie('token');
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[0]['id'],
                    "name": params.name2
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

            it('���������� ������������ 3 ������', async () => {
                const cook = await page.base.getCookie('token');
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[1]['id'],
                    "name": params.name3
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 4 �������������', async () => await dec.simple(page.division.size,
                    [4, entry.max],
                    page.division));

            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));
            });

            describe('�������� ������������� 3 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2, params.name3], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2, params.name3], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name3, entry.max],
                    page.division));
            });
        });

        describe('������� / �������� ������������� 3 ������', () => {

            bef();
            aft();

            describe('������� ������������� 3 ������', () => {

                it('������� �� ������ ������� � ������������� 2 ������',
                    async () => await dec.simple(page.division.minus,
                        [params.name2, entry.max],
                        page.division));

                it('���������� ������������� 3 ������',
                    async () => await dec.simple(page.division.noElement,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('������� ������� �� ������������� 3 ������',
                    async () => await dec.simpleFalse(page.division.handler,
                        [[params.name1, params.name2, params.name3], entry.min],
                        page.division));
            });

            describe('�������� ������������� 3 ������', () => {

                it('������� �� ������ �������� � ������������� 2 ������',
                    async () => await dec.simple(page.division.plus,
                        [params.name2, entry.max],
                        page.division));

                it('����������� ������������� 3 ������',
                    async () => await dec.simple(page.division.division,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('������� �� ������������� 3 ������',
                    async () => await dec.simple(page.division.handler,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name3, entry.max],
                    page.division));
            });
        });

        describe('������� / �������� ������������� 2 ������ � 3 ������', () => {

            bef();
            aft();

            describe('������� ������������� 2 ������ � 3 ������', () => {

                it('������� �� ������ ������� � ������������� 1 ������',
                    async () => await dec.simple(page.division.minus,
                        [params.name1, entry.max],
                        page.division));

                it('���������� ������������� 2 ������',
                    async () => await dec.simple(page.division.noElement,
                        [[params.name1, params.name2], entry.max],
                        page.division));

                it('������� ������� �� ������������� 2 ������',
                    async () => await dec.simpleFalse(page.division.handler,
                        [[params.name1, params.name2], entry.min],
                        page.division));

                it('���������� ������������� 3 ������',
                    async () => await dec.simple(page.division.noElement,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('������� ������� �� ������������� 3 ������',
                    async () => await dec.simpleFalse(page.division.handler,
                        [[params.name1, params.name2, params.name3], entry.min],
                        page.division));
            });

            describe('�������� ������������� 2 ������ � 3 ������', () => {

                it('������� �� ������ �������� � ������������� 1 ������',
                    async () => await dec.simple(page.division.plus,
                        [params.name1, entry.max],
                        page.division));

                it('����������� ������������� 2 ������',
                    async () => await dec.simple(page.division.division,
                        [[params.name1, params.name2], entry.max],
                        page.division));

                it('������� �� ������������� 2 ������',
                    async () => await dec.simple(page.division.handler,
                        [[params.name1, params.name2], entry.max],
                        page.division));

                it('������������� 2 ������ ��������', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('����������� ������������� 3 ������',
                    async () => await dec.simple(page.division.division,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('������� �� ������������� 2 ������',
                    async () => await dec.simple(page.division.handler,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('������������� 3 ������ ��������', async () => await dec.simple(page.division.selected,
                    [params.name3, entry.max],
                    page.division));
            });
        });

        deleteParams();
    });

    // ������� ������������ �������������  ������������� � ���������.
    const editDuplicateOneLevel = () => describe('�������������. ��������������. ������� ������������ ������������� ' +
        '1 ������ � ������������� 1 ������', () => {

        const params = {
                name1: 'editDuplicateOneLevelName1',
                name2: 'editDuplicateOneLevelName2',
                error: '����� �������� ��� ������������'
            };

        describe('API - ����������', () => {
                bef();
                aft();

                const obj1 = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj1);

                const obj2 = {
                    parent_id: 0,
                    name: params.name2,
                };
                addDivision(obj2);
            });

        describe('�������� ������ �������������', () => {

                bef();
                aft();

                it('����������� 3 ������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('����������� ������������ ������������� 1', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('����������� ������������ ������������� 2', async ()=> await dec.simple(page.division.division,
                    [[params.name2], entry.max],
                    page.division));
            });

        describe('������� �������������� ������������� 2', () => {
                bef();
                aft();

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name2], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������������', '', params.name1, entry.max],
                    el.modal.divisionEdit));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ������ "����� �������� ��� ������������"',
                    async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.error));

                it('���������� ���� "������������� �������������" �� �������',
                    async () => await  dec.simpleFalse(el.modal.divisionEdit.initClose,
                        [entry.min],
                        el.modal.divisionEdit));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        describe('�������� ������ �������������', () => {

                bef();
                aft();

                it('����������� 3 ������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('����������� ������������ ������������� 1', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('����������� ������������ ������������� 2', async ()=> await dec.simple(page.division.division,
                    [[params.name2], entry.max],
                    page.division));
            });

        deleteParams();
    });

    // ������� ������������ ������������� ������������� � ���������.
    const editDuplicateTwoLevel = () => describe('�������������. ��������������. ������� ������������ ������������� ' +
        '1 ������ � ������������� 2 ������', () => {

        const params = {
                name1: 'editDuplicateTwoLevelName1',
                name2: 'editDuplicateTwoLevelName2',
                name3: 'editDuplicateTwoLevelName3',
                error: '����� �������� ��� ������������'
            };

        describe('API - ����������', () => {
                bef();
                aft();

                it('���������� ������������ 1 ������ - 1', async () => {
                    const cook = await page.base.getCookie('token');

                    const obj = {
                        "parent_id": 0,
                        "name": params.name1
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
                it('���������� ������������ 2 ������ - 1', async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);

                    const obj = {
                        "parent_id": getDivision.text[0]['id'],
                        "name": params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
                it('���������� ������������ 1 ������ - 2', async () => {
                    const cook = await page.base.getCookie('token');

                    const obj = {
                        "parent_id": 0,
                        "name": params.name3
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });

        describe('�������� ������ �������������', () => {

                bef();
                aft();

                it('����������� 4 ������������', async () => await dec.simple(page.division.size,
                    [4, entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������ - 1', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������ - 2', async ()=> await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������ - 2', async ()=> await dec.simple(page.division.division,
                    [[params.name3], entry.max],
                    page.division));
            });

        describe('������� �������������� ������������� 1 ������ - 2', () => {
                bef();
                aft();

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name3], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name3, entry.max],
                    page.division));

                it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('����������� ���������� ���� "������������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('�������� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['�������������', '', entry.max],
                    el.modal.divisionEdit));

                it('���� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['�������������', '', params.name2, entry.max],
                    el.modal.divisionEdit));

                it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                    ["���������", entry.max],
                    el.button));

                it('����������� ������ "����� �������� ��� ������������"',
                    async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.error));

                it('���������� ���� "������������� �������������" �� �������',
                    async () => await  dec.simpleFalse(el.modal.divisionEdit.initClose,
                        [entry.min],
                        el.modal.divisionEdit));

                it('������� ������ �������� ���������� ����',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('���������� ���������� ���� "�������� �������������"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        describe('�������� ������ �������������', () => {

                bef();
                aft();

                it('����������� 4 ������������', async () => await dec.simple(page.division.size,
                    [4, entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������ - 1', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������ - 2', async ()=> await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������ - 2', async ()=> await dec.simple(page.division.division,
                    [[params.name3], entry.max],
                    page.division));
            });

        deleteParams();
    });

    // ������� �������������� ��� "�������������".
    const editNoName = () => describe('�������������. ��������������. ������� �������������� ��� "�������������".',
        () => {

        const params = {
            name: 'editNoName',
            error: '���� "�������������" �� ����� ���� ������'
        };

        describe('API - ����������', () => {
            bef();
            aft();

            const obj1 = {
                parent_id: 0,
                name: params.name,
            };
            addDivision(obj1);

        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('����������� 2 ������������', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('����������� ������������ �������������', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

        describe('������� ��������������', () => {
            bef();
            aft();

            it('������� �� �������������', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('������������� ��������', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('������� ����� "�������������"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('����������� ���������� ���� "������������� �������������"',
                async () => await  dec.simple(el.modal.divisionEdit.init,
                    [entry.max],
                    el.modal.divisionEdit));

            it('�������� "�������������"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                ['�������������', '', entry.max],
                el.modal.divisionEdit));

            it('������� ������ "���������"', async () => await dec.simple(el.button.handler,
                ["���������", entry.max],
                el.button));

            it('����������� ������',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('���������� ���� "������������� �������������" �� �������',
                async () => await  dec.simpleFalse(el.modal.divisionEdit.initClose,
                    [entry.min],
                    el.modal.divisionEdit));

            it('������� ������ �������� ���������� ����',
                async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                    [entry.max],
                    el.modal.divisionEdit));

            it('���������� ���������� ���� "�������� �������������"',
                async () => await  dec.simple(el.modal.divisionEdit.initClose,
                    [entry.max],
                    el.modal.divisionEdit));

        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('����������� 2 ������������', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('����������� ������������ �������������', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

        deleteParams();
    });

    const edit = () => describe('�������������. �������� ��������������.', () => {
        editMinParams();
        editMaxParams();
        editAllParamsMaxParams();
        editAllParamsFormsMaxParams();
        editHideShow();
        editDuplicateOneLevel();
        editDuplicateTwoLevel();
        editNoName();
    });

    return {
        editMinParams,
        editMaxParams,
        editAllParamsMaxParams,
        editAllParamsFormsMaxParams,
        editHideShow,
        editDuplicateOneLevel,
        editDuplicateTwoLevel,
        editNoName,
        edit
    }
};

// ����� ��������
const remove = () => {

    // �������� ��������� �������������.
    const deleteLevelOne = () => describe('�������������. ��������. �������� ������������� 1 ������', () => {

        const params = {
            name: 'removeLevelOneName'
        };

        describe('API - ����������', () => {
            bef();
            aft();
            const obj = {
                parent_id: 0,
                name: params.name,
            };
            addDivision(obj);
        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('����������� 2 ������������', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('����������� ������������ �������������', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

        describe('�������� �������������', () => {

            bef();
            aft();

            it('������� �� �������������', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('������������� ��������', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('������� ����� "�������"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('����������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('������� ����� "�������"', async () => await dec.simple(el.button.handler,
                ['�������', entry.max],
                el.button));

            it('����������� ��������� "��������� ������������� ���� �������"',
                async () => await dec.simple(el.success.success,
                    ['��������� ������������� ���� �������', entry.max],
                    el.success));

            it('���������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('����������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('���������� ������������ �������������', async ()=> await dec.simple(page.division.noElement,
                [[params.name], entry.max],
                page.division));
        });

        deleteParams();

    });

    // �������� ��������� �������������.
    const deleteLevelTwo = () => describe('�������������. ��������. �������� ������������� 2 ������', () => {

        const params = {
            name1: 'deleteLevelTwo1',
            name2: 'deleteLevelTwo2'
        };

        describe('API - ����������', () => {
            bef();
            aft();
            describe('���������� ������������� 1 ������', () => {
                const obj = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj);
            });
            describe('���������� ������������� 2 ������', () => {
                it('���������� �������������', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 3 ������������', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('����������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2], entry.max],
                page.division));
        });

        describe('�������� �������������', () => {

            bef();
            aft();

            it('������� �� �������������', async () => await dec.simple(page.division.handler,
                [[params.name1, params.name2], entry.max],
                page.division));

            it('������������� ��������', async () => await dec.simple(page.division.selected,
                [params.name2, entry.max],
                page.division));

            it('������� ����� "�������"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('����������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('������� ����� "�������"', async () => await dec.simple(el.button.handler,
                ['�������', entry.max],
                el.button));

            it('����������� ��������� "��������� ������������� ���� �������"',
                async () => await dec.simple(el.success.success,
                    ['��������� ������������� ���� �������', entry.max],
                    el.success));

            it('���������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 2 ������������', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('���������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.noElement,
                [[params.name1, params.name2], entry.max],
                page.division));
        });

        deleteParams();

    });

    // ������� ������� ������������ 1 ������ �� ������ ��������� 2 �������������.
    const deleteLevelOneFailed = () => describe('�������������. ��������. ������� �������� ������������� 1 ������ ' +
        '�� ������ 2 ��������� �������������.', () => {

        const params = {
            name1: 'deleteLevelOneFailed1',
            name2: 'deleteLevelOneFailed2',
            error: '������ ������� �������������, ���������� �������� �������������'
        };

        describe('API - ����������', () => {
            bef();
            aft();
            describe('���������� ������������� 1 ������', () => {
                const obj = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj);
            });
            describe('���������� ������������� 2 ������', () => {
                it('���������� �������������', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 3 ������������', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('����������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2], entry.max],
                page.division));
        });

        describe('������� ��������', () => {

            bef();
            aft();

            it('������� �� �������������', async () => await dec.simple(page.division.handler,
                [[params.name1], entry.max],
                page.division));

            it('������������� ��������', async () => await dec.simple(page.division.selected,
                [params.name1, entry.max],
                page.division));

            it('������� ����� "�������"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('����������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('������� ����� "�������"', async () => await dec.simple(el.button.handler,
                ['�������', entry.max],
                el.button));

            it('����������� ������ "������ ������� �������������, ���������� �������� �������������"',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('���������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 3 ������������', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('����������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2], entry.max],
                page.division));
        });

        deleteParams();
    });

    // ������� ������� ������������ 2 ������ �� ������ ��������� 3 �������������.
    const deleteLevelTwoFailed = () => describe('�������������. ��������. ������� �������� ������������� 2 ������ ' +
        '�� ������ 3 ��������� �������������.', () => {

        const params = {
            name1: 'deleteLevelTwoFailed1',
            name2: 'deleteLevelTwoFailed2',
            name3: 'deleteLevelTwoFailed3',
            error: '������ ������� �������������, ���������� �������� �������������'
        };

        describe('API - ����������', () => {
            bef();
            aft();
            describe('���������� ������������� 1 ������', () => {
                const obj = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj);
            });
            describe('���������� ������������� 2 ������', () => {
                it('���������� �������������', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
            describe('���������� ������������� 3 ������', () => {
                it('���������� �������������', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[1]['id'],
                        name: params.name3
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 4 ������������', async () => await dec.simple(page.division.size,
                [4, entry.max],
                page.division));

            it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('����������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2], entry.max],
                page.division));

            it('����������� ������������ ������������� 3 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2, params.name3], entry.max],
                page.division));
        });

        describe('������� ��������', () => {

            bef();
            aft();

            it('������� �� �������������', async () => await dec.simple(page.division.handler,
                [[params.name1, params.name2], entry.max],
                page.division));

            it('������������� ��������', async () => await dec.simple(page.division.selected,
                [params.name2, entry.max],
                page.division));

            it('������� ����� "�������"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('����������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('������� ����� "�������"', async () => await dec.simple(el.button.handler,
                ['�������', entry.max],
                el.button));

            it('����������� ������ "������ ������� �������������, ���������� �������� �������������"',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('���������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 4 ������������', async () => await dec.simple(page.division.size,
                [4, entry.max],
                page.division));

            it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('����������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2], entry.max],
                page.division));

            it('����������� ������������ ������������� 3 ������', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2, params.name3], entry.max],
                page.division));
        });

        deleteParams();
    });

    // ������� �������� ������������� ����������� ����������.
    const deleteStaffFailed = () => describe('�������������. ��������. ������� �������� ������������� ����������� ' +
        '����������.', () => {

        const params = {
            name: 'deleteStaffFailed1',
            fio: {
                lastName: 'staff',
                firstName: '1',
                middleName: '' ,
                divisionId: '',
                date: '2001-01-01'
            },
            error: '������������� ������������ � �� ����� ���� �������'
        };

        describe('API - ����������', () => {
            bef();
            aft();

            const obj = {
                parent_id: 0,
                name: params.name,
            };
            addDivision(obj);

            it('���������� ����������', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getDivision(cook.text);

                const obj = {
                    "last_name": params.fio.lastName,
                    "first_name": params.fio.firstName,
                    "middle_name": params.fio.middleName,
                    "division": get.text[0]['id'],
                    "hiring_date": params.fio.date,
                };
                await dec.simple(api.putStaff,
                    [[obj], cook.text],
                    api.putStaff);
            });

        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 2 ������������', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('����������� ������������ �������������', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));

        });

        describe('������� ��������', () => {

            bef();
            aft();

            it('������� �� �������������', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('������������� ��������', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('������� ����� "�������"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('����������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('������� ����� "�������"', async () => await dec.simple(el.button.handler,
                ['�������', entry.max],
                el.button));

            it('����������� ������ "������������� ������������ � �� ����� ���� �������"',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('���������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 2 ������������', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('����������� ������������ �������������', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));

        });

        deleteParams();

    });

    // ������� �������� ������������� ����������� ����������.
    const deleteVisitorFailed = () => describe('�������������. ��������. ������� �������� ������������� ����������� ' +
        '����������.', () => {

        const params = {
            name: 'deleteVisitorFailed1',
            fio: {
                lastName: 'visitor',
                firstName: '1',
                middleName: '' ,
                divisionId: '',
            },
            error: '������������� ������������ � �� ����� ���� �������'
        };

        describe('API - ����������', () => {
            bef();
            aft();

            const obj = {
                parent_id: 0,
                name: params.name,
            };
            addDivision(obj);

            it('���������� ����������', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getDivision(cook.text);

                const obj = {
                    "last_name": params.fio.lastName,
                    "first_name": params.fio.firstName,
                    "middle_name": params.fio.middleName,
                    "division": get.text[0]['id'],
                };
                await dec.simple(api.putVisitor,
                    [[obj], cook.text],
                    api.putVisitor);
            });

        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 2 ������������', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('����������� ������������ �������������', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));

        });

        describe('������� ��������', () => {

            bef();
            aft();

            it('������� �� �������������', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('������������� ��������', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('������� ����� "�������"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('����������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('������� ����� "�������"', async () => await dec.simple(el.button.handler,
                ['�������', entry.max],
                el.button));

            it('����������� ������ "������������� ������������ � �� ����� ���� �������"',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('���������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 2 ������������', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('����������� ������������ �������������', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));

        });

        deleteParams();

    });

    const remove = () => describe('�������������. �������� ��������.', () => {
        deleteLevelOne();
        deleteLevelTwo();
        deleteLevelOneFailed();
        deleteLevelTwoFailed();
        deleteStaffFailed();
        deleteVisitorFailed();
    });

    return {
        deleteLevelOne,
        deleteLevelTwo,
        deleteLevelOneFailed,
        deleteLevelTwoFailed,
        deleteStaffFailed,
        deleteVisitorFailed,
        remove,
    }
};

//����� � ��������������� �������������� "�������������� �������"
const serviceDivision = () => {

    // ������� �������� �������� �������������
    const addDivision = () => describe('������������� "�������������� �������". ' +
        '������� �������� �������� �������������', () => {

        const params = {
            name1: '�������������� �������',
            name2: 'addDivision',
        };

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));
        });

        describe('������� ����������', () => {

            bef();
            aft();

            it('������� �� �������������', async () => await dec.simple(page.division.handler,
                [[params.name1], entry.max],
                page.division));

            it('������������� ��������', async () => await dec.simple(page.division.selected,
                [params.name1, entry.max],
                page.division));

            it('������� ����� "��������"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.min],
                el.butIcBefore));

            it('����������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modal.divisionAdd.init,
                    [entry.max],
                    el.modal.divisionAdd));

            it('���� "�������������"', async () => await dec.simple(el.input.sendKeys,
                ['�������������', '', params.name2, entry.max],
                el.input));

            it('������� ����� "���������"', async () => await dec.simple(el.button.handler,
                ['���������', entry.max],
                el.button));

            it('���������� ���������� ���� "�������� �������������"',
                async () => await dec.simple(el.modal.divisionAdd.initClose,
                    [entry.max],
                    el.modal.divisionAdd));
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 2 ������������', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('��������� ������������� 2 ������', async ()=> await dec.simple(page.division.noElement,
                [[params.name1, params.name2], entry.min],
                page.division));

            it('����������� ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                [[params.name2], entry.max],
                page.division));
        });

        deleteParams();
    });

    // ������� ��������������
    const editDivision = () => describe('������������� "�������������� �������". ������� ��������������', () => {

        const params = {
            name: '�������������� �������'
        };

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

        describe('������� ��������������', () => {

            bef();
            aft();

            it('������� �� �������������', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('������������� ��������', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('������ "�������������" - �������������', async () => await dec.simple(el.butIcBefore.disabled,
                [but.edit, entry.max],
                el.butIcBefore));

            it('������� ������� ����� "�������������"', async () => await dec.simpleFalse(el.butIcBefore.handler,
                [but.edit, entry.min],
                el.butIcBefore));

            it('��������� ���� "�������������� �������������" �� ������������',
                async () => await dec.simpleFalse(el.modal.divisionEdit.init,
                    [entry.min],
                    el.modal.divisionEdit));
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

    });

    // ������� ��������������
    const deleteDivision = () => describe('������������� "�������������� �������". ������� ��������', () => {

        const params = {
            name: '�������������� �������'
        };

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

        describe('������� ��������', () => {

            bef();
            aft();

            it('������� �� �������������', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('������������� ��������', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('������ "�������" - �������������', async () => await dec.simple(el.butIcBefore.disabled,
                [but.delete, entry.max],
                el.butIcBefore));

            it('������� ������� ����� "�������"', async () => await dec.simpleFalse(el.butIcBefore.handler,
                [but.delete, entry.min],
                el.butIcBefore));

            it('��������� ���� "�������� �������������" �� ������������',
                async () => await dec.simpleFalse(el.modalConfirm.divisionDelete.init,
                    [entry.min],
                    el.modalConfirm.divisionDelete));
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('����������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

    });

    // �������� ������������� "�������������� �������"
    const serviceDivision = () => describe('�������� ������������� "�������������� �������".', () => {
        addDivision();
        editDivision();
        deleteDivision();
    });

    return {
        addDivision,
        editDivision,
        deleteDivision,
        serviceDivision,
    }
};

//����� ������ �������
const print = () => {

    // �������� ������ � ����� ��������������� 1 � 2 ������ � ����������� ����������� ����������.
    const printMinParams = () => describe('�������������. ������. �������� ������ � ����� ��������������� ' +
        '1 � 2 ������ � ����������� ����������� ����������.', () => {

        const params = {
            name1: 'printMinParamsName1',
            name2: 'printMinParamsName2'
        };

        describe('API - ����������', () => {
            bef();
            aft();
            describe('���������� ������������� 1 ������', () => {
                const obj = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj);
            });
            describe('���������� ������������� 2 ������', () => {
                it('���������� �������������', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('����������� 3 ������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('����������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));
            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));

            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));
            });

        });

        describe('������ �������', () => {

            bef();
            aft();

            describe('�������� �������� �����', () => {
                it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.menu, entry.max],
                    el.butIcBefore))

                it('����������� "����"', async () => await dec.simple(el.menu.menu,
                    [entry.max],
                    el.menu))

                it('������� ��������� "������ �������"', async () => await dec.simple(el.menu.handler,
                    ['������ �������', entry.max],
                    el.menu))

                it('����������� �������� �����', async () => await dec.simple(el.modal.printTable.init,
                    [entry.max],
                    el.modal.printTable))
            });

            describe('�������� ������ 1', () => {

                it('���� "������������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['������������', '1', '1', entry.max],
                    params.name1,
                    el.modal.printTable));

                it('���� "�������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['�������', '1', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('���� "��������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['��������', '1', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('�������� ������ 2', () => {

                it('���� "������������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['������������', '2', '1', entry.max],
                    params.name2,
                    el.modal.printTable));

                it('���� "�������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['�������', '2', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('���� "��������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['��������', '2', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('�������� ������ 3', () => {

                it('���� "������������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['������������', '3', '1', entry.max],
                    '�������������� �������',
                    el.modal.printTable));

                it('���� "�������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['�������', '3', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('���� "��������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['��������', '3', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('�������� �������� �����', () => {

                it('������� ������ ��������', async () => await dec.simple(el.modal.printTable.closeHandler,
                    [entry.max],
                    el.modal.printTable));

                it('���������� �������� �����', async () => await dec.simple(el.modal.printTable.initClose,
                    [entry.max],
                    el.modal.printTable))
            });

        });

        deleteParams();
    });

    // �������� ������ 5 ������������� 1 ������ � ������������ ��������������� ����������� ��, 5 � ������������ ����������� "�������" � "��������"
    const printMaxParams = () => describe('�������������. ������. �������� ������ 5 ������������� 1 ������ ' +
        '� ���������� ��������������� ����������� �� 5 � ������������ ����������� "�������" � "��������"', () => {

        const params = {
            array: [...Array(5).keys()].map(item1 => {
                return [...Array(item1 + 1).keys()].map(item2 => {
                    return {
                        name: 'printMaxParamsName' + (item1 + 1) +  (item2 + 1),
                        phone: 'printMaxParamsPhone' + (item1 + 1) +  (item2 + 1),
                        description: 'printMaxParamsDescription' + (item1 + 1) +  (item2 + 1)
                    }
                });
            }),
        };

        describe('API - ����������', () => {
            bef();
            aft();

            params.array.forEach((item1) => {
                item1.forEach((item2, index2) => {

                    describe(`���������� ������������� ${index2 + 1} ������ - ${item2.name}`, () => {

                        if(index2 === 0) {
                            describe('���������� ������������� 1 ������', () => {
                                const obj = {
                                    parent_id: 0,
                                    name: item2.name,
                                    comment: item2.description,
                                    tel: item2.phone
                                };
                                addDivision(obj);
                            });
                        }

                        if(index2 > 0) {
                            describe(`���������� ������������� ${index2 + 1} ������`, () => {
                                it('���������� �������������', async () => {
                                    const cook = await page.base.getCookie('token');
                                    const get = await api.getDivision(cook.text);
                                    const obj = {
                                        parent_id: get.text[get.text.length - 1]['id'],
                                        name: item2.name,
                                        comment: item2.description,
                                        tel: item2.phone
                                    };
                                    await dec.simple(api.putDivision,
                                        [[obj], cook.text],
                                        api.putDivision);
                                });
                            });

                        }

                    });
                });
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('���������� 16 �������������', async () => await dec.simple(page.division.size,
                [16, entry.max],
                page.division));

            params.array.forEach((item1) => {
                let arr =[];
                item1.forEach((item2, index2) => {
                    it(`������������ ������������� ${index2 + 1} ������ - ${item2.name}`, async () => {
                        arr.push(item2.name);
                        await dec.simple(page.division.division,
                            [arr, entry.max],
                            page.division)
                    });
                    it(`������� �� ������������� ${index2 + 1} ������ -  ${item2.name}`,
                        async () => await dec.simple(page.division.handler,
                            [arr, entry.max],
                            page.division));
                    it(`������������� ${index2 + 1} ������ -  ${item2.name} ��������`,
                        async () => await dec.simple(page.division.selected,
                            [item2.name, entry.max],
                            page.division));
                    it(`�������� "�������"`,
                        async () => await dec.simpleText(el.input.getValue,
                            ['�������', '', entry.max],
                            item2.phone,
                            el.input));
                    it(`�������� "��������"`,
                        async () => await dec.simpleText(el.input.getValue,
                            ['��������', '', entry.max],
                            item2.description,
                            el.input));
                });
            });

        });

        describe('������ �������', () => {

            bef();
            aft();

            describe('�������� �������� �����', () => {
                it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.menu, entry.max],
                    el.butIcBefore))

                it('����������� "����"', async () => await dec.simple(el.menu.menu,
                    [entry.max],
                    el.menu))

                it('������� ��������� "������ �������"', async () => await dec.simple(el.menu.handler,
                    ['������ �������', entry.max],
                    el.menu))

                it('����������� �������� �����', async () => await dec.simple(el.modal.printTable.init,
                    [entry.max],
                    el.modal.printTable))
            });

            params.array.flat().forEach((item, index) => {
                describe(`�������� ������ ${index + 1}`, () => {
                    it('���� "������������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                        ['������������', index + 1, '1', entry.max],
                        item.name,
                        el.modal.printTable));

                    it('���� "�������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                        ['�������', index + 1, '2', entry.max],
                        item.phone,
                        el.modal.printTable));

                    it('���� "��������"', async () => {
                        await dec.simpleText(el.modal.printTable.cellGetText,
                            ['��������', index + 1, '3', entry.max],
                            item.description,
                            el.modal.printTable);
                    });

                });
            });

            describe(`�������� ������ 16`, () => {
                it('���� "������������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['������������', 16, '1', entry.max],
                    '�������������� �������',
                    el.modal.printTable));

                it('���� "�������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['�������', 16, '2', entry.max],
                    '',
                    el.modal.printTable));

                it('���� "��������"', async () => {
                    await dec.simpleText(el.modal.printTable.cellGetText,
                        ['��������', 16, '3', entry.max],
                        '',
                        el.modal.printTable);
                });

            });

            describe('�������� �������� �����', () => {

                it('������� ������ ��������', async () => await dec.simple(el.modal.printTable.closeHandler,
                    [entry.max],
                    el.modal.printTable));

                it('���������� �������� �����', async () => await dec.simple(el.modal.printTable.initClose,
                    [entry.max],
                    el.modal.printTable))
            });

        });

        deleteParams();
    });

    // �������� ������
    const print = () => describe('�������������. ������. �������� ������.', () => {
        printMinParams();
        printMaxParams();
    });

    return {
        printMinParams,
        printMaxParams,
        print,
    }

};

//����� ������ ������
const printTree = () => {

    const printTreeMinParams = () => describe('�������������. ������ ������. �������� ������ � ����� ��������������� ' +
        '1 � 2 ������ � ����������� ����������� ����������.', () => {
        const params = {
            name1: 'printTreeMinParamsName1',
            name2: 'printTreeMinParamsName2',
            space: '    ',
        };

        describe('API - ����������', () => {
            bef();
            aft();
            describe('���������� ������������� 1 ������', () => {
                const obj = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj);
            });
            describe('���������� ������������� 2 ������', () => {
                it('���������� �������������', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('����������� 3 ������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('����������� ������������ ������������� 1 ������', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('����������� ������������ ������������� 2 ������', async ()=> await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));
            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));
            });

        });

        describe('������ ������', () => {

            bef();
            aft();

            describe('�������� �������� �����', () => {
                it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.menu, entry.max],
                    el.butIcBefore));

                it('����������� "����"', async () => await dec.simple(el.menu.menu,
                    [entry.max],
                    el.menu));

                it('������� ��������� "������ ������"', async () => await dec.simple(el.menu.handler,
                    ['������ ������', entry.max],
                    el.menu));

                it('����������� �������� �����', async () => await dec.simple(el.modal.printTable.init,
                    [entry.max],
                    el.modal.printTable));
            });

            describe('�������� ������ 1', () => {

                it('���� "��������"', async () => await dec.simpleTextNoSpace(el.modal.printTable.cellGetText,
                    ['��������', '1', '1', entry.max],
                    `${params.name1}`,
                    el.modal.printTable));

                it('���� "�������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['�������', '1', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('���� "��������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['��������', '1', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('�������� ������ 2', () => {

                it('���� "��������"', async () => await dec.simpleTextNoSpace(el.modal.printTable.cellGetText,
                    ['��������', '2', '1', entry.max],
                    params.space + params.name2,
                    el.modal.printTable));

                it('���� "�������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['�������', '2', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('���� "��������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['��������', '2', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('�������� ������ 3', () => {

                it('���� "��������"', async () => await dec.simpleTextNoSpace(el.modal.printTable.cellGetText,
                    ['��������', '3', '1', entry.max],
                    '�������������� �������',
                    el.modal.printTable));

                it('���� "�������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['�������', '3', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('���� "��������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['��������', '3', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('�������� �������� �����', () => {

                it('������� ������ ��������', async () => await dec.simple(el.modal.printTable.closeHandler,
                    [entry.max],
                    el.modal.printTable));

                it('���������� �������� �����', async () => await dec.simple(el.modal.printTable.initClose,
                    [entry.max],
                    el.modal.printTable))
            });

        });

        deleteParams();

    });

    // �������� ������ 5 ������������� 1 ������ � ������������ ��������������� ����������� ��, 5 � ������������ ����������� "�������" � "��������"
    const printTreeMaxParams = () => describe('�������������. ������ ������. �������� ������ 5 ������������� ' +
        '1 ������ � ������������ ��������������� ����������� �� 5 � ������������ ����������� "�������" � "��������"',
        () => {

        const params = {
            array: [...Array(5).keys()].map(item1 => {
                return [...Array(item1 + 1).keys()].map(item2 => {
                    return {
                        name: 'printMaxParamsName' + (item1 + 1) +  (item2 + 1),
                        phone: 'printMaxParamsPhone' + (item1 + 1) +  (item2 + 1),
                        description: 'printMaxParamsDescription' + (item1 + 1) +  (item2 + 1)
                    }
                });
            }),
            space: '    ',
            flag: 1
        };

        describe('API - ����������', () => {
            bef();
            aft();

            params.array.forEach((item1) => {
                item1.forEach((item2, index2) => {

                    describe(`���������� ������������� ${index2 + 1} ������ - ${item2.name}`, () => {

                        if(index2 === 0) {
                            describe('���������� ������������� 1 ������', () => {
                                const obj = {
                                    parent_id: 0,
                                    name: item2.name,
                                    comment: item2.description,
                                    tel: item2.phone
                                };
                                addDivision(obj);
                            });
                        }

                        if(index2 > 0) {
                            describe(`���������� ������������� ${index2 + 1} ������`, () => {
                                it('���������� �������������', async () => {
                                    const cook = await page.base.getCookie('token');
                                    const get = await api.getDivision(cook.text);
                                    const obj = {
                                        parent_id: get.text[get.text.length - 1]['id'],
                                        name: item2.name,
                                        comment: item2.description,
                                        tel: item2.phone
                                    };
                                    await dec.simple(api.putDivision,
                                        [[obj], cook.text],
                                        api.putDivision);
                                });
                            });

                        }

                    });
                });
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('���������� 16 �������������', async () => await dec.simple(page.division.size,
                [16, entry.max],
                page.division));

            params.array.forEach((item1) => {
                let arr =[];
                item1.forEach((item2, index2) => {
                    it(`������������ ������������� ${index2 + 1} ������ - ${item2.name}`, async () => {
                        arr.push(item2.name);
                        await dec.simple(page.division.division,
                            [arr, entry.max],
                            page.division)
                    });
                    it(`������� �� ������������� ${index2 + 1} ������ -  ${item2.name}`,
                        async () => await dec.simple(page.division.handler,
                            [arr, entry.max],
                            page.division));
                    it(`������������� ${index2 + 1} ������ -  ${item2.name} ��������`,
                        async () => await dec.simple(page.division.selected,
                            [item2.name, entry.max],
                            page.division));
                    it(`�������� "�������"`,
                        async () => await dec.simpleText(el.input.getValue,
                            ['�������', '', entry.max],
                            item2.phone,
                            el.input));
                    it(`�������� "��������"`,
                        async () => await dec.simpleText(el.input.getValue,
                            ['��������', '', entry.max],
                            item2.description,
                            el.input));
                });
            });

        });

        describe('������ ������', () => {

            bef();
            aft();

            describe('�������� �������� �����', () => {
                it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.menu, entry.max],
                    el.butIcBefore))

                it('����������� "����"', async () => await dec.simple(el.menu.menu,
                    [entry.max],
                    el.menu))

                it('������� ��������� "������ ������"', async () => await dec.simple(el.menu.handler,
                    ['������ ������', entry.max],
                    el.menu));

                it('����������� �������� �����', async () => await dec.simple(el.modal.printTable.init,
                    [entry.max],
                    el.modal.printTable));
            });
            describe('�������� �����', () => {
                params.array.forEach((item1) => {
                    item1.forEach((item2, index2) => {
                        const str = params.array.flat().indexOf(item2);
                        describe(`�������� ������ ${str + 1}`, () => {
                            it('���� "��������"', async () => {
                                await dec.simpleTextNoSpace(el.modal.printTable.cellGetText,
                                    ['��������', params.flag, '1', entry.max],
                                    [...Array(index2).keys()].map(() => params.space).join('') + item2.name,
                                    el.modal.printTable)
                            });

                            it('���� "�������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                                ['�������', params.flag, '2', entry.max],
                                item2.phone,
                                el.modal.printTable));

                            it('���� "��������"', async () => {
                                await dec.simpleText(el.modal.printTable.cellGetText,
                                    ['��������', params.flag, '3', entry.max],
                                    item2.description,
                                    el.modal.printTable);
                                params.flag += 1;
                            });

                        });

                    });
                });
            })



            describe(`�������� ������ 16`, () => {
                it('���� "��������"', async () => await dec.simpleTextNoSpace(el.modal.printTable.cellGetText,
                    ['��������', 16, '1', entry.max],
                    '�������������� �������',
                    el.modal.printTable));

                it('���� "�������"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['�������', 16, '2', entry.max],
                    '',
                    el.modal.printTable));

                it('���� "��������"', async () => {
                    await dec.simpleText(el.modal.printTable.cellGetText,
                        ['��������', 16, '3', entry.max],
                        '',
                        el.modal.printTable);
                });

            });

            describe('�������� �������� �����', () => {

                it('������� ������ ��������', async () => await dec.simple(el.modal.printTable.closeHandler,
                    [entry.max],
                    el.modal.printTable));

                it('���������� �������� �����', async () => await dec.simple(el.modal.printTable.initClose,
                    [entry.max],
                    el.modal.printTable))
            });

        });

        deleteParams();
    });

    const printTree = () => {
        printTreeMinParams();
        printTreeMaxParams();
    };

    return {
        printTreeMinParams,
        printTreeMaxParams,
        printTree,
    };

};

//����� ��������
const exportFile = (agr, str, format) => {

    const apiMax = () => describe('API - ����������', () => {
        const params = {
            division1: 'apiMaxdivision1',
            division2: [...Array(2).keys()].map(item => 'apiMaxDivision2' + (item + 1)),
            division3: [...Array(3).keys()].map(item => 'apiMaxDivision3' + (item + 1)),
            division4: [...Array(4).keys()].map(item => 'apiMaxDivision4' + (item + 1)),
            division5: [...Array(5).keys()].map(item => 'apiMaxDivision5' + (item + 1)),
            division6: [...Array(6).keys()].map(item => 'apiMaxDivision6' + (item + 1)),
            division7: [...Array(7).keys()].map(item => 'apiMaxDivision7' + (item + 1)),
            fio: {
                lastName: 'staff',
                firstName: '1',
                middleName: '' ,
                divisionId: 1,
                date: '2001-01-01'
            },
            template1: 'apiMaxTemplate1',
            template2: 'apiMaxTemplate2',
            schedule: 'apiMaxSchedule',
            description: 'apiMaxDescription',
            phone: 'apiMaxPhone'
        };

        describe('����������', () => {
            bef();
            aft();

            addAccessTemplate(params.template1, '');
            addAccessTemplate(params.template2, '');
            addSchedule(params.schedule);
            addStaff(...Object.values(params.fio));

            it(`���������� ������������� 1 ������ - ${params.division1}`, async () => {
                const cook = await page.base.getCookie('token');
                const obj = {
                    "parent_id": 0,
                    "name": params.division1,
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

            params.division2.forEach((item, index) => {
                it(`��������� ������������� ${index + 1} ������ - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);
                    console.log('id: ', getDivision.text[getDivision.text.length - 1]);
                    console.log('index: ', index);
                    const obj = {
                        "parent_id": index === 0 ? 0 : getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "tel": params.phone
                    };
                    console.log('obj: ', obj);
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });

            params.division3.forEach((item, index) => {
                it(`��������� ������������� ${index + 1} ������ - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);
                    console.log('id: ', getDivision.text[getDivision.text.length - 1]);
                    console.log('index: ', index);
                    const obj = {
                        "parent_id": index === 0 ? 0 : getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "comment": params.description,
                        "tel": params.phone,
                    };
                    console.log('obj: ', obj);
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });

            params.division4.forEach((item, index) => {
                it(`��������� ������������� ${index + 1} ������ - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);
                    const getTemplate = await api.getAccessTemplate(cook.text);
                    console.log('id: ', getDivision.text[getDivision.text.length - 1]['id']);
                    console.log('index: ', index);
                    const obj = {
                        "parent_id": index === 0 ? 0 : getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "comment": params.description,
                        "tel": params.phone,
                        "staff_access_template": [getTemplate.text[0]['id'], getTemplate.text[1]['id']],
                    };
                    console.log('obj: ', obj);
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });

            params.division5.forEach((item, index) => {
                it(`��������� ������������� ${index + 1} ������ - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);
                    const getTemplate = await api.getAccessTemplate(cook.text);
                    const obj = {
                        "parent_id": index === 0 ? 0 : getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "comment": params.description,
                        "tel": params.phone,
                        "staff_access_template": [getTemplate.text[0]['id'], getTemplate.text[1]['id']],
                        "visitor_access_template": getTemplate.text[0]['id'],
                    };
                    console.log('obj: ', obj);
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });

            params.division6.forEach((item, index) => {
                it(`��������� ������������� ${index + 1} ������ - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);
                    const getTemplate = await api.getAccessTemplate(cook.text);
                    const getSchedule = await api.getSchedule(cook.text);
                    const obj = {
                        "parent_id": index === 0 ? 0 : getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "comment": params.description,
                        "tel": params.phone,
                        "staff_access_template": [getTemplate.text[0]['id'], getTemplate.text[1]['id']],
                        "visitor_access_template": getTemplate.text[0]['id'],
                        "work_schedule": getSchedule.text[0]['id'],
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });

            params.division7.forEach((item, index) => {
                it(`��������� ������������� ${index + 1} ������ - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getStaff = await api.getStaff(cook.text);
                    const getDivision = await api.getDivision(cook.text);
                    const getTemplate = await api.getAccessTemplate(cook.text);
                    const getSchedule = await api.getSchedule(cook.text);
                    const obj = {
                        "parent_id": index === 0 ? 0 :  getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "comment": params.description,
                        "tel": params.phone,
                        "accompanying": getStaff.text[0]['id'],
                        "staff_access_template": [getTemplate.text[0]['id'], getTemplate.text[1]['id']],
                        "visitor_access_template": getTemplate.text[0]['id'],
                        "work_schedule": getSchedule.text[0]['id'],
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('���������� 29 �������������', async () => await dec.simple(page.division.size,
                [29, entry.max],
                page.division));

            it(`������������ ������������� 1 ������ - ${params.division1}`, async () => {
                await dec.simple(page.division.division,
                    [[params.division1], entry.max],
                    page.division)
            });

            const array = [params.division2,
                params.division3,
                params.division4,
                params.division5,
                params.division6,
                params.division7];

            array.forEach((item1) => {
                let arr =[];
                item1.forEach((item2, index2) => {
                    it(`������������ ������������� ${index2 + 1} ������ - ${item2}`, async () => {
                        arr.push(item2);
                        await dec.simple(page.division.division,
                            [arr, entry.max],
                            page.division)
                    });
                });
            });

        });

    });

    const apiMin = () => describe('API - ����������', () => {
        const params = {
            division1: 'apiMinDivision1',
            division2:  'apiMinDivision2',
        };

        describe('����������', () => {
            bef();
            aft();

            it('���������� ������������ 1 ������', async () => {
                const cook = await page.base.getCookie('token');
                const obj = {
                    "parent_id": 0,
                    "name": params.division1
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
            it('���������� ������������ 2 ������', async () => {
                const cook = await page.base.getCookie('token');
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[0]['id'],
                    "name": params.division2
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('������������ ������������� 1', async () => await dec.simple(page.division.division,
                [[params.division1], entry.max],
                page.division));

            it('������������ ������������� 2', async () => await dec.simple(page.division.division,
                [[params.division2], entry.max],
                page.division));
        });

    });

    // ��� ��������� ����� � ��������� ���. ��������� � �� ��������� ���������.
    const systemNameNoHead = () => describe(`�������������. �������. ${format}. ��� ��������� ����� � ��������� ���. 
        ��������� � �� ��������� ���������. ${str}.`, () => {

        const params = {
            name: format === 'XLSX' ? 'division.xlsx' : 'division.csv',
            file1: [
                {
                    '����� "�������������"': '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    '����� "�������������"': 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            file2: [
                {
                    '����� "�������������"': '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    '����� "�������������"': 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            file3: [
                {
                    "�������������": "apiMaxdivision1"
                },
                {
                    "�������������": "apiMaxDivision21",
                    "�������": "apiMaxPhone"
                },
                {
                    "�������������": "apiMaxDivision21/apiMaxDivision22",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision31",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision31/apiMaxDivision32",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision31/apiMaxDivision32/apiMaxDivision33",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision41",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision41/apiMaxDivision42",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision41/apiMaxDivision42/apiMaxDivision43",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision51",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision51/apiMaxDivision52",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61/apiMaxDivision62",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1",
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "�������������": "�������������� �������"
                }
            ],
            file4: [
                { '�������������': 'apiMinDivision1' },
                { '�������������': 'apiMinDivision1/apiMinDivision2' },
                { '�������������': '�������������� �������' }
            ]
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('�������', () => {

            bef();
            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "�������"', async () => await dec.simple(el.menu.handler,
                ['�������', entry.max],
                el.menu));

            it('����������� ���������� ���� "�������������� ������"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            switch (format) {
                case 'XLSX':
                    it('����� "�������� ��� ����� ��� ��������"', async () => await dec.simple(el.select.iconXpand,
                        ['�������� ��� ����� ��� ��������', 'XLSX', 'XLSX', entry.max],
                        el.select));

                    it('����� "���������"', async () => await dec.simple(el.select.iconXpand,
                        ['���������', '�������� ��������� � �����', '�� ��������� ���������', entry.max],
                        el.select));
                    break;
                case 'CSV':
                    it('����� "�������� ��� ����� ��� ��������"', async () => await dec.simple(el.select.iconXpand,
                        ['�������� ��� ����� ��� ��������', 'XLSX', 'CSV', entry.max],
                        el.select));
                    break;
                default:
                    it('����� "�������� ��� ����� ��� ��������"', async () => await dec.simple(el.select.iconXpand,
                        ['�������� ��� ����� ��� ��������', 'XLSX', 'XLSX', entry.max],
                        el.select));

                    it('����� "���������"', async () => await dec.simple(el.select.iconXpand,
                        ['���������', '�������� ��������� � �����', '�� ��������� ���������', entry.max],
                        el.select));
                    break;
            }

            it('������� ������ "��������������"', async () => await dec.simple(el.button.handler,
                ['��������������', entry.max],
                el.button));

            it('���������� ���������� ���� "�������������� ������"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));

        });

        describe('�������� ����� ��������', () => {

            it('����������� �����', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            switch (format) {
                case 'XLSX':
                    it('�������� ����� �����', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        const file = agr === 'min' ? params.file2 : params.file1;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;
                case 'CSV':
                    it('�������� ����� �����', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        const file = agr === 'min' ? params.file4 : params.file3;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;
                default:
                    it('�������� ����� �����', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        const file = agr === 'min' ? params.file2 : params.file1;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;

            }

            it('�������� �����', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    // ��� ��������� ����� � ��������� ���. ��������� � �������� ��������� � �����.
    const systemNameAddHead = () => describe(`�������������. �������. ${format}. ��� ��������� ����� � ��������� ���. '
        '��������� � �������� ��������� � �����. ${str}.`, () => {

        const params = {
            name: 'division.xlsx',
            file1: [
                {
                    '����� "�������������"': '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    '����� "�������������"': 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            file2: [
                {
                    '����� "�������������"': '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    '����� "�������������"': 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ]
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('�������', () => {

            bef();
            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "�������"', async () => await dec.simple(el.menu.handler,
                ['�������', entry.max],
                el.menu));

            it('����������� ���������� ���� "�������������� ������"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            it('����� "�������� ��� ����� ��� ��������"', async () => await dec.simple(el.select.iconXpand,
                ['�������� ��� ����� ��� ��������', 'XLSX', 'XLSX', entry.max],
                el.select));

            it('����� "���������"', async () => await dec.simple(el.select.iconXpand,
                ['���������', '�������� ��������� � �����', '�������� ��������� � �����', entry.max],
                el.select));

            it('������� ������ "��������������"', async () => await dec.simple(el.button.handler,
                ['��������������', entry.max],
                el.button));

            it('���������� ���������� ���� "�������������� ������"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));
        });

        describe('�������� ����� ��������', () => {

            it('����������� �����', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            it('�������� ����� �����', async () => {
                const jsonFile = await el.file.readNum(params.name);
                console.log('jsonFile', jsonFile)
                const file = agr === 'min' ? params.file2 : params.file1;
                await dec.exportFile(file, jsonFile);
            })

            it('�������� �����', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    // ��� ��������� ����� � ��������� ���. ��������� � �������� ���� ���������.
    const systemNameItHead = () => describe(`�������������. �������. ${format}. ��� ��������� ����� � ��������� ���. 
        ��������� � �������� ���� ���������. ${str}.`, () => {

        const params = {
            name: 'division.xlsx',
            head: 'systemNameItHead',
            file1: [
                {
                    systemNameItHead: '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    systemNameItHead: 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            file2: [
                {
                    systemNameItHead: '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    systemNameItHead: 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ]
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('�������', () => {

            bef();
            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "�������"', async () => await dec.simple(el.menu.handler,
                ['�������', entry.max],
                el.menu));

            it('����������� ���������� ���� "�������������� ������"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            it('����� "�������� ��� ����� ��� ��������"', async () => await dec.simple(el.select.iconXpand,
                ['�������� ��� ����� ��� ��������', 'XLSX', 'XLSX', entry.max],
                el.select));

            it('����� "���������"', async () => await dec.simple(el.select.iconXpand,
                ['���������', '�������� ��������� � �����', '�������� ���� ���������', entry.max],
                el.select));

            it('���� "������������"', async () => await dec.simple(el.input.sendKeys,
                ['������������', '', params.head, entry.max],
                el.input));

            it('������� ������ "��������������"', async () => await dec.simple(el.button.handler,
                ['��������������', entry.max],
                el.button));

            it('���������� ���������� ���� "�������������� ������"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));
        });

        describe('�������� ����� ��������', () => {

            it('����������� �����', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            it('�������� ����� �����', async () => {
                const jsonFile = await el.file.readNum(params.name);
                console.log('jsonFile', jsonFile)
                const file = agr === 'min' ? params.file2 : params.file1;
                await dec.exportFile(file, jsonFile);
            })

            it('�������� �����', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    // ��� ��������� ����� � ���� ���. ��������� � �� ��������� ���������.
    const nameNoHead = () => describe(`�������������. �������. ${format}. ��� ��������� ����� � ���� ���. 
        ��������� � �� ��������� ���������. ${str}.`, () => {

        const params = {
            name: format === 'XLSX' ? 'nameNoHead.xlsx' : 'nameNoHead.csv',
            file1: [
                {
                    '����� "�������������"': '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    '����� "�������������"': 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            file2: [
                {
                    '����� "�������������"': '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    '����� "�������������"': 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            file3: [
                {
                    "�������������": "apiMaxdivision1"
                },
                {
                    "�������������": "apiMaxDivision21",
                    "�������": "apiMaxPhone"
                },
                {
                    "�������������": "apiMaxDivision21/apiMaxDivision22",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision31",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision31/apiMaxDivision32",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision31/apiMaxDivision32/apiMaxDivision33",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision41",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision41/apiMaxDivision42",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision41/apiMaxDivision42/apiMaxDivision43",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44",
                    "�������": "apiMaxPhone"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision51",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision51/apiMaxDivision52",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61/apiMaxDivision62",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1",
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "������ ������": "apiMaxSchedule",
                    "��������": "apiMaxDescription",
                    "�������������": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77",
                    "��������������": "staff 1 ",
                    "�������": "apiMaxPhone",
                    "������ ������� ��� �����������": "apiMaxTemplate1"
                },
                {
                    "�������������": "�������������� �������"
                }
            ],
            file4: [
                { '�������������': 'apiMinDivision1' },
                { '�������������': 'apiMinDivision1/apiMinDivision2' },
                { '�������������': '�������������� �������' }
            ],
            fileName: 'nameNoHead'
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('�������', () => {

            bef();
            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "�������"', async () => await dec.simple(el.menu.handler,
                ['�������', entry.max],
                el.menu));

            it('����������� ���������� ���� "�������������� ������"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            switch (format) {
                case 'XLSX':
                    it('����� "�������� ��� ����� ��� ��������"', async () => await dec.simple(el.select.iconXpand,
                        ['�������� ��� ����� ��� ��������', 'XLSX', 'XLSX', entry.max],
                        el.select));

                    it('���� "��� ��������� �����"', async () => await dec.simple(el.input.sendKeys,
                        ['��� ��������� �����', '������������ ��������', params.fileName, entry.max],
                        el.input));

                    it('����� "���������"', async () => await dec.simple(el.select.iconXpand,
                        ['���������', '�������� ��������� � �����', '�� ��������� ���������', entry.max],
                        el.select));
                    break;
                case 'CSV':
                    it('����� "�������� ��� ����� ��� ��������"', async () => await dec.simple(el.select.iconXpand,
                        ['�������� ��� ����� ��� ��������', 'XLSX', 'CSV', entry.max],
                        el.select));

                    it('���� "��� ��������� �����"', async () => await dec.simple(el.input.sendKeys,
                        ['��� ��������� �����', '������������ ��������', params.fileName, entry.max],
                        el.input));
                    break;
                default:
                    it('����� "�������� ��� ����� ��� ��������"', async () => await dec.simple(el.select.iconXpand,
                        ['�������� ��� ����� ��� ��������', 'XLSX', 'XLSX', entry.max],
                        el.select));

                    it('���� "��� ��������� �����"', async () => await dec.simple(el.input.sendKeys,
                        ['��� ��������� �����', '������������ ��������', params.fileName, entry.max],
                        el.input));

                    it('����� "���������"', async () => await dec.simple(el.select.iconXpand,
                        ['���������', '�������� ��������� � �����', '�� ��������� ���������', entry.max],
                        el.select));
                    break;
            }

            it('������� ������ "��������������"', async () => await dec.simple(el.button.handler,
                ['��������������', entry.max],
                el.button));

            it('���������� ���������� ���� "�������������� ������"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));


        });

        describe('�������� ����� ��������', () => {

            it('����������� �����', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            switch (format) {
                case 'XLSX':
                    it('�������� ����� �����', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        console.log('jsonFile', jsonFile)
                        const file = agr === 'min' ? params.file2 : params.file1;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;
                case 'CSV':
                    it('�������� ����� �����', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        console.log('jsonFile', jsonFile)
                        const file = agr === 'min' ? params.file4 : params.file3;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;
                default:
                    it('�������� ����� �����', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        console.log('jsonFile', jsonFile)
                        const file = agr === 'min' ? params.file2 : params.file1;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;
            }

            it('�������� �����', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    // �������. ��� ��������� ����� � ���� ���.��������� � �������� ��������� � �����.
    const nameAddHead = () => describe(`�������������. �������. ${format}. ��� ��������� ����� � ���� ���. 
        ��������� � �������� ��������� � �����. ${str}.`, () => {

        const params = {
            name: 'nameAddHead.xlsx',
            file1: [
                {
                    '����� "�������������"': '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    '����� "�������������"': 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    '����� "�������������"': '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            file2: [
                {
                    '����� "�������������"': '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    '����� "�������������"': 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    '����� "�������������"': '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            fileName: 'nameAddHead'
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('�������', () => {

            bef();
            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "�������"', async () => await dec.simple(el.menu.handler,
                ['�������', entry.max],
                el.menu));

            it('����������� ���������� ���� "�������������� ������"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            it('����� "�������� ��� ����� ��� ��������"', async () => await dec.simple(el.select.iconXpand,
                ['�������� ��� ����� ��� ��������', 'XLSX', 'XLSX', entry.max],
                el.select));

            it('���� "��� ��������� �����"', async () => await dec.simple(el.input.sendKeys,
                ['��� ��������� �����', '������������ ��������', params.fileName, entry.max],
                el.input));

            it('����� "���������"', async () => await dec.simple(el.select.iconXpand,
                ['���������', '�������� ��������� � �����', '�������� ��������� � �����', entry.max],
                el.select));

            it('������� ������ "��������������"', async () => await dec.simple(el.button.handler,
                ['��������������', entry.max],
                el.button));

            it('���������� ���������� ���� "�������������� ������"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));
        });

        describe('�������� ����� ��������', () => {

            it('����������� �����', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            it('�������� ����� �����', async () => {
                const jsonFile = await el.file.readNum(params.name);
                console.log('jsonFile', jsonFile)
                const file = agr === 'min' ? params.file2 : params.file1;
                await dec.exportFile(file, jsonFile);
            })

            it('�������� �����', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    // �������. ��� ��������� ����� � ���� ���.��������� � �������� ��������� � �����.
    const nameItHead = () => describe(`�������������. �������. ${format}. ��� ��������� ����� � ���� ���. 
        ��������� � �������� ���� ���������. ${str}.`, () => {

        const params = {
            name: 'nameItHead.xlsx',
            head: 'systemNameItHead',
            file1: [
                {
                    systemNameItHead: '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    systemNameItHead: 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            file2: [
                {
                    systemNameItHead: '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������'
                },
                {
                    systemNameItHead: 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: '�������������� �������',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            fileName: 'nameItHead'
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('�������', () => {

            bef();
            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "�������"', async () => await dec.simple(el.menu.handler,
                ['�������', entry.max],
                el.menu));

            it('����������� ���������� ���� "�������������� ������"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            it('����� "�������� ��� ����� ��� ��������"', async () => await dec.simple(el.select.iconXpand,
                ['�������� ��� ����� ��� ��������', 'XLSX', 'XLSX', entry.max],
                el.select));

            it('���� "��� ��������� �����"', async () => await dec.simple(el.input.sendKeys,
                ['��� ��������� �����', '������������ ��������', params.fileName, entry.max],
                el.input));

            it('����� "���������"', async () => await dec.simple(el.select.iconXpand,
                ['���������', '�������� ��������� � �����', '�������� ���� ���������', entry.max],
                el.select));

            it('���� "������������"', async () => await dec.simple(el.input.sendKeys,
                ['������������', '', params.head, entry.max],
                el.input));

            it('������� ������ "��������������"', async () => await dec.simple(el.button.handler,
                ['��������������', entry.max],
                el.button));

            it('���������� ���������� ���� "�������������� ������"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));
        });

        describe('�������� ����� ��������', () => {

            it('����������� �����', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            it('�������� ����� �����', async () => {
                const jsonFile = await el.file.readNum(params.name);
                console.log('jsonFile', jsonFile)
                const file = agr === 'min' ? params.file2 : params.file1;
                await dec.exportFile(file, jsonFile);
            })

            it('�������� �����', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    const mainXLSX = () => describe(`�������������. �������� �������� - ${format}. ${str}.`, () => {
        systemNameNoHead();
        systemNameAddHead();
        systemNameItHead();
        nameNoHead();
        nameAddHead();
        nameItHead();
    });

    const mainCSV = () => describe(`�������������. �������� �������� - ${format}. ${str}.`, () => {
        systemNameNoHead();
        nameNoHead();
    });

    return {
        xlsx: {
            systemNameNoHead,
            systemNameAddHead,
            systemNameItHead,
            nameNoHead,
            nameAddHead,
            nameItHead,
            main: () => mainXLSX()
        },
        csv: {
            systemNameNoHead,
            nameNoHead,
            main: () => mainCSV()
        }
    }

};

//����� �������
const importFile = () => {

    // ������ xlsx � ����������� ����������� ����������.
    const importXLSXMinParams = () => describe('�������������. ������. ������ � ����������� ����������� ���������� ' +
        '�� xlsx �����. ', () => {

        const params = {
            name1: 'importMinParamsName1',
            name2: 'importMinParamsName2',
            message: '������ �������� 0 ������� �� 2 �� ���� �������������',
        };

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[ "�������������� �������"], entry.max],
                page.division));

        });

        describe('������', () => {

            bef();

            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "������ �� XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['������ �� XLS, XLSX', entry.max],
                el.menu));

            it('����������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('����� ��������� �����', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXMinSuccess, entry.upload],
                el.modal.importData));

            it('����������� "�������������"', async () => await dec.simple(el.select.select,
                ['�������������', '', entry.upload],
                el.select));

            it('����� "�������������"', async () => await dec.simple(el.select.iconXpand,
                ['�������������', '', '�������������', entry.max],
                el.select));

            it('����������� "�������"', async () => await dec.simple(el.select.select,
                ['�������', '', entry.max],
                el.select));

            it('����������� "��������"', async () => await dec.simple(el.select.select,
                ['��������', '', entry.max],
                el.select));

            it('����������� "��������������"', async () => await dec.simple(el.select.select,
                ['��������������', '', entry.max],
                el.select));

            it('����������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.select,
                ['������ ������� ��� ����������', '', entry.max],
                el.select));

            it('����������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.select,
                ['������ ������� ��� ����������', '', entry.max],
                el.select));

            it('����������� "������ ������"', async () => await dec.simple(el.select.select,
                ['������ ������', '', entry.max],
                el.select));

            it('������� ������ "�����"', async () => await dec.simple(el.button.handler,
                ['�����', entry.max],
                el.button));

            it('��������� � �������� ������', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('������� ������ "������"', async () => await dec.simple(el.button.handler,
                ['������', entry.max],
                el.button));
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));
            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));
            });
        });

        deleteParams();
    });

    // ������ xls � ����������� ����������� ����������.
    const importXLSMinParams = () => describe('�������������. ������. ������ � ����������� ����������� ���������� ' +
        '�� xls �����. ', () => {

        const params = {
            name1: 'importMinParamsName1',
            name2: 'importMinParamsName2',
            message: '������ �������� 0 ������� �� 2 �� ���� �������������',
        };

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[ "�������������� �������"], entry.max],
                page.division));

        });

        describe('������', () => {

            bef();

            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "������ �� XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['������ �� XLS, XLSX', entry.max],
                el.menu));

            it('����������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('����� ��������� �����', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSMinSuccess, entry.upload],
                el.modal.importData));

            it('����������� "�������������"', async () => await dec.simple(el.select.select,
                ['�������������', '', entry.upload],
                el.select));

            it('����� "�������������"', async () => await dec.simple(el.select.iconXpand,
                ['�������������', '', '�������������', entry.max],
                el.select));

            it('����������� "�������"', async () => await dec.simple(el.select.select,
                ['�������', '', entry.max],
                el.select));

            it('����������� "��������"', async () => await dec.simple(el.select.select,
                ['��������', '', entry.max],
                el.select));

            it('����������� "��������������"', async () => await dec.simple(el.select.select,
                ['��������������', '', entry.max],
                el.select));

            it('����������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.select,
                ['������ ������� ��� ����������', '', entry.max],
                el.select));

            it('����������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.select,
                ['������ ������� ��� ����������', '', entry.max],
                el.select));

            it('����������� "������ ������"', async () => await dec.simple(el.select.select,
                ['������ ������', '', entry.max],
                el.select));

            it('������� ������ "�����"', async () => await dec.simple(el.button.handler,
                ['�����', entry.max],
                el.button));

            it('��������� � �������� ������', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('������� ������ "������"', async () => await dec.simple(el.button.handler,
                ['������', entry.max],
                el.button));
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));
            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    '',
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    '',
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    '',
                    el.input));
            });
        });

        deleteParams();
    });

    // ������ xlsx � ������������ ����������� ����������.
    const importXLSXMaxParams = () => describe('�������������. ������. ������ � ������������ ����������� ���������� ' +
    '�� xlsx �����.', () => {
        const params = {
            division1: {
                name: 'importXLSXMaxParamsName1',
                phone: 'importXLSXMaxParamsPhone1',
                description: 'importXLSXMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'importXLSXMaxParamsName2',
                phone: 'importXLSXMaxParamsPhone2',
                description: 'importXLSXMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
            message: '������ �������� 0 ������� �� 2 �� ���� �������������',
        };

        describe('API - ����������', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[ "�������������� �������"], entry.max],
                page.division));

        });

        describe('������', () => {

            bef();

            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "������ �� XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['������ �� XLS, XLSX', entry.max],
                el.menu));

            it('����������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('����� ��������� �����', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXMaxSuccess, entry.upload],
                el.modal.importData));

            it('����������� "�������������"', async () => await dec.simple(el.select.select,
                ['�������������', '', entry.upload],
                el.select));

            it('����� "�������������"', async () => await dec.simple(el.select.iconXpand,
                ['�������������', '', '�������������', entry.max],
                el.select));

            it('����������� "�������"', async () => await dec.simple(el.select.select,
                ['�������', '', entry.max],
                el.select));

            it('����� "�������"', async () => await dec.simple(el.select.iconXpand,
                ['�������', '', '�������', entry.max],
                el.select));

            it('����������� "��������"', async () => await dec.simple(el.select.select,
                ['��������', '', entry.max],
                el.select));

            it('����� "��������"', async () => await dec.simple(el.select.iconXpand,
                ['��������', '', '��������', entry.max],
                el.select));

            it('����������� "��������������"', async () => await dec.simple(el.select.select,
                ['��������������', '', entry.max],
                el.select));

            it('����� "��������������"', async () => await dec.simple(el.select.iconXpand,
                ['��������������', '', '��������������', entry.max],
                el.select));

            it('����������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.select,
                ['������ ������� ��� ����������', '', entry.max],
                el.select));

            it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                ['������ ������� ��� ����������', '', '������ ������� ��� �����������', entry.max],
                el.select));

            it('����������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.select,
                ['������ ������� ��� ����������', '', entry.max],
                el.select));

            it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                ['������ ������� ��� ����������', '', '������ ������� ��� �����������', entry.max],
                el.select));

            it('����������� "������ ������"', async () => await dec.simple(el.select.select,
                ['������ ������', '', entry.max],
                el.select));

            it('����� "������ ������"', async () => await dec.simple(el.select.iconXpand,
                ['������ ������', '', '������ ������', entry.max],
                el.select));

            it('������� ������ "�����"', async () => await dec.simple(el.button.handler,
                ['�����', entry.max],
                el.button));

            it('��������� � �������� ������', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('������� ������ "������"', async () => await dec.simple(el.button.handler,
                ['������', entry.max],
                el.button));
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 3 �������������', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('�������� ������������� 1 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division1.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('�������� ������������� 2 ������', () => {

                it('������������ �������������', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������� �� �������������', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('������������� ��������', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('�������� "�������"', async () => await dec.simpleText(el.input.getValue,
                    ['�������', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('�������� "��������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������', '', entry.max],
                    params.division2.description,
                    el.input));

                it('�������� "��������������"', async () => await dec.simpleText(el.input.getValue,
                    ['��������������', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('�������� "������ ������� ��� ����������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������� ��� ����������', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('�������� "������ ������"', async () => await dec.simpleText(el.input.getValue,
                    ['������ ������', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        deleteParams();

    });

    // ������ � ����������� "�������������" � ������������ ����������� ����������
    const importXLSXMaxParamsNoName = () => describe('�������������. ������. ������ � ����������� "�������������" � ' +
        '������������ ����������� ���������� �� xlsx ����� � ��������� ����� � ��������.', () => {
        const params = {
            division1: {
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
            message: '������ �������� 2 ������� �� 2 �� ���� �������������',
            file: [
                {
                    '����� "�� ��������������� ������"': '�������������',
                    __EMPTY: '�������',
                    __EMPTY_1: '��������',
                    __EMPTY_2: '������ ������� ��� �����������',
                    __EMPTY_3: '������ ������� ��� �����������',
                    __EMPTY_4: '������ ������',
                    __EMPTY_5: '��������������',
                    __EMPTY_6: '������'
                },
                {
                    '����� "�� ��������������� ������"': '',
                    __EMPTY: 'importXLSXMaxParamsPhone1',
                    __EMPTY_1: 'importXLSXMaxParamsDescription1',
                    __EMPTY_2: 'template11;template12',
                    __EMPTY_3: 'template13',
                    __EMPTY_4: 'schedule1',
                    __EMPTY_5: 'staff 1',
                    __EMPTY_6: '����������� ������������ ���� �������������'
                },
                {
                    '����� "�� ��������������� ������"': 'importXLSXMaxParamsName1/importXLSXMaxParamsName2',
                    __EMPTY: 'importXLSXMaxParamsPhone2',
                    __EMPTY_1: 'importXLSXMaxParamsDescription2',
                    __EMPTY_2: 'template21;template22;',
                    __EMPTY_3: 'template23',
                    __EMPTY_4: 'schedule2',
                    __EMPTY_5: 'staff 2',
                    __EMPTY_6: '������� ������� �� ������� ��� ����� ����������'
                }
            ]
        };

        describe('API - ����������', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[ "�������������� �������"], entry.max],
                page.division));

        });

        describe('������', () => {

            bef();

            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "������ �� XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['������ �� XLS, XLSX', entry.max],
                el.menu));

            it('����������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('����� ��������� �����', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXMaxNoNameFailed, entry.upload],
                el.modal.importData));

            it('����������� "�������������"', async () => await dec.simple(el.select.select,
                ['�������������', '', entry.upload],
                el.select));

            it('����� "�������������"', async () => await dec.simple(el.select.iconXpand,
                ['�������������', '', '�������������', entry.max],
                el.select));

            it('����������� "�������"', async () => await dec.simple(el.select.select,
                ['�������', '', entry.max],
                el.select));

            it('����� "�������"', async () => await dec.simple(el.select.iconXpand,
                ['�������', '', '�������', entry.max],
                el.select));

            it('����������� "��������"', async () => await dec.simple(el.select.select,
                ['��������', '', entry.max],
                el.select));

            it('����� "��������"', async () => await dec.simple(el.select.iconXpand,
                ['��������', '', '��������', entry.max],
                el.select));

            it('����������� "��������������"', async () => await dec.simple(el.select.select,
                ['��������������', '', entry.max],
                el.select));

            it('����� "��������������"', async () => await dec.simple(el.select.iconXpand,
                ['��������������', '', '��������������', entry.max],
                el.select));

            it('����������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.select,
                ['������ ������� ��� ����������', '', entry.max],
                el.select));

            it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                ['������ ������� ��� ����������', '', '������ ������� ��� �����������', entry.max],
                el.select));

            it('����������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.select,
                ['������ ������� ��� ����������', '', entry.max],
                el.select));

            it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                ['������ ������� ��� ����������', '', '������ ������� ��� �����������', entry.max],
                el.select));

            it('����������� "������ ������"', async () => await dec.simple(el.select.select,
                ['������ ������', '', entry.max],
                el.select));

            it('����� "������ ������"', async () => await dec.simple(el.select.iconXpand,
                ['������ ������', '', '������ ������', entry.max],
                el.select));

            it('������� ������ "�����"', async () => await dec.simple(el.button.handler,
                ['�����', entry.max],
                el.button));

            it('��������� � �������� ������', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('������� ������ "������� ������� � ����"', async () => await dec.simple(el.button.handler,
                ['������� ������� � ����', entry.max],
                el.button))

            it('���������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.upload],
                el.modal.importData))
        });

        describe('�������� �����', () => {

            it('����������� ����� � ����������', async () => await dec.simple(el.file.display,
                [entry.failedExport, entry.upload],
                el.file))

            it('�������� ����� �����', async () => {
                const jsonFile = await el.file.readNum(entry.failedExport)
                dec.exportFile(params.file, jsonFile)
            })

            it('�������� �����', async () => await dec.simple(el.file.delete,
                [entry.failedExport, entry.upload],
                el.file))
        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[ "�������������� �������"], entry.max],
                page.division));

        });

        deleteParams();

    });

    // ������ � ������������ ����������� ����������, ������������� � �������
    const importXLSXMaxParamsNoParams = () => describe('�������������. ������. ������ �'+
        '������������ ����������� ����������, ������������� � ������� �� xlsx �����.',
        () => {
        const params = {
            message: '������ �������� 2 ������� �� 2 �� ���� �������������',
        };

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [["�������������� �������"], entry.max],
                page.division));

        });

        describe('������', () => {

            bef();

            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "������ �� XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['������ �� XLS, XLSX', entry.max],
                el.menu));

            it('����������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('����� ��������� �����', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXMaxNoParamsFailed, entry.upload],
                el.modal.importData));

            it('����������� "�������������"', async () => await dec.simple(el.select.select,
                ['�������������', '', entry.upload],
                el.select));

            it('����� "�������������"', async () => await dec.simple(el.select.iconXpand,
                ['�������������', '', '�������������', entry.max],
                el.select));

            it('����������� "�������"', async () => await dec.simple(el.select.select,
                ['�������', '', entry.max],
                el.select));

            it('����� "�������"', async () => await dec.simple(el.select.iconXpand,
                ['�������', '', '�������', entry.max],
                el.select));

            it('����������� "��������"', async () => await dec.simple(el.select.select,
                ['��������', '', entry.max],
                el.select));

            it('����� "��������"', async () => await dec.simple(el.select.iconXpand,
                ['��������', '', '��������', entry.max],
                el.select));

            it('����������� "��������������"', async () => await dec.simple(el.select.select,
                ['��������������', '', entry.max],
                el.select));

            it('����� "��������������"', async () => await dec.simple(el.select.iconXpand,
                ['��������������', '', '��������������', entry.max],
                el.select));

            it('����������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.select,
                ['������ ������� ��� ����������', '', entry.max],
                el.select));

            it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                ['������ ������� ��� ����������', '', '������ ������� ��� �����������', entry.max],
                el.select));

            it('����������� "������ ������� ��� ����������"', async () => await dec.simple(el.select.select,
                ['������ ������� ��� ����������', '', entry.max],
                el.select));

            it('����� "������ ������� ��� ����������"', async () => await dec.simple(el.select.iconXpand,
                ['������ ������� ��� ����������', '', '������ ������� ��� �����������', entry.max],
                el.select));

            it('����������� "������ ������"', async () => await dec.simple(el.select.select,
                ['������ ������', '', entry.max],
                el.select));

            it('����� "������ ������"', async () => await dec.simple(el.select.iconXpand,
                ['������ ������', '', '������ ������', entry.max],
                el.select));

            it('������� ������ "�����"', async () => await dec.simple(el.button.handler,
                ['�����', entry.max],
                el.button));

            it('��������� � �������� ������', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('������� ������ ��������', async () => await dec.simple(el.modal.importData.closeHandler,
                [entry.max],
                el.modal.importData));

            it('���������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.max],
                el.modal.importData));
        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [[ "�������������� �������"], entry.max],
                page.division));

        });

    });

    // ������ 5 ������������� 1 ������ � ������������ ���������������� ����������� �� 5 � ����������� �����������
    // ����������
    const importProgression = () => describe('�������������. ������. ������  ������������� 1 ������ ' +
        '� ���������� ��������������� ����������� �� 5.', () => {
        const params = {
            array: [...Array(5).keys()].map(item1 => {
                return [...Array(item1 + 1).keys()].map(item2 => {
                    return 'division' + (item1 + 1) +  (item2 + 1)
                });
            }),
            message: '������ �������� 0 ������� �� 15 �� ���� �������������',
        };

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 1 ������������', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [["�������������� �������"], entry.max],
                page.division));

        });

        describe('������', () => {

            bef();

            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "������ �� XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['������ �� XLS, XLSX', entry.max],
                el.menu));

            it('����������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('����� ��������� �����', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXProgressionSuccess, entry.upload],
                el.modal.importData));

            it('����������� "�������������"', async () => await dec.simple(el.select.select,
                ['�������������', '', entry.upload],
                el.select));

            it('����� "�������������"', async () => await dec.simple(el.select.iconXpand,
                ['�������������', '', '�������������', entry.max],
                el.select));

            it('������� ������ "�����"', async () => await dec.simple(el.button.handler,
                ['�����', entry.max],
                el.button));

            it('��������� � �������� ������', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('������� ������ ��������', async () => await dec.simple(el.modal.importData.closeHandler,
                [entry.max],
                el.modal.importData));

            it('���������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.max],
                el.modal.importData));
        });

        describe('�������� ����������� � �������', () => {
            bef();
            aft();

            describe('����� ��������', () => {

                it('���������� 16 �������������', async () => await dec.simple(page.division.size,
                    [16, entry.max],
                    page.division));

                params.array.forEach((item1) => {
                    let arr =[];
                    item1.forEach((item2, index2) => {
                        it(`������������ ������������� ${index2 + 1} ������ - ${item2}`, async () => {
                            arr.push(item2);
                            await dec.simple(page.division.division,
                                [arr, entry.max],
                                page.division)
                        });
                    });
                });

            });

        });

        deleteParams();

    });

    // ������ � ������������� ������������� 1 ������ � ������������� 1 ������
    const importDuplicateOneLevel = () => describe('�������������. ������. ������ � ������������� ������������� ' +
        '1 ������ � ������������� 1 ������ �� xlsx �����.', () => {
        const params = {
            division1: {
                name: 'importDuplicateOneLevelName1',
            },
            division2: {
                name: 'importDuplicateOneLevelName2',
            },
            message: '������ �������� 1 ������� �� 1 �� ���� �������������',
        };

        describe('API - ����������', () => {
            bef();
            aft();

            describe('���������� ������������� 1 ������', () => {
                const obj = {
                    parent_id: 0,
                    name: params.division1.name,
                };
                addDivision(obj);
            });
            describe('���������� ������������� 2 ������', () => {
                it('���������� �������������', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.division2.name
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 3 ������������', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [["�������������� �������"], entry.max],
                page.division));

            it('������������ ������������� 1 ������', async () => await dec.simple(page.division.division,
                [[params.division1.name], entry.max],
                page.division));

            it('������������ ������������� 2 ������', async () => await dec.simple(page.division.division,
                [[params.division1.name, params.division2.name], entry.max],
                page.division));

        });

        describe('������', () => {

            bef();

            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "������ �� XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['������ �� XLS, XLSX', entry.max],
                el.menu));

            it('����������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('����� ��������� �����', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXDupOneFailed, entry.upload],
                el.modal.importData));

            it('����������� "�������������"', async () => await dec.simple(el.select.select,
                ['�������������', '', entry.upload],
                el.select));

            it('����� "�������������"', async () => await dec.simple(el.select.iconXpand,
                ['�������������', '', '�������������', entry.max],
                el.select));

            it('������� ������ "�����"', async () => await dec.simple(el.button.handler,
                ['�����', entry.max],
                el.button));

            it('��������� � �������� ������', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('������� ������ ��������', async () => await dec.simple(el.modal.importData.closeHandler,
                [entry.max],
                el.modal.importData));

            it('���������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.max],
                el.modal.importData));
        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 3 ������������', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [["�������������� �������"], entry.max],
                page.division));

            it('������������ ������������� 1 ������', async () => await dec.simple(page.division.division,
                [[params.division1.name], entry.max],
                page.division));

            it('������������ ������������� 2 ������', async () => await dec.simple(page.division.division,
                [[params.division1.name, params.division2.name], entry.max],
                page.division));

        });

        deleteParams();

    });

    // ������ � ������������� ������������� 1 ������ � ������������� 2 ������
    const importDuplicateTwoLevel = () => describe('�������������. ������. ������ � ������������� ������������� ' +
        '1 ������ � ������������� 2 ������ �� xlsx �����.', () => {
        const params = {
            division1: {
                name: 'importDuplicateTwoLevelName1',
            },
            division2: {
                name: 'importDuplicateTwoLevelName2',
            },
            message: '������ �������� 1 ������� �� 1 �� ���� �������������',
        };

        describe('API - ����������', () => {
            bef();
            aft();

            describe('���������� ������������� 1 ������', () => {
                const obj = {
                    parent_id: 0,
                    name: params.division1.name,
                };
                addDivision(obj);
            });
            describe('���������� ������������� 2 ������', () => {
                it('���������� �������������', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.division2.name
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 3 ������������', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [["�������������� �������"], entry.max],
                page.division));

            it('������������ ������������� 1 ������', async () => await dec.simple(page.division.division,
                [[params.division1.name], entry.max],
                page.division));

            it('������������ ������������� 2 ������', async () => await dec.simple(page.division.division,
                [[params.division1.name, params.division2.name], entry.max],
                page.division));

        });

        describe('������', () => {

            bef();

            aft();

            it('������� ������ "����"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('����������� "����"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('������� ��������� "������ �� XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['������ �� XLS, XLSX', entry.max],
                el.menu));

            it('����������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('����� ��������� �����', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXDupTwoFailed, entry.upload],
                el.modal.importData));

            it('����������� "�������������"', async () => await dec.simple(el.select.select,
                ['�������������', '', entry.upload],
                el.select));

            it('����� "�������������"', async () => await dec.simple(el.select.iconXpand,
                ['�������������', '', '�������������', entry.max],
                el.select));

            it('������� ������ "�����"', async () => await dec.simple(el.button.handler,
                ['�����', entry.max],
                el.button));

            it('��������� � �������� ������', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('������� ������ ��������', async () => await dec.simple(el.modal.importData.closeHandler,
                [entry.max],
                el.modal.importData));

            it('���������� ���������� ���� "������"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.max],
                el.modal.importData));
        });

        describe('�������� ������ �������������', () => {

            bef();
            aft();

            it('���������� 3 ������������', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('����������� ������������� "�������������� �������"', async ()=> await dec.simple(page.division.division,
                [["�������������� �������"], entry.max],
                page.division));

            it('������������ ������������� 1 ������', async () => await dec.simple(page.division.division,
                [[params.division1.name], entry.max],
                page.division));

            it('������������ ������������� 2 ������', async () => await dec.simple(page.division.division,
                [[params.division1.name, params.division2.name], entry.max],
                page.division));

        });

        deleteParams();

    });

    return {
        importXLSXMinParams,
        importXLSMinParams,
        importXLSXMaxParams,
        importXLSXMaxParamsNoName,
        importXLSXMaxParamsNoParams,
        importDuplicateOneLevel,
        importDuplicateTwoLevel,
        importProgression,
    }

};

//����� ������� "�����..."
const filterSearch = () => describe('�������� ������� "�����..."', () => {

    const params = {
        array1: [...Array(3).keys()].map(item => 'division' + (item + 1)),
        array2: [...Array(3).keys()].map(item => 'test' + (item + 1))
    }

    describe('API - ����������', () => {
        bef();
        aft();

        params.array1.forEach((item1, index1) => {
            describe(`���������� ������������� ${index1 + 1} ������ - ${item1}`, () => {
                it('���������� �������������', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: index1 === 0 ? 0 : get.text[get.text.length - 1]['id'],
                        name: item1
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        params.array2.forEach((item2, index2) => {
            describe(`���������� ������������� ${index2 + 1} ������ - ${item2}`, () => {
                it('���������� �������������', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: index2 === 0 ? 0 : get.text[get.text.length - 1]['id'],
                        name: item2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

    });

    describe('�������� �����������', () => {

        bef();
        aft();

        it('����������� 7 ������������', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        [params.array1, params.array2].forEach((item1) => {
            const arr = [];
            item1.forEach((item2, index2) => {
                it(`������������ ������������� ${index2 + 1} ������ - ${item2}`, async () => {
                    arr.push(item2);
                    await dec.simple(page.division.division,
                        [arr, entry.max],
                        page.division)
                });
            });
        });

    });

    describe('�������� ������� ��� ������������� 1 ������', () => {

        bef();
        aft();

        it('����������� 7 ������������', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        it(`���� � "�����..." - "${params.array1[0]}"`, async () => await dec.simple(el.input.sendKeys,
            ['', '�����...', params.array1[0], entry.max],
            el.input));

        it('����������� 1 �������������', async () => await dec.simple(page.division.size,
            [1, entry.max],
            page.division));

        it(`�������� ����������� ������������� 1 ������ - "${params.array1[0]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0]], entry.max],
                page.division));
    });

    describe('�������� ������� ��� ������������� 2 ������', () => {

        bef();
        aft();

        it('����������� 7 ������������', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        it(`���� � "�����..." - "${params.array1[1]}"`, async () => await dec.simple(el.input.sendKeys,
            ['', '�����...', params.array1[1], entry.max],
            el.input));

        it('����������� 2 �������������', async () => await dec.simple(page.division.size,
            [2, entry.max],
            page.division));

        it(`�������� ����������� ������������� 1 ������ - "${params.array1[0]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0]], entry.max],
                page.division));

        it(`�������� ����������� ������������� 2 ������ - "${params.array1[1]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0], params.array1[1]], entry.max],
                page.division));

    });

    describe('�������� ������� ��� ������������� 3 ������', () => {

        bef();
        aft();

        it('����������� 7 ������������', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        it(`���� � "�����..." - "${params.array1[2]}"`, async () => await dec.simple(el.input.sendKeys,
            ['', '�����...', params.array1[2], entry.max],
            el.input));

        it('����������� 3 �������������', async () => await dec.simple(page.division.size,
            [3, entry.max],
            page.division));

        it(`�������� ����������� ������������� 1 ������ - "${params.array1[0]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0]], entry.max],
                page.division));

        it(`�������� ����������� ������������� 2 ������ - "${params.array1[1]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0], params.array1[1]], entry.max],
                page.division));

        it(`�������� ����������� ������������� 3 ������ - "${params.array1[2]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0], params.array1[1],  params.array1[2]], entry.max],
                page.division));

    });

    describe('�������� ������� ��� ����������', () => {

        bef();
        aft();

        it('����������� 7 ������������', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        it('���� � "�����..." - "Hello World"', async () => await dec.simple(el.input.sendKeys,
            ['', '�����...', 'Hello World', entry.max],
            el.input));

        it('����������� 0 �������������', async () => await dec.simple(page.division.size,
            [0, entry.max],
            page.division));

    });

    describe('�������� ������� � ��������� �����������', () => {

        bef();
        aft();

        it('����������� 7 ������������', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        it('���� � "�����..." - "3"', async () => await dec.simple(el.input.sendKeys,
            ['', '�����...', '3', entry.max],
            el.input));

        it('����������� 6 �������������', async () => await dec.simple(page.division.size,
            [6, entry.max],
            page.division));

        it(`�������� ����������� ������������� 1 ������ - "${params.array1[0]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0]], entry.max],
                page.division));

        it(`�������� ����������� ������������� 2 ������ - "${params.array1[1]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0], params.array1[1]], entry.max],
                page.division));

        it(`�������� ����������� ������������� 3 ������ - "${params.array1[2]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0], params.array1[1],  params.array1[2]], entry.max],
                page.division));

        it(`�������� ����������� ������������� 1 ������ - "${params.array2[0]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array2[0]], entry.max],
                page.division));

        it(`�������� ����������� ������������� 2 ������ - "${params.array2[1]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array2[0], params.array2[1]], entry.max],
                page.division));

        it(`�������� ����������� ������������� 3 ������ - "${params.array2[2]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array2[0], params.array2[1],  params.array2[2]], entry.max],
                page.division));



    });

    deleteParams();

});

module.exports = {
    display,
    add: add(),
    edit: edit(),
    delete: remove(),
    service: serviceDivision(),
    print: print(),
    printTree: printTree(),
    export: {
        minXLSX: exportFile('min',  '����������� ���������� ������', 'XLSX').xlsx,
        maxXLSX: exportFile('max', '������������ ���������� ������', 'XLSX').xlsx,
        minCSV: exportFile('min',  '����������� ���������� ������', 'CSV').csv,
        maxCSV: exportFile('max',  '������������ ���������� ������', 'CSV').csv,
    },
    import: importFile(),
    filterSearch,
    main: () => {
        add().add();
        edit().edit();
        remove().remove();
        //serviceDivision().serviceDivision();
        //print().print();
        //printTree().printTree();
        //filterSearch();
        //exportFile('min',  '����������� ���������� ������', 'XLSX').xlsx.main();
        //exportFile('max', '������������ ���������� ������', 'XLSX').xlsx.main();
        //exportFile('min',  '����������� ���������� ������', 'CSV').csv.main();
        //exportFile('max',  '������������ ���������� ������', 'CSV').csv.main();
    },
}
