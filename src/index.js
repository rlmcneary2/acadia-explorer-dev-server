"use strict";


const corsMiddleware = require("restify-cors-middleware");
const restify = require("restify");
const routes = require("./routes");
const url = require("url");
const Vehicles = require("./vehicles");


const vehicles = new Vehicles();
const serverPort = 80;

const server = restify.createServer({
    formatters:{
        "text/xml": (req, res, body) => body
    }
});

const cors = corsMiddleware({
    origins: ["*"]
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.queryParser({ mapParams: true }));

server.get(
    "/InfoPoint/rest/Vehicles/GetAllVehiclesForRoutes",
    async (request, response, next) => {
        const data = await vehicles.getRoutesVehicles(request.params.routeIDs);
        response.send(JSON.parse(data));
        next();
    });

// server.get(
//     "/InfoPoint/Resources/Traces/:kmlName",
//     async (request, response, next) => {
//         const data = await routes.kml(request.params.kmlName);
//         response.header("Content-Type", "text/xml");
//         response.send(data);
//         next();
//     });

// server.get(
//     "InfoPoint/rest/Routes/GetVisibleRoutes",
//     async (request, response, next) => {
//         const data = await routes.visibleRoutes();
//         response.send(JSON.parse(data));
//         next();
//     });

server.listen(serverPort, () => {
    console.log(`Listening at ${server.url}`); // eslint-disable-line no-console
});
