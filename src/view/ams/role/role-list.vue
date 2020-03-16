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
      <template slot-scope="{ row }" slot="level">
        <Tag size="large" color="cyan">{{`${row.level+1}级角色`}}</Tag>
      </template>

      <template slot-scope="{ row }" slot="parId">
        <Tag size="large" color="geekblue">
          {{
          row.parId
          }}
        </Tag>
      </template>

      <template slot-scope="{ row }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          :disabled="row.subCount <= 0"
          @click="handleShowSubRoles(row.id, row.level+1)"
        >查看下级角色</Button>
        <Button type="error" size="small" disabled>删除</Button>
      </template>

      <Row slot="footer" type="flex" justify="center" :gutter="24">
        <Col>
          <Dropdown
            style="margin-left: 20px"
            transfer
            @on-click="handleLevelOnchange"
            trigger="hover"
          >
            <Button type="error">
              {{`${currentLevel+1}级角色`}}
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="level in (deepestLevel+1)"
                :key="level"
                :name="level-1"
              >{{`${level}级角色`}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col>
          <Page
            @on-change="handlePageOnchange"
            :total="pagination.total"
            :current="pagination.current"
            :page-size="pagination.size"
            show-total
            show-elevator
          />
        </Col>
      </Row>
    </Table>
  </div>
</template>

<script>
import { handleGetPage, handleGetdeeepestLevel } from "@/service/roleService";

export default {
  name: "role-list",

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
            title: "ID",
            key: "id",
            maxWidth: 60,
            align: "center"
          },
          {
            title: "角色名",
            key: "name",
            maxWidth: 180,
            align: "center"
          },
          {
            title: "角色层级",
            slot: "level",
            maxWidth: 180,
            align: "center"
          },
          {
            title: "上级角色",
            slot: "parId",
            maxWidth: 180,
            align: "center"
          },
          {
            title: "子角色数量",
            key: "subCount",
            align: "center"
          },
          {
            title: "角色状态",
            key: "status",
            align: "center"
          },
          {
            title: "角色描述",
            key: "description",
            maxWidth: 200,
            tooltip: true,
            align: "center"
          },
          {
            title: "创建者",
            key: "createBy",
            align: "center"
          },
          {
            title: "操作",
            align: "center",
            slot: "action"
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
      showingData: [],
      currentLevel: 0,
      deepestLevel: 0
    };
  },

  computed: {},

  methods: {
    async handleLevelOnchange(level) {
      // 重置分页导航
      this.initPagination();
      const { current, size } = this.pagination;
      const { pagination, records } = await handleGetPage({
        current,
        size,
        level,
        parId: -1
      });
      this.updatePagination(pagination);
      this.updateShowingData(records);
      this.currentLevel = level;
    },

    /**
     * 当前页码改变事件
     */
    handlePageOnchange() {},

    /**
     * 更新分页导航信息
     */
    updatePagination({ total, size, pages, current }) {
      this.pagination.total = total;
      this.pagination.size = size;
      this.pagination.pages = pages;
      this.pagination.current = current;
    },

    /**
     *初始化分页导航信息
     */
    initPagination() {
      this.updatePagination({
        total: 0,
        pages: 0,
        size: this.pagination.size,
        current: 1
      });
    },

    /**
     * 更新表格展示数据
     */
    updateShowingData(arr) {
      this.showingData = arr;
    },

    /**
     * 查看下级角色
     */
    async handleShowSubRoles(parId, sonLevel) {
      // 重置分页导航h
      this.initPagination();
      const { current, size } = this.pagination;
      const { pagination, records } = await handleGetPage({
        current,
        size,
        parId,
        level: sonLevel
      });
      this.updatePagination(pagination);
      this.updateShowingData(records);
      this.currentLevel = sonLevel;
    },

    async init() {
      const { total, size, pages, current } = this.pagination;
      const { pagination, records } = await handleGetPage({
        current,
        size,
        level: 0
      });
      this.updatePagination(pagination);
      this.updateShowingData(records);
      this.deepestLevel = await handleGetdeeepestLevel();
    }
  },

  created() {
    this.init().catch(err => {
      console.log(err);
    });
  }
};
</script>

<style>
</style>