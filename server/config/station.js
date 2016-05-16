Station.deny({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; },
})


Meteor.publish('stations', function () {
    return Station.find({}, { sort: { StationId: 1 } });
})

Meteor.publish('dict.stations', function () {
    return Station.find({}, { sort: { UniqueCode: 1 }, fields: { UniqueCode: 1, PositionName: 1, Area: 1 } });
})