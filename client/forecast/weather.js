Template.forecast_weather.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Meteor.call('weatherForecast_pageCount', limitPerPage, function (err, res) {
        if (err) console.log(err);
        else Session.set('pageCount', res);
    })

    var self = this;
    Tracker.autorun(function () {
        self.subscribe('weatherForecast', Session.get('pageNum'), Session.get('limitPerPage'))
    })
})

Template.forecast_weather.onRendered(function () {


})

Template.forecast_weather.helpers({
    dataList: function () {
        return WeatherForecast.find()
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm');
    },
    getString: function (obj) {
        return JSON.stringify(obj);
    }
})

Template.forecast_weather.events({

})