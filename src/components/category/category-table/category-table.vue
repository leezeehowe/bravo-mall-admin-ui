<template>
  <div>
    <Collapse v-model="currentCollapsePanel">
      <Panel name="1">
        操作
        <div slot="content">
          <ButtonGroup size="large">
            <Button icon="md-refresh" @click="loadCategoryTableData(1, 1000, 0, 0)">重置表格</Button>
            <Button icon="md-add" @click="handleAddCategory">添加类目</Button>
          </ButtonGroup>
        </div>
      </Panel>
    </Collapse>
    <br />
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
      <template slot-scope="{ row }" slot="level">{{row.level + 1}}级</template>

      <template slot-scope="{ row, index }" slot="operation">
        <Button type="error" size="small" @click="showSubLevelCategory(index)">查看下级</Button>
      </template>
    </Table>

    <Drawer
      title="添加类目"
      v-model="drawerOpen"
      width="720"
      :mask-closable="true"
      :styles="styles"
    >
      <category-add-form></category-add-form>
    </Drawer>
  </div>
</template>

<script>
import { pageCategory } from "@/api/category.js";
import CategoryAddForm from "@/components/category/category-add-form/category-add-form.vue";

export default {
  name: "category-table",
  components: {
    CategoryAddForm
  },
  props: {
    tableSize: {
      type: String,
      default: "large"
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
            align: "center"
          },
          {
            key: "name",
            title: "名称",
            align: "center"
          },
          {
            slot: "level",
            title: "级别",
            align: "center"
          },
          {
            key: "productCount",
            title: "商品数量",
            align: "center"
          },
          {
            key: "productUnit",
            title: "数量单位",
            align: "center"
          },
          {
            slot: "operation",
            title: "操作",
            align: "center"
          }
        ]
      },
      showingData: [],
      currentCollapsePanel: "1",
      // 是否打开抽屉
      drawerOpen: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      }
    };
  },
  methods: {
    /**
     * 查看下级类目就
     */
    async showSubLevelCategory(index) {
      const { id, level } = this.showingData[index];
      await this.loadCategoryTableData(1, 1000, id, level + 1);
    },
    /**
     * 获取并装填表格数据
     */
    async loadCategoryTableData(current, size, parId, level) {
      try {
        const { records } = await pageCategory({
          current,
          size,
          parId,
          level
        });
        this.showingData = records;
      } catch (e) {
        throw e;
      }
    },
    /**
     * 添加类目
     */
    handleAddCategory() {
      this.drawerOpen = true;
    }
  },
  created() {
    this.loadCategoryTableData(1, 1000, 0, 0).catch(e => {
      this.$Message.error(e.message);
    });
  }
};
</script>

<style lang="less" scoped>
</style>