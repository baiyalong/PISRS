Template.config_pollutant.onCreated(function () {
    this.subscribe('pollutants')
})

Template.config_pollutant.onRendered(function () {


})

Template.config_pollutant.helpers({
    pollutants: function () {
        return Pollutant.find()
    },
    pollutant: function () {
        return Session.get('pollutant')
    },
    err: function () {
        return Session.get('err');
    }
})

Template.config_pollutant.events({
    'click .pollutant_edit': function () {
        Session.set('pollutant', this)
        Session.set('err', null)
        if (!this.limitValue)
            $('#limitValue').val('')
        $('#modal_pollutant').modal('show')
    },
    'click #modal_pollutant_save': function () {
        var limitValue = $('#limitValue').val().trim();
        if (isNaN(limitValue) || limitValue < 0)
            Session.set('err', '输入错误！')
        else
            Meteor.call('pollutant.update', this._id, Number(limitValue), function (err, res) {
                if (err) Session.set('err', err)
                else $('#modal_pollutant').modal('hide')
            })
    }
})