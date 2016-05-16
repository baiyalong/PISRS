dict = {}

dict.roles = [
    { code: 'superAdmin', name: '超级管理员' },
    { code: 'sysAdmin', name: '系统管理员' },
    { code: 'provinceAdmin', name: '省级管理员' },
    { code: 'cityAdmin', name: '市级管理员' },
    { code: 'countyAdmin', name: '县级管理员' },
]


dict.deviceTypes = [
    { code: 'IOS', name: 'IOS' },
    { code: 'Android', name: 'Android' },
]

dict.channels = [
    { code: 'IOS', name: 'IOS' },
    { code: 'Android', name: 'Android' },
    { code: 'weixin', name: '微信' },
    { code: 'weibo', name: '微博' },
]

dict.service_status = [
    { code: 1, name: '开启' },
    { code: 0, name: '关闭' },
    { code: -1, name: '异常' },
]

Meteor.subscribe('dict.cities', function () {
    dict.cities = Area.find({}, { sort: { code: 1 }, fields: { code: 1, name: 1, _id: 0 } }).fetch();
    dict.cities.unshift({
        code: 150000,
        name: '--全部盟市--'
    })
})

Meteor.subscribe('dict.stations', function () {
    dict.stations = Station.find({}, { sort: { UniqueCode: 1 }, fields: { UniqueCode: 1, PositionName: 1, Area: 1, _id: 0 } }).fetch().map(function (e) {
        return {
            code: e.UniqueCode,
            name: e.PositionName,
            city: e.Area
        }
    });
    dict.stations.unshift({
        code: 150000000,
        name: '--全部监测点--',
        city: '--全部盟市--'
    })
})