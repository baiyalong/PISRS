Station.deny({
    insert: function(){ return true; },
    update: function(){ return true; },
    remove: function(){ return true; },
})


Meteor.publish('stations', function () {
    return Station.find({}, { sort: { StationId: 1 } });
})