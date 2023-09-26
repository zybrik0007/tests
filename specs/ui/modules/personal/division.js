const tests = require('../../../../ui/src/handlers/module-specs/specs/personal/division-ui');

console.log('process: ', process);
console.log('process.env: ', process.env);

JSON.parse(process.env.b001divisionUiDisplay) ? tests.display() : '';
JSON.parse(process.env.b002divisionUiAddAddMinParams) ? tests.add.addMinParams() : '';
JSON.parse(process.env.b003divisionUiAddAddMaxParams) ? tests.add.addMaxParams() : '';
JSON.parse(process.env.b004divisionUiAddAddFormsMaxParams) ? tests.add.addFormsMaxParams() : '';
