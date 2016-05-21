
AirQualityRelease.attachSchema(new SimpleSchema({
    date: {
        type: Date
    },
    cityCode: {
        type: Number
    },
    countyCode: {
        type: Number
    },
    primaryPollutant: {
        type: String, optional: true
    },
    airIndexLevel: {
        type: String, optional: true
    },
    airQualityIndex: {
        type: String, optional: true
    },
    description: {
        type: String, optional: true
    }
}))


AirQualityRelease.allow({
    insert: function () {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
})

Meteor.publish('airQualityRelease', function () {
    return AirQualityRelease.find({}, {
        sort: { date: -1, cityCode: 1 },
    });
})
