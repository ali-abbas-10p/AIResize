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