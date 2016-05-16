
Meteor.publish('pollutantStationHourly', function (pageNum, limitPerPage, conditions = {}) {
    return PollutantStationHourly.find(conditions, {
        sort: { monitorTime: -1, stationCode: 1 },
        skip: (pageNum - 1) * limitPerPage,
        limit: limitPerPage
    });
})

Meteor.methods({
    'pollutantStationHourly_pageCount': function (limitPerPage, conditions = {}) {
        return Math.ceil(PollutantStationHourly.find(conditions).count() / limitPerPage)
    },
        'pollutantStationHourly.update': function (id, update) {
        return PollutantStationHourly.update(id, { $set: update })
    }
})