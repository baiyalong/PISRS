Template.forecast_airQualityApply.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Session.set('cityCode', 150100)
    Session.set('showLine', 1)

    var self = this;
    self.autorun(function () {
        Session.set('conditions', {
            cityCode: Number(Session.get('cityCode')),
            date: {
                $lt: (function () {
                    var d = new Date();
                    d.setDate(d.getDate() - 1);
                    return d;
                })()
            }
        })
        self.subscribe('airQualityPrepare', pageNum, limitPerPage, {
            cityCode: Number(Session.get('cityCode')),
            date: {
                $gt: (function () {
                    var d = new Date();
                    d.setDate(d.getDate() - 1);
                    return d;
                })()
            }
        })
        self.subscribe('airQualityPrepare', Session.get('pageNum'), Session.get('limitPerPage'), Session.get('conditions'))
        Meteor.call('airQualityPrepare_pageCount', Session.get('limitPerPage'), Session.get('conditions'), function (err, res) {
            if (err) console.log(err);
            else Session.set('pageCount', res);
        })
        Meteor.call('getMainCountyCode', Session.get('cityCode'), function (err, res) {
            if (err) console.log(err);
            else Session.set('county_option', res)
        })
    })
})

Template.forecast_airQualityApply.onRendered(function () {
    this.autorun(function () {

        var user = Meteor.user();
        var role = user && user.roles ? user.roles[0] : null;
        var cityCode = 150100;
        var role_is_applyer = false;
        if (role && role != 'admin' && role != 'audit') {
            cityCode = Number(role);
            role_is_applyer = true;
        }
        $('#city').val(cityCode)
        Session.set('cityCode', cityCode);
        Session.set('role_is_applyer', role_is_applyer)


        if (Template.instance().subscriptionsReady()) {
            setTimeout(showLine, 0);
        }
    });
    function showLine() {
        var item = AirQualityPrepare.findOne({
            cityCode: Number(Session.get('cityCode')),
            date: {
                $gt: (function () {
                    var d = new Date();
                    d.setDate(d.getDate() - 1);
                    return d;
                })()
            }
        });
        Session.set('showLine', item ? item.applyContent.detail.length : 1);
    }
})

Template.forecast_airQualityApply.helpers({
    role_is_applyer: function () {
        return Session.get('role_is_applyer') || false;
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD')
    },
    today: function (date) {
        return moment(new Date()).format('YYYY-MM-DD');
    },
    currentStatus: function () {
        var applied = currentItem();
        var res = '草稿'
        if (applied) {
            res = applied.statusName;
        }
        return res;
    },
    statusColor: function (statusCode) {
        if (statusCode)
            return statusCode >= 1 ? 'green' : statusCode == -1 ? 'red' : '';
        var applied = currentItem();
        if (applied) {
            var statusCode = applied.statusCode;
            return statusCode >= 1 ? 'green' : statusCode == -1 ? 'red' : '';
        }
    },
    city_options: function () {
        return dict.cities().slice(1);
    },
    county_option: function () {
        return Session.get('county_option')
    },
    primaryPollutant_options: function (name) {
        return [
            { code: 0, name: '--请选择--' },
            { code: -1, name: '-' },
            { code: 1, name: 'SO₂' },
            { code: 2, name: 'NO₂' },
            { code: 3, name: 'O₃' },
            { code: 4, name: 'CO' },
            { code: 5, name: 'PM10' },
            { code: 6, name: 'PM2.5' },
        ].map(function (e) {
            if (e.name == name)
                e.selected = 'selected'
            return e;
        })
    },
    airIndexLevel_options: function (name) {
        return [
            { code: 0, name: '--请选择--' },
            { code: 1, name: '优' },
            { code: 2, name: '优-良' },
            { code: 3, name: '良' },
            { code: 4, name: '良-轻度污染' },
            { code: 5, name: '轻度污染' },
            { code: 6, name: '轻度-中度污染' },
            { code: 7, name: '中度污染' },
            { code: 8, name: '中度-重度污染' },
            { code: 9, name: '重度污染' },
            { code: 10, name: '重度-严重污染' },
            { code: 11, name: '严重污染' }
        ].map(function (e) {
            if (e.name == name)
                e.selected = 'selected'
            return e;
        })
    },
    forecastList: function () {
        var applied = currentItem();
        var line = Session.get('showLine');
        var day = function (n) {
            var date = new Date();
            date.setDate(date.getDate() + n);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            return date;
        }
        var arrLine = function (n) {
            var res = {
                date: day(n),
                dateString: moment(day(n)).format('YYYY-MM-DD'),
                showDetele: (function () {
                    if (n == 1) return false;
                    else if (n == 2) {
                        if (line == 2) return true;
                        else return false;
                    }
                    else if (n == 3) return true;
                })()
            }
            var data = null;
            if (applied) {
                data = applied.applyContent.detail[n - 1]
            } else {
                var date = new Date();
                date.setDate(date.getDate() + n);
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                var d1 = new Date(date);
                d1.setSeconds(d1.getSeconds() - 1);
                var d2 = new Date(date);
                d2.setSeconds(d2.getSeconds() + 1);
                // data = DataAirQuality.findOne({ areaCode: areaCode, date: { $gte: d1, $lte: d2 }, description: { $exists: false } })
            }
            if (data) {
                res.primaryPollutant = data.primaryPollutant;
                res.airIndexLevel = data.airIndexLevel;
                res.airQualityIndex = data.airQualityIndex;
            }
            return res;
        }
        var res = [];
        for (var i = 1; i <= 3; i++)
            res.push(arrLine(i))
        return res.slice(0, line)
    },
    description: function () {
        var applied = currentItem();
        return applied ? applied.applyContent.description : '';
    },
    err: function () {
        return Session.get('err')
    },
    airQualityPrepareList: function () {
        return AirQualityPrepare.find({
            cityCode: Number(Session.get('cityCode')),
            date: {
                $lt: (function () {
                    var d = new Date();
                    d.setDate(d.getDate() - 1);
                    return d;
                })()
            }
        }, { sort: { date: -1 } })
    },
    airQualityModel: function () {
        return Session.get('airQualityModel')
    },
    auditOpinion: function () {
        var applied = currentItem();
        if (applied) return {
            opinion: applied.auditOpinion,
            username: applied.auditUserName,
            timestamp: moment(applied.applyTimestamp).format('YYYY-MM-DD HH:mm:ss')
        }
    },
})

