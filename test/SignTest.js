/**
 * Created by rafael on 12/09/14.
 */


var expect=require('chai').expect,
    urlsign=require("../lib/urlsign"),
    log=require("winston");


describe("Signature tests",function(){
    var url="https://www.celpax.com",
        plainSecret=new Buffer("my super-secret"),
        secret=plainSecret.toString("base64");

    it("Will create a signature",function(){
        var s=urlsign(url,secret);
        log.info("URL signature is:"+s);
        expect(s).not.to.equal(null);
    });

    it("Will create two signatures of the same URL",function(){
        var s1,s2;
        s1=urlsign(url,secret);
        s2=urlsign(url,new Buffer(plainSecret).toString("base64"));
        expect(s1).equals(s2);
    });

    it("Will create two signature of different URL",function(){
        var s1,s2;
        s1=urlsign(url,secret);
        s2=urlsign("https://www.daily-pulse.com",secret);
        expect(s1).not.equals(s2);
    });

    it("Will sign the same URL with different keys",function(){
        var s1,s2;
        s1=urlsign(url,secret);
        s2=urlsign(url,new Buffer("my super-duper-super-secret").toString("base64"));
        expect(s1).not.equals(s2);
    });

});


