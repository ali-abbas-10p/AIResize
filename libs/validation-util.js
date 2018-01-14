exports.validateWidthAndHeight = function (width, height) {
    if(width==='match_parent' && height==='match_parent')
        throw new Error('Width and Height cannot be match_parent at the same time.');
    else if(width==='wrap_content' && height==='wrap_content')
        throw new Error('Width and Height cannot be wrap_content at the same time.');
    else
        return true;
};


exports.isDimensionValid = function (dimen) {
    if (dimen === 'match_parent' || dimen === 'wrap_content')
        return true;
    else
        { // noinspection EqualityComparisonWithCoercionJS
            return  dimen == parseFloat(dimen);
        }
};

exports.isDimensionInDp = function (dimen) {
    // noinspection EqualityComparisonWithCoercionJS
    return  dimen == parseFloat(dimen);
};


