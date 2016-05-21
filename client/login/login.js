Template.login.onCreated(function () {
    Session.set('captchaURL', "/api/captcha/" + Meteor.connection._lastSessionId + '?rand=')

})

Template.login.onRendered(function () {
    $('html').attr('class', 'login-pf')
    $('body').attr('class', '')
    // $("#img").attr("src", Session.get('captchaURL') + Math.random());
})

Template.login.helpers({
    err: function () {
        return Session.get('err')
    },
    captchaURL: function () {
        return Session.get('captchaURL') + Math.random()
    }
})

Template.login.events({
    'click #img': function (e, t) {
        t.$("#img").attr("src", Session.get('captchaURL') + Math.random());
    },
    'click #login': (e, t) => {
        Session.set('err', null)
        e.preventDefault()
        // FlowRouter.go('/dashboard')
        var username = t.$('#username').val()
        var password = t.$('#password').val()
        var captcha = t.$('#captcha').val()
        var err = null;
        if (username == '') { Session.set('err', '请输入用户名！'); return; }
        if (password == '') { Session.set('err', '请输入密码！'); return; }
        // if (captcha == '') { Session.set('err', '请输入验证码！'); return; }

        Meteor.call('checkCaptcha', captcha, function (err, res) {
            if (err) Session.set('err', '验证码校验失败！')
            else if (!res) Session.set('err', '验证码错误！')
            else if (res) login()
        })

        function login() {
            Meteor.loginWithPassword(username, password, (err, res) => {
                if (err) {
                    if (err.message == 'User not found [403]') Session.set('err', '用户名不存在！')
                    else if (err.message == 'Incorrect password [403]') Session.set('err', '密码错误！')
                    else Session.set('err', err.message)
                }
                else {
                    Session.set('err', null)
                    Meteor.logoutOtherClients((err) => {
                        FlowRouter.go('/dashboard')
                    })
                }
            })
        }

    }
})