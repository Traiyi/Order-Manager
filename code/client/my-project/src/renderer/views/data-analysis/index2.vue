<template>
  <div>
    
    <el-row>

    </el-row>

        <el-row>

    </el-row>
            <el-row>
              <barStack class="aside-chart"></barStack>
            </el-row>
            <el-row>
              <pieRoseType class="aside-chart"></pieRoseType>
            </el-row>
            <el-row> <wordCloud class="aside-chart"></wordCloud> </el-row>
          </el-aside>
          <el-main> 1 </el-main>
          <el-aside>
            <el-row> <scrollBoard class="aside-chart"></scrollBoard></el-row>

            <el-row> <scrollBoard class="aside-chart"></scrollBoard></el-row>

            <el-row>
              <themeRiver class="aside-chart"></themeRiver>
            </el-row>
         
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
} from "./components";

import { getAll } from "@/api/analysis";

export default {
  data() {
    return {
      list: undefined,
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
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getAll.then((data) => {
        this.list = data;
        this.total = data.length;
        console.log(this.list);
      });
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
  width: 400px;
  height: 450px;
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