var colors = require('colors');

/**
 * @param {string} error
 */
exports.exitWithError = function (error) {
  console.log(colors.red.bold.bgWhite(error));
  process.exit();
};

/**
 * @param {string} error
 */
exports.error = function(error) {
  console.log(colors.red.bold(error));
};

/**
 * @param {string} info
 */
exports.info = function(info) {
  console.log(info);
};

/**
 * @param {string} success
 * @param {boolean} exit
 */
exports.success = function(success,exit) {
  console.log(colors.green.bold(success));
  if(exit)
      process.exit();
};
