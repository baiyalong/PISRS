
Template.menu.onCreated(() => {


})

Template.menu.onRendered(() => {

})

Template.menu.helpers({
    menus: () => {
        return [
            // {
            //     icon: 'fa fa-dashboard',
            //     text: '仪表盘',
            //     route: '/dashboard'
            // },
            {
                icon: 'fa fa-area-chart',
                text: '监测数据',
                route: '/monitor',
                secondary: 'monitor-secondary',
                submenus: [
                    {
                        text: '监测点信息',
                        route: '/monitor/station'
                    }, {
                        text: '每小时污染物',
                        route: '/monitor/pollutantHourly'
                    }, {
                        text: '每天污染物',
                        route: '/monitor/pollutantDaily'
                    }
                ]
            },
            {
                icon: 'fa fa-line-chart',
                text: '预报数据',
                route: '/forecast',
                secondary: 'forecast-secondary',
                submenus: [
                    {
                        text: '天气预报',
                        route: '/forecast/weather'
                    }, {
                        text: '每小时污染物',
                        route: '/forecast/pollutantHourly'
                    }, {
                        text: '每天污染物',
                        route: '/forecast/pollutantDaily'
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
                icon: 'fa fa-warning',
                text: '预警信息',
                route: '/warning',
                secondary: 'warning-secondary',
                submenus: [
                    {
                        text: '消息推送',
                        route: '/warning/push'
                    }, {
                        text: '历史记录',
                        route: '/warning/history'
                    }
                ]
            },
            {
                icon: 'fa fa-dashboard',
                text: '服务监控',
                route: '/service'
            },
            {
                icon: 'fa fa-gears',
                text: '配置数据',
                route: '/config',
                secondary: 'config-secondary',
                submenus: [
                    {
                        text: '污染物数据',
                        route: '/config/pollutant'
                    }, {
                        text: '污染物排放限值',
                        route: '/config/pollutantLimit'
                    }, {
                        text: '行政区域',
                        route: '/config/area'
                    }, {
                        text: '移动客户端版本',
                        route: '/config/mobileVersion'
                    }, {
                        text: 'IP地址信任列表',
                        route: '/config/IPtrustList'
                    }, {
                        text: '数据导入导出',
                        route: '/config/dataIO'
                    }
                ]
            },
            {
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
                icon: 'fa fa-comments',
                text: '用户反馈',
                route: '/feedback'
            },
            {
                icon: 'fa fa-weixin',
                text: '微信',
                route: '/weixin'
            },
            {
                icon: 'fa fa-weibo',
                text: '微博',
                route: '/weibo'
            },
        ]
    }
})

Template.menu.events({

})