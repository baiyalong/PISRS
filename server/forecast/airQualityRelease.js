
AirQualityRelease.attachSchema(new SimpleSchema({
    date: {
        type: Date
    },
    cityCode: {
        type: Number
    },
    cityName: {
        type: String
    },
    countyCode: {
        type: Number
    },
    countyName: {
        type: String
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
        sort: { cityCode: 1, date: 1 }
    });
})
