Template.monitor_pollutantCityDaily.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);
    Session.set('conditions', {})

    var self = this;
    Tracker.autorun(function () {
        self.subscribe('pollutantCityDaily', Session.get('pageNum'), Session.get('limitPerPage'), Session.get('conditions'))
        Meteor.call('pollutantCityDaily_pageCount', Session.get('limitPerPage'), Session.get('conditions'), function (err, res) {
            if (err) console.log(err);
            else Session.set('pageCount', res);
        })
    })
})

Template.monitor_pollutantCityDaily.onRendered(function () {

    //-----datapicker--------------------------------------------------------------------
    $('#date').datepicker({
        language: "zh-CN",
        autoclose: true,
        todayBtn: "linked",
        todayHighlight: true
    });
    $('#date').datepicker('setDate', new Date())
    // $('#date').datepicker('setDate', new Date(Number(this.data.date)));
    $('#date').datepicker('setStartDate', (function () {
        var d = new Date();
        d.setDate(d.getDate() - 60);
        return d;
    })())
    $('#date').datepicker('setEndDate', new Date())


    // var data_item = PollutantCityDaily.findOne({}, { sort: { MONITORTIME: -1 } });
    // console.log(data_item)
    // if (data_item && data_item.MONITORTIME) {
    //     $('#date').datepicker('setDate', new Date(data_item.MONITORTIME));
    // }

    //---------------x-editable------------------------------------------------------
    $('table a.editable').editable({
        url: function (params) {
            // var pollutant = this.getAttribute('pollutant');
            var value = params.value;
            var id = this.parentElement.parentElement.getAttribute('id');
            console.log(   value, this, params)
            var d = new $.Deferred;
            //async saving data in js model\
            // var update = {};
            // update[pollutant] = value;
            // DataStationHourly.update(id, { $set: update }, function (err, res) {
            //     if (err)
            //         d.reject(err.message)
            //     else
            //         d.resolve()
            // })
            return d.promise();
        },
        emptytext: '',
        showbuttons: false,
        mode: 'inline',
        // validate: function (value) {
        //     if ($.trim(value) == '') {
        //         return '输入不能为空！';
        //     }
        //     if (isNaN(Number(value))) {
        //         return '输入参数错误！'
        //     }
        // }
    })

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
    'click #search': function (e, t) {
        var conditions = {
            CITYCODE: $('#city').val(),
            MONITORTIME: date_range_condition_day($('#date').datepicker('getDate'))
        }
        if (conditions.CITYCODE == 150000) delete conditions.CITYCODE;
        Session.set('conditions', conditions)
        Session.set('pageNum', 1);
    }
})