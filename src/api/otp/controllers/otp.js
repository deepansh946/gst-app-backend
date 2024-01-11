"use strict";

const { genOTP } = require("../../../utils/helpers");
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const region = process.env.AWS_REGION;

AWS.config.update({ region });

/**
 * otp controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::otp.otp", ({ strapi }) => ({
  async generateOTP(ctx) {
    const otp = genOTP();
    const { phone } = ctx.request.body;
    const expiresIn = new Date(new Date().getTime() + 15 * 60 * 1000);
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { phone },
      });

    const sns = new AWS.SNS({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });

    const params = {
      Message: `Your OTP is ${otp}. It'll expire in 15 minutes.\nGilda & Company`,
      PhoneNumber: phone,
    };
    const response = await sns.publish(params).promise();

    const generateOTPs = await strapi.entityService.create("api::otp.otp", {
      data: {
        code: otp,
        user: user.id,
        expiresIn,
      },
    });

    return { data: true };
  },

  async confirmOTP(ctx) {
    const { otp, phone } = ctx.request.body;
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { phone },
      });

    const userOTPs = await strapi.entityService.findMany("api::otp.otp", {
      filters: { user: user.id, code: otp },
      populate: { user: true },
    });

    if (userOTPs.length === 0) {
      ctx.throw(400, "Invalid OTP");
    }

    const res = await strapi.plugins["users-permissions"].services.jwt.issue({
      id: user.id,
    });

    return { token: res };
  },
}));
