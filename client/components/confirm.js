Template.confirm.onCreated(function () {

})

Template.confirm.onRendered(function () {
    $('#modal_confirm').modal('hide')

})

Template.confirm.helpers({
'confirm': function () {
        return Session.get('confirm')
    }
})

Template.confirm.events({

})