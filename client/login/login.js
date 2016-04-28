Template.login.onCreated(() => {


})

Template.login.onRendered(() => {
    $('html').attr('class','login-pf')
    $('body').attr('class','')
})

Template.login.helpers({
    err: function () {
        return Session.get('err')
    }
})

Template.login.events({
    'click #login': (e, t) => {
        e.preventDefault()
        FlowRouter.go('/dashboard')
        // var username = t.$('#username').val()
        // var password = t.$('#password').val()
        // Meteor.loginWithPassword(username, password, (err, res) => {
        //     if (err) {
        //         Session.set('err', err.message)
        //         console.log(err)
        //     }
        //     else {
        //         Session.set('err', null)
        //         Meteor.logoutOtherClients((err) => {
        //             if (err) console.log(err)
        //             else FlowRouter.go('/dashboard')
        //         })
        //     }
        // })
    }
})