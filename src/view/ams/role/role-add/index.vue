<template>
  <div>
    <Row type="flex" justify="center" class-name="m-t-s">
      <Col>
        <Steps :current="current-1">
          <Step
            v-for="(item, index) in steps"
            :key="index"
            :title="item.title"
            :content="item.content"
          ></Step>
        </Steps>
      </Col>
    </Row>
    <Row type="flex" justify="center" class-name="m-t-m">
      <Col :xxl="8" :xl="12" :lg="14" :md="18" :sm="20" :xs="24">
        <Card>
          <p slot="title">
            <!-- <Icon type="ios-film-outline"></Icon> -->
            角色-{{steps[current-1].title}}
          </p>
          <ButtonGroup :size="buttonSize" slot="extra" shape="circle">
            <Button
              :size="buttonSize"
              type="primary"
              ghost
              @click="handlePreForm"
              :disabled="btnPreFormDisabled"
            >
              <Icon type="ios-arrow-back" />上一步
            </Button>
            <Button
              :size="buttonSize"
              type="primary"
              @click="handleNextForm"
              :disabled="btnNextFormDisabled"
            >
              下一步
              <Icon type="ios-arrow-forward" />
            </Button>
          </ButtonGroup>
          <keep-alive>
            <component v-bind:is="formComponents[current-1]"></component>
          </keep-alive>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import BasicForm from "_c/basic-role-form";
import AuthorityForm from "_c/authority-role-form";

export default {
  name: "addRolePage",
  components: {
    BasicForm,
    AuthorityForm
  },
  data() {
    return {
      // 步骤信息
      steps: [
        {
          title: "基本信息",
          content: "输入角色的基本信息"
        },
        {
          title: "关联资源",
          content: "为角色关联资源，赋予权限"
        },
        {
          title: "完成",
          content: "新的角色诞生了"
        }
      ],
      btnNextFormDisabled: false,
      btnPreFormDisabled: true,
      buttonSize: "default",
      formComponents: [BasicForm, AuthorityForm],
      current: 1
    };
  },
  watch: {
    current(n, o) {
      n === this.formComponents.length
        ? (this.btnNextFormDisabled = true)
        : (this.btnNextFormDisabled = false);
      n === 1
        ? (this.btnPreFormDisabled = true)
        : (this.btnPreFormDisabled = false);
    }
  },
  methods: {
    handleNextForm(e) {
      this.current = this.current + 1;
    },
    handlePreForm(e) {
      this.current = this.current - 1;
    }
  }
};
</script>

<style>
</style>