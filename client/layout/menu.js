
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
                icon: 'fa fa-dashboard',
                text: '监测数据',
                route: '/dashboard'
            },
            {
                icon: 'fa fa-dashboard',
                text: '预报数据',
                route: '/dashboard'
            },
            {
                icon: 'fa fa-dashboard',
                text: '预警信息',
                route: '/dashboard'
            },
            {
                icon: 'fa fa-dashboard',
                text: '服务监控',
                route: '/dashboard'
            },
            {
                icon: 'fa fa-gears',
                text: '配置数据',
                route: '/dashboard'
            },
            {
                icon: 'fa fa-users',
                text: '用户管理',
                route: '/dashboard'
            },
            {
                icon: 'fa fa-dashboard',
                text: '用户反馈',
                route: '/dashboard'
            },
            {
                icon: 'fa fa-weixin',
                text: '微信',
                route: '/dashboard'
            },
            {
                icon: 'fa fa-weibo',
                text: '微博',
                route: '/dashboard'
            },
        ]
    }
})

Template.menu.events({

})