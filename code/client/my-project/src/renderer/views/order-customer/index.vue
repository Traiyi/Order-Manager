<template>
  <div class="app-container">
    <div class="filter-container">



      <el-input
        v-model="listQuery.name"
        placeholder="Name"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索 
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加 
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出Excel 
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户名" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.customer_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="报价（单位：RMB）" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.quote_rmb }}</span>
        </template>
      </el-table-column>

      <el-table-column label="报价（单位：USD）" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.quote_usd }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="状态（是否已向工厂下单）"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{ row }">
          <el-tag
            v-if="row.is_factory == 0"
            :type="row.is_factory | statusFilter"
          >
            未下单
          </el-tag>

          <el-tag
            v-if="row.is_factory == 1"
            :type="row.is_factory | statusFilter"
          >
            已下单
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="业务性质">
              <span>{{ props.row.business_nature }}</span>
            </el-form-item>
            <el-form-item label="品牌">
              <span>{{ props.row.brand }}</span>
            </el-form-item>
            <el-form-item label="国别">
              <span>{{ props.row.country }}</span>
            </el-form-item>
            <el-form-item label="询盘号">
              <span>{{ props.row.inquiry_number }}</span>
            </el-form-item>
            <el-form-item label="日期">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="纸袋形式">
              <span>{{ props.row.pape_bag_form }}</span>
            </el-form-item>
            <el-form-item label="询盘尺寸">
              <span>{{ props.row.the_size_of_the_inquiry }}</span>
            </el-form-item>
            <el-form-item label="调整后尺寸">
              <span>{{ props.row.adjusted_dimensions }}</span>
            </el-form-item>
            <el-form-item label="数量">
              <span>{{ props.row.quantity }}</span>
            </el-form-item>
            <el-form-item label="纸张">
              <span>{{ props.row.paper }}</span>
            </el-form-item>
            <el-form-item label="纸张价格">
              <span>{{ props.row.paper_price }}</span>
            </el-form-item>
            <el-form-item label="双面胶">
              <span>{{ props.row.double_sided_glue }}</span>
            </el-form-item>
            <el-form-item label="双面胶长度">
              <span>{{ props.row.double_sided_glue_length }}</span>
            </el-form-item>
            <el-form-item label="克重">
              <span>{{ props.row.g_weight }}</span>
            </el-form-item>
            <el-form-item label="提手">
              <span>{{ props.row.handle }}</span>
            </el-form-item>
            <el-form-item label="提手颜色">
              <span>{{ props.row.handle_color }}</span>
            </el-form-item>
            <el-form-item label="提手边片印刷">
              <span>{{ props.row.handle_print }}</span>
            </el-form-item>
            <el-form-item label="印刷颜色">
              <span>{{ props.row.print_color }}</span>
            </el-form-item>
            <el-form-item label="印刷面积">
              <span>{{ props.row.print_area }}</span>
            </el-form-item>
            <el-form-item label="印刷面">
              <span>{{ props.row.print_surface }}</span>
            </el-form-item>
            <el-form-item label="纸袋内部印刷颜色">
              <span>{{
                props.row.the_color_printed_inside_the_paper_bag
              }}</span>
            </el-form-item>
            <el-form-item label="纸袋内部印刷颜色面积">
              <span>{{ props.row.the_area_printed_inside_the_paper_bag }}</span>
            </el-form-item>
            <el-form-item label="光油">
              <span>{{ props.row.light_oil }}</span>
            </el-form-item>
            <el-form-item label="烫金颜色">
              <span>{{ props.row.the_color_of_the_bronzing }}</span>
            </el-form-item>
            <el-form-item label="烫金面积">
              <span>{{ props.row.the_area_of_the_bronzing }}</span>
            </el-form-item>
            <el-form-item label="压纹">
              <span>{{ props.row.press }}</span>
            </el-form-item>
            <el-form-item label="只/箱">
              <span>{{ props.row.the_number_of_per_box }}</span>
            </el-form-item>
            <el-form-item label="GW">
              <span>{{ props.row.gw_kgs }}</span>
            </el-form-item>
            <el-form-item label="纸箱规格">
              <span>{{ props.row.carton_specification_cm }}</span>
            </el-form-item>
            <el-form-item label="出厂含税价格RMB">
              <span>{{ props.row.factory_with_tax_price }}</span>
            </el-form-item>
            <el-form-item label="运费">
              <span>{{ props.row.shipping }}</span>
            </el-form-item>
            <el-form-item label="打样费">
              <span>{{ props.row.the_cost_of_the_sample }}</span>
            </el-form-item>
            <el-form-item label="版费">
              <span>{{ props.row.royalties }}</span>
            </el-form-item>
            <el-form-item label="交期">
              <span>{{ props.row.delivery }}</span>
            </el-form-item>
            <el-form-item label="汇率">
              <span>{{ props.row.exchange_rate }}</span>
            </el-form-item>
            <el-form-item label="报价（单位：RMB）">
              <span>{{ props.row.quote_rmb }}</span>
            </el-form-item>
            <el-form-item label="报价（单位：USD）">
              <span>{{ props.row.quote_usd }}</span>
            </el-form-item>
            <el-form-item label="毛利">
              <span>{{ props.row.profit }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="Actions"
        align="center"
        width="500"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="row.is_factory != 0"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 0)"
          >
            取消下单
          </el-button>
          <el-button
            v-if="row.is_factory != 1"
            size="mini"
            @click="handleModifyStatus(row, 1)"
          >
            下单
          </el-button>

          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>

          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

        <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="客户" prop="customer_id">
          <el-select
            v-model="temp.customer_id"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="工厂" prop="factory_id">
          <el-select
            v-model="temp.factory_id"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in factoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="业务性质" prop="business_nature">
          <!-- <el-input v-model="temp.business_nature" /> -->
          <el-select
            v-model="temp.business_nature"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in orderAttributes.business_nature"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="temp.brand" />
        </el-form-item>
        <el-form-item label="国别" prop="country">
          <el-input v-model="temp.country" />
        </el-form-item>
        <el-form-item label="询盘号" prop="inquiry_number">
          <el-input v-model="temp.inquiry_number" />
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <!-- <el-input v-model="temp.date" /> -->
          <el-date-picker
            v-model="temp.date"
            type="datetime"
            placeholder="请输入日期"
            @change="dateFormat"
            value-format="yyyy-MM-dd HH:MM:SS"
          />
        </el-form-item>
        <el-form-item label="纸袋形式" prop="pape_bag_form">
          <!-- <el-input v-model="temp.pape_bag_form" /> --><el-select
            v-model="temp.pape_bag_form"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in orderAttributes.pape_bag_form"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="询盘尺寸" prop="the_size_of_the_inquiry">
          <el-input v-model="temp.the_size_of_the_inquiry" />
        </el-form-item>
        <el-form-item label="调整后尺寸" prop="adjusted_dimensions">
          <el-input v-model="temp.adjusted_dimensions" />
        </el-form-item>
        <el-form-item label="数量 (只）" prop="quantity">
          <el-input v-model="temp.quantity" />
        </el-form-item>
        <el-form-item label="纸张" prop="paper">
          <!-- <el-input v-model="temp.paper" /> -->
          <el-select
            v-model="temp.paper"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in orderAttributes.paper"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="纸张价格" prop="paper_price">
          <el-input v-model="temp.paper_price" />
        </el-form-item>
        <el-form-item label="双面胶" prop="double_sided_glue">
          <!-- <el-input v-model="temp.double_sided_glue" /> -->
          <el-select
            v-model="temp.double_sided_glue"
            class="filter-item"
            placeholder="双面胶"
          >
            <el-option
              v-for="item in orderAttributes.double_sided_glue"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="双面胶长度" prop="double_sided_glue_length">
          <!-- <el-input v-model="temp.double_sided_glue_length" /> -->

          <el-select
            v-model="temp.double_sided_glue_length"
            class="filter-item"
            placeholder="双面胶长度"
          >
            <el-option
              v-for="item in orderAttributes.double_sided_glue_length"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="克重 (g)" prop="g_weight">
          <!-- <el-input v-model="temp.g_weight" /> -->

          <el-select
            v-model="temp.g_weight"
            class="filter-item"
            placeholder="请输入克重 (g)"
          >
            <el-option
              v-for="item in orderAttributes.g_weight"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提手" prop="handle">
          <!-- <el-input v-model="temp.handle" /> -->

          <el-select
            v-model="temp.handle"
            class="filter-item"
            placeholder="提手"
          >
            <el-option
              v-for="item in orderAttributes.handle"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提手颜色" prop="handle_color">
          <!-- <el-input v-model="temp.handle_color" /> -->

          <el-select
            v-model="temp.handle_color"
            class="filter-item"
            placeholder="提手颜色"
          >
            <el-option
              v-for="item in orderAttributes.handle_color"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提手边片印刷" prop="handle_print">
          <!-- <el-input v-model="temp.handle_print" /> -->
          <el-select
            v-model="temp.handle_print"
            class="filter-item"
            placeholder="提手边片印刷"
          >
            <el-option
              v-for="item in orderAttributes.handle_print"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="印刷颜色" prop="print_color">
          <!-- <el-input v-model="temp.print_color" /> -->
          <el-select
            v-model="temp.print_color"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in orderAttributes.print_color"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="印刷面积" prop="print_area">
          <!-- <el-input v-model="temp.print_area" /> -->
          <el-select
            v-model="temp.print_area"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in orderAttributes.print_area"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="印刷面" prop="print_surface">
          <!-- <el-input v-model="temp.print_surface" /> -->
          <el-select
            v-model="temp.print_surface"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in orderAttributes.print_surface"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="纸袋内部印刷颜色"
          prop="the_color_printed_inside_the_paper_bag"
        >
          <!-- <el-input v-model="temp.the_color_printed_inside_the_paper_bag" /> -->
          <el-select
            v-model="temp.the_color_printed_inside_the_paper_bag"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in orderAttributes.the_color_printed_inside_the_paper_bag"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="纸袋内部印刷颜色面积"
          prop="the_area_printed_inside_the_paper_bag"
        >
          <!-- <el-input v-model="temp.the_area_printed_inside_the_paper_bag" /> -->
          <el-select
            v-model="temp.the_area_printed_inside_the_paper_bag"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in orderAttributes.the_area_printed_inside_the_paper_bag"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="光油" prop="light_oil">
          <!-- <el-input v-model="temp.light_oil" /> -->
        </el-form-item>

        <el-form-item label="烫金颜色" prop="the_color_of_the_bronzing">
          <!-- <el-input v-model="temp.the_color_of_the_bronzing" /> -->

          <el-select
            v-model="temp.the_color_of_the_bronzing"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in orderAttributes.the_color_of_the_bronzing"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="烫金面积" prop="the_area_of_the_bronzing">
          <el-input v-model="temp.the_area_of_the_bronzing" />
        </el-form-item>
        <el-form-item label="压纹" prop="press">
          <el-input v-model="temp.press" />
        </el-form-item>
        <el-form-item label="只/箱" prop="the_number_of_per_box">
          <!-- <el-input v-model="temp.the_number_of_per_box" /> -->

          <el-select
            v-model="temp.the_number_of_per_box"
            class="filter-item"
            placeholder="业务性质"
          >
            <el-option
              v-for="item in orderAttributes.the_number_of_per_box"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="GW KGS" prop="gw_kgs">
          <el-input v-model="temp.gw_kgs" />
        </el-form-item>
        <el-form-item label="纸箱规格 CM" prop="carton_specification_cm">
          <el-input v-model="temp.carton_specification_cm" />
        </el-form-item>
        <el-form-item label="出厂含税价格RMB" prop="factory_with_tax_price">
          <el-input v-model="temp.factory_with_tax_price" />
        </el-form-item>
        <el-form-item label="运费" prop="shipping">
          <el-input v-model="temp.shipping" />
        </el-form-item>
        <el-form-item label="打样费" prop="the_cost_of_the_sample">
          <el-input v-model="temp.the_cost_of_the_sample" />
        </el-form-item>
        <el-form-item label="版费" prop="royalties">
          <el-input v-model="temp.royalties" />
        </el-form-item>
        <el-form-item label="交期" prop="delivery">
          <!-- <el-input v-model="temp.delivery" /> -->
          <el-date-picker
            v-model="temp.delivery"
            type="datetime"
            placeholder="请输入日期"
            @change="deliveryFormat"
            value-format="yyyy-MM-dd HH:MM:SS"
          />
        </el-form-item>
        <el-form-item label="汇率" prop="exchange_rate">
          <el-input v-model="temp.exchange_rate" />
        </el-form-item>
        <el-form-item label="报价RMB" prop="quote_rmb">
          <el-input v-model="temp.quote_rmb" />
        </el-form-item>
        <el-form-item label="报价USD" prop="quote_usd">
          <el-input v-model="temp.quote_usd" />
        </el-form-item>
        <el-form-item label="毛利" prop="profit">
          <el-input v-model="temp.profit" />
        </el-form-item>

        <!-- <el-form-item label="身份">
            <el-select
              v-model="temp.status"
              class="filter-item"
              placeholder="Status"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.key"
                :label="item.display_name"
                :value="item.key"
              />
            </el-select>
          </el-form-item> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> Cancel </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>

