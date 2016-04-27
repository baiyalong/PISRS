
FlowRouter.route('/login', {
    action: function () {
        BlazeLayout.render("login");
    }
});


FlowRouter.route('/dashboard', {
    action: function () {
        BlazeLayout.render("layout", {content: "dashboard"});
    }
});


var userSection = FlowRouter.group({
    prefix: "/user"
});
userSection.route('/', {
    action: function() {}
});
userSection.route('/administrators', {
    action: function() {
        BlazeLayout.render("layout", {content: "administrators"});
    }
});
userSection.route('/publicUsers', {
    action: function() {
        BlazeLayout.render("layout", {content: "publicUsers"});
    }
});