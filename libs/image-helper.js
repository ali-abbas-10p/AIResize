var fs = require('fs');
var path = require('path');


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



exports.isDimensionValid = function (dimen) {
    if (dimen === 'match_parent' || dimen === 'wrap_content')
        return true;
    else
    {
        // noinspection EqualityComparisonWithCoercionJS
        return  dimen == parseFloat(dimen);
    }
};

exports.isDimenInDp = function (dimen) {
    // noinspection EqualityComparisonWithCoercionJS
    return  dimen == parseFloat(dimen);
};


exports.getWidthAndHeight = function(aspectRatio,width,height,screenType) {
    switch (screenType) {
        case 'drawable-ldpi':
            return getWidthHeight(aspectRatio,width,height,0.5,120);
        case 'drawable-hdpi':
            return getWidthHeight(aspectRatio,width,height,1,160);
        case 'drawable-mdpi':
            return getWidthHeight(aspectRatio,width,height,1.5,240);
        case 'drawable-xhdpi':
            return getWidthHeight(aspectRatio,width,height,2,320);
        case 'drawable-xxhdpi':
            return getWidthHeight(aspectRatio,width,height,3,480);
        case 'drawable-xxxhdpi':
            return getWidthHeight(aspectRatio,width,height,4,640);
        default:
            throw new Error('invalid screen type: ' + screenType);
    }
};

exports.makeDirectory = function (path, callback) {
    fs.exists(path,function (exist) {
        if(exist)
            callback();
        else
            fs.mkdir(path,callback);
    });
};


function convertToWidthHeightObject(width,height) {
    // return [width,height]
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

    if(exports.isDimenInDp(width) && exports.isDimenInDp(height))
        return convertToWidthHeightObject(width*factor,height*factor);

    else if(exports.isDimenInDp(width) && height === 'wrap_content')
        return convertToWidthHeightObject(width*factor,(width*factor)/aspectRatio);

    else if(exports.isDimenInDp(height) && width === 'wrap_content')
        return convertToWidthHeightObject(height*factor*aspectRatio,height*factor);
    else
        throw new Error('width and height validation missed');
}

