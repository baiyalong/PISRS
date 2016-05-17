Template.config_mobileVersion.onCreated(function () {
    this.subscribe('mobileVersions')
})

Template.config_mobileVersion.onRendered(function () {

    this.autorun(function () {
        if (Template.instance().subscriptionsReady()) {
            setTimeout(editable, 0)
        }
    });
    function editable() {
        var url = function (params) {
            var id = this.parentElement.parentElement.getAttribute('id');
            var name = this.getAttribute('name');
            var type = this.getAttribute('type');
            var value = params.value;
            if (value == '') value = null;
            else if (type == 'number') value = Number(value);
            else if (type == 'text' || type == 'textarea') value = value.trim();
            var update = { _id: id };
            update[name] = value;
            var d = new $.Deferred;
            Meteor.call('mobileVersion.update', update, function (err, res) {
                err ? d.reject(err.message) : d.resolve()
            })
            return d.promise();
        }
        var success = function (response, newValue) {
            setTimeout(reset, 0)
            var self = $(this);
            function reset() {
                self.text(newValue || null)
            }
        }

        $('.editable[type="text"]').editable({
            emptytext: 'null',
            showbuttons: false,
            mode: 'inline',
            validate: function (value) {
                // if ($.trim(value) == '') return '输入不能为空！';
                // if (isNaN(value) || Number(value) < 0) return '输入参数错误！'
            },
            url: url,
            success: success
        })

        $('.editable[type="select"]').editable({
            emptytext: 'null',
            showbuttons: false,
            mode: 'inline',
            url: url,
            success: success,
            type: 'select',
            prepend: "--请选择--",
            source: dict.deviceTypes.map(function (e) {
                return {
                    value: e.code,
                    text: e.name
                }
            })
        })

        $('.editable[type="textarea"]').editable({
            emptytext: 'null',
            showbuttons: false,
            mode: 'inline',
            url: url,
            success: success,
            type: 'textarea',
            rows: 5
        })
    }

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
        return dict.deviceTypes;
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