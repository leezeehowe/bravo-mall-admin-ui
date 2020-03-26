<template>
  <div>
    <br>
    <!-- 表格 -->
    <webpage-resource-table></webpage-resource-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import WebpageResourceTable from "_c/webpage-resource/table";

export default {
  name: "webpage-resource-index",
  components: {
    WebpageResourceTable
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
</style>