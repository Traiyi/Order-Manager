

export function pieRoseTypeOption(array) {

  var data = []
  for (let i = 0; i < array.length; i++) {
    var object = {}

    object.value = array[i]['total'];
    object.name = array[i]['tag'];
    data.push(object)
  }
  console.log(data)

  var option = {
    legend: {
      top: "bottom",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "面积模式",
        type: "pie",
        radius: [30, 100],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data:data
        // [
        //   { value: 40, name: "rose 1" },
        //   { value: 38, name: "rose 2" },
        //   { value: 32, name: "rose 3" },
        //   { value: 30, name: "rose 4" },
        //   { value: 28, name: "rose 5" },
        //   { value: 26, name: "rose 6" },
        //   { value: 22, name: "rose 7" },
        //   { value: 18, name: "rose 8" },
        // ],
      },
    ],
  };

  return option
}

export function wordCloudOption(array) {
  var worddata = [
    {
      name: "十九大精神",
      value: 15000
    },
    {
      name: "两学一做",
      value: 10081
    }, {
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

  var data = []
  for (let i = 0; i < array.length; i++) {
    var object = {}

    object.value = array[i]['total'];
    object.name = array[i]['tag'];
    data.push(object)
  }
  console.log(data)

  var option = {
    title: {
      // text: "热爱祖国",
      // x: "center"
    },
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
            color: function () {
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
        data: data
      }
    ]
  };

  return option

}
export function areaStackOption(data, titleData) {
  // console.log(data)
  var xData = []
  var yData = []
  for (let i = 0; i < data.length; i++) {
    xData[i] = data[i]["date"];
    yData[i] = data[i]["profit"];
  }
  // console.log(xData);
  // console.log(yData);

  var option = {
    title: {
      text: "订单" + titleData + "变化图",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: [titleData],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: xData,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "邮件营销",
        type: "line",
        stack: "总量",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: yData,
      }
    ],
  };

  return option
}


export function radarOption() {
  var option = {
    title: {
      text: '基础雷达图'
    },
    tooltip: {},
    legend: {
      data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [
        { name: '销售（sales）', max: 6500 },
        { name: '管理（Administration）', max: 16000 },
        { name: '信息技术（Information Techology）', max: 30000 },
        { name: '客服（Customer Support）', max: 38000 },
        { name: '研发（Development）', max: 52000 },
        { name: '市场（Marketing）', max: 25000 }
      ]
    },
    series: [{
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      data: [
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: '预算分配（Allocated Budget）'
        },
        {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: '实际开销（Actual Spending）'
        }
      ]
    }]
  };

  return option;
}

export function gaugeMultiTitleOption() {
  var option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        type: 'gauge',
        detail: {
          formatter: '{value}%',

          offsetCenter: ['0%', '85%']
        },
        data: [{ value: 50, name: '完成率' }]
      },
      {
        type: 'gauge',
        data: [{ value: 10, name: '成率', }]
        , detail: {
          formatter: '{value}%',
          offsetCenter: ['40%', '85%'],
          width: 40,
          height: 14,
          fontSize: 14,
          color: '#fff',
          backgroundColor: 'auto',
          borderRadius: 0,
        },
        title: {
          formatter: '{name}%',
          offsetCenter: ['40%', '70%'],
          fontSize: 18
        },
      },
    ]
  };
  return option

}


export function scrollBoardConfig(data, name, title) {
  // var data = data;
  console.log(data)
  var data2 = [];
  for (let i = 0; i < data.length; i++) {
    var arr = [];
    arr[0] = data[i]["id"];
    arr[1] = data[i]["name"];
    arr[2] = data[i]["total"];
    data2.push(arr);
  }
  // data2
  console.log(data2)
  var config = {
    header: ['编号', name, title],
    data: data2,
    index: true,
    columnWidth: [50],
    align: ['center']
  }
  return config
}
