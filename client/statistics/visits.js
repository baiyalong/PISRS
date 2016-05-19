import echarts from 'echarts';

Template.statistics_visits.onCreated(function () {
    this.subscribe('visits');
})

Template.statistics_visits.onRendered(function () {
    var chart = echarts.init(document.getElementById('visits_chart'));
    // chart.showLoading();
    function getData(name) {
        var visits = [];
        return (function () {
            if (visits.length != Visits.find().count())
                visits = Visits.find().fetch();
            return visits.map(function (e) { return e[name]; });
        })();
    }
    var option = {
        title: {
            text: '访问量统计图表'
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['网站', 'IOS', 'Android', '微信', '微博']
        },
        xAxis: {
            // type: 'time',
            data: getData('timestamp')
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '网站',
                type: 'line',
                data: getData('website')
            },
            {
                name: 'IOS',
                type: 'line',
                data: getData('IOS')
            },
            {
                name: 'Android',
                type: 'line',
                data: getData('Android')
            },
            {
                name: '微信',
                type: 'line',
                data: getData('weixin')
            },
            {
                name: '微博',
                type: 'line',
                data: getData('weibo')
            },
        ]
    };
    // chart.setOption(option);
    this.autorun(function () {
        if (Template.instance().subscriptionsReady()) {
            setTimeout(renderChart, 0)
        }
    });
    function renderChart() {
        chart.setOption(option);
    }

})

Template.statistics_visits.helpers({

})

Template.statistics_visits.events({

})