"use strict";


const constants = require("./constants");
const files = require("./files");
const path = require("path");


module.exports = {

    kml: async name => {
        let file = path.join(constants.routeFilesPath, name);
        return await files.readTextFile(file);
    },

    visibleRoutes: async () => {
        let file = path.join(constants.routeFilesPath, "GetVisibleRoutes_1504456222834.json");
        return await files.readTextFile(file);
    }

};
