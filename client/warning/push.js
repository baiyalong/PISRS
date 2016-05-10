
Template.warning_push.onCreated(function () {


})

Template.warning_push.onRendered(function () {
    this.subscribe('city')
})

Template.warning_push.helpers({
    city_options: function () {
        return Area.find()
    },
    channel_options: function () {
        return channels;
    }
})

Template.warning_push.events({
    'click #push_publish': function (e, t) {

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
        console.log(warning)
        //发布渠道不能为空
        //发布内容不能为空

        Session.set('alert', {
            title: '预警信息-消息推送',
            level: 'success',
            icon: 'pficon pficon-ok',
            content: '发布成功！'
        })
        $('#modal_alert').modal('show')
    },
    'click #push_reset': function (e, t) {

    },
})