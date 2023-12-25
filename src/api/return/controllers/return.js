'use strict';

/**
 * return controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::return.return');
