date_range_condition = function (date, type) {
    var date = new Date(date);
    var date_from, date_to;
    if (type == 'day') {
        date_from = new Date(date);
        date_from.setHours(0);
        date_from.setMinutes(0);
        date_from.setSeconds(0);

        date_to = new Date(date_from);
        date_to.setDate(date_to.getDate() + 1);
    }
    else if (type == 'hour') {
        date_from = new Date(date);
        date_from.setMinutes(0);
        date_from.setSeconds(0);

        date_to = new Date(date_from);
        date_to.setHours(date_to.getHours() + 1);
    }

    if (date_from && date_to)
        return { $gte: date_from, $lt: date_to }
}

date_range_condition_day = function (date) {
    return date_range_condition(date, 'day')
}

date_range_condition_hour = function (date) {
    return date_range_condition(date, 'hour')
}

auto_route = function () {
    var user = Meteor.user();
    var role = user && user.roles && user.roles[0];
    if (role) {
        if (role == 'admin') FlowRouter.go('/monitor/pollutantCityDaily');
        else if (role == 'audit') FlowRouter.go('/forecast/airQualityAudit');
        else FlowRouter.go('/forecast/airQualityApply');
    }
}