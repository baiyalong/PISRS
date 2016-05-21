
Meteor.publish('airQualityForecast', function (pageNum, limitPerPage, conditions = {}) {
    return AirQualityForecast.find(conditions, {
        sort: { publishtime: -1},
        skip: (pageNum - 1) * limitPerPage,
        limit: limitPerPage
    });
})

Meteor.methods({
    'airQualityForecast_pageCount': function (limitPerPage, conditions = {}) {
        return Math.ceil(AirQualityForecast.find(conditions).count() / limitPerPage)
    }
})