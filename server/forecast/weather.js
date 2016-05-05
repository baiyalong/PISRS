
Meteor.publish('weatherForecast', function (pageNum, limitPerPage, conditions = {}) {
    return WeatherForecast.find(conditions, {
        sort: { areaid: 1 },
        skip: (pageNum - 1) * limitPerPage,
        limit: limitPerPage
    });
})

Meteor.methods({
    'weatherForecast_pageCount': function (limitPerPage, conditions = {}) {
        return Math.ceil(WeatherForecast.find(conditions).count() / limitPerPage)
    }
})