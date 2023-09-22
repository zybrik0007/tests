const path = require('path')

module.exports = {
    position: {
        importXLSXSuccess: path.join(__dirname, 'files/position/import-division-xlsx-success.xlsx'),
        importXLSSuccess: path.join(__dirname, 'files/position/import-division-xls-success.xls'),
        importXLSXFailed: path.join(__dirname, 'files/position/import-division-xlsx-failed.xlsx'),
        importXLSFailed: path.join(__dirname, 'files/position/import-division-xls-failed.xls'),
        importXLSXPartlySuccess: path.join(__dirname, 'files/position/import-division-xlsx-partly-success.xlsx'),
        importXLSPartlySuccess: path.join(__dirname, 'files/position/import-division-xls-partly-success.xls'),
    },
    division: {
        importXLSXMinSuccess: path.join(__dirname, 'files/division/import.division.min.success.xlsx'),
        importXLSMinSuccess: path.join(__dirname, 'files/division/import.division.min.success.xls'),
        importXLSXMaxSuccess: path.join(__dirname, 'files/division/import.division.max.success.xlsx'),
        importXLSXMaxNoNameFailed: path.join(__dirname, 'files/division/import.division.max.no.name.failed.xlsx'),
        importXLSXMaxNoParamsFailed: path.join(__dirname, 'files/division/import.division.max.no.params.failed.xlsx'),
        importXLSXDupOneFailed: path.join(__dirname, 'files/division/import.division.duplicate.one.level.failed.xlsx'),
        importXLSXDupTwoFailed: path.join(__dirname, 'files/division/import.division.duplicate.two.level.failed.xlsx'),
        importXLSXProgressionSuccess: path.join(__dirname, 'files/division/import.division.progression.success.xlsx'),
    }
}