const fsPromises = require('fs/promises')
const xlsx = require('xlsx')
const path = require('path')
const entry = require('../../../../entry')
const page = require('../../pages')


class File {
    constructor() {}

    //Отображение файла
    async displayWait(file) {
        return await fsPromises.readFile(path.join(entry.download, file))
            .then(() => {
                return {
                    error: false,
                    description: `Файл ${file} отображается.`,
                }
            })
            .catch(() => {
                return {
                    error: true,
                    description: `Файл ${file} не отображается.`,
                }
            })
    }

    //Отображение файла c обработкой ожидания его повления
    async display(file, time) {
        let timer = time
        while(timer > 0) {
            const readFile = await this.displayWait(file)
            if(!readFile.error) {
                return readFile
            }
            timer -= 1000
            await page.base.loading(1000)
        }

        return await this.displayWait(file)
    }

    //Удаление файла
    async deleteWait(file) {
        return await fsPromises.unlink(path.join(entry.download, file))
            .then(() => {
                return {
                    error: false,
                    description: `Файл ${file} удален.`,
                }
            })
            .catch(() => {
                return {
                    error: true,
                    description: `Файл ${file} не удален.`,
                }
            })
    }

    //Удаление файла c обработкой ожидания его повления
    async delete(file, time) {
        let timer = time
        while(timer > 0) {
            const remove = await this.deleteWait(file)
            if(!remove.error) {
                return remove
            }
            timer -= 1000
            await page.base.loading(1000)
        }

        return await this.deleteWait(file)
    }

    //Чтение файла c ограничением по номеру заглавия
    async readNum(file) {
        const readFile = await xlsx.readFile(path.join(entry.download, file))
        const table = readFile.Sheets[readFile.SheetNames[0]];
        return xlsx.utils.sheet_to_json(table);
    }

    //Получение значения колонки
    async readColumn(file, header, key, headerObj, columnObj) {
        console.log(file)
        const head = file[headerObj][String(key)]
        if(header !== head) {
            return {
                error: true,
                description: `Заглавие ${header} не совпадает с ${head}.`,
                text: '',
            }
        }

        const column = file[columnObj][String(key)]
        return {
            error: false,
            description: `Значение для ${header} равно ${column}.`,
            text: column,
        }

    }

}


module.exports = File