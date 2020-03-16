<template>
  <div>
    <Collapse>
      <Panel name="1" style="font-size: 15px;">
        添加页面资源
        <div slot="content">
          <webpage-resource-form></webpage-resource-form>
        </div>
      </Panel>
    </Collapse>
    <br>
    <!-- 表格 -->
    <webpage-resource-table></webpage-resource-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import WebpageResourceTable from "_c/webpage-resource/table";
import WebpageResourceForm from "_c/webpage-resource/form-add";

export default {
  name: "webpage-resource-index",
  components: {
    WebpageResourceTable,
    WebpageResourceForm
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
</style>