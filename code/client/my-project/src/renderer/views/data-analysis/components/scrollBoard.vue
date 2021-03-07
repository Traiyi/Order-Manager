<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: "ScrollBoard",
  props: ["nameData", "orderData", "titleData"],
  created() {
    this.getData();
  },
  methods: {
    getData() {
      console.log("11111")
      console.log(this.nameData)
      console.log(this.orderData)
      console.log(this.titleData)
      var array = this.orderCustomer;
      var data = [];
      for (let i = 0; i < array.length; i++) {
        var arr = [];
        arr[0] = array[i]["name"];

        arr[1] = array[i]["total"];
        data.push(arr);
      }
      this.totalData = data;
    },
  },
  data() {
    return {
      totalData:undefined,
     
    };
  },
};
</script>


