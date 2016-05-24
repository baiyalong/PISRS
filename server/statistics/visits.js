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
    const limit = 24 * 30 * 3; //last 3 month
    return Visits.find({}, {
        sort: { timestamp: -1 },
        limit: limit
    });
})

Meteor.methods({

})