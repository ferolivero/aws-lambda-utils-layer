const getExpirationTimeInMinutes = (ttl) => {
    let expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + parseInt(ttl));
    return Math.floor(expirationTime / 1000);
};

/**
 *
 * @param unixDate
 * @returns {number}
 */
const getDiffMinutesFromTTL = unixDate => {
    let ttl = new Date(unixDate * 1000);
    let now = new Date();
    //one_day means 1000 * 60 * 60 * 24
    //one_hour means 1000 * 60 * 60
    //one_minute means 1000 * 60
    //one_second means 1000
    return parseInt((ttl - now) / (1000 * 60)); //gives minutes difference
};

module.exports = { getExpirationTimeInMinutes, getDiffMinutesFromTTL };