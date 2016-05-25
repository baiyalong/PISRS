var pushConfig = JSON.parse(Assets.getText("push.json"))
var androidConfig = pushConfig.Android;


Meteor.methods({
    'push.Android': function (keys, msg) {
        if (keys && keys.length != 0) {
            keys.forEach(function (e) {
                HTTP.call('POST', androidConfig.path, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    content: "target=tokudu/" + e.ID + "&message=" + msg
                }, function (err, res) {
                    if (err)
                        console.log('Push2Android', err, res)
                })
            })
        }
    }
})