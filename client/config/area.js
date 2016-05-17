Template.config_area.onCreated(function () {
    this.subscribe('areas')
})

Template.config_area.onRendered(function () {

    // // Hide the clear button if the search input is empty
    // $(".search-pf .has-clear .clear").each(function () {
    //     if (!$(this).prev('.form-control').val()) {
    //         $(this).hide();
    //     }
    // });
    // // Show the clear button upon entering text in the search input
    // $(".search-pf .has-clear .form-control").keyup(function () {
    //     var t = $(this);
    //     t.next('button').toggle(Boolean(t.val()));
    // });
    // // Upon clicking the clear button, empty the entered text and hide the clear button
    // $(".search-pf .has-clear .clear").click(function () {
    //     $(this).prev('.form-control').val('').focus();
    //     $(this).hide();
    // });

})

Template.config_area.helpers({
    areas: function () {
        return Area.find({}, { sort: { code: 1 } })
    },
    levelString: function (level) {
        var levels = { 'province': '省级', 'city': '市级', 'county': '县级' }
        return levels[level];
    }
})

Template.config_area.events({

})