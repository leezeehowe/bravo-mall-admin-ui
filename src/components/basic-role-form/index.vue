<template>
  <div>
    <Form ref="basic" :model="form">
      <FormItem label="角色名称" prop="name">
        <Input v-model="form.name" placeholder="请输入角色名称"></Input>
      </FormItem>
      <FormItem label="上级角色" prop="parId">
        <Cascader
          :data="data"
          :load-data="loadData"
          v-model="form.par"
          change-on-select
          @on-change="handleCascOnchange"
        ></Cascader>
      </FormItem>
      <FormItem label="角色描述" prop="description">
        <Input type="textarea" v-model="form.description" placeholder="请输入关于角色的描述信息"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { handleGetPage, handleGetdeeepestLevel } from "@/service/roleService";

export default {
  name: "basic-role-form",
  data() {
    return {
      form: {
        name: "",
        par: [],
        description: ""
      },
      data: [],
      currentLevel: 0
    };
  },
  methods: {
    recordsNodeToCascNode(records) {
      const arr = [];
      records.forEach(i => {
        arr.push({
          value: i.id,
          label: i.name,
          level: i.level,
          subCount: i.subCount,
          children: [],
          loading: false
        });
      });
      return arr;
    },

    async init() {
      const { records } = await handleGetPage({
        size: 1000,
        current: 1
      });
      this.data = this.recordsNodeToCascNode(records);
    },

    loadData(item, callback) {
      item.loading = true;
      if (item.subCount <= 0) {
        item.children = [
          {
            value: item.value,
            label: "选择该角色"
          }
        ];
        item.loading = false;
        callback();
      } else {
        handleGetPage({
          size: 1000,
          parId: item.value,
          level: item.level + 1
        })
          .then(({ records }) => {
            item.children = this.recordsNodeToCascNode(records);
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            item.loading = false;
            callback();
          });
      }
    }
  },
  created() {
    this.init().catch(err => {
      console.log(err);
    });
  }
};
</script>