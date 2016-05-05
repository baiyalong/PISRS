Template.pagination.onCreated(function () {

})

Template.pagination.onRendered(function () {

})

Template.pagination.helpers({
    pageCount: function () {
        return Session.get('pageCount')
    },
    pageNum: function () {
        return Session.get('pageNum')
    }
})

Template.pagination.events({
    'change #pageNum': function (e, t) {
        var pageNumStr = e.target.value;
        var pageNum = parseInt(pageNum);
        if (pageNum == pageNumStr && pageNum >= 1 && pageNum <= Session.get('pageCount'))
            Session.set('pageNum', pageNum)
    },
    'click #pageFirst,#pagePre,#pageNext,#pageLast': function (e, t) {
        var target = e.currentTarget.id;
        var pageNum = Session.get('pageNum');
        var pageCount = Session.get('pageCount');
        switch (target) {
            case 'pageFirst': pageNum = 1; break;
            case 'pagePre': pageNum--; break;
            case 'pageNext': pageNum++; break;
            case 'pageLast': pageNum = pageCount; break;
            default: break;
        }
        pageNum < 1 ? pageNum = 1 : null;
        pageNum > pageCount ? pageNum = pageCount : null;
        Session.set('pageNum', pageNum);
    }
})