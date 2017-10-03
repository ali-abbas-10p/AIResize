var imageResizer = require('./libs/image-resizer');
var log = require('./libs/log');
var imageHelper = require('./libs/image-helper');
var inputHelper = require('./libs/input-helper');

var path = require('path');

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



