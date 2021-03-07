<template>
  <div>
    <el-container>
      <el-header>
        <el-date-picker
          v-model="listQuery.startDate"
          type="datetime"
          placeholder="请输入开始日期"
          @change="dateFormat"
          value-format="yyyy-MM-dd HH:MM:SS"
        />

        <el-date-picker
          v-model="listQuery.endDate"
          type="datetime"
          placeholder="请输入结束日期"
          @change="dateFormat"
          value-format="yyyy-MM-dd HH:MM:SS"
        />

        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          筛选
        </el-button>
      </el-header>
      <el-main>
        <el-row type="flex" justify="space-around">
          <el-col :span="10">
            <el-row
              ><el-select
                v-model="options1_value"
                placeholder="请选择"
                @change="handleFilterTag"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-row>
            <el-row> <barStack class="aside-chart" /> </el-row>
            <el-row> <pieRoseType class="aside-chart" /> </el-row>
            <el-row> <wordCloud class="aside-chart" /> </el-row>
          </el-col>

          <el-col :span="10">
            <el-row
              ><el-select
                v-model="options2_value"
                placeholder="请选择"
                @change="handleFilterTag2"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-row>
            <el-row>
              <areaStack
                :orderTotal="orderTotal"
                :titleData="titleData"
                class="aside-chart"
              />
            </el-row>
            <el-row>
              <scrollBoard
                :nameData="'客户'"
                :orderData="orderCustomer"
                :titleData="'titleDatac'"
                class="aside-chart"
            /></el-row>
            <el-row>
              <scrollBoard
                :nameData="'工厂'"
                :orderData="orderFactory"
                :titleData="'titleDataf'"
                class="aside-chart"
            /></el-row>
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
      },
      options1_value: "print_surface",
      options2_value: "order_total_money",
      options1_data: undefined,
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
      orderCustomer: undefined,
      orderFactory: undefined,
      titleData: "金额",
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
    areaStack,
  },
  created() {
    this.getList();
    this.get_order_attributes();
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
    handleFilter() {
      this.getList();
    },
    handleFilterTag() {
      getTag(this.listQuery).then((data) => {
        // this.list = data;
        // this.total = data.length;
        // console.log(this.list);
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
      });

      getFactoryTotal(this.listQuery).then((data) => {
        this.orderFactory = data;
        console.log(data);
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
    dateFormat(val) {
      console.log(val);
      this.temp.date = val;
    },
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
  background-color: antiquewhite;
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