const {describe} = require('mocha');

const entry = require('../../../../../../../entry');
const dec = require('../../../../../dictionaries/decorate');
const sec = require('../../../../../dictionaries/section');
const sub = require('../../../../../dictionaries/subsection');
const but = require('../../../../../dictionaries/button-icon');
const decorate = require('../../../../../decorates');
const data = require('./license.ui.data');

const bef = () => decorate.befAft.before.beforeLicense();
const aft = () => decorate.befAft.after.after();

const test = () => {

    const activateLicense = () => describe('Поочередное включение лицензий', () => {

        bef();
        aft();

        describe('PERCo-WB - Базовый пакет', () => {

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 1,
                    value: data.packet.base.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 1,
                    value: data.packet.base.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 1,
                    value: data.status.no,
                    timeout: entry.max
                });
                decorate.page.license.detailHandler({
                    number: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.license.viewText({
                    value: data.packet.base.view,
                    timeout: entry.max
                });
                decorate.el.butIcAfter.handler({
                    icon: but.navigation_close
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.noElement({
                        section: sec.urv,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.noElement({
                        section: sec.ver,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.noElement({
                        section: sec.ord,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.noElement({
                        section: sec.doc,
                        timeout: entry.max
                    });
                });
            });

        });

        describe('PERCo-WS - Стандартный пакет', () => {

            describe('Включение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 2,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 2,
                    value: data.packet.standard.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 2,
                    value: data.packet.standard.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 2,
                    value: data.status.no,
                    timeout: entry.max
                });
                decorate.page.license.detailHandler({
                    number: 2,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.license.viewText({
                    value: data.packet.standard.view,
                    timeout: entry.max
                });
                decorate.el.butIcAfter.handler({
                    icon: but.navigation_close
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.noElement({
                        section: sec.urv,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.noElement({
                        section: sec.ver,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.noElement({
                        section: sec.doc,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM01 - Учёт рабочего времени', () => {
            describe('Включение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 3,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 3,
                    value: data.packet.urv.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 3,
                    value: data.packet.urv.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 3,
                    value: data.status.no,
                    timeout: entry.max
                });
                decorate.page.license.detailHandler({
                    number: 3,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.license.viewText({
                    value: data.packet.urv.view,
                    timeout: entry.max
                });
                decorate.el.butIcAfter.handler({
                    icon: but.navigation_close
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.noElement({
                        section: sec.ver,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.noElement({
                        section: sec.doc,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM02 - Верификация', () => {
            describe('Включение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 4,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 4,
                    value: data.packet.verify.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 4,
                    value: data.packet.verify.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 4,
                    value: data.status.no,
                    timeout: entry.max
                });
                decorate.page.license.detailHandler({
                    number: 4,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.license.viewText({
                    value: data.packet.verify.view,
                    timeout: entry.max
                });
                decorate.el.butIcAfter.handler({
                    icon: but.navigation_close
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.noElement({
                        section: sec.doc,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM03 - Интеграция с 1С', () => {
            describe('Включение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 5,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 5,
                    value: data.packet.c1.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 5,
                    value: data.packet.c1.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 5,
                    value: data.status.no,
                    timeout: entry.max
                });
                decorate.page.license.detailHandler({
                    number: 5,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.license.viewText({
                    value: data.packet.c1.view,
                    timeout: entry.max
                });
                decorate.el.butIcAfter.handler({
                    icon: but.navigation_close
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.noElement({
                        section: sec.doc,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM04 - Интеграция с внешними системами', () => {
            describe('Включение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 6,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 6,
                    value: data.packet.integration.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 6,
                    value: data.packet.integration.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 6,
                    value: data.status.no,
                    timeout: entry.max
                });
                decorate.page.license.detailHandler({
                    number: 6,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.license.viewText({
                    value: data.packet.integration.view,
                    timeout: entry.max
                });
                decorate.el.butIcAfter.handler({
                    icon: but.navigation_close
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.section({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.doc.sdk,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM05 - Мониторинг', () => {
            describe('Включение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 7,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 7,
                    value: data.packet.monitoring.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 7,
                    value: data.packet.monitoring.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 7,
                    value: data.status.no,
                    timeout: entry.max
                });
                decorate.page.license.detailHandler({
                    number: 7,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.license.viewText({
                    value: data.packet.monitoring.view,
                    timeout: entry.max
                });
                decorate.el.butIcAfter.handler({
                    icon: but.navigation_close
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.section({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.mon.plan,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.section({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.doc.sdk,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM06 - Интеграция с TRASSIR', () => {
            describe('Включение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 8,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 8,
                    value: data.packet.trassir.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 8,
                    value: data.packet.trassir.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 8,
                    value: data.status.no,
                    timeout: entry.max
                });
                decorate.page.license.detailHandler({
                    number: 8,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.license.viewText({
                    value: data.packet.trassir.view,
                    timeout: entry.max
                });
                decorate.el.butIcAfter.handler({
                    icon: but.navigation_close
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.section({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.mon.plan,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.section({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.doc.sdk,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM07 - Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {
            describe('Включение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 9,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 9,
                    value: data.packet.bolid.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 9,
                    value: data.packet.bolid.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 9,
                    value: data.status.no,
                    timeout: entry.max
                });
                decorate.page.license.detailHandler({
                    number: 9,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.license.viewText({
                    value: data.packet.bolid.view,
                    timeout: entry.max
                });
                decorate.el.butIcAfter.handler({
                    icon: but.navigation_close
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.section({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.mon.plan,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.section({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.doc.sdk,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM08 - Интеграция с Axxon Next', () => {
            describe('Включение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 10,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 10,
                    value: data.packet.axxon.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 10,
                    value: data.packet.axxon.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 10,
                    value: data.status.no,
                    timeout: entry.max
                });
                decorate.page.license.detailHandler({
                    number: 10,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.license.viewText({
                    value: data.packet.axxon.view,
                    timeout: entry.max
                });
                decorate.el.butIcAfter.handler({
                    icon: but.navigation_close
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.section({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.mon.plan,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.section({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.doc.sdk,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.refresh();
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        });

    });

    const deactivateLicense = () => describe('Поочередное выключение лицензий', () => {

        bef();
        aft();

        describe('PERCo-WM08 - Интеграция с Axxon Next', () => {
            describe('Выключение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 10,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 10,
                    value: data.packet.axxon.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 10,
                    value: data.packet.axxon.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 10,
                    timeout: entry.max
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.section({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.mon.plan,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.section({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.doc.sdk,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.refresh();
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        });

        describe('PERCo-WM07 - Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {
            describe('Выключение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 9,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 9,
                    value: data.packet.bolid.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 9,
                    value: data.packet.bolid.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 9,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.section({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.mon.plan,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.section({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.doc.sdk,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM06 - Интеграция с TRASSIR', () => {
            describe('Выключение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 8,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 8,
                    value: data.packet.trassir.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 8,
                    value: data.packet.trassir.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 8,
                    timeout: entry.max
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.section({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.mon.plan,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.section({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.doc.sdk,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM05 - Мониторинг', () => {
            describe('Выключение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 7,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 7,
                    value: data.packet.monitoring.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 7,
                    value: data.packet.monitoring.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 7,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.section({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.doc,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.doc.sdk,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM04 - Интеграция с внешними системами', () => {
            describe('Выключение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 6,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 6,
                    value: data.packet.integration.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 6,
                    value: data.packet.integration.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 6,
                    timeout: entry.max
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.noElement({
                        section: sec.doc,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM03 - Интеграция с 1С', () => {
            describe('Выключение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 5,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 5,
                    value: data.packet.c1.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 5,
                    value: data.packet.c1.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 5,
                    timeout: entry.max
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.section({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ver,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ver.config,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.noElement({
                        section: sec.doc,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM02 - Верификация', () => {
            describe('Выключение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 4,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 4,
                    value: data.packet.verify.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 4,
                    value: data.packet.verify.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 4,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.section({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.noElement({
                        section: sec.ver,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.noElement({
                        section: sec.doc,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WM01 - Учёт рабочего времени', () => {
            describe('Выключение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 3,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 3,
                    value: data.packet.urv.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 3,
                    value: data.packet.urv.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 3,
                    timeout: entry.max
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.noElement({
                        section: sec.urv,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.noElement({
                        section: sec.ver,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.section({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.noElement({
                        section: sec.doc,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WS - Стандартный пакет', () => {

            describe('Выключение лицензии', () => {
                decorate.page.license.turnHandler({
                    number: 2,
                    timeout: entry.max
                });
                decorate.modalConfirm.licenseStandardDeactivate.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.modalConfirm.licenseStandardDeactivate.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 2,
                    value: data.packet.standard.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 2,
                    value: data.packet.standard.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 2,
                    timeout: entry.max
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.noElement({
                        section: sec.urv,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.noElement({
                        section: sec.ver,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.noElement({
                        section: sec.ord,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.noElement({
                        section: sec.doc,
                        timeout: entry.max
                    });
                });
            });
        });

        describe('PERCo-WB - Базовый пакет', () => {

            describe('Общие проверки', () => {
                decorate.page.license.headerText({
                    number: 1,
                    value: data.packet.base.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 1,
                    value: data.packet.base.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 1,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('Отображение функционала', () => {

                describe('Раздел - Персонал', () => {
                    decorate.el.section.section({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.per.schedule,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.division,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.position,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.per.holiday,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.per.data,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Бюро пропусков', () => {
                    decorate.el.section.section({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.pas,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.pas.visitor,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.staff,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.pas.template,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.pas.design,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.pas.report,
                        timeout: entry.max
                    });
                });

                describe('Раздел - УРВ', () => {
                    decorate.el.section.noElement({
                        section: sec.urv,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Котроль доступа', () => {
                    decorate.el.section.section({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.noElement({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Верификация', () => {
                    decorate.el.section.noElement({
                        section: sec.ver,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Заказ пропуска', () => {
                    decorate.el.section.noElement({
                        section: sec.ord,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Администрирование', () => {
                    decorate.el.section.section({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.el.section.handler({
                        section: sec.adm,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.conf,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.event,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.action,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.task,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.operator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.role,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.adm.license,
                        timeout: entry.max
                    });
                });

                describe('Раздел - Документация', () => {
                    decorate.el.section.noElement({
                        section: sec.doc,
                        timeout: entry.max
                    });
                });
            });

        });

    });

    const activateAllLicense = () => describe('Активация всех лицензий', () => {

        bef();
        aft();

        describe('PERCo-WS - Стандартный пакет', () => {
            decorate.page.license.turnHandler({
                number: 2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('PERCo-WM01 - Учёт рабочего времени', () => {
            decorate.page.license.turnHandler({
                number: 3,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('PERCo-WM02 - Верификация', () => {
            decorate.page.license.turnHandler({
                number: 4,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('PERCo-WM03 - Интеграция с 1С', () => {
            decorate.page.license.turnHandler({
                number: 5,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('PERCo-WM04 - Интеграция с внешними системами', () => {
            decorate.page.license.turnHandler({
                number: 6,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('PERCo-WM05 - Мониторинг', () => {
            decorate.page.license.turnHandler({
                number: 7,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('PERCo-WM06 - Интеграция с TRASSIR', () => {
            decorate.page.license.turnHandler({
                number: 8,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('PERCo-WM07 - Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {
            decorate.page.license.turnHandler({
                number: 9,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('PERCo-WM08 - Интеграция с Axxon Next', () => {
            decorate.page.license.turnHandler({
                number: 10,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const deactivateStandard = () => describe('Выключение лицензии Стандартный пакет, при включенных всех лицензий.',
        () => {

        bef();
        aft();

        describe('Проверка лицензий до деактивации', () => {
            describe('PERCo-WB - Базовый пакет', () => {
                decorate.page.license.headerText({
                    number: 1,
                    value: data.packet.base.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 1,
                    value: data.packet.base.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 1,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WS - Стандартный пакет', () => {
                decorate.page.license.headerText({
                    number: 2,
                    value: data.packet.standard.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 2,
                    value: data.packet.standard.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 2,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM01 - Учёт рабочего времени', () => {
                decorate.page.license.headerText({
                    number: 3,
                    value: data.packet.urv.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 3,
                    value: data.packet.urv.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 3,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM02 - Верификация', () => {
                decorate.page.license.headerText({
                    number: 4,
                    value: data.packet.verify.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 4,
                    value: data.packet.verify.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 4,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM03 - Интеграция с 1С', () => {
                decorate.page.license.headerText({
                    number: 5,
                    value: data.packet.c1.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 5,
                    value: data.packet.c1.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 5,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM04 - Интеграция с внешними системами', () => {
                decorate.page.license.headerText({
                    number: 6,
                    value: data.packet.integration.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 6,
                    value: data.packet.integration.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 6,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM05 - Мониторинг', () => {
                decorate.page.license.headerText({
                    number: 7,
                    value: data.packet.monitoring.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 7,
                    value: data.packet.monitoring.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 7,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM06 - Интеграция с TRASSIR', () => {
                decorate.page.license.headerText({
                    number: 8,
                    value: data.packet.trassir.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 8,
                    value: data.packet.trassir.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 8,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM07 - Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {
                decorate.page.license.headerText({
                    number: 9,
                    value: data.packet.bolid.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 9,
                    value: data.packet.bolid.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 9,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM08 - Интеграция с Axxon Next', () => {
                decorate.page.license.headerText({
                    number: 10,
                    value: data.packet.axxon.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 10,
                    value: data.packet.axxon.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 10,
                    value: data.status.no,
                    timeout: entry.max
                });
            });
        });

        describe('Деактивация лицензии Стандартный пакет', () => {
            decorate.page.license.turnHandler({
                number: 2,
                timeout: entry.max
            });
            decorate.modalConfirm.licenseStandardDeactivate.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Подтвердить',
                timeout: entry.max
            });
            decorate.modalConfirm.licenseStandardDeactivate.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка лицензий после деактивации', () => {
            describe('PERCo-WM08 - Интеграция с Axxon Next', () => {
                decorate.page.license.headerText({
                    number: 10,
                    value: data.packet.axxon.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 10,
                    value: data.packet.axxon.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 10,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM07 - Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {
                decorate.page.license.headerText({
                    number: 9,
                    value: data.packet.bolid.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 9,
                    value: data.packet.bolid.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 9,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM06 - Интеграция с TRASSIR', () => {
                decorate.page.license.headerText({
                    number: 8,
                    value: data.packet.trassir.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 8,
                    value: data.packet.trassir.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 8,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM05 - Мониторинг', () => {
                decorate.page.license.headerText({
                    number: 7,
                    value: data.packet.monitoring.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 7,
                    value: data.packet.monitoring.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 7,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM04 - Интеграция с внешними системами', () => {
                decorate.page.license.headerText({
                    number: 6,
                    value: data.packet.integration.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 6,
                    value: data.packet.integration.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 6,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM03 - Интеграция с 1С', () => {
                decorate.page.license.headerText({
                    number: 5,
                    value: data.packet.c1.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 5,
                    value: data.packet.c1.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 5,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM02 - Верификация', () => {
                decorate.page.license.headerText({
                    number: 4,
                    value: data.packet.verify.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 4,
                    value: data.packet.verify.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 4,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM01 - Учёт рабочего времени', () => {
                decorate.page.license.headerText({
                    number: 3,
                    value: data.packet.urv.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 3,
                    value: data.packet.urv.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 3,
                    timeout: entry.max
                });
            });

            describe('PERCo-WS - Стандартный пакет', () => {
                decorate.page.license.headerText({
                    number: 2,
                    value: data.packet.standard.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 2,
                    value: data.packet.standard.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 2,
                    timeout: entry.max
                });
            });

            describe('PERCo-WB - Базовый пакет', () => {
                decorate.page.license.headerText({
                    number: 1,
                    value: data.packet.base.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 1,
                    value: data.packet.base.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 1,
                    value: data.status.no,
                    timeout: entry.max
                });
            });
        });

        describe('Отключение пакета Интеграция с внешними системами', () => {
            decorate.page.license.turnHandler({
                number: 6,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const deactivateURV = () => describe('Выключение лицензии Учёт рабочего времени, при включенных всех лицензий.',
        () => {

        bef();
        aft();

        describe('Проверка лицензий до деактивации', () => {
            describe('PERCo-WB - Базовый пакет', () => {
                decorate.page.license.headerText({
                    number: 1,
                    value: data.packet.base.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 1,
                    value: data.packet.base.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 1,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WS - Стандартный пакет', () => {
                decorate.page.license.headerText({
                    number: 2,
                    value: data.packet.standard.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 2,
                    value: data.packet.standard.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 2,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM01 - Учёт рабочего времени', () => {
                decorate.page.license.headerText({
                    number: 3,
                    value: data.packet.urv.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 3,
                    value: data.packet.urv.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 3,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM02 - Верификация', () => {
                decorate.page.license.headerText({
                    number: 4,
                    value: data.packet.verify.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 4,
                    value: data.packet.verify.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 4,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM03 - Интеграция с 1С', () => {
                decorate.page.license.headerText({
                    number: 5,
                    value: data.packet.c1.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 5,
                    value: data.packet.c1.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 5,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM04 - Интеграция с внешними системами', () => {
                decorate.page.license.headerText({
                    number: 6,
                    value: data.packet.integration.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 6,
                    value: data.packet.integration.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 6,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM05 - Мониторинг', () => {
                decorate.page.license.headerText({
                    number: 7,
                    value: data.packet.monitoring.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 7,
                    value: data.packet.monitoring.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 7,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM06 - Интеграция с TRASSIR', () => {
                decorate.page.license.headerText({
                    number: 8,
                    value: data.packet.trassir.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 8,
                    value: data.packet.trassir.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 8,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM07 - Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {
                decorate.page.license.headerText({
                    number: 9,
                    value: data.packet.bolid.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 9,
                    value: data.packet.bolid.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 9,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM08 - Интеграция с Axxon Next', () => {
                decorate.page.license.headerText({
                    number: 10,
                    value: data.packet.axxon.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 10,
                    value: data.packet.axxon.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 10,
                    value: data.status.no,
                    timeout: entry.max
                });
            });
        });

        describe('Деактивация лицензии Учёт рабочего времени', () => {
            decorate.page.license.turnHandler({
                number: 3,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка лицензий после деактивации', () => {
            describe('PERCo-WM08 - Интеграция с Axxon Next', () => {
                decorate.page.license.headerText({
                    number: 10,
                    value: data.packet.axxon.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 10,
                    value: data.packet.axxon.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 10,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM07 - Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {
                decorate.page.license.headerText({
                    number: 9,
                    value: data.packet.bolid.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 9,
                    value: data.packet.bolid.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 9,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM06 - Интеграция с TRASSIR', () => {
                decorate.page.license.headerText({
                    number: 8,
                    value: data.packet.trassir.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 8,
                    value: data.packet.trassir.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 8,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM05 - Мониторинг', () => {
                decorate.page.license.headerText({
                    number: 7,
                    value: data.packet.monitoring.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 7,
                    value: data.packet.monitoring.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 7,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM04 - Интеграция с внешними системами', () => {
                decorate.page.license.headerText({
                    number: 6,
                    value: data.packet.integration.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 6,
                    value: data.packet.integration.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 6,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM03 - Интеграция с 1С', () => {
                decorate.page.license.headerText({
                    number: 5,
                    value: data.packet.c1.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 5,
                    value: data.packet.c1.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 5,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM02 - Верификация', () => {
                decorate.page.license.headerText({
                    number: 4,
                    value: data.packet.verify.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 4,
                    value: data.packet.verify.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 4,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WM01 - Учёт рабочего времени', () => {
                decorate.page.license.headerText({
                    number: 3,
                    value: data.packet.urv.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 3,
                    value: data.packet.urv.content,
                    timeout: entry.max
                });
                decorate.page.license.uncheckedText({
                    number: 3,
                    timeout: entry.max
                });
            });

            describe('PERCo-WS - Стандартный пакет', () => {
                decorate.page.license.headerText({
                    number: 2,
                    value: data.packet.standard.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 2,
                    value: data.packet.standard.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 2,
                    value: data.status.no,
                    timeout: entry.max
                });
            });

            describe('PERCo-WB - Базовый пакет', () => {
                decorate.page.license.headerText({
                    number: 1,
                    value: data.packet.base.header,
                    timeout: entry.max
                });
                decorate.page.license.contentText({
                    number: 1,
                    value: data.packet.base.content,
                    timeout: entry.max
                });
                decorate.page.license.checkedText({
                    number: 1,
                    value: data.status.no,
                    timeout: entry.max
                });
            });
        });

        describe('Включение пакетов Учёт рабочего времени и Интеграция с 1С', () => {
            decorate.page.license.turnHandler({
                number: 3,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.license.turnHandler({
                number: 5,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.license.detailHandler({
                number: 5,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.handler({
                name: 'Активировать 1С интеграцию',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Сохранено',
                timeout: entry.max
            });
            decorate.el.butIcAfter.handler({
                icon: but.navigation_close
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });

        });

    });

    return {
        activateLicense,
        deactivateLicense,
        activateAllLicense,
        deactivateStandard,
        deactivateURV
    }
}

module.exports = {
    test: test()
}