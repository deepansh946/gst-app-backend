"use strict";

/**
 * otp router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;
const defaultRouter = createCoreRouter("api::otp.otp");

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

const extraRoutes = [
  {
    method: "POST",
    path: "/otps/generate",
    handler: "api::otp.otp.generateOTP",
    config: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/otps/confirm",
    handler: "api::otp.otp.confirmOTP",
    config: {
      auth: false,
    },
  },
];

module.exports = customRouter(defaultRouter, extraRoutes);
