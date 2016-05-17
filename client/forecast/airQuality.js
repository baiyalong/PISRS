Template.forecast_airQuality.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Meteor.call('airQualityForecast_pageCount', limitPerPage, function (err, res) {
        if (err) console.log(err);
        else Session.set('pageCount', res);
    })
    
    var self = this;
    self.autorun(function () {
        self.subscribe('airQualityForecast', Session.get('pageNum'), Session.get('limitPerPage'))
    })
})

Template.forecast_airQuality.onRendered(function () {


})

Template.forecast_airQuality.helpers({
    dataList: function () {
        return AirQualityForecast.find()
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD');
    }
})

Template.forecast_airQuality.events({

})