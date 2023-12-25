"use strict";

/**
 * otp controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::otp.otp",
  ({ strapi }) => ({
    async generateOTP(ctx) {},
    async confirmOTP(ctx) {},
  })
);
