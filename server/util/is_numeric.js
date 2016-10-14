exports.isNumeric = function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};