"use strict";

/**
 * return router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

const defaultRouter = createCoreRouter("api::return.return");

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

// const extraRoutes = [
//   {
//     method: "POST",
//     path: "/returns/generate",
//     handler: "api::return.return.generateOTP",
//     config: {
//       auth: false,
//     },
//   },
//   {
//     method: "POST",
//     path: "/returns/confirm",
//     handler: "api::return.return.confirmOTP",
//     config: {
//       auth: false,
//     },
//   },
// ];

module.exports = customRouter(defaultRouter, []);
