Template.share.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Session.set('publish', true)
    var self = this;
    self.autorun(function () {
        self.subscribe('share', Session.get('pageNum'), Session.get('limitPerPage'))
        if (Session.get('publish')) {
            Meteor.call('share_pageCount', limitPerPage, function (err, res) {
                if (err) console.log(err);
                else Session.set('pageCount', res);
            })
            Meteor.call('varList', function (err, res) {
                if (err) console.log(err)
                else Session.set('varList', res)
            })
            Meteor.call('share.template', function (err,res) {
                if (err) console.log(err)
                else Session.set('current_template', res)
            })
            Session.set('publish', false)
        }
    })
})

Template.share.onRendered(function () {


})

Template.share.helpers({
    varList: function () {
        return Session.get('varList')
    },
    recordList: function () {
        return Share.find()
    },
    date_helper: function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    status_helper: function (status) {
        return status ? '成功' : '失败'
    },
    current_template: function () {
        return Session.get('current_template')
    },
    current_content: function () {
        return Session.get('current_content')
    }
})

Template.share.events({
    'click #preview': function (e, t) {
        e.preventDefault();
        Meteor.call('share.preview', t.$('#template').val().trim(), function (err, res) {
            if (err) console.log(err)
            else {
                Session.set('current_content', res)
                t.$('#modal_content').modal();
            }
        })
    },
    'click #publish': function (e, t) {
        e.preventDefault();
        Meteor.call('share.publish', t.$('#template').val().trim(), function (err, res) {
            if (err) console.log(err)
            else Session.set('publish', true)
        })
    },
})