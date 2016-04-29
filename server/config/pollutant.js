
Pollutant.deny({
    insert: () => { return true; },
    update: () => { return true; },
    remove: () => { return true; },
})


Meteor.publish('pollutants', function () {
    return Pollutant.find({}, { sort: { pollutantCode: 1 } });
})