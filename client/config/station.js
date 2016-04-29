Template.config_station.onCreated(function () {
    this.subscribe('stations')
})

Template.config_station.onRendered(function () {


})

Template.config_station.helpers({
    stations: function () {
        return Station.find()
    },

})

Template.config_station.events({

})