MobileVersion.attachSchema(new SimpleSchema({
    deviceType: {
        type: String,
    },
    version: {
        type: String
    },
    conf: {
        type: String,
    },
    description: {
        type: String,
        optional: true
    },
    timestamp: {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    },

}))


MobileVersion.deny({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; },
})


Meteor.publish('mobileVersions', function () {
    return MobileVersion.find({}, { sort: { timestamp: 1 } });
})



Meteor.methods({
    'mobileVersion.insert': function (version) {
        return MobileVersion.insert(version);
    },
    'mobileVersion.update': function (version) {
        return MobileVersion.update(version._id, { $set: version });
    },
    'mobileVersion.remove': function (_id) {
        return MobileVersion.remove(_id);
    },
})