const path = require('path')

module.exports = {
    position: {
        importXLSXSuccess: path.join(__dirname, 'files/division/import-division-xlsx-success.xlsx'),
        importXLSSuccess: path.join(__dirname, 'files/division/import-division-xls-success.xls'),
        importXLSXFailed: path.join(__dirname, 'files/division/import-division-xlsx-failed.xlsx'),
        importXLSFailed: path.join(__dirname, 'files/division/import-division-xls-failed.xls'),
        importXLSXPartlySuccess: path.join(__dirname, 'files/division/import-division-xlsx-partly-success.xlsx'),
        importXLSPartlySuccess: path.join(__dirname, 'files/division/import-division-xls-partly-success.xls'),
    }
}