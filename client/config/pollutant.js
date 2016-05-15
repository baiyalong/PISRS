Template.config_pollutant.onCreated(function () {
    this.subscribe('pollutants')
})

Template.config_pollutant.onRendered(function () {
    this.autorun(function () {
        if (Template.instance().subscriptionsReady()) {
            setTimeout(editable, 0)
        }
    });
    function editable() {
        $('.editable').editable({
            emptytext: 'null',
            showbuttons: false,
            mode: 'inline',
            validate: function (value) {
                // if ($.trim(value) == '') return '输入不能为空！';
                if (isNaN(value) || Number(value) < 0) return '输入参数错误！'
            },
            url: function (params) {
                var id = this.parentElement.parentElement.getAttribute('id');
                var value = params.value == '' ? null : Number(params.value);
                var d = new $.Deferred;
                Meteor.call('pollutant.update', id, value, function (err, res) {
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

Template.config_pollutant.helpers({
    pollutants: function () {
        return Pollutant.find()
    },
})

Template.config_pollutant.events({

})