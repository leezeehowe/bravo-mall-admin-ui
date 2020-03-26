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
          <keep-alive>
            <component v-bind:is="formComponents[current-1]" @createRoleSuccess="handleCreateRoleSuccess" :id="createdRole.id" :name="createdRole.name" :level="createdRole.level"></component>
          </keep-alive>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import BasicForm from "_c/role/basic-role-form";
import AuthorityForm from "_c/role/authority-role-form";

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
      formComponents: [BasicForm, AuthorityForm],
      current: 1,
      // 创建的角色基本信息
      createdRole: {}
    };
  },
  methods: {
    handleCreateRoleSuccess(role) {
      this.createdRole = role;
      this.current = this.current + 1;
    }
  }
};
</script>

<style>
</style>