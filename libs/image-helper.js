const fs = require('fs');
const path = require('path');
const Promise = require('promise');
const validationUtils = require('./validation-util');


exports.screenTypes = ['drawable-ldpi','drawable-hdpi','drawable-mdpi','drawable-xhdpi','drawable-xxhdpi','drawable-xxxhdpi'];
// exports.screenTypes = ['drawable-xxxhdpi'];

/**
 * @param {string} filePath
 */
exports.isImage = function (filePath) {
    var ext = path.extname(filePath);
    return ext === '.png' || ext === '.jpg' || ext === '.jpeg';

};

exports.getImageNameWithoutExtension = function(filePath) {
    return path.basename(filePath,path.extname(filePath));
};

exports.getImageNameWithExtension = function(filePath) {
    return path.basename(filePath);
};



exports.getWidthAndHeight = function(aspectRatio,width,height,screenType) {
    switch (screenType) {
        case 'drawable-ldpi':
            return getWidthHeight(aspectRatio,width,height,0.5,120*2.5);
        case 'drawable-hdpi': //40
            return getWidthHeight(aspectRatio,width,height,1,160*2.5);
        case 'drawable-mdpi': //
            return getWidthHeight(aspectRatio,width,height,1.5,240*2.5);
        case 'drawable-xhdpi':
            return getWidthHeight(aspectRatio,width,height,2,320*2.5);
        case 'drawable-xxhdpi':
            return getWidthHeight(aspectRatio,width,height,3,480*2.5);
        case 'drawable-xxxhdpi':
            return getWidthHeight(aspectRatio,width,height,4,640*2.5);
        default:
            throw new Error('invalid screen type: ' + screenType);
    }
};

exports.makeDirectory = function (path) {
    return new Promise(function (resolve) {
        fs.exists(path,function (exist) {
            if(exist)
                resolve();
            else
                fs.mkdir(path,resolve);
        });
    });
};


function convertToWidthHeightObject(width,height) {
    return {
        'width':width,
        'height':height
    };
}

function getWidthHeight(aspectRatio,width,height,factor,matchParentToDp) {

    if (width === 'match_parent')
        width = matchParentToDp/factor;
    else if(height === 'match_parent')
        height = matchParentToDp/factor;

    if(validationUtils.isDimensionInDp(width) && validationUtils.isDimensionInDp(height))
        return convertToWidthHeightObject(width*factor,height*factor);
    else if(validationUtils.isDimensionInDp(width) && height === 'wrap_content')
        return convertToWidthHeightObject(width*factor,(width*factor)/aspectRatio);
    else if(validationUtils.isDimensionInDp(height) && width === 'wrap_content')
        return convertToWidthHeightObject(height*factor*aspectRatio,height*factor);
    else
        throw new Error('width and height validation missed');
}

