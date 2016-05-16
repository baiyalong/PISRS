Area.attachSchema(new SimpleSchema({
    code: {
        type: Number,
        index: true,
        unique: true
    },
    name: {
        type: String
    },
    parent_code: {
        type: Number,
        optional: true
    },
    county_code: {
        type: Number,
        optional: true
    },
    city_code: {
        type: Number,
        optional: true
    },
    province_code: {
        type: Number,
        optional: true
    },
    level: {
        type: String
    },
    longitude: {
        type: Number,
        decimal: true
    },
    latitude: {
        type: Number,
        decimal: true
    },
    weatherID: {
        type: Number
    }
}))


Area.deny({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; },
})


Meteor.publish('areas', function () {
    return Area.find({}, { sort: { code: 1 } });
})

Meteor.publish('dict.cities', function () {
    return Area.find({ level: 'city' }, { sort: { code: 1 }, fields: { code: 1, name: 1 } });
})