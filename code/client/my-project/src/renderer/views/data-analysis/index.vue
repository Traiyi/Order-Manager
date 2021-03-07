<template>
  <div>
    <el-container>
      <el-header>
        <el-date-picker
          v-model="listQuery.startDate"
          type="datetime"
          placeholder="请输入开始日期"
          @change="dateFormat1"
          value-format="yyyy-MM-dd HH:MM:SS"
        />

        <el-date-picker
          v-model="listQuery.endDate"
          type="datetime"
          placeholder="请输入结束日期"
          @change="dateFormat2"
          value-format="yyyy-MM-dd HH:MM:SS"
        />

        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="getList"
        >
          筛选
        </el-button>
      </el-header>
      <el-main>
        <el-row type="flex" justify="space-around">
          <div id="areaStack" class="aside-chart"></div>
        </el-row>

        <el-row type="flex" justify="space-around">
          <el-select
            v-model="listQuery.tag1"
            placeholder="请选择"
            @change="handleFilterTag1"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="10">
            <div id="pieRoseType" class="aside-chart" />
          </el-col>
          <el-col :span="10">
            <div id="wordCloud" class="aside-chart" />
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-select
            v-model="options2_value"
            placeholder="请选择"
            @change="handleFilterTag2"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="10">
            <dv-scroll-board :config="config1" class="aside-chart" />
          </el-col>
          <el-col :span="10">
            <dv-scroll-board :config="config2" class="aside-chart" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {
  waterLevelPond,
  barStack,
  pieRoseType,
  wordCloud,
  gaugeMultiTitle,
  themeRiver,
  scrollBoard,
  timeLine,
  countTo,
  scrollRankingBoard,
  areaStack,
} from "./components";
import { dateTime2str } from "@/utils/date";
import {
  getAll,
  getTag,
  getTotal,
  getCustmerTotal,
  getFactoryTotal,
} from "@/api/analysis";

import echarts from "echarts";

import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";

import "echarts/theme/macarons.js";




import {
  pieRoseTypeOption,
  wordCloudOption,
  areaStackOption,
  radarOption,
  gaugeMultiTitleOption,
  scrollBoardConfig,
} from "@/utils/echarts-options";

export default {
  data() {
    return {
      list: undefined,
      listQuery: {
        startDate: dateTime2str(
          new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          "yyyy-MM-dd hh:mm:ss"
        ),
        endDate: dateTime2str(new Date(), "yyyy-MM-dd hh:mm:ss"),
        tag1: "print_surface",
      },
      options1_value: "print_surface",
      options2_value: "order_total_money",
      options1Data: undefined,
      options2_date: undefined,
      options1: undefined,
      options2: [
        {
          value: "order_total_money",
          label: "订单金额",
        },
        {
          value: "order_total_number",
          label: "订单数量",
        },
      ],
      orderTotal: undefined,
      orderFactory: undefined,

      orderCustomer: undefined,
      orderCustomerConfig: undefined,

      titleData: "金额",

      // configData:
      config1: {
        header: ["列1", "列2", "列3"],
        data: [
          ["行1列1", "行1列2", "行1列3"],
          ["行2列1", "行2列2", "行2列3"],
          ["行3列1", "行3列2", "行3列3"],
          ["行4列1", "行4列2", "行4列3"],
          ["行5列1", "行5列2", "行5列3"],
          ["行6列1", "行6列2", "行6列3"],
          ["行7列1", "行7列2", "行7列3"],
          ["行8列1", "行8列2", "行8列3"],
          ["行9列1", "行9列2", "行9列3"],
        ],
        index: true,
        columnWidth: [50],
        align: ["center"],
      },
      config2: {
        header: ["列1", "列2", "列3"],
        data: [
          ["行1列1", "行1列2", "行1列3"],
          ["行2列1", "行2列2", "行2列3"],
          ["行3列1", "行3列2", "行3列3"],
          ["行4列1", "行4列2", "行4列3"],
          ["行5列1", "行5列2", "行5列3"],
          ["行6列1", "行6列2", "行6列3"],
          ["行7列1", "行7列2", "行7列3"],
          ["行8列1", "行8列2", "行8列3"],
          ["行9列1", "行9列2", "行9列3"],
        ],
        index: true,
        columnWidth: [50],
        align: ["center"],
      },
    };
  },
  components: {
    barStack,
    pieRoseType,
    wordCloud,

    countTo,
    scrollBoard,
    scrollRankingBoard,
    timeLine,

    waterLevelPond,
    gaugeMultiTitle,
    themeRiver,
    // areaStack,
  },
  created() {
    this.getList();
    this.get_order_attributes();
    this.handleFilterTag1();
    this.handleFilterTag2();
  },
  methods: {
    getList() {
      getAll(this.listQuery).then((data) => {
        this.list = data;
        this.total = data.length;
        console.log(this.list);
      });
    },
    // handleFilter1() {
    //   this.getList();
    //   this.handleFilterTag1()
    //   this.handleFilterTag2();
    // },
    handleFilterTag1() {
      getTag(this.listQuery).then((data) => {
        this.options1Data = data;
        // this.total = data.length;
        console.log(this.options1Data);
      });
    },
    handleFilterTag2() {
      getTotal(this.listQuery).then((data) => {
        this.orderTotal = data;
        console.log(data);
      });

      getCustmerTotal(this.listQuery).then((data) => {
        this.orderCustomer = data;
        console.log(data);

        this.config1 = scrollBoardConfig(data, "客户", "金额");
      });

      getFactoryTotal(this.listQuery).then((data) => {
        this.orderFactory = data;

        this.config2 = scrollBoardConfig(data, "工厂", "金额");
      });
    },
    get_order_attributes() {
      this.$db.find({}, (err, docs) => {
        if (err) {
          console.log(err);
          // return;
        }
        console.log(docs);
        var order_attributes = [];
        for (let i = 0; i < docs.length; i++) {
          var object = {};
          object.value = docs[i].id;
          object.label = docs[i].name;
          order_attributes.push(object);
        }
        console.log(order_attributes);
        this.options1 = order_attributes;
      });
    },
    dateFormat1(val) {
      // console.log(val);
      this.listQuery.startDate = val;
    },
    dateFormat2(val) {
      // console.log(val);
      this.listQuery.endDate = val;
    },
  },
  updated() {
    // console.log(this.orderTotal);

    var pieRoseTypeChart = echarts.init(
      document.getElementById("pieRoseType"),
      "macarons"
    );
    // 绘制图表
    pieRoseTypeChart.setOption(pieRoseTypeOption(this.options1Data));

    var wordCloudChart = echarts.init(
      document.getElementById("wordCloud"),
      "macarons"
    );
    // 绘制图表
    wordCloudChart.setOption(wordCloudOption(this.options1Data));

    var areaStackChart = echarts.init(document.getElementById("areaStack"));
    // 绘制图表
    areaStackChart.setOption(areaStackOption(this.orderTotal, this.titleData));

    var radarChart = echarts.init(document.getElementById("radar"));
    radarChart.setOption(radarOption());

    var gaugeMultiTitleChart = echarts.init(
      document.getElementById("gaugeMultiTitle")
    );
    gaugeMultiTitleChart.setOption(gaugeMultiTitleOption());
  },
};
</script>



<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  width: 600px;
}

.aside-chart {
  /* background-color: antiquewhite; */
  width: 550px;
  height: 350px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.main-chart {
  width: 50px;
  height: 250px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>