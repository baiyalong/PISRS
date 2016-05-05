Template.monitor_pollutantCityHourly.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Meteor.call('pollutantCityHourly_pageCount', limitPerPage, function (err, res) {
        if (err) console.log(err);
        else Session.set('pageCount', res);
    })
    
    var self = this;
    Tracker.autorun(function () {
        self.subscribe('pollutantCityHourly', Session.get('pageNum'), Session.get('limitPerPage'))
    })
})

Template.monitor_pollutantCityHourly.onRendered(function () {


})

Template.monitor_pollutantCityHourly.helpers({
    dataList: function () {
        return PollutantCityHourly.find()
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm');
    }
})

Template.monitor_pollutantCityHourly.events({

})