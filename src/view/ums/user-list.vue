<style lang="less" scoped>
.avatar {
  margin: 10px 0;
}
</style>
<template>
  <div>
    <Table
      :columns="table.columns"
      :data="showingData"
      :align="table.align"
      :border="table.border"
      :loading="table.loading"
      :highlight-row="table.hightlightRow"
      :size="table.size"
      :no-data-text="table.noDataText"
      :no-filtered-text="table.noFilteredDataText"
    >
      <template slot-scope="{ row }" slot="avatar">
        <Row type="flex" justify="center" align="middle" class-name="avatar">
          <Col>
            <Avatar :src="row.avatar" icon="ios-person" size="60" />
          </Col>
        </Row>
      </template>

      <template slot-scope="{ row }" slot="operation">
        <Row class-name="mtb">
          <Col span="12">
            <Button type="primary" size="small" style="margin-right: 5px">查看微信账号信息</Button>
          </Col>
        </Row>
      </template>
    </Table>
  </div>
</template>

<script>
import { pageAdminVo } from "@/api/user.js";

export default {
  name: "user-list",
  props: {
    tableSize: {
      type: String,
      default: "large"
    },
    customData: {
      type: Boolean,
      default: false
    },
    externalData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      table: {
        align: "center",
        border: true,
        loading: false,
        hightlightRow: true,
        size: this.tableSize,
        noDataText: "暂没有数据哦",
        noFilteredDataText: "暂没有符合条件的数据哦",
        columns: [
          {
            key: "id",
            title: "ID",
            width: 60,
            align: "center"
          },
          {
            slot: "avatar",
            title: "头像",
            width: 80,
            align: "center"
          },
          {
            key: "uuid",
            title: "UUID",
            align: "center"
          },
          {
            key: "username",
            title: "用户名",
            align: "center"
          },
          {
            key: "emailAddress",
            title: "邮箱",
            align: "center"
          },
          {
            key: "nickname",
            title: "昵称",
            align: "center"
          },
          {
            key: "phoneNumber",
            title: "手机号",
            align: "center"
          },
          {
            key: "gender",
            title: "性别",
            align: "center"
          },
          {
            key: "position",
            title: "位置",
            align: "center"
          },
          {
            slot: "operation",
            title: "操作",
            align: "center"
          }
        ]
      },
      // 分页情况
      pagination: {
        total: 0,
        current: 1,
        size: 1000,
        pages: 0
      },
      innerData: []
    };
  },
  computed: {
    showingData: function() {
      return !this.customData ? this.innerData : this.externalData
    }
  },
  methods: {
    async init() {
      try {
        const { current, size } = this.pagination;
        const { records, pages, total } = await pageAdminVo(current, size);
        this.innerData = records;
        this.pagination.total = total;
        this.pagination.pages = pages;
        return Promise.resolve();
      } catch (e) {
        this.$Message.error(e.message);
        return Promise.reject();
      }
    }
  },
  created() {
    if(!this.customData) this.init().catch(_ => {});
  }
};
</script>

<style lang="less" scoped>
</style>