/**
 * URL signature
 *
 * The algorithm for signing an URL is:
 *
 * Signature(url,secret)=Base64(HMAC(URL,HMAC(date,secret)));
 *
 * Secret is expected to be provided Base64.
 *
 * Signatures are valid for 24Hrs and requires hosts to have correct time settings.
 *
 * The algorithm used is SHA512
 *
 * Created by rafael on 12/09/14.
 */

var crypto=require("crypto");

const alg="sha512";


/**
 * Returns the UTC date in YYYYMMDD format
 */
function getDate(){
    var date=new Date();
    var yyyy = date.getUTCFullYear().toString();
    var mm = (date.getUTCMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getUTCDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
}

/**
 * Signs an URL with a Secret KEY
 * @param url
 * @param secret the key in Base64 format
 */
function sign(url,secret){
    var hmac,signKey;

    secret=new Buffer(secret,"base64");

    hmac=crypto.createHmac(alg,secret);
    hmac.update(getDate());

    signKey=hmac.digest();
    hmac=crypto.createHmac(alg,signKey);
    hmac.update(url);
    return hmac.digest("base64");
}


module.exports=sign;