

Share.attachSchema(new SimpleSchema({
    date: {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    },
    template: {
        type: String,
        optional: true
    },
    content: {
        type: String,
        optional: true
    },
    status: {
        type: Boolean
    },
    error: {
        type: String,
        optional: true
    }
}));


Meteor.publish('share', function (pageNum, limitPerPage, conditions = {}) {
    return Share.find(conditions, {
        sort: { date: -1 },
        skip: (pageNum - 1) * limitPerPage,
        limit: limitPerPage
    });
})


Meteor.methods({
    'share_pageCount': function (limitPerPage, conditions = {}) {
        return Math.ceil(Share.find(conditions).count() / limitPerPage)
    },
    'share.preview': function (template) {
        var content = template;
        var varList = Meteor.call('varList');
        varList.forEach(function (e) {
            content = content.replace(e.name, e.value)
        })
        return content;
    },
    'share.publish': function (template) {
        var content = Meteor.call('share.preview', template)
        return Share.insert({
            template: template,
            content: content,
            status: true,
        })
    },
    'share.template': function () {
        var share = Share.findOne({}, { sort: { date: -1 } })
        return share ? share.template:'';
    },
    'varList': function () {
        function aqiDaily(cityCode) {

            var dateFrom = new Date();
            dateFrom.setHours(0);
            dateFrom.setMinutes(0);
            dateFrom.setSeconds(0);
            dateFrom.setDate(dateFrom.getDate() - 1);
            dateFrom.setSeconds(dateFrom.getSeconds() - 1);
            var dateTo = new Date(dateFrom);
            dateTo.setDate(dateTo.getDate() + 1);

            var data = PollutantCityDaily.findOne({ CITYCODE: cityCode.toString(), MONITORTIME: { $gt: dateFrom, $lt: dateTo } }, { sort: { MONITORTIME: -1 } })
            return data && data.AQI ? data.AQI : null;
        }
        return [
            {
                code: '0',
                name: '&&todayforecast',
                description: '今天的全区空气质量预报信息',
                value: (function () {
                    var data = AirQualityForecast.findOne({
                        publishtime: {
                            $gt: moment((function () {
                                var d = new Date();
                                d.setHours(0);
                                d.setMinutes(0);
                                d.setSeconds(0);
                                return d;
                            })()).format('YYYYMMDDHH')
                        }
                    }, { sort: { publishtime: -1 } })
                    return data ? data.publishcontent || '' : '';
                })()
            },
            {
                code: '1',
                name: '&&hhhtaqi',
                description: '昨天的呼和浩特市AQI日报数据',
                value: aqiDaily(150100)
            },
            {
                code: '2',
                name: '&&btaqi',
                description: '昨天的包头市AQI日报数据',
                value: aqiDaily(150200)
            },
            {
                code: '3',
                name: '&&whaqi',
                description: '昨天的乌海市AQI日报数据',
                value: aqiDaily(150300)
            },
            {
                code: '4',
                name: '&&cfaqi',
                description: '昨天的赤峰市AQI日报数据',
                value: aqiDaily(150400)
            },
            {
                code: '5',
                name: '&&tlaqi',
                description: '昨天的通辽市AQI日报数据',
                value: aqiDaily(150500)
            },
            {
                code: '6',
                name: '&&eedsaqi',
                description: '昨天的鄂尔多斯市AQI日报数据',
                value: aqiDaily(150600)
            },
            {
                code: '7',
                name: '&&hlbeaqi',
                description: '昨天的呼伦贝尔市AQI日报数据',
                value: aqiDaily(150700)
            },
            {
                code: '8',
                name: '&&byzeaqi',
                description: '昨天的巴彦淖尔市AQI日报数据',
                value: aqiDaily(150800)
            },
            {
                code: '9',
                name: '&&wlcbaqi',
                description: '昨天的乌兰察布市AQI日报数据',
                value: aqiDaily(150900)
            },
            {
                code: '10',
                name: '&&xamaqi',
                description: '昨天的兴安盟AQI日报数据',
                value: aqiDaily(152200)
            },
            {
                code: '11',
                name: '&&xlglmaqi',
                description: '昨天的锡林郭勒盟AQI日报数据',
                value: aqiDaily(152500)
            },
            {
                code: '12',
                name: '&&alsmmaqi',
                description: '昨天的阿拉善盟AQI日报数据',
                value: aqiDaily(152900)
            },
        ]
    },
});
