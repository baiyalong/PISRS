Template.alert.onCreated(function () {

})

Template.alert.onRendered(function () {
    $('#modal_alert').modal('hide')

})

Template.alert.helpers({
    'alert': function () {
        return Session.get('alert')
    }
})

Template.alert.events({

})