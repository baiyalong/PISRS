Meteor.publish('users.public', function () {

    return UserPublic.find();
})