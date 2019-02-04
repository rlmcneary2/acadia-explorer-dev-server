"use strict";


const fs = require("fs");


module.exports = {

    readTextFile: path => {
        return new Promise(resolve => {
            fs.readFile(path, "utf8", (err, data) => {
                resolve (data);
            });
        });
    }

};
