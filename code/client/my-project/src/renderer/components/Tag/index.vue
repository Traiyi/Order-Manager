<template>
  <div>
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
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
    >
    <!-- {{ key }} -->
  </div>
</template>

<script>
export default {
  props: ["data_tag"],
  data() {
    return {
      dynamicTags: null,
      inputVisible: false,
      inputValue: "",
      key: "",
    };
  },
  created() {
    this.key = this.data_tag;
    this.find_all_order_attribute_datas();
  },
  methods: {
    find_all_order_attribute_datas() {
      this.$db.find({ id: this.key }, (err, docs) => {
        if (err) {
          console.log(err);

          // return;
        }
        console.log(docs);
        this.dynamicTags = docs[0]["datas"];
      });
    },

    update_all_order_attribute_datas() {
      this.$db.find({ name: key }, (err, docs) => {
        if (err) {
          console.log(err);
          // return;
        }
        console.log(docs);
        // this.order_attributes = docs[0]["order"];
      });
    },

    delete_all_order_attribute_datas() {
      this.$db.find({ name: key }, (err, docs) => {
        if (err) {
          console.log(err);
          // return;
        }
        console.log(docs);
        // this.order_attributes = docs[0]["order"];
      });
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.$db.update(
        { id: this.key },
        { $set: { datas: this.dynamicTags } },
        (err, docs) => {
          if (err) {
            console.log(err);
            // return;
          }
          console.log(docs);
          // this.order_attributes = docs[0]["order"];
        }
      );
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
        this.dynamicTags.push(inputValue);

        this.$db.update(
          { id: this.key },
          { $set: { datas: this.dynamicTags } },
          (err, docs) => {
            if (err) {
              console.log(err);
              // return;
            }
            console.log(docs);
            // this.order_attributes = docs[0]["order"];
          }
        );
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