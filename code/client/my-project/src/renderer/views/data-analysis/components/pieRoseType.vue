<template>
  <div id="pieRoseType"></div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("pieRoseType"));
    // 绘制图表
    var option 
    myChart.setOption(option);
  },
};
</script>
