
Template.users_public.onCreated(function () {
    this.subscribe('users.public')

})

Template.users_public.onRendered(function () {

})

Template.users_public.helpers({
    users: function () {
        return UserPublic.find()
    }
})

Template.users_public.events({

})