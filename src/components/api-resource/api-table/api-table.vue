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
      <template slot-scope="{ row }" slot="status">
        <i-switch v-model="row.status" size="large" :true-value="0" :false-value="1" disabled>
          <span slot="open">启用</span>
          <span slot="close">不启用</span>
        </i-switch>
      </template>

      <template slot-scope="{ row, index }" slot="operation">
        <Button type="error" size="small" disabled>Delete</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { pageApiResourceApi } from "@/api/api.resource.js";

export default {
  name: "api-table-component",
  props: {
    tableSize: {
      type: String,
      default: "large"
    },
    whetherCustomData: {
      type: Boolean,
      default: false
    },
    customApiData: {
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
            key: "name",
            title: "英文标识",
            width: 160,
            align: "center"
          },
          {
            key: "url",
            title: "URL路径",
            width: 180,
            align: "center"
          },
          {
            key: "belongTo",
            title: "所属服务",
            align: "center"
          },
          {
            key: "version",
            title: "版本",
            align: "center"
          },
          {
            title: "上级资源",
            key: "parId",
            align: "center"
          },
          {
            key: "description",
            title: "描述",
            align: "center"
          },
          {
            key: "createBy",
            title: "创建者",
            align: "center"
          },
          {
            slot: "status",
            title: "状态",
            align: "center"
          },
          {
            slot: "operation",
            title: "操作",
            align: "center"
          }
        ]
      },
      innerData: []
    };
  },
  computed: {
    showingData() {
      return this.whetherCustomData ? this.customApiData : this.innerData;
    }
  },
  methods: {
    async init() {
      const { records } = await pageApiResourceApi({});
      this.innerData = records;
    }
  },
  created() {
    this.init().catch(err => {
      this.$Message.error(err.message);
    });
  }
};
</script>

<style lang="less" scoped>
</style>