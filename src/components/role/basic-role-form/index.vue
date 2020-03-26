<template>
  <div>
    <Form ref="basic" :model="form">
      <FormItem label="角色名称" prop="name" required>
        <Input v-model="form.name" placeholder="请输入角色名称"></Input>
      </FormItem>
      <FormItem label="上级角色" prop="parId">
        <Cascader
          :data="data"
          v-model="form.par"
          change-on-select
          @on-change="handleCascOnchange"
        ></Cascader>
      </FormItem>
      <FormItem label="角色描述" prop="description" required>
        <Input type="textarea" v-model="form.description" placeholder="请输入关于角色的描述信息"></Input>
      </FormItem>
      <br />
      <FormItem>
        <Button type="primary" long @click="handleSubmit('basic')" :disabled="btnSubmitDisabled">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { handleGetPage, handleGetdeeepestLevel } from "@/service/roleService";
import { postRole, getAllRootTree } from "@/api/role.js";
import { peekAttributeFromPayloadToOutside } from "@/libs/bravoUtil.js";

export default {
  name: "basic-role-form",
  props: {
    name: {
      type: String,
      default: ""
    },
    level: {
      type: Number,
      default: 0
    },
    par: {
      type: Array,
      default: () => []
    },
    description: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: {
        name: this.name,
        description: this.description,
        level: this.level,
        par: this.par
      },
      // 级联选择器数据
      data: [],
      // 是否禁用提交按钮
      btnSubmitDisabled: false
    };
  },
  methods: {

    async init() {
      getAllRootTree()
        .then(res => {
          peekAttributeFromPayloadToOutside(res, [
            ["value", "id"],
            ["label", "name"]
          ]);
          this.data = res;
        })
        .catch(e => {
          this.$Message.error(e.message);
        });

    },

    handleCascOnchange(value, selectedData) {
      console.log(selectedData)
      this.form.level = selectedData[selectedData.length-1].payload.level+ 1;
    },

    async handlePostRole() {
      this.btnSubmitDisabled = true;
      const { name, level, description } = this.form;
      const parId = this.form.par[this.form.par.length - 1] || 0;
      let data = {
        name,
        level,
        parId,
        description
      };
      return await postRole(data);
    },

    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) return;
        this.btnSubmitDisabled = true;
        this.handlePostRole()
          .then(res => {
            this.$Message.success("成功创建角色!");
            this.$emit("createRoleSuccess", res);
          })
          .catch(err => {
            this.$Message.error(err.message);
          })
          .finally(() => {
            this.btnSubmitDisabled = false;
          });
      });
    }
  },
  created() {
    this.init().catch(err => {
      console.log(err);
    });
  }
};
</script>