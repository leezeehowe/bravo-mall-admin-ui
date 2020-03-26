<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="12">
        <Card>
          <p slot="title">添加页面资源</p>
          <webpage-form-add></webpage-form-add>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import WebpageFormAdd from "@/components/webpage-resource/form-add";
export default {
  name: "",
  components: {
    WebpageFormAdd
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
</style>