Meteor.publish('users.admin', function () {
    return Meteor.users.find();
})



Meteor.methods({
    'users.admin.insert': function (user) {
        var _id = Accounts.createUser({
            username: user.username,
            password: user.password,
            profile: { description: user.description }
        })
        Roles.addUsersToRoles(_id, user.role)
    },
    'users.admin.update': function (user) {
        var uu = Meteor.users.findOne(user._id);
        if (user.username && uu.username != user.username) Accounts.setUsername(user._id, user.username);
        if (user.password) Accounts.setPassword(user._id, user.password);
        if (user.role && uu.roles[0] != user.role) Roles.setUserRoles(user._id, user.role);
        if (user.description && uu.profile.description != user.description) Meteor.users.update(user._id, {
            $set: { 'profile.description': user.description }
        })

    },
    'users.admin.remove': function (_id) {
        Meteor.users.remove(_id)
    },
})