Template.login.onCreated(function () {


})

Template.login.onRendered(function () {
    $('html').attr('class', 'login-pf')
    $('body').attr('class', '')
})

Template.login.helpers({
    err: function () {
        return Session.get('err')
    }
})

Template.login.events({
    'click #login': (e, t) => {
        Session.set('err', null)
        e.preventDefault()
        // FlowRouter.go('/dashboard')
        var username = t.$('#username').val()
        var password = t.$('#password').val()
        var verificationCode = t.$('#verificationCode').val()
        var err = null;
        if (username == '') { Session.set('err', '请输入用户名！'); return; }
        if (password == '') { Session.set('err', '请输入密码！'); return; }
        if (verificationCode == '') { Session.set('err', '验证码错误！'); return; }
        Meteor.loginWithPassword(username, password, (err, res) => {
            if (err) {
                if (err.message == 'User not found [403]')
                    Session.set('err', '用户名不存在！')
                else if (err.message == 'Incorrect password [403]')
                    Session.set('err', '密码错误！')
                else
                    Session.set('err', err.message)
            }
            else {
                Session.set('err', null)
                Meteor.logoutOtherClients((err) => {
                    FlowRouter.go('/dashboard')
                })
            }
        })
    }
})