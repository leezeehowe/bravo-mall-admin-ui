<template>
  <div>
    <Card shadow>
      <p slot="title">
        <Icon type="md-search" size="25" />搜索用户
      </p>
      <Row type="flex" justify="center" align="middle" :gutter="30">
        <Col>
          手机号：
          <Input v-model="searchFormModel.phone" placeholder="请输入手机号" style="width: auto" />
        </Col>
        <Col>
          用户名：
          <Input v-model="searchFormModel.username" placeholder="请输入用户名" style="width: auto" />
        </Col>
        <Col>
          UUID：
          <Input v-model="searchFormModel.uuid" placeholder="请输入UUID" style="width: auto" />
        </Col>
        <Col>
          <Button
            @click="handleSubmit"
            type="primary"
            shape="circle"
            icon="ios-search"
            size="large"
            :disabled="btnSubmitDisabled"
          >搜索</Button>
        </Col>
      </Row>
      <br />
      <Row type="flex" justify="center" align="middle" :gutter="30" v-if="showResult">
        <Col span="20">
          <user-list :customData="true" :externalData="searchResult"></user-list>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { searchUser } from "@/api/user.js";
import UserList from "@/view/ums/user-list.vue";

export default {
  name: "search-user",
  components: {
    UserList
  },
  props: {
    showResult: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchFormModel: {
        phone: "",
        username: "",
        uuid: ""
      },
      btnSubmitDisabled: true,
      searchResult: []
    };
  },
  watch: {
    searchFormModel: {
      deep: true,
      handler(n, o) {
        const find = Object.values(n).find(
          ele => ele.replace("\0", "").length > 0
        );
        if (!find) {
          this.btnSubmitDisabled = true;
        } else {
          this.btnSubmitDisabled = false;
        }
      }
    }
  },
  methods: {
    async handleSubmit() {
      const requestData = this.searchFormModel;
      try {
        const result = await searchUser(requestData);
        this.searchResult.push(result);
      } catch (e) {
        this.searchResult = [];
      } finally {
        this.$emit(
          "on-result-change",
          JSON.parse(JSON.stringify(this.searchResult))
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>