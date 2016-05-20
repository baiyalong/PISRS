
Meteor.subscribe('dict.cities')
Meteor.subscribe('dict.stations')


dict = {}

dict.roles = function () {
    var roles = [
        // { code: 'superAdmin', name: '超级管理员' },
        // { code: 'sysAdmin', name: '系统管理员' },
        // { code: 'provinceAdmin', name: '省级管理员' },
        // { code: 'cityAdmin', name: '市级管理员' },
        // { code: 'countyAdmin', name: '县级管理员' },
        { code: 'admin', name: '自治区管理员' },
        { code: 'audit', name: '自治区预报审核员' },
    ]
    return (function () {
        if (roles.length == 2) {
            roles = roles.concat(Area.find({}, { sort: { code: 1 }, fields: { code: 1, name: 1 } }).fetch().map(function (e) {
                return {
                    code: e.code,
                    name: '盟市预报发布员 - ' + e.name
                }
            }))
        }
        return roles;
    })()
}

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

dict.cities = function () {
    var cities = [{ code: 150000, name: '--全部盟市--' }]
    return (function () {
        if (cities.length == 1) {
            cities = cities.concat(Area.find({}, { sort: { code: 1 }, fields: { code: 1, name: 1 } }).fetch())
        }
        return cities;
    })()
}

dict.stations = function () {
    var stations = [{ code: 150000000, name: '--全部监测点--', city: '--全部盟市--' }]
    return (function () {
        if (stations.length == 1) {
            stations = stations.concat(Station.find({}, { sort: { UniqueCode: 1 }, fields: { UniqueCode: 1, PositionName: 1, Area: 1 } }).fetch().map(function (e) {
                return {
                    code: e.UniqueCode,
                    name: e.PositionName,
                    city: e.Area
                }
            }))
        }
        return stations;
    })()
}
