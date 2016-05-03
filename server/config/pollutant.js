
Pollutant.deny({
    insert: function(){ return true; },
    update: function(){ return true; },
    remove: function(){ return true; },
})


Meteor.publish('pollutants', function () {
    return Pollutant.find({}, { sort: { pollutantCode: 1 } });
})