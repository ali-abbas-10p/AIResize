const imageHelper = require('./image-helper');
const validationUtils = require('./validation-util');
const Promise = require('promise');
const readline = require('readline');
const fs = require('fs');

var i = readline.createInterface({
   input:process.stdin,
    output:process.stdout
});

function convertToSynonym(value) {
    switch (value) {
        case 'w':
            return 'wrap_content';
        case 'm':
            return 'match_parent';
        default:
            return value;
    }
}

exports.takeWidth = function () {
    return new Promise(function (resolve, reject) {
        i.question('Width {match_parent | wrap_content | Number in dp}:',function (answer) {
            answer = convertToSynonym(answer);

            if(validationUtils.isDimensionValid(answer))
            {
                if (validationUtils.isDimensionInDp(answer) && parseFloat(answer) < 2)
                    reject(new Error('Width cannot be less than 2 dp'));
                else
                    resolve(answer);
            }
            else
                reject(new Error('Invalid width. Only match_parent, wrap_content or dp in number is allowed'));
        });
    });
};

exports.takeHeight= function () {
    return new Promise(function (resolve, reject) {
        i.question('Height {match_parent | wrap_content | Number in dp}:',function (answer) {
            answer = convertToSynonym(answer);
            if(validationUtils.isDimensionValid(answer))
            {
                if (validationUtils.isDimensionInDp(answer) && parseFloat(answer) < 2)
                    reject(new Error('Height cannot be less than 2 dp'));
                else
                    resolve(answer);
            }
            else
                reject(new Error('Invalid height. Only match_parent, wrap_content or dp in number is allowed'));
        });
    });
};




exports.getImagePath = function () {
    return new Promise(function (resolve, reject) {
        var imagePath = process.argv[2];
        if(imagePath) {
            fs.exists(imagePath,function (exists) {
                if(exists)
                {
                    if(imageHelper.isImage(imagePath))
                        resolve(imagePath);
                    else
                        reject(new Error('Only image with extension .png , .jpg or .jpeg is allowed'));
                }
                else
                    reject(new Error('Image file does not exist'));
            });
        }
        else
            reject(new Error('Image file to resize is missing. Please use command airesize [IMAGE_FILE_PATH]'));
    });
};
