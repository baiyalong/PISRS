
Template.warning_push.onCreated(function () {


})

Template.warning_push.onRendered(function () {
    // this.subscribe('city')
})

Template.warning_push.helpers({
    city_options: function () {
        return dict.cities();
    },
    channel_options: function () {
        return dict.channels;
    },
    err: function () {
        return Session.get('err')
    }
})

Template.warning_push.events({
    'click #push_publish': function (e, t) {
        Session.set('err', null)
        //TODO...  call method
        var warning = {
            channels: (function () {
                var channelArr = [];
                $('input:checkbox[name="channels"]:checked').each(function (i) {
                    channelArr.push($(this).val())
                })
                return channelArr;
            })(),
            cityCode: $("#city").val(),
            cityName: $("#city").find("option:selected").text(),
            content: $('#content').val().trim()
        }
        var err = null;
        if (warning.channels.length == 0) err = '发布渠道不能为空';
        if (warning.content == '') err = '发布内容不能为空';
        if (err) {
            Session.set('err', err)
        } else {
            Meteor.call('warning.publish', warning, function (err, res) {
                if (err) Session.set('err', err)
                else {
                    Session.set('alert', {
                        title: '预警信息 - 消息推送',
                        level: 'success',
                        icon: 'pficon pficon-ok',
                        content: '发布成功！'
                    })
                    $('#modal_alert').modal('show')
                }
            })
        }
    },
    'click #push_reset': function (e, t) {
        Session.set('err', null)
        $('input:checkbox[name="channels"]').attr('checked', 'checked');
        $('#city').prop('selectedIndex', 0);
        $('#content').val('')
    },
})