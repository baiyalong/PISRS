
Meteor.publish('pollutantCityDaily', function (pageNum, limitPerPage, conditions = {}) {
    return PollutantCityDaily.find(conditions, {
        sort: { MONITORTIME: -1, CITYCODE: 1 },
        skip: (pageNum - 1) * limitPerPage,
        limit: limitPerPage
    });
})

Meteor.methods({
    'pollutantCityDaily_pageCount': function (limitPerPage, conditions = {}) {
        return Math.ceil(PollutantCityDaily.find(conditions).count() / limitPerPage)
    },
    'pollutantCityDaily.update': function (id, update) {
        return PollutantCityDaily.update(id, { $set: update})
    }
})