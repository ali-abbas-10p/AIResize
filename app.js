var imageResizer = require('./libs/image-resizer');
var log = require('./libs/log');
var inputHelper = require('./libs/input-helper');
var validationUtil = require('./libs/validation-util');

var _imagePath, _width;
inputHelper.getImagePath()
    .then(function (imagePath) {
        _imagePath = imagePath;
        return inputHelper.takeWidth();
    })
    .then(function (width) {
        _width = width;
        return inputHelper.takeHeight();
    })
    .then(function (height) {
        if (validationUtil.validateWidthAndHeight(_width,height)) {
            return imageResizer.load(_imagePath,_width,height);
        }
    })
    .then(function (imageResizerObj) {
        imageResizerObj.startResizing();
    })
    .catch(function (err) {
       log.error(err.toString(),true);
    });

/*
inputHelper.getImagePath(function (imagePath) {
    var dir = path.dirname(path.resolve(imagePath));

    if(!imageHelper.isImage(imagePath))
        log.exitWithError('Only image with extension .png , .jpg or .jpeg is allowed');

    imageResizer.loadImage(imagePath,takeInputFromUser);

    function takeInputFromUser() {
        inputHelper.takeWidth(function (width) {
            inputHelper.takeHeight(function (height) {
                if(inputHelper.isWidhtHeightValid(width,height))
                    imageResizer.startResizing(width,height,dir);
            });
        });
    }
});



*/
