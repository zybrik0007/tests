const Modal = require('../elements/modal');
const elements = require('../../dictionaries/selenium-elements');

class AddPhoto extends Modal {

    constructor(id, title) {
        super();
        this.id = id;
        this.title = title;
    }
}

module.exports = AddPhoto;