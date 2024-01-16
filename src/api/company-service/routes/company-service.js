'use strict';

/**
 * company-service router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::company-service.company-service');
