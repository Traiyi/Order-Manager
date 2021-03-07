<template>
  <div class="app-container">
    <div class="filter-container">
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

      <el-table-column label="用户名" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="密码" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.password }}</span>
        </template>
      </el-table-column>

      <el-table-column label="身份" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名字" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>

        <el-form-item label="身份">
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
        </el-form-item>

        <el-form-item label="名字" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
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

import { getUserAll, createUser, updateUser, deleteUser } from "@/api/user";
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination";

export default {
  name: "UserInfo",
  components: { Pagination },
  directives: { waves },
  filters: {
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  data() {
    return {
      test: null,
      tableKey: 0,
      list: null,
      total: 0,
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
      statusOptions: [
        { key: 1, display_name: "管理员" },
        { key: 2, display_name: "用户" },
      ],

      showReviewer: false,
      temp: {
        id: undefined,
        username: "",
        password: "",
        user: 2,
        name: "",
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
        type: [
          { required: true, message: "type is required", trigger: "change" },
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" },
        ],
      },
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getUserAll(this.listQuery).then((data) => {
        this.list = data.res;
        this.total = data.total[0]["COUNT(*)"];

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
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success",
      });
      row.status = status;
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
        username: "user",
        password: "user",
        status: 2,
        name: "用户",
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

      createUser(this.temp).then(() => {
        this.list.unshift(this.temp);
        this.dialogFormVisible = false;
        this.$notify({
          title: "Success",
          message: "Created Successfully",
          type: "success",
          duration: 2000,
        });
      });
      this.getList();
      // }
      // });
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

      updateUser(tempData).then(() => {
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

      deleteUser(index).then(() => {
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
  },
};
</script>
