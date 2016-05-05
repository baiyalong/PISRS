Template.pagination.onCreated(function () {

})

Template.pagination.onRendered(function () {


})

Template.pagination.helpers({
    pages: function () {
        var pageArr = [];
        for (var i = 0; i < 10; i++) {
            pageArr.push({ pageNum: i })
        }
        return pageArr;
    }
})

Template.pagination.events({

})