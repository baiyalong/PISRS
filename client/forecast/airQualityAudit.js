Template.forecast_airQualityAudit.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Session.set('conditions', {
        date: {
            $lt: (function () {
                var d = new Date();
                d.setDate(d.getDate() - 1);
                return d;
            })()
        }
    })
    var self = this;
    self.autorun(function () {
        self.subscribe('airQualityPrepare', pageNum, limitPerPage, {
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
    })
    self.subscribe('airQualityRelease')
})

Template.forecast_airQualityAudit.onRendered(function () {


})

Template.forecast_airQualityAudit.helpers({

    airQualityModel: function () {
        return Session.get('airQualityModel')
    },
    title: function () {
        return Session.get('title')
    },
    err: function () {
        return Session.get('err')
    },
    notAudit: function (statusCode) {
        return statusCode == 0;
    },
    statusColor: function (statusCode) {
        return statusCode = 1 ? 'green' : statusCode == -1 ? 'red' : '';
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD')
    },
    momentShort: function (date) {
        return moment(date).format('MM-DD')
    },
    airQualityReleaseList: function () {
        return AirQualityRelease.find({}, { sort: { cityCode: 1, date: 1 } })
    },
    airQualityList: function () {
        return AirQualityPrepare.find({
            date: {
                $gt: (function () {
                    var d = new Date();
                    d.setDate(d.getDate() - 1);
                    return d;
                })()
            }
        }, { sort: { date: -1 } })
    },
    airQualityListHistory: function () {
        return AirQualityPrepare.find({
            date: {
                $lt: (function () {
                    var d = new Date();
                    d.setDate(d.getDate() - 1);
                    return d;
                })()
            }
        }, { sort: { date: -1 } })
    },
})

Template.forecast_airQualityAudit.events({
    'click .pubBtn': function (e, t) {
        Meteor.call('airQualityPrepare.release', function (err, res) {
            if (err) console.log('空气质量预报审核', err);
        })
    },
    'click .detail': function (e, t) {
        Session.set('airQualityModel', this)
        t.$('#airQualityDetailModal').modal()
    },
    'click .audit': function (e, t) {
        var update = Session.get('auditStatus');
        update.auditOpinion = t.$('textarea').val().trim()
        Meteor.call('airQualityPrepare.audit', Session.get('auditID'), update, function (err, res) {
            if (err) console.log('空气质量预报审核', err);
            t.$('#auditOpinion').modal('hide');
        })
    },
    'click .pass': function (e, t) {
        t.$('textarea').val('')
        Session.set('err', null);
        Session.set('title', '审核通过')
        Session.set('auditID', this._id)
        Session.set('auditStatus', { statusCode: 1, statusName: '审核通过' })
        t.$('#auditOpinion').modal();
    },
    'click .back': function (e, t) {
        t.$('textarea').val('')
        Session.set('err', null);
        Session.set('title', '退回修改')
        Session.set('auditID', this._id)
        Session.set('auditStatus', { statusCode: -1, statusName: '退回修改' })
        t.$('#auditOpinion').modal();
    },
    'click .remove': function () {
        Session.set('confirm', {
            title: '空气质量预报审核',
            level: 'warning',
            content: '确认要删除吗？',
            _id: this._id
        })
        $('#modal_confirm').modal('show')
    },
    'click #confirm': function () {
        Meteor.call('airQualityPrepare.remove', this._id, function (err, res) {
            if (err) console.log('空气质量预报审核', err);
        })
        $('#modal_confirm').modal('hide')
    },
})