Template.forecast_airQualityApply.events({
    'change #city': function (e, t) {
        var cityCode = e.target.value;
        Session.set('err', null);
        Session.set('cityCode', Number(cityCode));
        Meteor.call('getMainCountyCode', Number(cityCode), function (err, res) {
            if (err) console.log(err);
            else Session.set('county_option', res);
        })
    },
    'click .detail': function (e, t) {
        Session.set('airQualityModel', this)
        t.$('#airQualityDetailModal').modal()
    },
    'change .airQualityIndex': function (e, t) {
        Session.set('err', null)
        var aqi = e.target.value;
        if (!/\d-\d/.test(aqi)) return;
        var arr = aqi.split('-');
        var min = parseInt(arr[0]), max = parseInt(arr[1]);
        if (!(min <= max && min >= 0)) return;

        var rule = [0, 50, 100, 150, 200, 300, 9999]
        var res = 0;
        function inRange(val, min, max) {
            return val > min && val <= max;
        }
        if (inRange(max, rule[0], rule[1])) res = 1;
        else if (inRange(min, rule[0], rule[1]) && inRange(max, rule[1], rule[2])) res = 2;
        else if (inRange(min, rule[1], rule[2]) && inRange(max, rule[1], rule[2])) res = 3;
        else if (inRange(min, rule[1], rule[2]) && inRange(max, rule[2], rule[3])) res = 4;
        else if (inRange(min, rule[2], rule[3]) && inRange(max, rule[2], rule[3])) res = 5;
        else if (inRange(min, rule[2], rule[3]) && inRange(max, rule[3], rule[4])) res = 6;
        else if (inRange(min, rule[3], rule[4]) && inRange(max, rule[3], rule[4])) res = 7;
        else if (inRange(min, rule[3], rule[4]) && inRange(max, rule[4], rule[5])) res = 8;
        else if (inRange(min, rule[4], rule[5]) && inRange(max, rule[4], rule[5])) res = 9;
        else if (inRange(min, rule[4], rule[5]) && inRange(max, rule[5], rule[6])) res = 10;
        else if (inRange(min, rule[5], rule[6])) res = 11;
        else { Session.set('err', '数值范围过大！'); return; }

        // t.$(this).find('select.airIndexLevel').val(res);
        var text = [{ code: 0, name: '--请选择--' },
            { code: 1, name: '优' },
            { code: 2, name: '优-良' },
            { code: 3, name: '良' },
            { code: 4, name: '良-轻度污染' },
            { code: 5, name: '轻度污染' },
            { code: 6, name: '轻度-中度污染' },
            { code: 7, name: '中度污染' },
            { code: 8, name: '中度-重度污染' },
            { code: 9, name: '重度污染' },
            { code: 10, name: '重度-严重污染' },
            { code: 11, name: '严重污染' }];

        $(e.target.parentNode.parentNode).find('select.airIndexLevel')
            .val(text.filter(function (e) { return e.code == res })[0].name)

        if (res == 1)
            $(e.target.parentNode.parentNode).find('select.primaryPollutant').val('-')

    },
    'click .add': function () {
        var line = Session.get('showLine');
        if (line == 1 || line == 2) Session.set('showLine', line + 1);
        else if (line == 3);
    },
    'click .delete': function () {
        var line = Session.get('showLine');
        if (line == 1);
        else if (line == 2 || line == 3) Session.set('showLine', line - 1);
    },
    'click .save': function (e, t) {
        // var content = $('textarea').val();
        // // if (content.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        // //     Util.modal('空气质量预报发布', '发布内容为空！')
        // //     return;
        // // }
        Session.set('err', null)
        var err = false;
        var airQualityPrepare = {
            date: (function () { var date = new Date(); date.setHours(0); date.setMinutes(0); date.setSeconds(0); return date; })(),
            cityCode: Number(t.$('#city').find('option:selected').val()),
            cityName: t.$('#city').find('option:selected').text(),
            countyCode: Number(t.$('#county').find('option:selected').val()),
            countyName: t.$('#county').find('option:selected').text(),
            statusCode: 0,
            statusName: '已提交',
            applyUserName: Meteor.user().username,
            applyTimestamp: new Date(),
            applyContent: {
                detail: (function () {
                    var res = []
                    t.$('table.forecastDetail tbody tr').each(function () {
                        var line = {
                            date: t.$(this).attr('date'),
                            primaryPollutant: t.$(this).find('select.primaryPollutant').val(),
                            airIndexLevel: t.$(this).find('select.airIndexLevel').val(),
                            airQualityIndex: t.$(this).find('input.airQualityIndex').val().trim(),
                        }
                        if (line.primaryPollutant == '--请选择--' ||
                            line.airIndexLevel == '--请选择--' ||
                            line.airQualityIndex == '')
                            err = true;
                        res.push(line)
                    })
                    return res;
                })(),
                description: t.$('textarea').val().trim() || ''
            }
        }
        var current = currentItem();
        if (err) Session.set('err', '输入参数错误！')
        else if (!current) {
            Meteor.call('airQualityPrepare.insert', airQualityPrepare, function (err, res) {
                if (err) Session.set('err', err.message)
            })
        }
        else if (current && current._id) {
            Meteor.call('airQualityPrepare.update', current._id, airQualityPrepare, function (err, res) {
                if (err) Session.set('err', err.message)
            })
        }
    },
    // 'click .cancel': function () {
    //     // $('textarea').val('')
    //     // Session.set('_id', '')
    //     // $('#date').val(moment(new Date()).format('YYYY-MM-DD'));
    //     // var city = parseInt($('#city').val())
    //     // var county = parseInt($('#county').val())
    //     // if (!isNaN(city) && !isNaN(county)) {
    //     //     var select = false;
    //     //     $('#county option').each(function () {
    //     //         var county = parseInt($(this).attr('value'))
    //     //         if (county > city && county < (city + 100)) {
    //     //             $(this).show()
    //     //             if (!select) {
    //     //                 select = true;
    //     //                 $('#county').val(county)
    //     //             }
    //     //         } else {
    //     //             $(this).hide()
    //     //         }
    //     //     })
    //     // }
    // },
})



//-----------------------------------
var currentItem = function () {
    return AirQualityPrepare.findOne({
        cityCode: Number(Session.get('cityCode')),
        date: {
            $gt: (function () {
                var d = new Date();
                d.setDate(d.getDate() - 1);
                return d;
            })()
        }
    });
}

var currentLines = function () {
    var item = currentItem();
    return item ? item.applyContent.detail.length : 1;
}