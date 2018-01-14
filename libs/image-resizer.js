const imageHelper = require('./image-helper');
const screenSizes = imageHelper.screenTypes;
const jimp = require('jimp');
const Promise = require('promise');
const path = require("path");
const log = require("./log");

exports.load = function (imagePath, widthDp, heightDp) {
    return new Promise(function (resolve, reject) {
        jimp.read(imagePath,function (err, image) {
            if(err)
                reject(err);
            else if(image)
                resolve(new ImageResizer(image,imagePath,widthDp,heightDp));
            else
                reject(new Error('Image not found'));

        });
    });
};

function ImageResizer(image,imagePath,widthDp,heightDp) {
    const aspectRatio = image.bitmap.width / image.bitmap.height;
    var _outputDir = path.dirname(path.resolve(imagePath));

    this.startResizing = function () {
        resizeEachScreenType(screenSizes.pop());
    };

    function resizeEachScreenType(screenType) {
        if(!screenType)
            log.success('Images resized for all screens successfully. You can find it in folder ' + _outputDir +'/'+imageHelper.getImageNameWithoutExtension(imagePath),true);

        var dirMain = _outputDir+'/'+imageHelper.getImageNameWithoutExtension(imagePath);
        var dirComp = dirMain+'/'+screenType;
        var fileWithPath = dirComp+'/'+imageHelper.getImageNameWithExtension(imagePath);

        imageHelper.makeDirectory(dirMain)
            .then(function () {
                return imageHelper.makeDirectory(dirComp);
            })
            .then(function () {
                var wh = imageHelper.getWidthAndHeight(aspectRatio,widthDp,heightDp,screenType);
                log.info('resizing image for screen type ' + screenType +'<'+parseInt(wh.width)+'X'+parseInt(wh.height)+'>'+ '........');
                image.quality(100)
                    .resize(wh.width,wh.height,jimp.AUTO,imageResizedCallback);
            })
            .catch(function (err) {
                throw err;
            });

        function imageResizedCallback(err, image) {
            if(err)
                throw err;
            else
                image.write(fileWithPath,function (err) {
                    if(err)
                        throw err;
                    else
                        resizeEachScreenType(screenSizes.pop());
                });
        }

    }

}
