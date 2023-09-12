const fs = require('fs');

function generationSpec(array, path) {
    array.forEach(item => {
        fs.writeFileSync(path + item.name, item.script);
    });
}

function removeSpecs(path) {
    const readFiles = fs.readdirSync(path);
    readFiles.forEach(item => item !== 'generation' ? fs.unlinkSync(path + item) : '');
}

function generationJSON(obj) {
    const readFiles = fs.readdirSync(obj.pathSpec);
    let objectJSON = {};
    readFiles.forEach(item => {
        const itemSplit = item.split('.');
        const itemSplice = itemSplit.splice(0, itemSplit.length - 2);
        const itemJoin = itemSplice.join('.');
        objectJSON[itemJoin] = `mocha --timeout=30000 --reporter mocha-teamcity-reporter ${obj.pathPackage}${item}`
    });

    fs.writeFileSync(obj.pathJson, JSON.stringify(objectJSON, null, 2));
}

function integrateJSON(pathJson) {
    const packageJson = require('../../../../package.json');
    const updateJson  = require(pathJson);
    Object.assign(packageJson.scripts, updateJson);
    fs.writeFileSync('../../../../../package.json', JSON.stringify(packageJson, null, 2));
    
}

module.exports = {
    generationSpec,
    removeSpecs,
    generationJSON,
    integrateJSON
}