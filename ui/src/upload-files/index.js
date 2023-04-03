const path = require('path')

module.exports = {
    position: {
        importXLSXSuccess: path.join(__dirname, 'files/position/import-position-xlsx-success.xlsx'),
        importXLSSuccess: path.join(__dirname, 'files/position/import-position-xls-success.xls'),
        importXLSXFailed: path.join(__dirname, 'files/position/import-position-xlsx-failed.xlsx'),
        importXLSFailed: path.join(__dirname, 'files/position/import-position-xls-failed.xls'),
        importXLSXPartlySuccess: path.join(__dirname, 'files/position/import-position-xlsx-partly-success.xlsx'),
        importXLSPartlySuccess: path.join(__dirname, 'files/position/import-position-xls-partly-success.xls'),
    }
}