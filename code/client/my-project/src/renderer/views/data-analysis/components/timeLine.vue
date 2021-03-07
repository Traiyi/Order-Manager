<template>
  <div id="timeLine" ></div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      dataMap: {},
    };
  },
  created() {
    // this.getData();
  },
  methods: {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("timeLine"));
    // 绘制图表
    var option = {
      // baseOption: {
      timeline: {
        axisType: "category",
        autoPlay: true,
        playInterval: 1000,
        data: [
          "2002-01-01",
          "2003-01-01",
          "2004-01-01",
          "2005-01-01",
          "2006-01-01",
          "2007-01-01",
          "2008-01-01",
          "2009-01-01",
          "2010-01-01",
          "2011-01-01",
        ],
        label: {
          formatter: function (s) {
            return new Date(s).getFullYear();
          },
        },
      },

      tooltip: {},
      calculable: true,
    };
    myChart.setOption(option);
    myChart.on("timelinechanged", (params) => {
      
      console.log(params);
      });
  },
};
</script>
