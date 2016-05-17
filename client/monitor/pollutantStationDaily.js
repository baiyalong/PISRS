Template.monitor_pollutantStationDaily.onCreated(function () {
    const pageNum = 1;
    const limitPerPage = 43;
    Session.set('pageNum', pageNum);
    Session.set('limitPerPage', limitPerPage);
    Session.set('conditions', {})

    var self = this;
    self.autorun(function () {
        self.subscribe('pollutantStationDaily', Session.get('pageNum'), Session.get('limitPerPage'), Session.get('conditions'))
        Meteor.call('pollutantStationDaily_pageCount', Session.get('limitPerPage'), Session.get('conditions'), function (err, res) {
            if (err) console.log(err);
            else Session.set('pageCount', res);
        })
    })
})

Template.monitor_pollutantStationDaily.onRendered(function () {

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
                Meteor.call('pollutantStationDaily.update', id, update, function (err, res) {
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

Template.monitor_pollutantStationDaily.helpers({
    dataList: function () {
        return PollutantStationDaily.find({}, { sort: { MONITORTIME: -1, UNIQUECODE: 1 } })
    },
    moment: function (date) {
        return moment(date).format('YYYY-MM-DD');
    },
    city_options: function () {
        return dict.cities();
    },
    station_options: function () {
        var cityCode = Session.get('cityCode');
        var options = dict.stations();
        if (cityCode && cityCode != 150000) {
            options = options.filter(function (e) {
                var code = Math.floor(e.code / 1000)
                return code == cityCode || code == 150000
            })
        }
        return options;
    },
})

Template.monitor_pollutantStationDaily.events({
    'click #search': function (e, t) {
        var cityCode = $('#city').val();
        var stationCode = $('#station').val();
        var date = $('#date').datepicker('getDate');
        var conditions = {
            MONITORTIME: date_range_condition_day(date)
        }
        if (stationCode != 150000000)
            conditions.UNIQUECODE = stationCode;
        else if (stationCode == 150000000 && cityCode != 150000)
            conditions.UNIQUECODE = { $regex: '^' + cityCode };
        // else if(stationCode==150000000&&cityCode==150000)
        // ;
        Session.set('conditions', conditions)
        Session.set('pageNum', 1);
    },
    'change #city': function (e, t) {
        Session.set('cityCode', e.target.value)
        $("#station").get(0).selectedIndex = 0;
    },
    'change #station': function (e, t) {
        var stationCode = e.target.value;
        Session.set('stationCode', stationCode)
        if (stationCode != 150000000)
            $('#city').val(Math.floor(stationCode / 1000))
    }
})