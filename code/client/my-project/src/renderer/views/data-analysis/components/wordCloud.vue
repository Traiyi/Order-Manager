<template>
    <div id="mywordcloud" :data="worddata"></div>
</template>
<script>
  import echarts from "echarts";
  import "echarts-wordcloud/dist/echarts-wordcloud";
  import "echarts-wordcloud/dist/echarts-wordcloud.min";
    export default {
      name: "VueWordCloud",
      data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          worddata: [
            {
              name: "十九大精神",
              value: 15000
            },
            {
              name: "两学一做",
              value: 10081
            },{
              name: "中华民族",
              value: 9386
            },
            {
              name: "马克思主义",
              value: 7500
            },
            {
              name: "民族复兴",
              value: 7500
            },
            {
              name: "社会主义制度",
              value: 6500
            },
            {
              name: "国防白皮书",
              value: 6500
            },
            {
              name: "创新",
              value: 6000
            },
            {
              name: "民主革命",
              value: 4500
            },
            {
              name: "文化强国",
              value: 3800
            },
            {
              name: "国家主权",
              value: 3000
            },
            {
              name: "伟大复兴",
              value: 2500
            },
            {
              name: "领土完整",
              value: 2300
            },
            {
              name: "安全",
              value: 2000
            },
            {
              name: "从严治党",
              value: 1900
            },
            {
              name: "现代化经济体系",
              value: 1800
            },
            {
              name: "国防动员",
              value: 1700
            },
            {
              name: "信息化战争",
              value: 1600
            },
            {
              name: "局部战争",
              value: 1500
            },
            {
              name: "教育",
              value: 1200
            },
            {
              name: "中国梦",
              value: 1100
            },
            {
              name: "孙子兵法",
              value: 900
            },
            {
              name: "一国两制",
              value: 800
            },
            {
              name: "特色社会主义思想",
              value: 700
            },
          ]
        }
      },
      mounted(){
        this.initChart();
      },
      methods: {
        initChart() {
          this.chart = echarts.init(document.getElementById("mywordcloud"));
          console.log('lll');
          const option = {
            title: {
              text: "热爱祖国",
              x: "center"
            },
            backgroundColor: "#fff",
            // tooltip: {
            //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
            // },
            series: [
              {
                type: "wordCloud",
                //用来调整词之间的距离
                gridSize: 10,
                //用来调整字的大小范围
                // Text size range which the value in data will be mapped to.
                // Default to have minimum 12px and maximum 60px size.
                sizeRange: [14, 60],
                // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
                //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
                // rotationRange: [-45, 0, 45, 90],
                // rotationRange: [ 0,90],
                rotationRange: [0, 0],
                //随机生成字体颜色
                // maskImage: maskImage,
                textStyle: {
                  normal: {
                    color: function() {
                      return (
                        "rgb(" +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ")"
                      );
                    }
                  }
                },
                //位置相关设置
                // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                // Default to be put in the center and has 75% x 80% size.
                left: "center",
                top: "center",
                right: null,
                bottom: null,
                width: "200%",
                height: "200%",
                //数据
                data: this.worddata
              }
            ]
          };
          this.chart.setOption(option);
        },
      }
    }
</script>
import echarts from "echarts";
import "echarts-wordcloud";
export default {
  data() {
    return {
      symbolUrl:
        "data:image/png;base64,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",
      presents: [
        "发热",
        "贫血",
        "感染",
        "出血",
        "骨关节疼痛",
        "抽搐",
        "牙痛",
        "牙龈肿胀",
        "心包积液",
        "双下截肢瘫",
        "儿童",
        "急性",
        "化疗",
        "髓样",
        "慢性",
        "护理",
        "失明",
        "淋巴细胞",
        "细胞凋亡",
      ],
      data: [],
    };
  },
  created() {},
  methonds: {
    getData() {
      for (var i = 0; i < presents.length; ++i) {
        this.data.push({
          name: this.presents[i],
          value: (this.presents.length - i) * 20,
        });
      }
      for (var i = 10; i < this.presents.length; ++i) {
        var cnt = Math.floor(Math.random() * 10);
        for (var j = 0; j < cnt; ++j) {
          this.data.push({
            name: this.presents[i],
            value: Math.random() * 10,
          });
        }
      }
      console.log(this.data);
    },
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var maskImage = new Image();
    var myChart = echarts.init(document.getElementById("wordCloud"));
    // 绘制图表
    var option = {
      tooltip: {
        show: false,
      },
      grid: {
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
      },
      xAxis: {
        type: "category",
        show: false,
      },
      yAxis: {
        max: 100,
        show: false,
      },
      series: [
        {
          type: "wordCloud",
          sizeRange: [8, 60],
          rotationRange: [-30, 30],
          maskImage: maskImage,
          textPadding: 0,
          gridSize: 5,
          width: "60%",
          height: "65%",
          left: "center",
          top: "center",
          drawOutOfBound: false,
          textStyle: {
            normal: {
              color: function () {
                return (
                  "rgb(" +
                  [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                  ].join(",") +
                  ")"
                );
              },
            },
          },
          data: data,
        },
      ],
    };
    maskImage.src = symbolUrl;
    myChart.setOption(option);
  },
};
</script>
