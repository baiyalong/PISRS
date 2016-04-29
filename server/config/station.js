Station.deny({
    insert: () => { return true; },
    update: () => { return true; },
    remove: () => { return true; },
})


Meteor.publish('stations', function () {
    return Station.find({}, { sort: { stationId: 1 } });
})