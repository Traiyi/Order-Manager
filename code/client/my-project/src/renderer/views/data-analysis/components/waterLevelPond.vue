<template>
  <dv-water-level-pond :config="config" />
</template>
<script>
export default {
  data() {
    return {
      config: {
        data: [66, 45],
        shape: "roundRect",
      },
    };
  },
};
</script>
