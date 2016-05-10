Template.service.onCreated(function () {
    this.subscribe('service')
})

Template.service.onRendered(function () {

})

Template.service.helpers({
    services: function () {
        return Service.find()
    },
    statusName: function (s) {
        var ss = service_status.find(function (e) { return e.code == s; })
        return ss && ss.name;
    }
})

Template.service.events({
    'click .service_start_all': function () {
        Meteor.call('service.startAll')
    },
    'click .service_stop_all': function () {
        Meteor.call('service.stopAll')
    },
    'click .service_start': function () {
        Meteor.call('service.start', this.name)
    },
    'click .service_stop': function () {
        Meteor.call('service.stop', this.name)
    },
})