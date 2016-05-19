Visits.attachSchema(new SimpleSchema({
    website: {
        type: Number
    },
    IOS: {
        type: Number
    },
    Android: {
        type: Number
    },
    weixin: {
        type: Number
    },
    weibo: {
        type: Number
    },
    timestamp: {
        type: Date,
        // autoValue: function () {
        //     return new Date();
        // }
    },
}));




Meteor.publish('visits', function () {
    return Visits.find({}, {
        sort: { timestamp: -1 },
        // limit: limit
    });
})

Meteor.methods({

})