import {
  getAll,
  createOrderCustomer,
  updateOrderCustomer,
  deleteOrderCustomer,
} from "@/api/order-customer";

import { getFactoryAll } from "@/api/factory";

import { getCustomerAll } from "@/api/customer";

import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { dateTime2str } from "@/utils/date";
// arr to obj, such as { CN : "China", US : "USA" }

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  data() {
    return {
      customerList: [],
      factoryList: [],
      test: null,
      tableKey: 0,
      list: null,
      total: 0,
      orderAttributes: {},
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: "ASC",
      },
      importanceOptions: [1, 2, 3],

      sortOptions: [
        { label: "顺序", key: "ASC" },
        { label: "逆序", key: "DESC" },
      ],
      // statusOptions: [
      //   { key: 1, display_name: "管理员" },
      //   { key: 2, display_name: "用户" },
      // ],

      showReviewer: false,
      temp: {
        id: undefined,
        customer_id: 1,
        factory_id: 1,
        is_factory: 1,
        business_nature: "内贸",
        brand: "美宣",
        country: "中国",
        inquiry_number: 100000,
        date: dateTime2str(new Date(), "yyyy-MM-dd hh:mm:ss"),
        // date: new Date(),
        pape_bag_form: "齿口圆绳",
        the_size_of_the_inquiry: 8.44,
        adjusted_dimensions: 9.32,
        quantity: 2,
        paper: "箱板纸",
        paper_price: 4.69,
        double_sided_glue: "1条",
        double_sided_glue_length: "贴片长",
        g_weight: 40,
        handle: "圆提手",
        handle_color: "白色",
        handle_print: "无",
        print_color: "无",
        print_area: "10%",
        print_surface: "单面",
        the_color_printed_inside_the_paper_bag: "无",
        the_area_printed_inside_the_paper_bag: "100%+光油",
        light_oil: "哑光",
        the_color_of_the_bronzing: "1色",
        the_area_of_the_bronzing: 0.21,
        press: 6.05,
        the_number_of_per_box: 50,
        gw_kgs: 7.04,
        carton_specification_cm: 5.69,
        factory_with_tax_price: 6.36,
        shipping: 48.03,
        the_cost_of_the_sample: 23.7,
        royalties: 70.2,
        delivery: dateTime2str(new Date(), "yyyy-MM-dd hh:mm:ss"),
        // delivery: new Date(),
        exchange_rate: 59.64,
        quote_rmb: 59.89,
        quote_usd: 48.43,
        profit: 48.43,
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [
        //   { required: true, message: "type is required", trigger: "change" },
        // ],
        // date: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "date is required",
        //     trigger: "change",
        //   },
        // ],
        // delivery: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "delivery is required",
        //     trigger: "change",
        //   },
        // ],
        // title: [
        //   { required: true, message: "title is required", trigger: "blur" },
        // ],
      },
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
    this.get_orderAttributes();
    this.getCustomerList();
    this.getFactoryList();
  },
  methods: {
    dateFormat(val) {
      console.log(val);
      this.temp.date = val;
    },
    deliveryFormat(val) {
      console.log(val);
      this.temp.delivery = val;
    },
    getList() {
      this.listLoading = true;
      getAll().then((data) => {
        console.log("init3");
        console.log(data);
        console.log(data.length);
        this.list = data;
        this.total = data.length;
        console.log(this.list);

        setTimeout(() => {
          this.listLoading = false;
        }, 0.5 * 1000);
      });

      console.log;
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, is_factory) {
      this.$message({
        message: "操作Success",
        type: "success",
      });
      row.is_factory = is_factory;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "ASC";
      } else {
        this.listQuery.sort = "DESC";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        customer_id: 1,
        factory_id: 1,
        is_factory: 1,
        business_nature: "内贸",
        brand: "美宣",
        country: "中国",
        inquiry_number: 100000,
        date: dateTime2str(new Date(), "yyyy-MM-dd hh:mm:ss"),
        // date: new Date(),
        pape_bag_form: "齿口圆绳",
        the_size_of_the_inquiry: 8.44,
        adjusted_dimensions: 9.32,
        quantity: 2,
        paper: "箱板纸",
        paper_price: 4.69,
        double_sided_glue: "1条",
        double_sided_glue_length: "贴片长",
        g_weight: 40,
        handle: "圆提手",
        handle_color: "白色",
        handle_print: "无",
        print_color: "无",
        print_area: "10%",
        print_surface: "单面",
        the_color_printed_inside_the_paper_bag: "无",
        the_area_printed_inside_the_paper_bag: "100%+光油",
        light_oil: "哑光",
        the_color_of_the_bronzing: "1色",
        the_area_of_the_bronzing: 0.21,
        press: 6.05,
        the_number_of_per_box: 50,
        gw_kgs: 7.04,
        carton_specification_cm: 5.69,
        factory_with_tax_price: 6.36,
        shipping: 48.03,
        the_cost_of_the_sample: 23.7,
        royalties: 70.2,
        delivery: dateTime2str(new Date(), "yyyy-MM-dd hh:mm:ss"),
        // delivery: new Date(),
        exchange_rate: 59.64,
        quote_rmb: 59.89,
        quote_usd: 48.43,
        profit: 48.43,
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      // this.$refs["dataForm"].validate((valid) => {
      // if (valid) {
      // this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
      // this.temp.author = "vue-element-admin";
      console.log("this.temp");
      console.log(this.temp);
      createOrderCustomer(this.temp).then(() => {
        // this.list.unshift(this.temp);
        this.dialogFormVisible = false;
        this.$notify({
          title: "Success",
          message: "Created Successfully",
          type: "success",
          duration: 2000,
        });
      });
      this.getList();
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      const tempData = Object.assign({}, this.temp);

      updateOrderCustomer(tempData).then(() => {
        const index = this.list.findIndex((v) => v.id === this.temp.id);
        this.list.splice(index, 1, this.temp);
        this.dialogFormVisible = false;
        this.$notify({
          title: "Success",
          message: "Update Successfully",
          type: "success",
          duration: 2000,
        });
      });
    },

    handleDelete(row, index) {
      index = index + 1;
      console.log("index");
      console.log(index);

      deleteOrderCustomer(index).then(() => {
        const index = this.list.findIndex((v) => v.id === this.temp.id);
        this.list.splice(index, 1);
        // this.dialogFormVisible = false;
        this.$notify({
          title: "Success",
          message: "Update Successfully",
          type: "success",
          duration: 2000,
        });
      });

      this.getList();
    },

    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },

    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["id", "name", "telephone"];
        const filterVal = ["id", "name", "telephone"];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },

    get_orderAttributes() {
      this.$db.find({}, (err, docs) => {
        if (err) {
          console.log(err);
          // return;
        }
        console.log("order attributes");
        console.log(docs);
        // this.orderAttributes = docs;
        for (let i = 0; i < docs.length; i++) {
          // console.log(docs[i]["id"]+docs[i]["datas"])
          this.orderAttributes[docs[i]["id"]] = docs[i]["datas"];
        }
        console.log(this.orderAttributes);
        console.log("object");
        console.log(this.orderAttributes.pape_bag_form);
        console.log("object2");
      });
    },
    getCustomerList() {
      getCustomerAll().then((data) => {
        for (let i = 0; i < data.length; i++) {
          var customer = {};
          customer["id"] = data[i]["id"];
          customer["name"] = data[i]["name"];
          this.customerList[i] = customer;
          console.log(this.customerList);
        }
      });
    },

    getFactoryList() {
      getFactoryAll().then((data) => {
        for (let i = 0; i < data.length; i++) {
          var factory = {};
          factory["id"] = data[i]["id"];
          factory["name"] = data[i]["name"];
          this.factoryList[i] = factory;
          console.log(this.factoryList);
        }
      });
    },
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>