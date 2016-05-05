Template.monitor_pollutantStationDaily.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 43;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);

    Meteor.call('pollutantStationDaily_pageCount', limitPerPage, function (err, res) {
        if (err) console.log(err);
        else Session.set('pageCount', res);
    })
    
    var self = this;
    Tracker.autorun(function () {
        self.subscribe('pollutantStationDaily', Session.get('pageNum'), Session.get('limitPerPage'))
    })
})

Template.monitor_pollutantStationDaily.onRendered(function () {


})

Template.monitor_pollutantStationDaily.helpers({
    dataList: function () {
        return PollutantStationDaily.find()
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD');
    }
})

Template.monitor_pollutantStationDaily.events({

})