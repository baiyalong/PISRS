
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