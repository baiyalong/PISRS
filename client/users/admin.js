
Template.users_admin.onCreated(function () {
    this.subscribe('users.admin')

})

Template.users_admin.onRendered(function () {

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
            Meteor.call('users.admin.update', update, function (err, res) {
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

        $('.editable[type="password"]').editable({
            tpl: '<input type="password">',
            emptytext: 'null',
            showbuttons: false,
            mode: 'inline',
            url: url,
            success: function (response, newValue) {
                setTimeout(reset, 0)
                var self = $(this);
                function reset() {
                    self.text('********')
                }
            }
        })

        $('.editable[type="select"]').editable({
            emptytext: 'null',
            showbuttons: false,
            mode: 'inline',
            url: url,
            success: success,
            type: 'select',
            prepend: "--请选择--",
            source: dict.roles.map(function (e) {
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

Template.users_admin.helpers({
    users: function () {
        return Meteor.users.find({}, { sort: { createdAt: -1 } })
    },
    user: function () {
        return Session.get('users_admin')
    },
    role_name: function (role) {
        var name = ''
        dict.roles.forEach(function (e) {
            if (e.code == role && role[0])
                name = e.name;
        })
        return name;
    },
    role_options: function () {
        // var user = Session.get('users_admin');
        // return roles.map(function (e) {
        //     if (e.role == user.roles[0])
        //         e.selected = 'selected';
        //     return e;
        // });
        return dict.roles;

    },
    err: function () {
        return Session.get('err');
    }
})

Template.users_admin.events({
    'click .users_admin_plus,.users_admin_edit': function () {
        Session.set('users_admin', this)
        Session.set('err', null)
        if (!this._id) {
            $('#username').val('')
            $('#password').val('')
            $('#role').val('superAdmin')
            $('#description').val('')
        } else {
            $('#role').val(this.roles[0])
        }
        $('#modal_users_admin').modal('show')
    },
    'click .users_admin_remove': function () {
        Session.set('confirm', {
            title: '用户管理 - 管理员',
            level: 'warning',
            content: '确认要删除吗？',
            _id: this._id
        })
        $('#modal_confirm').modal('show')
    },
    'click #confirm': function () {
        Meteor.call('users.admin.remove', this._id)
        $('#modal_confirm').modal('hide')
    },
    'click #modal_users_admin_save': function () {
        var user = {
            _id: this._id,
            username: $('#username').val().trim(),
            password: $('#password').val(),
            role: $('#role').val(),
            description: $('#description').val().trim()
        }
        //TODO verify........

        var method = user._id ? 'users.admin.update' : 'users.admin.insert';
        Meteor.call(method, user, function (err, res) {
            if (err) Session.set('err', err)
            else $('#modal_users_admin').modal('hide')
        })
    }
})