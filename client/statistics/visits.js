import echarts from 'echarts';

Template.statistics_visits.onCreated(function () {
    this.subscribe('visits');
})

Template.statistics_visits.onRendered(function () {
    // 基于准备好的dom，初始化echarts实例
    var chart = echarts.init(document.getElementById('visits_chart'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option);

})

Template.statistics_visits.helpers({

})

Template.statistics_visits.events({

})