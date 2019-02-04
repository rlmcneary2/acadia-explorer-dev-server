"use strict";


const constants = require("./constants");
const files = require("./files");
const fs = require("fs");
const path = require("path");


let fileNames;
let lastIndex = -1;


class Vehicles {

    async getRoutesVehicles() {
        if (!fileNames) {
            fileNames = await getFileNames(constants.routeFilesPath);
            fileNames = sortFilesByDate(fileNames);
        }

        lastIndex++;
        lastIndex = lastIndex < fileNames.length ? lastIndex : 0;

        const fileName = fileNames[lastIndex];
        const filePath = path.join(constants.routeFilesPath, fileName);
        return await files.readTextFile(filePath);
    }

}


function getFileNames(path) {
    return new Promise(resolve => {

        fs.readdir(path, { withFileTypes: true }, (err, files) => {
            resolve(files.filter(item => item.isFile()).map(item => item.name));
        });

    });
}

function sortFilesByDate(files) {
    const getNameTime = name => {
        return parseInt(name.split("-")[0]);
    };

    return files.sort((a, b) => {
        return getNameTime(a) - getNameTime(b);
    });
}


module.exports = Vehicles;
