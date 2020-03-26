<template>
  <div>
    <Form ref="apiResourceForm" :model="formModel" :label-width="110">
      <FormItem required label="父级资源" prop="par">
        <Cascader :data="apiResourceTree" v-model="formModel.par" @on-change="handleCascaderOnChange"></Cascader>
      </FormItem>
      <FormItem required label="英文标识" prop="name">
        <Input type="text" v-model="formModel.name"></Input>
      </FormItem>
      <FormItem required label="URL路径" prop="url">
        <Input type="text" v-model="formModel.url"></Input>
      </FormItem>
      <FormItem required label="版本" prop="version">
        <Input type="text" v-model="formModel.version"></Input>
      </FormItem>
      <FormItem required label="资源所属服务名" prop="belongTo">
        <Input type="text" v-model="formModel.belongTo"></Input>
      </FormItem>
      <FormItem label="状态">
        <i-switch v-model="formModel.status" size="large" :true-value="0" :false-value="1">
          <span slot="open">启用</span>
          <span slot="close">不启用</span>
        </i-switch>
      </FormItem>
      <FormItem label="描述" prop="description">
        <Input type="text" v-model="formModel.description"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('apiResourceForm')">提交</Button>
        <Button @click="handleReset('apiResourceForm')" type="dashed" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { postApiResourceApi, getAllRootTree } from "@/api/api.resource.js";
import { peekAttributeFromPayloadToOutside } from "@/libs/bravoUtil.js";

export default {
  name: "api-add-component",
  props: {
    customApiModel: {
      type: Object,
      default() {
        return {
          par: [],
          level: 0,
          name: "",
          url: "",
          version: "",
          status: 0,
          belongTo: "",
          description: ""
        };
      }
    }
  },
  data() {
    return {
      formModel: this.customApiModel,
      apiResourceTree: []
    };
  },
  methods: {
    /**
     * 向服务器申请创建API资源
     */
    async handlePostApiResource() {
      try {
        const postData = Object.assign({}, this.formModel);
        postData.parId = postData.par.pop();
        postData.par = null;
        this.formModel = await postApiResourceApi(postData);
        this.$Message.success("成功创建API资源！");
      } catch (e) {
        this.$Message.error(e.message);
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.handlePostApiResource();
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleCascaderOnChange(value, selectedValue) {
      console.log(selectedValue);
      this.formModel.level = selectedValue[selectedValue.length - 1].payload.level + 1;
    },
    async init() {
      try {
        const result = await getAllRootTree();
        peekAttributeFromPayloadToOutside(result, [
          ["label", "name"],
          ["value", "id"]
        ]);
        this.apiResourceTree = result;
      } catch (e) {
        throw new Error(e.message);
      }
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