
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

//forecast
FlowRouter.route('/forecast', {
    action: () => {
        FlowRouter.go('/forecast/weather');
    }
});
FlowRouter.route('/forecast/weather', {
    action: () => {
        BlazeLayout.render("layout", { content: "forecast-weather" });
    }
});
FlowRouter.route('/forecast/pollutantHourly', {
    action: () => {
        BlazeLayout.render("layout", { content: "forecast-pollutantHourly" });
    }
});
FlowRouter.route('/forecast/pollutantDaily', {
    action: () => {
        BlazeLayout.render("layout", { content: "forecast-pollutantDaily" });
    }
});
FlowRouter.route('/forecast/airQualityApply', {
    action: () => {
        BlazeLayout.render("layout", { content: "forecast-airQualityApply" });
    }
});
FlowRouter.route('/forecast/airQualityAudit', {
    action: () => {
        BlazeLayout.render("layout", { content: "forecast-airQualityAudit" });
    }
});


//warning
FlowRouter.route('/warning', {
    action: () => {
        FlowRouter.go('/warning/push');
    }
});
FlowRouter.route('/warning/push', {
    action: () => {
        BlazeLayout.render("layout", { content: "warning-push" });
    }
});
FlowRouter.route('/warning/history', {
    action: () => {
        BlazeLayout.render("layout", { content: "warning-history" });
    }
});


//service
FlowRouter.route('/service', {
    action: () => {
        BlazeLayout.render("layout", { content: "service" });
    }
});


//config
FlowRouter.route('/config', {
    action: () => {
        FlowRouter.go('/config/pollutant');
    }
});
FlowRouter.route('/config/pollutant', {
    action: () => {
        BlazeLayout.render("layout", { content: "config-pollutant" });
    }
});
FlowRouter.route('/config/pollutantLimit', {
    action: () => {
        BlazeLayout.render("layout", { content: "config-pollutantLimit" });
    }
});
FlowRouter.route('/config/area', {
    action: () => {
        BlazeLayout.render("layout", { content: "config-area" });
    }
});
FlowRouter.route('/config/mobileVersion', {
    action: () => {
        BlazeLayout.render("layout", { content: "config-mobileVersion" });
    }
});
FlowRouter.route('/config/IPtrustList', {
    action: () => {
        BlazeLayout.render("layout", { content: "config-IPtrustList" });
    }
});
FlowRouter.route('/config/dataIO', {
    action: () => {
        BlazeLayout.render("layout", { content: "config-dataIO" });
    }
});


//users
FlowRouter.route('/users', {
    action: () => {
        FlowRouter.go('/users/admin');
    }
});
FlowRouter.route('/users/admin', {
    action: () => {
        BlazeLayout.render("layout", { content: "users-admin" });
    }
});
FlowRouter.route('/users/public', {
    action: () => {
        BlazeLayout.render("layout", { content: "users-public" });
    }
});

//feedback
FlowRouter.route('/feedback', {
    action: () => {
        BlazeLayout.render("layout", { content: "feedback" });
    }
});

//weixin
FlowRouter.route('/weixin', {
    action: () => {
        BlazeLayout.render("layout", { content: "weixin" });
    }
});

//weibo
FlowRouter.route('/weibo', {
    action: () => {
        BlazeLayout.render("layout", { content: "weibo" });
    }
});