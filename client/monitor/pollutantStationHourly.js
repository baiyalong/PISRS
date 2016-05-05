Template.monitor_pollutantStationHourly.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 43;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Meteor.call('pollutantStationHourly_pageCount', limitPerPage, function (err, res) {
        if (err) console.log(err);
        else Session.set('pageCount', res);
    })
    
    var self = this;
    Tracker.autorun(function () {
        self.subscribe('pollutantStationHourly', Session.get('pageNum'), Session.get('limitPerPage'))
    })
})

Template.monitor_pollutantStationHourly.onRendered(function () {


})

Template.monitor_pollutantStationHourly.helpers({
    dataList: function () {
        return PollutantStationHourly.find()
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm');
    }
})

Template.monitor_pollutantStationHourly.events({

})