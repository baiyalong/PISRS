
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
var Future = Npm.require('fibers/future')
var mysqlPool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'NMHBSource'
});
var errorProcess = function (err, jobName) {
    if (err) {
        console.log(err)
        Meteor.call('service.err', jobName)
        return;
    }
}

var jobs = {
    syncPollutantStationHourly: function () {
        var t = PollutantStationHourly.findOne({}, { sort: { monitorTime: -1 } }).monitorTime;
        var f = new Future();
        mysqlPool.getConnection(Meteor.bindEnvironment(function (err, connection) {
            errorProcess(err, 'syncPollutantStationHourly')
            connection.query(
                'select * from T_ENV_AUTOMONI_AIRDATA_HOUR_S where MONITORTIME > ? order by MONITORTIME;',
                [t],
                Meteor.bindEnvironment(function (err, rows) {
                    errorProcess(err, 'syncPollutantStationHourly')
                    connection.release();
                    f.return(rows);
                }))
        }))
        var data = f.wait();
        data.forEach(function (e) {
            var update = {
                stationCode: Number(e.POINTCODE),
                monitorTime: e.MONITORTIME
            };
            update[e.CODE_POLLUTE] = e.CODE_POLLUTE == 'PRIMARYPOLLUTANT' ? e.AVERVALUESTRING : e.AVERVALUE;
            PollutantStationHourly.upsert({
                stationCode: Number(e.POINTCODE),
                monitorTime: { $gte: e.MONITORTIME, $lte: e.MONITORTIME }
            }, { $set: update })
        })
    },
    syncPollutantStationDaily: function () {
        var t = PollutantStationDaily.findOne({}, { sort: { MONITORTIME: -1 } }).MONITORTIME;
        var f = new Future();
        mysqlPool.getConnection(Meteor.bindEnvironment(function (err, connection) {
            errorProcess(err, 'syncPollutantStationDaily')
            connection.query(
                'select * from AIR_STATIONDAY_AQI_SRC where MONITORTIME > ? order by MONITORTIME;',
                [t],
                Meteor.bindEnvironment(function (err, rows) {
                    errorProcess(err, 'syncPollutantStationDaily')
                    connection.release();
                    f.return(rows);
                }))
        }))
        var data = f.wait();
        data.forEach(function (e) {
            PollutantStationDaily.insert(e);
        })
    },
    syncPollutantCityHourly: function () {
        var t = PollutantCityHourly.findOne({}, { sort: { TimePoint: -1 } })
        if (t) t = t.TimePoint;
        else return false;
        var f = new Future();
        mysqlPool.getConnection(Meteor.bindEnvironment(function (err, connection) {
            errorProcess(err, 'syncPollutantCityHourly')
            connection.query(
                'select * from AIR_CITYHOUR_AQI_DATA where TimePoint > ? order by TimePoint;',
                [t],
                Meteor.bindEnvironment(function (err, rows) {
                    errorProcess(err, 'syncPollutantCityHourly')
                    connection.release();
                    f.return(rows);
                }))
        }))
        var data = f.wait();
        data.forEach(function (e) {
            PollutantCityHourly.insert(e);
        })
    },
    syncPollutantCityDaily: function () {
        var t = PollutantCityDaily.findOne({}, { sort: { MONITORTIME: -1 } }).MONITORTIME;
        var f = new Future();
        mysqlPool.getConnection(Meteor.bindEnvironment(function (err, connection) {
            errorProcess(err, 'syncPollutantCityDaily')
            connection.query(
                'select * from AIR_CITYDAY_AQI_SRC where MONITORTIME > ? order by MONITORTIME;',
                [t],
                Meteor.bindEnvironment(function (err, rows) {
                    errorProcess(err, 'syncPollutantCityDaily')
                    connection.release();
                    f.return(rows);
                }))
        }))
        var data = f.wait();
        data.forEach(function (e) {
            PollutantCityDaily.insert(e);
        })
    },
    syncAirQualityForecast: function () {
        var t = AirQualityForecast.findOne({}, { sort: { publishtime: -1 } }).publishtime;
        var f = new Future();
        mysqlPool.getConnection(Meteor.bindEnvironment(function (err, connection) {
            errorProcess(err, 'syncAirQualityForecast')
            connection.query(
                'select * from T_AIR_FORECAST_NMINFO where publishtime > ? order by publishtime;',
                [t],
                Meteor.bindEnvironment(function (err, rows) {
                    errorProcess(err, 'syncAirQualityForecast')
                    connection.release();
                    f.return(rows);
                }))
        }))
        var data = f.wait();
        data.forEach(function (e) {
            AirQualityForecast.insert(e);
        })
    },
    syncWeatherForecast: function () {
        //TODO
        errorProcess("//TODO syncWeatherForecast", 'syncWeatherForecast')

    }
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
        Service.update({}, { $set: { status: 1 } }, { multi: true })
    },
    'service.stopAll': function () {
        SyncedCron.pause()
        Service.update({}, { $set: { status: 0 } }, { multi: true })
    },
    'service.err': function (jobName) {
        Service.update({ name: jobName }, { $set: { status: -1 } })
    },
    'service.init': function () {
        var sn = 0;
        for (var job in jobs) {
            sn++;
            Service.upsert({ sn: sn }, {
                $set: {
                    sn: sn,
                    name: job,
                    schedule: 'every 5 m',
                    status: 0
                }
            })

            Meteor.call('service.start', job)
        }
    }
})




//--------service---init--------
Meteor.call('service.init');