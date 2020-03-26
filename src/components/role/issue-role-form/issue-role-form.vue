<style lang="less">
.m-t {
  margin-top: 15px;
}
</style>
<template>
  <div>
    <search-user @on-result-change="handleUserSearchResultChange" :show-result="false"></search-user>
    <br />
    <Card>
      <p slot="title">
        <Icon type="md-add" size="30" />授予用户角色
      </p>
      <Row :gutter="60" type="flex" justify="center" align="middle">
        <Col>
          <Card style="width:320px">
            <div style="text-align:center">
              <Avatar :src="user.avatar" icon="ios-person" size="80" />
            </div>
            <Row :gutter="10" type="flex" justify="center" align="middle" class-name="m-t">
              <Col span="12">
                <div style="text-align: right;">
                  <p>ID:</p>
                  <p>昵称:</p>
                  <p>手机号:</p>
                </div>
              </Col>
              <Col span="12" style="vertical-align: middle;">
                <p>{{user.id}}</p>
                <p>{{user.nickname}}</p>
                <p>{{user.phoneNumber}}</p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <Row
            type="flex"
            justify="center"
            align="middle"
            :gutter="10"
            v-for="(item, index) in selectedRoleArray"
            v-if="item.status"
            :key="index"
            class-name="m-t"
          >
            <Col>角色 {{item.index}}:</Col>
            <Col>
              <Cascader
                :data="roleDataTree"
                v-model="item.value"
                change-on-select
                style="width: auto"
              ></Cascader>
            </Col>
            <Col>
              <Button @click="handleDeleteRoleInput(index)" icon="md-trash">删除</Button>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle" :gutter="10" class-name="m-t">
            <Col>
              <Button type="primary" @click="handleSubmit">提交</Button>
            </Col>
            <Col>
              <Button type="dashed" long icon="md-add" @click="handleAddRoleInput">添加</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import SearchUser from "@/components/user/search-user/search-user.vue";
import { getAllRootTree, issueRole } from "@/api/role.js";
import { peekAttributeFromPayloadToOutside } from "@/libs/bravoUtil.js";

export default {
  name: "issue-role-form",
  components: {
    SearchUser
  },
  data() {
    return {
      roleDataTree: [],
      index: 1,
      selectedRoleArray: [
        {
          value: [],
          index: 1,
          status: 1
        }
      ],
      userData: [],
      legal: false
    };
  },
  computed: {
    user() {
      if (this.userData.length === 0) {
        return {
          avatar: null,
          nickname: "----",
          id: "----",
          phoneNumber: "----"
        };
      } else {
        const user = this.userData[0];
        return user;
      }
    }
  },
  watch: {
    selectedRoleArray: {
      handler(newValue, oldValue) {},
      deep: true
    }
  },
  methods: {
    /**
     * 添加一个角色选择框
     */
    handleAddRoleInput() {
      this.index++;
      this.selectedRoleArray.push({
        value: [],
        index: this.index,
        status: 1
      });
    },
    /**
     * 删除一个角色选择框
     */
    handleDeleteRoleInput(index) {
      this.selectedRoleArray[index].status = 0;
    },
    /**
     * 响应用户搜索结果
     */
    handleUserSearchResultChange(searchResult) {
      this.userData = searchResult;
    },
    /**
     * 提交表单
     */
    async handleSubmit() {
      // 错误提示
      let message = [];
      // 过滤出有效的角色选择值
      const legalRoleArr = this.selectedRoleArray.filter(
        item => item.status === 1 && item.value.length > 0
      );
      if (this.userData.length === 0) {
        message.push("请先搜索一个用户");
      }
      if (legalRoleArr.length === 0) {
        message.push("请选择一个或以上的要颁发的角色");
      }
      if (message.length !== 0) {
        message.unshift("<br>");
        this.$Message.warning(message.join("<br>"));
        return;
      }

      // 执行提交
      // 构造出roidId数组字符串
      const roleId = Array.from(
        new Set(legalRoleArr.map(item => item.value[item.value.length - 1]))
      ).join(",");
      console.log(roleId);
      try {
        const { successfulIssued, failIssued } = await issueRole({
          roleId,
          issuedUserExternalId: this.userData[0].uuid
        });
        if (successfulIssued.length > 0) {
          this.$Notice.error({
            title: "成功颁发",
            desc: successfulIssued.join("<br>"),
            duration: 0
          });
        }
        if (failIssued.length > 0) {
          this.$Notice.error({
            title: "失败颁发",
            desc: failIssued.join("<br>"),
            duration: 0
          });
        }
      } catch (e) {
        this.$Message.error(e.message);
      }
    }
  },
  created() {
    getAllRootTree()
      .then(res => {
        peekAttributeFromPayloadToOutside(res, [
          ["value", "id"],
          ["label", "name"]
        ]);
        this.roleDataTree = res;
      })
      .catch(e => {
        this.$Message.error(e.message);
      });
  }
};
</script>

<style lang="" scoped>
</style>