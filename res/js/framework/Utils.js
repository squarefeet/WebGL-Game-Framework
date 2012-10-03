var utils = {}

utils.degreesToRadians = function(angle) {
    return angle * (Math.PI / 180);
};

utils.radiansToDegrees = function(angle) {
    return angle * (180 / Math.PI);
};