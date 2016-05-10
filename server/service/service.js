
SyncedCron.start();


// SyncedCron.add({
//     name: 'Crunch some important numbers for the marketing department',
//     schedule: function (parser) {
//         // parser is a later.parse object
//         return parser.text('every 20 seconds');
//     },
//     job: function () {
//         console.log('test')
//     }
// });

jobs = {
    'test1': function () {
        console.log('test1')
    },
    'test2': function () {
        console.log('test2')
    },
}


Service.attachSchema(new SimpleSchema({
    sn: {
        type: Number
    },
    name: {
        type: String
    },
    schedule: {
        type: String
    },
    status: {
        type: Number
    }
}))

Meteor.publish('service', function () {
    return Service.find({}, { sort: { sn: 1 } });
})

Meteor.methods({
    'service.start': function (jobName) {
        SyncedCron.remove(jobName)
        var service = Service.findOne({ name: jobName })
        if (service) {
            SyncedCron.add({
                name: service.name,
                schedule: function (parser) {
                    // parser is a later.parse object
                    return parser.text(service.schedule);
                },
                job: jobs[service.name]
            })
            Service.update(service._id, { $set: { status: 1 } })
        }
    },
    'service.stop': function (jobName) {
        SyncedCron.remove(jobName)
        Service.update({ name: jobName }, { $set: { status: 0 } })
    },
    'service.startAll': function () {
        SyncedCron.start()
        Service.update({}, { $set: { status: 1 } })
    },
    'service.stopAll': function () {
        SyncedCron.pause()
        Service.update({}, { $set: { status: 0 } })
    },
})