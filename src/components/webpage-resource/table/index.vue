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
      <div slot="header">
        当前显示资源：
        <Select v-model="selectedLevel" multiple style="width:250px" transfer :max-tag-count="2">
          <Option v-for="level in (deepestLevel+1)" :value="level-1" :key="level-1">
            {{ `${level}级资源` }}
            </Option>
        </Select>
      </div>
      <Page
        slot="footer"
        @on-change="handlePageOnchange"
        :total="pagination.total"
        :current="pagination.current"
        :page-size="pagination.size"
        show-total
        show-elevator
      />
    </Table>
  </div>
</template>
<script>
import { pageApi, getDeepestLevel } from "@/api/webpage.resource.js";

export default {
  name: "webpage-resource-table",
  data() {
    return {
      table: {
        align: "center",
        border: true,
        loading: false,
        hightlightRow: true,
        size: "large",
        noDataText: "暂没有数据哦",
        noFilteredDataText: "暂没有符合条件的数据哦",
        columns: [
          {
            key: "id",
            title: "ID"
          },
          {
            key: "type",
            title: "类型"
          },
          {
            key: "name",
            title: "资源名"
          },
          {
            key: "text",
            title: "中文标题"
          },
          {
            key: "level",
            title: "资源层级"
          },
          {
            key: "parId",
            title: "上级资源ID"
          },
          {
            key: "path",
            title: "资源路径"
          },
          {
            key: "description",
            title: "资源描述"
          }
        ]
      },
      // 分页情况
      pagination: {
        total: 0,
        current: 1,
        size: 100,
        pages: 0
      },
      // 树的深度
      deepestLevel: 0,
      // 当前选择的深度
      selectedLevel: [0],
      // 表格展示中的数据
      showingData: []
    };
  },
  watch: {
    selectedLevel: {
      async handler(nV, oV) {
        console.log("handler")
        const {records} = await this.handleGetResource({
          size: 1000,
          level: nV.join(),
          parId: -1
        });
        this.showingData = records;
      },
      immediate: false
    }
  },
  methods: {
    handlePageOnchange(v) {},
    /**
     * 获取资源
     */
    async handleGetResource({ size, level, parId }) {
      const { records } = await pageApi({
        size,
        level,
        parId
      });
      return {records};
    },
  },
  created() {
    getDeepestLevel().then(res => {
      this.deepestLevel = res;
    }).catch(err => {
      console.log(err)
    })
    // 获取一级资源
  }
};
</script>