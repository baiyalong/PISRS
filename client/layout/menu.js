
Template.menu.onCreated(function () {


})

Template.menu.onRendered(function () {

})

Template.menu.helpers({
    menus: function () {
        var user = Meteor.user();
        var role = user && user.roles && user.roles[0];
        var menuArr = [
            // {
            //     icon: 'fa fa-dashboard',
            //     text: '仪表盘',
            //     route: '/dashboard'
            // },
            {
                role: 'admin',
                icon: 'fa fa-area-chart',
                text: '监测数据',
                route: '/monitor',
                secondary: 'monitor-secondary',
                submenus: [
                    {
                        text: '城市每天污染物',
                        route: '/monitor/pollutantCityDaily'
                    }, {
                        text: '城市每小时污染物',
                        route: '/monitor/pollutantCityHourly'
                    }, {
                        text: '监测点每天污染物',
                        route: '/monitor/pollutantStationDaily'
                    }, {
                        text: '监测点每小时污染物',
                        route: '/monitor/pollutantStationHourly'
                    },
                ]
            },
            {
                role: 'admin',
                icon: 'fa fa-line-chart',
                text: '预报数据',
                route: '/forecast',
                secondary: 'forecast-secondary',
                submenus: [
                    // {
                    //     text: '每小时污染物',
                    //     route: '/forecast/pollutantHourly'
                    // }, {
                    //     text: '每天污染物',
                    //     route: '/forecast/pollutantDaily'
                    // }, 
                    {
                        text: '天气预报',
                        route: '/forecast/weather'
                    }, {
                        text: '空气质量预报',
                        route: '/forecast/airQuality'
                    }, {
                        text: '空气质量预报发布',
                        route: '/forecast/airQualityApply'
                    }, {
                        text: '空气质量预报审核',
                        route: '/forecast/airQualityAudit'
                    }
                ]
            },
            {
                role: 'admin',
                icon: 'fa fa-warning',
                text: '预警信息',
                route: '/warning',
                // secondary: 'warning-secondary',
                // submenus: [
                //     {
                //         text: '消息推送',
                //         route: '/warning/push'
                //     }, {
                //         text: '历史记录',
                //         route: '/warning/history'
                //     }
                // ]
            },
            {
                role: 'admin',
                icon: 'fa fa-dashboard',
                text: '服务监控',
                route: '/service'
            },
            {
                role: 'admin',
                icon: 'fa fa-gears',
                text: '配置管理',
                route: '/config',
                secondary: 'config-secondary',
                submenus: [
                    {
                        text: '污染物信息',
                        route: '/config/pollutant'
                    }, {
                        text: '监测点信息',
                        route: '/config/station'
                    }, {
                        text: '行政区域信息',
                        route: '/config/area'
                    }, {
                        text: '移动客户端版本管理',
                        route: '/config/mobileVersion'
                    }
                ]
            },
            {
                role: 'admin',
                icon: 'fa fa-users',
                text: '用户管理',
                route: '/users',
                secondary: 'users-secondary',
                submenus: [
                    {
                        text: '管理员',
                        route: '/users/admin'
                    }, {
                        text: '公众用户',
                        route: '/users/public'
                    }
                ]
            },
            {
                role: 'admin',
                icon: 'fa fa-comments',
                text: '用户反馈',
                route: '/feedback'
            },
            {
                role: 'admin',
                icon: 'fa fa-pie-chart',
                text: '统计分析',
                route: '/statistics',
                // secondary: 'statistics-secondary',
                // submenus: [
                //     {
                //         text: '访问量统计',
                //         route: '/statistics/visits'
                //     }
                // ]
            },
            // {
            //     icon: 'fa fa-weixin',
            //     text: '微信',
            //     route: '/weixin'
            // },
            {
                role: 'admin',
                icon: 'fa fa-share-alt',
                text: '社交分享',
                route: '/share'
            },

            //---------------------------
            {
                icon: 'fa fa-line-chart',
                text: '空气质量预报发布',
                route: '/forecast/airQualityApply',
                role: 'apply'
            },
            {
                icon: 'fa fa-line-chart',
                text: '空气质量预报审核',
                route: '/forecast/airQualityAudit',
                role: 'audit'
            },
        ]

        return role ? menuArr.filter(function (e) {
            if (role == 'admin' || role == 'audit') return e.role == role;
            else return e.role == 'apply';
        }) : null;
    },
})

Template.menu.events({
    // 'click .route': function (e, t) {
    //     // e.preventDefault();
    //     // console.log(this, e, e.target)
    //     // FlowRouter.go(this.route)
    // }
})