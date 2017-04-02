// **add encoding file
const md5 = require('md5');
const https = require('http');
const url = require('url');


var geturl = 'http://api.map.baidu.com/location/ip';
var parms = {
    'ip': '127.0.0.1',
    'ak': 'youak'   //baiduapi'ak
};

function toQueryString(parms) {
    var str = '';
    for (var key in parms) {
        if (parms.hasOwnProperty(key)) {
            str += key + '=' + Util.EncodeUtf8(parms[key]) + '&';
        }
    }
    str = str.slice(0, -1);

    return str;
}
var paramsStr = toQueryString(parms);
var wholeStr = '/location/ip?' + paramsStr + 'yousk';
console.log(wholeStr);
var tempStr = Util.EncodeUtf8(wholeStr);
console.log(tempStr);
var sn = md5(tempStr);


function getAccess_tokenAsync() {
    return new Promise(function (resolve, reject) {



        // var geturl = 'https://api.weixin.qq.com/cgi-bin/token';
        // var _url = geturl + '?grant_type=client_credential&appid' + appId + '&secret=' + appSecret;
        var _url = geturl + '?' + paramsStr + '&sn=' + sn;
        console.log(_url);
        var parseUrl = url.parse(_url, true);
        var options = { host: null, port: -1, method: 'GET' };

        options.host = parseUrl.hostname;
        options.port = parseUrl.port;
        options.path = parseUrl.pathname;
        // post_option.method = 'GET';
        // post_option.post = 443;
        if (parseUrl.search) options.path += parseUrl.search;
        // console.log('opstions')
        // console.log(options);
        // console.log('parseUrl')
        // console.log(parseUrl);
        var req = https.request(options, (res) => {
            var body = '';
            // util.log('res.statusCode:' + res.statusCode);
            // util.log('headers:' + res.headers);
            // res.setEncoding('utf8');
            res.on('data', (chunk) => {
                // console.log('***************')
                body = body + chunk;
                // util.log('body:' + chunk);
            });
            res.on('end', function () {
                // console.log(body);
                resolve(body);
            })
            res.on('error', (err) => {
                reject(err);
            })
        })
        req.end();

    })
}


getAccess_tokenAsync().then((body) => {
    // JSON.parse(body);
    console.log(body);
    console.log( JSON.stringify(body));
    
});