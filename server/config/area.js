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
    }

}))


Area.deny({
    insert: () => { return true; },
    update: () => { return true; },
    remove: () => { return true; },
})


Meteor.publish('areas', function () {
    return Area.find({}, { sort: { code: 1 } });
})