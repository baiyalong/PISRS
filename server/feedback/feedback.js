Feedback.attachSchema(new SimpleSchema({
    username: {
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
}));




Meteor.publish('feedback', function (pageNum, limitPerPage, conditions = {}) {
    return Feedback.find(conditions, {
        sort: { timestamp: -1 },
        skip: (pageNum - 1) * limitPerPage,
        limit: limitPerPage
    });
})

Meteor.methods({
    'feedback_pageCount': function (limitPerPage, conditions = {}) {
        return Math.ceil(Feedback.find(conditions).count() / limitPerPage)
    },
    'feedback.remove': function (_id) {
        return Feedback.remove(_id)
    }
})