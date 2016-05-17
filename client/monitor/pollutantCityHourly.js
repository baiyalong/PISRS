Template.monitor_pollutantCityHourly.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 12;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);
    Session.set('conditions', {});

    var self = this;
    Tracker.autorun(function () {
        self.subscribe('pollutantCityHourly', Session.get('pageNum'), Session.get('limitPerPage'), Session.get('conditions'))
        Meteor.call('pollutantCityHourly_pageCount', Session.get('limitPerPage'), Session.get('conditions'), function (err, res) {
            if (err) console.log(err);
            else Session.set('pageCount', res);
        })
    })
})

Template.monitor_pollutantCityHourly.onRendered(function () {

    //-----datapicker--------------------------------------------------------------------
    $('#date').datepicker({
        language: "zh-CN",
        autoclose: true,
        todayBtn: "linked",
        todayHighlight: true
    });
    $('#date').datepicker('setDate', new Date())
    $('#date').datepicker('setStartDate', (function () {
        var d = new Date();
        d.setDate(d.getDate() - 60);
        return d;
    })())
    $('#date').datepicker('setEndDate', new Date())

    //---------------x-editable------------------------------------------------------
    this.autorun(function () {
        if (Template.instance().subscriptionsReady()) {
            setTimeout(editable, 0)
        }
    });
    function editable() {
        $('.editable').editable({
            // anim:true,
            emptytext: 'null',
            showbuttons: false,
            mode: 'inline',
            validate: function (value) {
                // if ($.trim(value) == '') return '输入不能为空！';
                // if (isNaN(Number(value)) || parseInt(value) < 0) return '输入参数错误！'
            },
            url: function (params) {
                var id = this.parentElement.parentElement.getAttribute('id');
                var name = this.getAttribute('name');
                var type = this.getAttribute('type');
                var value = params.value;
                if (value == '') value = null;
                else if (type == 'number') value = Number(value);
                else if (type == 'text') value = value.trim();
                var update = {};
                update[name] = value;
                var d = new $.Deferred;
                Meteor.call('pollutantCityHourly.update', id, update, function (err, res) {
                    err ? d.reject(err.message) : d.resolve()
                })
                return d.promise();
            },
            success: function (response, newValue) {
                setTimeout(reset, 0)
                var self = $(this);
                function reset() {
                    self.text(newValue || null)
                }
            }
        })
    }

})

Template.monitor_pollutantCityHourly.helpers({
    dataList: function () {
        var conditions = Session.get('conditions');
        var dateSort = conditions && conditions.TimePoint ? 1 : -1;
        return PollutantCityHourly.find({}, { sort: { TimePoint: dateSort, CityCode: 1 } })
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm');
    },
    city_options: function () {
        return dict.cities();
    },
})

Template.monitor_pollutantCityHourly.events({
    'click #search': function (e, t) {
        var conditions = {
            CityCode: Number($('#city').val()),
            TimePoint: date_range_condition_day($('#date').datepicker('getDate'))
        }
        if (conditions.CityCode == 150000) delete conditions.CityCode;
        Session.set('conditions', conditions)
        Session.set('pageNum', 1);
    }
})