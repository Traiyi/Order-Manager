/**
 *   获取年月日
 *   @returns {string}  yyyy-mm-dd
 */

export function getDate() {
    const date = new Date()
    return date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate())
}

/**
 *   获取时分秒
 *   @returns {string}  hh:mm:ss
 */

export function getTime() {
    const date = new Date()
    return addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds())
}

/**
 *   如果小于10 ，就补0
 *   @param {string} date
 *   @returns {string}  date
 */
function addZero(item) {
    return item > 9 ? item : '0' + item
}

export function dateTime2str(dateTime, format) {
    var z = {
        y: dateTime.getFullYear(),
        M: dateTime.getMonth() + 1,
        d: dateTime.getDate(),
        h: dateTime.getHours(),
        m: dateTime.getMinutes(),
        s: dateTime.getSeconds()
    };
    return format.replace(/(y+|M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
    });
}

export function GetDateTimeToString() {
    var date_ = new Date();
    var year = date_.getFullYear();
    var month = date_.getMonth() + 1;
    var day = date_.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var hours = date_.getHours();
    var mins = date_.getMinutes();
    var secs = date_.getSeconds();
    var msecs = date_.getMilliseconds();
    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;
    if (msecs < 10) secs = "0" + msecs;
    return year + "/" + month + "/" + day + " " + hours + ":" + mins;
}