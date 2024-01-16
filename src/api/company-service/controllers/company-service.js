'use strict';

/**
 * company-service controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::company-service.company-service');
