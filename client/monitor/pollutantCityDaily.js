Template.monitor_pollutantCityDaily.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Meteor.call('pollutantCityDaily_pageCount', limitPerPage, function (err, res) {
        if (err) console.log(err);
        else Session.set('pageCount', res);
    })

    var self = this;
    Tracker.autorun(function () {
        self.subscribe('pollutantCityDaily', Session.get('pageNum'), Session.get('limitPerPage'))
    })
    
    // self.subscribe('city')
})

Template.monitor_pollutantCityDaily.onRendered(function () {


})

Template.monitor_pollutantCityDaily.helpers({
    dataList: function () {
        return PollutantCityDaily.find()
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD');
    },
    city_options: function () {
        return cities;
    },
})

Template.monitor_pollutantCityDaily.events({

})