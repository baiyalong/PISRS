Template.feedback.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Meteor.call('feedback_pageCount', limitPerPage, function (err, res) {
        if (err) console.log(err);
        else Session.set('pageCount', res);
    })

    var self = this;
    self.autorun(function () {
        self.subscribe('feedback', Session.get('pageNum'), Session.get('limitPerPage'))
    })
})

Template.feedback.onRendered(function () {


})

Template.feedback.helpers({
    dataList: function () {
        return Feedback.find({}, { sort: { timestamp: -1 } })
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
})

Template.feedback.events({
    'click .feedback_remove': function () {
        Session.set('confirm', {
            title: '用户反馈',
            level: 'warning',
            content: '确认要删除吗？',
            _id: this._id
        })
        $('#modal_confirm').modal('show')

    },
    'click #confirm': function () {
        Meteor.call('feedback.remove', this._id)
        $('#modal_confirm').modal('hide')
    },
})