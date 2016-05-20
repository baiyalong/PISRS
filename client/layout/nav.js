Template.nav.onCreated(function () {


})

Template.nav.onRendered(function () {

})

Template.nav.helpers({
    username: function () {
        var user = Meteor.user();
        return user && user.username;
    },
    rolename: function () {
        var user = Meteor.user();
        var role = user && user.roles ? dict.roles().find(function (e) { return e.code == user.roles[0] }) : null;
        return role && role.name;
    }
})

Template.nav.events({
    'click #logout': function () {
        Meteor.logout(function () {
            FlowRouter.go('/')
        })
    }
})