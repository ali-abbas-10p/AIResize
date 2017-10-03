var lwip = require('lwip');
var log = require('./log');
var imageHelper = require('./image-helper');
var screenSizes = imageHelper.screenTypes;


function ImageResizer() {
    var orignalImage;
    var aspectRatio;
    var _imagePath;
    var _outputDir;
    this.loadImage = function(imagePath,callback) {
        lwip.open(imagePath,function (err, image) {

            if(err)
                log.exitWithError(err.toString());
            if(image)
            {
                orignalImage = image;
                aspectRatio = image.width() / image.height();
                _imagePath = imagePath;
                callback(image);
            }
            else
                log.exitWithError('Image not found');

        });
    };


    var _widthDp, _heightDp;
    this.startResizing = function (widthDp, heightDp,outputDir) {
        _widthDp = widthDp;
        _heightDp = heightDp;
        _outputDir = outputDir;
        _resize(screenSizes.pop());
    };

    function _resize(screenType) {
        if(!screenType)
            log.success('Images resized for all screens successfully. You can find it in folder ' + _outputDir +'/'+imageHelper.getImageNameWithoutExtension(_imagePath),true);

        log.info('resizing image for screen type ' + screenType + '........');

        var dirMain = _outputDir+'/'+imageHelper.getImageNameWithoutExtension(_imagePath);
        var dirComp = dirMain+'/'+screenType;
        var fileWithPath = dirComp+'/'+imageHelper.getImageNameWithExtension(_imagePath);

        imageHelper.makeDirectory(dirMain,function(err){
            if(err)
                log.exitWithError(err.toString());
            else
                imageHelper.makeDirectory(dirComp,function (err) {
                    if(err)
                        log.exitWithError(err.toString());
                    else
                    {
                        var wh = imageHelper.getWidthAndHeight(aspectRatio,_widthDp,_heightDp,screenType);
                        orignalImage.resize(wh.width,wh.height,imageResizedCallback);
                    }

                });
        });

        function imageResizedCallback(err, image) {
            if(err)
                log.exitWithError(err.toString());
            else
                image.batch().writeFile(fileWithPath,function (err) {
                    if(err)
                        log.exitWithError(err.toString());
                    else
                        _resize(screenSizes.pop());
                });
        }

    }

}

module.exports = new ImageResizer();
