Meteor.startup(function () {

    //------------------------area---------------------------------------------------
    if (Area.find().count() == 0) {
        console.log('fixture----------Area--------------start---------')
        var areas = JSON.parse(Assets.getText("area.json"));
        Area.batchInsert(areas.map((e) => {
            //province
            if (e.code % 10000 == 0) {
                e.level = 'province';
                e.province_code = e.code;
                e.city_code = undefined;
                e.county_code = undefined;
                e.parent_code = undefined;
            }

            //city
            else if (e.code % 100 == 0) {
                e.level = 'city';
                e.province_code = Math.floor(e.code / 10000) * 10000;
                e.city_code = e.code;
                e.county_code = undefined;
                e.parent_code = e.province_code;
            }

            //county
            else {
                e.level = 'county';
                e.province_code = Math.floor(e.code / 10000) * 10000;
                e.city_code = Math.floor(e.code / 100) * 100;
                e.county_code = e.code;
                e.parent_code = e.city_code;
                var Municipalities = areas.find((ee) => { return ee.code == e.city_code; }) == undefined;
                if (Municipalities) {
                    e.city_code = e.code;
                    e.parent_code = e.province_code;
                }
            }

            return e;
        }));
        console.log('fixture----------Area--------------end---------')
    }
    //-----------------------------------------------------------------------------------------------------------

    //----------------------station----------------------------------------------------------------------------------------
    if (Station.find().count() == 0) {
        console.log('fixture----------Station--------------start---------')
        var stations = JSON.parse(Assets.getText("station.json"));
        Station.batchInsert(stations)
        console.log('fixture----------Station--------------end---------')
    }
    //--------------------------------------------------------------------------------------------------------------
    //-----------------------pollutant---------------------------------------------------------------------------------------
    if (Pollutant.find().count() == 0) {
        console.log('fixture----------Pollutant--------------start---------')
        var pollutants = JSON.parse(Assets.getText("pollutant.json"));
        Pollutant.batchInsert(pollutants);
        console.log('fixture----------Pollutant--------------end---------')
    }
    //--------------------------------------------------------------------------------------------------------------
    //-------------------------service-------------------------------------------------------------------------------------
    if (Service.find().count() == 0) {
        console.log('fixture----------service--------------start---------')
        Service.insert({ sn: 1, name: 'test1', schedule: 'every 20 seconds', status: 1 })
        Service.insert({ sn: 2, name: 'test2', schedule: 'every 15 seconds', status: 1 })
        console.log('fixture----------service--------------end---------')
    }
    //--------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------
    //-------------------------users-------------------------------------------------------------------------------------
    if (Roles.getAllRoles().count() == 0) {
        console.log('fixture----------users_role--------------start---------')
        var roles = [
            { code: 'superAdmin', name: '超级管理员' },
            { code: 'sysAdmin', name: '系统管理员' },
            { code: 'provinceAdmin', name: '省级管理员' },
            { code: 'cityAdmin', name: '市级管理员' },
            { code: 'countyAdmin', name: '县级管理员' },
        ]
        roles.forEach(function (e) {
            Roles.createRole(e.code);
        })
        console.log('fixture----------users_role--------------start---------')
    }
    if (Meteor.users.find().count() == 0) {
        console.log('fixture----------users_admin--------------start---------')
        Meteor.call('users.admin.insert', {
            username: 'admin',
            password: '123',
            role: 'superAdmin',
            description: '超级管理员'
        })
        console.log('fixture----------users_admin--------------end---------')
    }
    if (UserPublic.find().count() == 0) {
        console.log('fixture----------users_public--------------start---------')
        UserPublic.batchInsert([
            { username: 'test1', password: 'test1' },
            { username: 'test1', password: 'test1' },
            { username: 'test1', password: 'test1' },
            { username: 'test1', password: 'test1' },
            { username: 'test1', password: 'test1' },
        ])
        console.log('fixture----------users_public--------------end---------')
    }
    //--------------------------------------------------------------------------------------------------------------

})
