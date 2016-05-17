
FlowRouter.route('/', {
    action: function () {
        Meteor.userId() ? FlowRouter.go('/dashboard') : FlowRouter.go('/login')
    }
});

FlowRouter.route('/login', {
    action: function () {
        BlazeLayout.render("login");
    }
});

FlowRouter.route('/dashboard', {
    action: function () {
        BlazeLayout.render("layout", { content: "dashboard" });
    }
});

//monitor
FlowRouter.route('/monitor', {
    action: function () {
        FlowRouter.go('/monitor/pollutantCityDaily');
    }
});
FlowRouter.route('/monitor/pollutantCityDaily', {
    action: function () {
        BlazeLayout.render("layout", { content: "monitor_pollutantCityDaily" });
    }
});
FlowRouter.route('/monitor/pollutantCityHourly', {
    action: function () {
        BlazeLayout.render("layout", { content: "monitor_pollutantCityHourly" });
    }
});
FlowRouter.route('/monitor/pollutantStationDaily', {
    action: function () {
        BlazeLayout.render("layout", { content: "monitor_pollutantStationDaily" });
    }
});
FlowRouter.route('/monitor/pollutantStationHourly', {
    action: function () {
        BlazeLayout.render("layout", { content: "monitor_pollutantStationHourly" });
    }
});


//forecast
FlowRouter.route('/forecast', {
    action: function () {
        FlowRouter.go('/forecast/weather');
    }
});
// FlowRouter.route('/forecast/pollutantHourly', {
//     action: function () {
//         BlazeLayout.render("layout", { content: "forecast_pollutantHourly" });
//     }
// });
// FlowRouter.route('/forecast/pollutantDaily', {
//     action: function () {
//         BlazeLayout.render("layout", { content: "forecast_pollutantDaily" });
//     }
// });
FlowRouter.route('/forecast/weather', {
    action: function () {
        BlazeLayout.render("layout", { content: "forecast_weather" });
    }
});
FlowRouter.route('/forecast/airQuality', {
    action: function () {
        BlazeLayout.render("layout", { content: "forecast_airQuality" });
    }
});
FlowRouter.route('/forecast/airQualityApply', {
    action: function () {
        BlazeLayout.render("layout", { content: "forecast_airQualityApply" });
    }
});
FlowRouter.route('/forecast/airQualityAudit', {
    action: function () {
        BlazeLayout.render("layout", { content: "forecast_airQualityAudit" });
    }
});


//warning
FlowRouter.route('/warning', {
    action: function () {
        FlowRouter.go('/warning/push');
    }
});
FlowRouter.route('/warning/push', {
    action: function () {
        BlazeLayout.render("layout", { content: "warning_push" });
    }
});
FlowRouter.route('/warning/history', {
    action: function () {
        BlazeLayout.render("layout", { content: "warning_history" });
    }
});


//service
FlowRouter.route('/service', {
    action: function () {
        BlazeLayout.render("layout", { content: "service" });
    }
});


//config
FlowRouter.route('/config', {
    action: function () {
        FlowRouter.go('/config/pollutant');
    }
});
FlowRouter.route('/config/pollutant', {
    action: function () {
        BlazeLayout.render("layout", { content: "config_pollutant" });
    }
});
FlowRouter.route('/config/station', {
    action: function () {
        BlazeLayout.render("layout", { content: "config_station" });
    }
});
FlowRouter.route('/config/area', {
    action: function () {
        BlazeLayout.render("layout", { content: "config_area" });
    }
});
FlowRouter.route('/config/mobileVersion', {
    action: function () {
        BlazeLayout.render("layout", { content: "config_mobileVersion" });
    }
});


//users
FlowRouter.route('/users', {
    action: function () {
        FlowRouter.go('/users/admin');
    }
});
FlowRouter.route('/users/admin', {
    action: function () {
        BlazeLayout.render("layout", { content: "users_admin" });
    }
});
FlowRouter.route('/users/public', {
    action: function () {
        BlazeLayout.render("layout", { content: "users_public" });
    }
});

//feedback
FlowRouter.route('/feedback', {
    action: function () {
        BlazeLayout.render("layout", { content: "feedback" });
    }
});

//statistics
FlowRouter.route('/statistics', {
    action: function () {
        FlowRouter.go('/statistics/visits');
        // BlazeLayout.render("layout", { content: "statistics" });
    }
});
FlowRouter.route('/statistics/visits', {
    action: function () {
        BlazeLayout.render("layout", { content: "statistics_visits" });
    }
});

//weixin
FlowRouter.route('/weixin', {
    action: function () {
        BlazeLayout.render("layout", { content: "weixin" });
    }
});

//weibo
FlowRouter.route('/weibo', {
    action: function () {
        BlazeLayout.render("layout", { content: "weibo" });
    }
});