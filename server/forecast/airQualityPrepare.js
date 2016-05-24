
AirQualityPrepare.attachSchema(new SimpleSchema({
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
    statusCode: {
        type: Number
    },
    statusName: {
        type: String
    },
    applyUserName: {
        type: String
    },
    applyTimestamp: {
        type: Date
    },
    applyContent: {
        type: Object
    },
    "applyContent.detail": {
        type: [Object]
    },
    "applyContent.detail.$": {
        type: Object
    },
    "applyContent.detail.$.date": {
        type: Date
    },
    "applyContent.detail.$.primaryPollutant": {
        type: String
    },
    "applyContent.detail.$.airIndexLevel": {
        type: String
    },
    "applyContent.detail.$.airQualityIndex": {
        type: String,
        optional: true
    },
    "applyContent.description": {
        type: String,
        optional: true
    },
    auditUserName: {
        type: String,
        optional: true
    },
    auditTimestamp: {
        type: Date,
        optional: true
    },
    auditOpinion: {
        type: String,
        optional: true
    }
}));

AirQualityPrepare.allow({
    insert: function () {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
}
)

Meteor.publish('airQualityPrepare', function (pageNum, limitPerPage, conditions = {}) {
    return AirQualityPrepare.find(conditions, {
        sort: { date: -1, cityCode: 1 },
        skip: (pageNum - 1) * limitPerPage,
        limit: limitPerPage
    });
})

Meteor.methods({
    'airQualityPrepare_pageCount': function (limitPerPage, conditions = {}) {
        return Math.ceil(AirQualityPrepare.find(conditions).count() / limitPerPage)
    },
    'airQualityPrepare.insert': function (item) {
        return AirQualityPrepare.insert(item);
    },
    'airQualityPrepare.update': function (_id, item) {
        return AirQualityPrepare.update(_id, { $set: item });
    },
    'airQualityPrepare.current': function (conditions) {
        return AirQualityPrepare.findOne(conditions)
    },
    'airQualityPrepare.currentArr': function (conditions) {
        return AirQualityPrepare.find(conditions)
    },
    'airQualityPrepare.remove': function (_id) {
        return AirQualityPrepare.remove(_id)
    },
    'airQualityPrepare.apply': function (data) {
        AirQuality.upsert({
            areaCode: data.areaCode, date: {
                $gte: (function () {
                    var d = new Date(data.date);
                    d.setSeconds(d.getSeconds() - 1);
                    return d;
                })(), $lte: (function () {
                    var d = new Date(data.date);
                    d.setSeconds(d.getSeconds() + 1);
                    return d;
                })()
            }
        }, { $set: data })
    },
    'airQualityPrepare.audit': function (id, update) {
        update.auditUserName = Meteor.user().username;
        update.auditTimestamp = new Date();
        return AirQualityPrepare.update(id, { $set: update })
        // if (update.statusCode == 1) {
        //     function ds(date){
        //         var d1 = new Date(date);
        //         d1.setSeconds(d1.getSeconds() - 1);
        //         var d2 = new Date(date);
        //         d2.setSeconds(d2.getSeconds() + 1);
        //         return { d1: d1, d2: d2 }
        //     }
        //     var audit = AirQuality.findOne({ _id: id })

        //     DataAirQuality.remove({ areaCode: audit.areaCode, date: { $gt: new Date() } })

        //     audit.applyContent.detail.forEach(function(e){
        //         var date = ds(e.date);
        //         DataAirQuality.upsert({ areaCode: audit.areaCode, date: { $gt: date.d1, $lt: date.d2 } },
        //             { $set: { 
        //                 date: e.date, 
        //                 areaCode: audit.areaCode, 
        //                 primaryPollutant: e.primaryPollutant,
        //                 airIndexLevel:e.airIndexLevel,
        //                 airQualityIndex:e.airQualityIndex,
        //                 visibility:e.visibility
        //                 } })
        //     })

        //     var date = ds(audit.date)
        //     DataAirQuality.upsert({ areaCode: audit.areaCode, date: { $gt: date.d1, $lt: date.d2 } },
        //         { $set: { 
        //             date: audit.date, 
        //             areaCode: audit.areaCode, 
        //             description: audit.applyContent.description 
        //         } })
        // 
        // }
    },
    'airQualityPrepare.release': function () {
        //点击发布按钮，DataAirQuality清空，通过审核的AirQuality更新到DataAirQuality
        //前台接口部分展示DataAirQuality所有数据

        AirQualityRelease.remove({});
        AirQualityPrepare.find({
            statusCode: { $gte: 1 }, date: {
                $gt: (function () {
                    var d = new Date();
                    d.setDate(d.getDate() - 1);
                    return d;
                })()
            }
        }).forEach(function (audit) {

            AirQualityPrepare.update({ _id: audit._id }, {
                $set: {
                    statusCode: 2,
                    statusName: '已发布'
                }
            })

            audit.applyContent.detail.forEach(function (e) {
                AirQualityRelease.insert({
                    date: e.date,
                    cityCode: audit.cityCode,
                    cityName: audit.cityName,
                    countyCode: audit.countyCode,
                    countyName: audit.countyName,
                    primaryPollutant: e.primaryPollutant,
                    airIndexLevel: e.airIndexLevel,
                    airQualityIndex: e.airQualityIndex,
                })
            })

            AirQualityRelease.insert({
                date: audit.date,
                cityCode: audit.cityCode,
                cityName: audit.cityName,
                countyCode: audit.countyCode,
                countyName: audit.countyName,
                description: audit.applyContent.description || ''
            })

        })
    }
})