Meteor.publish('users.admin', function () {
    return Meteor.users.find();
})



Meteor.methods({
    'users.admin.insert': function (user) {
        var _id = Accounts.createUser({ 
            username: user.username, 
            password: user.password, 
            profile: { description: user.description } })
        Roles.addUsersToRoles(_id, user.role)
    },
    'users.admin.update': function (_id, user) {

    },
    'users.admin.remove': function (_id) {
        Meteor.users.remove(_id)
    },
})