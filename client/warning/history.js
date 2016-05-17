Template.warning_history.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Meteor.call('warning_pageCount', limitPerPage, function (err, res) {
        if (err) console.log(err);
        else Session.set('pageCount', res);
    })

    var self = this;
    self.autorun(function () {
        self.subscribe('warning', Session.get('pageNum'), Session.get('limitPerPage'))
    })
})

Template.warning_history.onRendered(function () {


})

Template.warning_history.helpers({
    dataList: function () {
        return Warning.find({}, { sort: { timestamp: -1 } })
    },
    channelNames: function (arr) {
        return dict.channels.filter(function (e) { return arr.indexOf(e.code) != -1; }).map(function (e) { return e.name; })
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
})

Template.warning_history.events({
    'click .warning_remove': function () {
        Session.set('confirm', {
            title: '预警信息 - 历史记录',
            level: 'warning',
            content: '确认要删除吗？',
            _id: this._id
        })
        $('#modal_confirm').modal('show')

    },
    'click #confirm': function () {
        Meteor.call('warning.remove', this._id)
        $('#modal_confirm').modal('hide')
    },
})