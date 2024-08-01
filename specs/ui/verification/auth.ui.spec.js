const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');

const entry = require('../../../entry');
const page = require('../../../ui/src/pages');
const el = require('../../../ui/src/elements');
const dec = require('../../../ui/src/dictionaries/decorate');
const url = require('../../../ui/src/dictionaries/url');

/*Авторизация*/
console.log = function() {};

describe('Первая авторизация', () => {
    
    const params = {
        validLogin: entry.customLogin,
        validPassword: entry.customPassword,
        region: 'Россия',
        loginSingle: 'a',
        loginDouble: 'a1',
        loginRus: 'админ',
        loginApostrophe: entry.customLogin + '`',
        passwordSingle: '1',
        passwordDouble: '12',
        passwordTriple: '123',
        passwordQuadruple: '1234',
        passwordQuintuple: '12345',
        passwordNoLetter: '123456',
        passwordNoNumber: 'admina',
        passwordRus: 'админ1',
        passwordApostrophe: entry.customPassword + '`',
        passwordDifferent: entry.customPassword + '7',
    };

    before('Открытие раздела авторизации', async () => {
        const open = await page.base.open(url.authUrl);
        console.log(open.description);
        expect(open.error).to.equal(false);
    });

    after('Выход и закрытие браузера', async () => {
        await dec.exit();
        await page.base.closeDriver();
    });

    describe('Все поля ввода пустые', () => {
        it('Проверка "Логин"', async () => await dec.simpleText(el.input.getValue,
            ['Логин', '', entry.max], '',
            el.input));

        it('Проверка "Пароль"', async () => await dec.simpleText(el.input.getValue,
            ['Пароль', '', entry.max],
            '',
            el.input));

        it('Проверка "...Повторите"', async () => await dec.simpleText(el.input.getValue,
            ['...Повторите', '', entry.max],
            '', el.input));

        it('Кнопка "Установить пароль и войти" не активна', async () => await dec.simple(el.button.disabled,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simpleFalse(el.button.handler,
            ['Установить пароль и войти', entry.min],
            el.button));
    });

    describe('Введен только "Логин"', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Проверка "Пароль"', async () => await dec.simpleText(el.input.getValue,
            ['Пароль', '', entry.max],
            '',
            el.input));

        it('Проверка "...Повторите"', async () => await dec.simpleText(el.input.getValue,
            ['...Повторите', '', entry.max],
            '',
            el.input));

        it('Кнопка "Установить пароль и войти" не активна', async () => await dec.simple(el.button.disabled,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simpleFalse(el.button.handler,
            ['Установить пароль и войти', entry.min],
            el.button));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен только "Пароль"', () => {
        it('Проверка "Логин"', async () => await dec.simpleText(el.input.getValue,
            ['Логин', '', entry.max],
            '',
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.validPassword, entry.max],
            el.input));

        it('Проверка "...Повторите"', async () => await dec.simpleText(el.input.getValue,
            ['...Повторите', '', entry.max],
            '',
            el.input));

        it('Кнопка "Установить пароль и войти" не активна', async () => await dec.simple(el.button.disabled,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simpleFalse(el.button.handler,
            ['Установить пароль и войти', entry.min],
            el.button));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен только "...Повторите"', () => {
        it('Проверка "Логин"', async () => await dec.simpleText(el.input.getValue,
            ['Логин', '', entry.max],
            '',
            el.input));

        it('Проверка "Пароль"', async () => await dec.simpleText(el.input.getValue,
            ['Пароль', '', entry.max],
            '',
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.validPassword, entry.max],
            el.input));

        it('Кнопка "Установить пароль и войти" не активна', async () => await dec.simple(el.button.disabled,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simpleFalse(el.button.handler,
            ['Установить пароль и войти',
                entry.min],
            el.button));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен только "Логин" и "Пароль"', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.validPassword, entry.max],
            el.input));

        it('Проверка "...Повторите"', async () => await dec.simpleText(el.input.getValue,
            ['...Повторите', '', entry.max],
            '',
            el.input));

        it('Кнопка "Установить пароль и войти" не активна', async () => await dec.simple(el.button.disabled,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simpleFalse(el.button.handler,
            ['Установить пароль и войти', entry.min],
            el.button));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен только "Логин" и "...Повторите"', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Проверка "Пароль"', async () => await dec.simpleText(el.input.getValue,
            ['Пароль', '', entry.max],
            '',
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.validPassword, entry.max],
            el.input));

        it('Кнопка "Установить пароль и войти" не активна', async () => await dec.simple(el.button.disabled,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simpleFalse(el.button.handler,
            ['Установить пароль и войти',entry.min],
            el.button));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен только "Пароль" и "...Повторите"', () => {
        it('Проверка "Логин"', async () => await dec.simpleText(el.input.getValue,
            ['Логин', '', entry.max],
            '',
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.validPassword, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.validPassword, entry.max],
            el.input));

        it('Кнопка "Установить пароль и войти" не активна', async () => await dec.simple(el.button.disabled,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simpleFalse(el.button.handler,
            ['Установить пароль и войти', entry.min],
            el.button));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен невалидный логин - 1 символ', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.loginSingle, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.validPassword, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.validPassword, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Логин должен быть более двух символов.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен невалидный логин - 2 символа', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.loginDouble, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.validPassword, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.validPassword, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Логин должен быть более двух символов.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    })

    describe('Введен невалидный логин - с русскими буквами', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.loginRus, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.validPassword, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.validPassword, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Неверный тип переданных данных\nПоле login содержит недопустимые символы',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен невалидный логин - с невалидными символами (апостроф)', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.loginApostrophe, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.validPassword, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.validPassword, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText, [entry.max],
            'Неверный тип переданных данных\nПоле login содержит недопустимые символы',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    })

    describe('Введен невалидный пароль - 1 символ', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.passwordSingle, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.passwordSingle, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Пароль должен содержать не менее 6 символов.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен невалидный пароль - 2 символа', () => {

        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин','', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.passwordDouble, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.passwordDouble, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Пароль должен содержать не менее 6 символов.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен невалидный пароль - 3 символа', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.passwordTriple, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.passwordTriple, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Пароль должен содержать не менее 6 символов.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен невалидный пароль - 4 символа', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.passwordQuadruple, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.passwordQuadruple, entry.max],
            el.input));
        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Пароль должен содержать не менее 6 символов.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен невалидный пароль - 5 символа', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.passwordQuintuple, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.passwordQuintuple, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Пароль должен содержать не менее 6 символов.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    })

    describe('Введен невалидный пароль - без букв', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.passwordNoLetter, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.passwordNoLetter, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Пароль должен содержать символ и цифру.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен невалидный пароль - без цифр', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.passwordNoNumber, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.passwordNoNumber, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Пароль должен содержать символ и цифру.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен невалидный пароль - с русскими буквами', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.passwordRus, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.passwordRus, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Пароль должен содержать символ и цифру.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введен невалидный пароль - с невалидными символами (апостроф)', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.passwordApostrophe, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.passwordApostrophe, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Пароль должен содержать символ и цифру.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Введены разные пароли', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.validPassword, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.passwordDifferent, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simpleText(el.formStatus.getText,
            [entry.max],
            'Пароли не совпадают.',
            el.formStatus));

        it('Обновеление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));
    });

    describe('Ввод валидных данных', () => {
        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.validPassword, entry.max],
            el.input));

        it('Ввод "...Повторите"',  async () => await dec.simple(el.input.sendKeys,
            ['...Повторите', '', params.validPassword, entry.max],
            el.input));

        it('Нажатие кнопки "Установить пароль и войти"', async () => await dec.simple(el.button.handler,
            ['Установить пароль и войти', entry.max],
            el.button));

        it('Проверка url', async () => {
            const address = await page.base.urlCompare(url.staffPresentUrl, entry.max);
            console.log(address.description);
            expect(address.error).to.equal(false);
        })
        it('Выход', async () => await dec.exit());
    });

    describe('Повторная авторизация', () => {

        it('Ввод "Логин"', async () => await dec.simple(el.input.sendKeys,
            ['Логин', '', params.validLogin, entry.max],
            el.input));

        it('Ввод "Пароль"', async () => await dec.simple(el.input.sendKeys,
            ['Пароль', '', params.validPassword, entry.max],
            el.input));

        it('Нажатие кнопки "Войти в систему"', async () => await dec.simple(el.button.handler,
            ['Войти в систему', entry.max],
            el.button));

        it('Проверка url', async () => {
            const address = await page.base.urlCompare(url.staffPresentUrl, entry.max);
            console.log(address.description);
            expect(address.error).to.equal(false);
        });

    });

});

describe('Закрытие браузера', () => {
    it('Закрытие', async () => await page.base.closeDriver());
});
