Template.config_pollutant.onCreated(function () {
    this.subscribe('pollutants')
})

Template.config_pollutant.onRendered(function () {


})

Template.config_pollutant.helpers({
    pollutants: function () {
        return Pollutant.find()
    },

})

Template.config_pollutant.events({

})