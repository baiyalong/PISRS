
Template.users_admin.onCreated(function () {
    this.subscribe('users.admin')

})

Template.users_admin.onRendered(function () {

})

Template.users_admin.helpers({
    users: function () {
        return Meteor.users.find()
    },
    user: function () {
        return Session.get('users_admin')
    },
    role_name: function (role) {
        var name = ''
        roles.forEach(function (e) {
            if (e.role == role && role[0])
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
        return roles;

    },
    err: function () {
        return Session.get('err')
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