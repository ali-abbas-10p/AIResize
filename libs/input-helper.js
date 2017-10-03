var readline = require('readline');
var imageHelper = require('./image-helper');
var log = require('./log');

var i = readline.createInterface({
   input:process.stdin,
    output:process.stdout
});


exports.takeWidth = function (callback) {
    i.question('Width {match_parent | wrap_content | Number in dp}:',function (answer) {
        if(imageHelper.isDimensionValid(answer))
        {
            if (imageHelper.isDimenInDp(answer) && parseFloat(answer) < 2)
                log.exitWithError('Width cannot be less than 2 dp');
            else
                callback(answer);
        }
        else
            log.exitWithError('Invalid width. Only match_parent, wrap_content or dp in number is allowed');
    });
};

exports.takeHeight= function (callback) {
    i.question('Height {match_parent | wrap_content | Number in dp}:',function (answer) {
        if(imageHelper.isDimensionValid(answer))
        {
            if (imageHelper.isDimenInDp(answer) && parseFloat(answer) < 2)
                log.exitWithError('Height cannot be less than 2 dp');
            else
                callback(answer);
        }
        else
            log.exitWithError('Invalid height. Only match_parent, wrap_content or dp in number is allowed');
    });
};


exports.isWidhtHeightValid = function (width, height) {
    if(width==='match_parent' && height==='match_parent')
        log.exitWithError('Width and Height cannot be match_parent at the same time.');
    else if(width==='wrap_content' && height==='wrap_content')
        log.exitWithError('Width and Height cannot be wrap_content at the same time.');
    else if(imageHelper.isDimenInDp(width) && height === 'match_parent')
        log.exitWithError('If width is in dp, height cannot be match_parent. Use wrap_content for height instead.');
    else if(imageHelper.isDimenInDp(height) && width === 'match_parent')
        log.exitWithError('If height is in dp, width cannot be match_parent. Use wrap_content for width instead.');
    else
        return true;
};


exports.getImagePath = function (callBack) {
    var fs = require('fs');
    var imagePath = process.argv[2];
    if(imagePath) {
        fs.exists(imagePath,function (exists) {
            if(exists)
                callBack(imagePath);
            else
                log.exitWithError('Image file does not exist')
        });
    }
    else
        log.exitWithError('Image file to resize is missing. Please use airesize [IMAGE_FILE_PATH]');
};
