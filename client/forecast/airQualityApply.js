Template.forecast_airQualityApply.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Meteor.call('weatherForecast_pageCount', limitPerPage, function (err, res) {
        if (err) console.log(err);
        else Session.set('pageCount', res);
    })

    var self = this;
    self.autorun(function () {
        self.subscribe('weatherForecast', Session.get('pageNum'), Session.get('limitPerPage'))
    })
})

Template.forecast_airQualityApply.onRendered(function () {


})

Template.forecast_airQualityApply.helpers({
    today: function (date) {
        return moment(new Date()).format('YYYY-MM-DD');
    },
    city_options: function () {
        return dict.cities();
    },
    county_options: function () {
        return dict.cities();
    },
})

Template.forecast_airQualityApply.events({

})