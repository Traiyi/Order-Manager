<template>
  <div style="padding: 30px">
    订单属性

    <el-collapse v-model="activeNames" @change="handleChange">

      <!-- <el-collapse-item
        v-for="(order_attribute, key) in order_attributes"
        :key="key"
      >
        <template slot="title">
          {{ order_attribute.name }}
          <i class="header-icon el-icon-info"></i>
        </template>

        <el-tag v-for="(data, key) in order_attribute.datas" :key="key">{{
          data
        }}</el-tag>
      </el-collapse-item> -->


      <el-collapse-item
        :key="key"
        v-for="(order_attribute, key) in order_attributes"
      >
        <template slot="title">
          {{ order_attribute.name }}
          <i class="header-icon el-icon-info"></i>
        </template>
        <!-- {{ key }} -->
        <!-- {{ order_attribute }} -->
        <!-- <el-tag
          :key="tag"
          v-for="tag in order_attribute.datas"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+ New Tag</el-button
        > -->
        <tag :data_tag='order_attribute.id'></tag>

      </el-collapse-item>

      <!-- <div v-for="(data, key) in order_attributes" :key="key">
        {{ data.name }}
      </div>

      {{ order_attributes }} -->
    </el-collapse>
  </div>
</template>

<script>
import Tag from "@/components/Tag";

export default {
  components: {
    Tag,
  },
  data() {
    return {
      // activeNames: ["1"],
      order_attributes: null,
      dynamicTags: ["标签一", "标签二", "标签三","标签四"],
      inputVisible: false,
      inputValue: "",
    };
  },
  created() {
    this.get_order_attributes();
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    get_order_attributes() {
      this.$db.find({}, (err, docs) => {
        if (err) {
          console.log(err);
          // return;
        }
        console.log(docs);
        this.order_attributes = docs;
      });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.order_attribute["business_nature"].data.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>