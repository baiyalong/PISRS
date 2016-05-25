var pushConfig = JSON.parse(Assets.getText("push.json"))
var IOSConfig = pushConfig.IOS;
IOSConfig.options.cert = Meteor.rootPath + IOSConfig.options.cert;
IOSConfig.options.key = Meteor.rootPath + IOSConfig.options.key;

import apn from "apn";

Meteor.methods({
    'push.IOS': function (tokens, msg) {
        if (tokens && tokens.length != 0) {
            var connection = new apn.Connection(IOSConfig.options);
            tokens.forEach(function (e) {
                var note = new apn.Notification()
                note.expiry = Math.floor(Date.now() / 1000) + 3600  // Expires 1 hour from now.
                note.badge = 1;
                note.sound = "alert.aiff";
                note.alert = msg;
                note.payload = { 'message': msg };
                var device = new apn.Device(e.ID)
                connection.pushNotification(note, device)
            })

            var feedback = new apn.Feedback(Push2IOS.options);
            feedback.on("feedback", function (devices) {
                devices.forEach(function (item) {
                    // Do something with item.device and item.time;
                    console.log(item)
                });
            });
        }
    }
})