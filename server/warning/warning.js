Warning.attachSchema(new SimpleSchema({
    channels: {
        type: [String]
    },
    cityCode: {
        type: Number
    },
    cityName: {
        type: String
    },
    content: {
        type: String
    },
    timestamp: {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    },
    result: {
        type: String,
        optional: true
    }
}));




Meteor.publish('warning', function (pageNum, limitPerPage, conditions = {}) {
    return Warning.find(conditions, {
        sort: { timestamp: -1 },
        skip: (pageNum - 1) * limitPerPage,
        limit: limitPerPage
    });
})

Meteor.methods({
    'warning_pageCount': function (limitPerPage, conditions = {}) {
        return Math.ceil(Warning.find(conditions).count() / limitPerPage)
    },
    'warning.publish': function (warning) {
        var _id = Warning.insert(warning)
        return Meteor.call('warning.push', _id)
    },
    'warning.push': function (_id) {
        var result = '';//
        //push methods...

        return Meteor.call('warning.result', _id, result)
    },
    'warning.result': function (_id, result) {
        return Warning.update(_id, { $set: { result: result } })
    },
    'warning.remove': function (_id) {
        return Warning.remove(_id)
    }
})