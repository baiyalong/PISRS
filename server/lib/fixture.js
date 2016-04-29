Meteor.startup(() => {

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
    //--------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------

})