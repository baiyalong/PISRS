
Template.dashboard.onCreated(function () {
    var user = Meteor.user();
    var role = user && user.roles[0];
    if (role) {
        if (role == 'admin') FlowRouter.go('/monitor/pollutantCityDaily');
        else if (role == 'audit') FlowRouter.go('/forecast/airQualityAudit');
        else FlowRouter.go('/forecast/airQualityApply');
    }
})

Template.dashboard.onRendered(function () {

})

Template.dashboard.helpers({

})

Template.dashboard.events({

})