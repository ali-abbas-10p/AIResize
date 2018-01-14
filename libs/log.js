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
 * @param {boolean} exit
 */
exports.error = function(error,exit) {
  console.log(colors.red.bold(error));
  if(exit)
    process.exit();
};

/**
 * @param {string} info
 * @param {boolean} exit
 */
exports.info = function(info,exit) {
  console.log(info);
    if(exit)
        process.exit();
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
