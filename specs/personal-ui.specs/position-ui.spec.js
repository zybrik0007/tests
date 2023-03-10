const {describe, it, before, after} = require('mocha')
const {expect} = require('chai');

const entry = require('../../entry')
const page = require('../../ui/src/pages')
const el = require('../../ui/src/elements')
const dec = require('../../ui/src/dictionaries/decorate')
const sec = require('../../ui/src/dictionaries/section')
const sub = require('../../ui/src/dictionaries/subsection')
const but = require('../../ui/src/dictionaries/button-icon')
const lic = require('../../ui/src/dictionaries/license')
const url = require('../../ui/src/dictionaries/url')

const testMin = {
    name: 'positionUiMinDataName'
}

const testMax = {
    name: 'positionUiMaxDataName',
    description: 'positionUiMaxDataDescription'
}

describe('Проверка подраздела "Должности". Отображение данных.', () => {
    before('', async () => {

    })

    after('', async () => {

    })

    describe('Проверка данных', () => {
        it('Отображение активной кнопки "Добавить"', async () => {})
        it('Отображение заблокированной кнопки "Редактировать"', async () => {})
        it('Отображение заблокированной кнопки "Удалить"', async () => {})
        it('Отображение активной кнопки "Меню"', async () => {})
        it('Нажатие кнопки "Меню"', async () => {})
        it('Отображение элемента "Поиск"', async () => {})
        it('Отображение заглавия "Должности"', async () => {})
        it('Отображение заглавия "Описание"', async () => {})
        it('Отображение "Нет данных для отображения."')
    })
})


describe('Добавление должности с минимальными параметрами', () => {
    const params = {
        name: 'positionUiMinDataName'
    }
})