Template.config_mobileVersion.onCreated(function () {
    this.subscribe('mobileVersions')
})

Template.config_mobileVersion.onRendered(function () {


})

Template.config_mobileVersion.helpers({
    versions: function () {
        return MobileVersion.find();
    },
    mobileVersion: function () {
        return Session.get('mobileVersion');
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    deviceType_options: function () {
        return deviceTypes;
    },
    err: function () {
        return Session.get('err');
    }
})

Template.config_mobileVersion.events({
    'click .mobileVersion_plus,.mobileVersion_edit': function () {
        Session.set('mobileVersion', this)
        Session.set('err', null)
        $("input:radio[name='deviceType']").attr("checked", false);
        if (!this._id) {
            $('#version').val('')
            $('#conf').val('')
            $('#description').val('')
        } else {
            var deviceType = '#' + this.deviceType;
            $(deviceType).attr("checked", "checked");
        }
        $('#modal_mobileVersion').modal('show')
    },
    'click .mobileVersion_remove': function () {
        Session.set('confirm', {
            title: '配置管理 - 移动客户端版本管理',
            level: 'warning',
            content: '确认要删除吗？',
            _id: this._id
        })
        $('#modal_confirm').modal('show')
    },
    'click #confirm': function () {
        Meteor.call('mobileVersion.remove', this._id)
        $('#modal_confirm').modal('hide')
    },
    'click #modal_mobileVersion_save': function () {
        var version = {
            _id: this._id,
            deviceType: $('input:radio[name="deviceType"]:checked').val(),
            version: $('#version').val().trim(),
            conf: $('#conf').val().trim(),
            description: $('#description').val().trim()
        }
        //TODO verify........

        var method = version._id ? 'mobileVersion.update' : 'mobileVersion.insert';
        Meteor.call(method, version, function (err, res) {
            if (err) Session.set('err', err)
            else $('#modal_mobileVersion').modal('hide')
        })
    }
})