
Meteor.publish('pollutantStationDaily', function (pageNum, limitPerPage, conditions = {}) {
    return PollutantStationDaily.find(conditions, {
        sort: { MONITORTIME: -1, UNIQUECODE: 1 },
        skip: (pageNum - 1) * limitPerPage,
        limit: limitPerPage
    });
})

Meteor.methods({
    'pollutantStationDaily_pageCount': function (limitPerPage, conditions = {}) {
        return Math.ceil(PollutantStationDaily.find(conditions).count() / limitPerPage)
    },
    'pollutantStationDaily.update': function (id, update) {
        return PollutantStationDaily.update(id, { $set: update })
    }
})