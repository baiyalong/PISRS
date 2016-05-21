import captchapng from 'captchapng';


const captchapng_width = 180;
const captchapng_height = 26;

Captcha = {}
Captcha.Dict = {}

Captcha.getCaptcha = function (connection) {
    var rand = parseInt(Math.random() * 9000 + 1000)
    if (Captcha.Dict[connection]) {
        if (Captcha.Dict[connection].length >= 2) Captcha.Dict[connection].shift()
        Captcha.Dict[connection].push(rand)
    } else {
        Captcha.Dict[connection] = [rand];
    }

    Meteor.setTimeout(function () {
        delete Captcha.Dict[connection];
    }, 1000 * 60)

    function randColor() {
        return parseInt(255 * Math.random())
    }
    function randAlpha() {
        return parseInt(10 * Math.random()) / 10
    }
    var p = new captchapng(captchapng_width, captchapng_height, rand); // width,height,numeric captcha
    p.color(randColor(), randColor(), randColor(), randColor());  // First color: background (red, green, blue, alpha)
    p.color(randColor(), randColor(), randColor(), randColor()); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');

    return imgbase64;
}

Captcha.checkCaptcha = function (connection, code) {
    if (Captcha.Dict[connection] && Captcha.Dict[connection].indexOf(Number(code)) != -1) {
        delete Captcha.Dict[connection];
        return true;
    } else return false;
}


function isIntranet(ip) {
    function ipToNumber(ip) {
        var numbers = ip.split(".");
        return parseInt(numbers[0]) * 256 * 256 * 256 +
            parseInt(numbers[1]) * 256 * 256 +
            parseInt(numbers[2]) * 256 +
            parseInt(numbers[3]);
    }
    var num = ipToNumber(ip);
    function ipInRange(range) {
        if (range.length == 1) {
            return num == ipToNumber(range[0])
        } else if (range.length == 2) {
            return num >= ipToNumber(range[0]) && num <= ipToNumber(range[1])
        } else return false;
    }
    if (
        ipInRange(['127.0.0.1']) ||
        ipInRange(['10.0.0.0', '10.255.255.255']) ||
        ipInRange(['172.16.0.0', '172.31.255.255']) ||
        ipInRange(['192.168.0.0', '192.168.255.255'])
    ) return true;
    else return false;
}


Api = new Restivus({
    apiPath: 'api/',
    useDefaultAuth: true,
    prettyJson: true,
    defaultHeaders: { 'Content-Type': 'application/json;charset=utf-8' }
});

Api.addRoute('captcha/:connection', {
    get: function () {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'image/png'
            },
            body: Captcha.getCaptcha(this.urlParams.connection)
        };
    }
})


Meteor.methods({
    checkCaptcha: function (code) {
        if (isIntranet(this.connection.clientAddress)) return true;
        else return Captcha.checkCaptcha(this.connection.id, code)
    }
})