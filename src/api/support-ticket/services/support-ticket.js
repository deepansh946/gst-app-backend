'use strict';

/**
 * support-ticket service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::support-ticket.support-ticket');
