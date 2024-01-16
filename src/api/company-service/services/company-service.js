'use strict';

/**
 * company-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::company-service.company-service');
