/**
 * @author Patrick Shaw (Patrick.Leong.Shaw@gmail.com)
 * @date 14/10/2016
 */
exports.isNumeric = function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};