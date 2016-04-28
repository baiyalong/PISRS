
FlowRouter.route('/', {
    action: () => {
        Meteor.userId() ? FlowRouter.go('/dashboard') : FlowRouter.go('/login')
    }
});

FlowRouter.route('/login', {
    action: () => {
        BlazeLayout.render("login");
    }
});

FlowRouter.route('/dashboard', {
    action: () => {
        BlazeLayout.render("layout", { content: "dashboard" });
    }
});

//monitor
FlowRouter.route('/monitor', {
    action: () => {
        FlowRouter.go('/monitor/station');
    }
});
FlowRouter.route('/monitor/station', {
    action: () => {
        BlazeLayout.render("layout", { content: "monitor-station" });
    }
});
FlowRouter.route('/monitor/pollutantHourly', {
    action: () => {
        BlazeLayout.render("layout", { content: "monitor-pollutantHourly" });
    }
});
FlowRouter.route('/monitor/pollutantDaily', {
    action: () => {
        BlazeLayout.render("layout", { content: "monitor-pollutantDaily" });
    }
});

// var userRoutes = rootRoutes.group({
//     prefix: "/user",
//     name:'userRoutes'
// });
// userRoutes.route('/', {
//     name:'user',
//     action: function () { }
// });
// userRoutes.route('/administrators', {
//     name:'user.administrators',
//     action: function () {
//         BlazeLayout.render("layout", { content: "administrators" });
//     }
// });
// userRoutes.route('/publicUsers', {
//     name:'user.publicUsers',
//     action: function () {
//         BlazeLayout.render("layout", { content: "publicUsers" });
//     }
// });


// FlowRouter.notFound = {
//     // Subscriptions registered here don't have Fast Render support.
//     subscriptions: function() {

//     },
//     action: function() {

//     }
// };