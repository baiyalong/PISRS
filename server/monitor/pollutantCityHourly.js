
Meteor.publish('pollutantCityHourly', function (pageNum, limitPerPage, conditions = {}) {
    return PollutantCityHourly.find(conditions, {
        sort: { TimePoint: -1, CityCode: 1 },
        skip: (pageNum - 1) * limitPerPage,
        limit: limitPerPage
    });
})

Meteor.methods({
    'pollutantCityHourly_pageCount': function (limitPerPage, conditions = {}) {
        return Math.ceil(PollutantCityHourly.find(conditions).count() / limitPerPage)
    },
    'pollutantCityHourly.update': function (id, update) {
        return PollutantCityHourly.update(id, { $set: update })
    }
})