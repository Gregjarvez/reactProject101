'use strict';

module.exports = function (test) {
    var obj = {
        app: './example/index.js'
    };

    return test ? {} : obj;
};
