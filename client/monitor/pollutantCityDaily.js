Template.monitor_pollutantCityDaily.onCreated(function () {
    this.subscribe('pollutantCityDaily', 1, 12)
})

Template.monitor_pollutantCityDaily.onRendered(function () {



})

Template.monitor_pollutantCityDaily.helpers({
    dataList: function () {
        return PollutantCityDaily.find()
    },
    moment: function (MONITORTIME) {
        return moment(MONITORTIME).format('YYYY-MM-DD');
    }
})

Template.monitor_pollutantCityDaily.events({

})