/**
 * Copyright (c) 2023-now zurmokeeper
 * LICENCE: MIT - please refer to LICENSE file included with this module
 * or https://github.com/zurmokeeper/excelize/blob/master/LICENSE
 */

if (parseInt(process.versions.node.split('.')[0], 10) < 10) {
  throw new Error(
    'For node versions older than 10, please use the ES5 Import: https://github.com/zurmokeeper/excelize#es5-imports'
  );
}

// eslint-disable-next-line import/extensions
module.exports = require('./lib/exceljs.nodejs.js');
