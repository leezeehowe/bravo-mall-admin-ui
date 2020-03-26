<template>
  <div>
    <Form ref="category-add-form" :model="formModel" :label-width="80">
      <FormItem label="分类名称" prop="name" required>
        <Input type="text" v-model="formModel.name"></Input>
      </FormItem>
      <FormItem label="上级分类" prop="parId">
        <Select v-model="formModel.parId" style="width:200px">
          <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="数量单位" prop="productUnit">
        <Input type="text" v-model="formModel.productUnit" number></Input>
      </FormItem>
      <FormItem label="图标" prop="icon">
        <Input type="text" v-model="formModel.icon" number></Input>
      </FormItem>
      <FormItem label="分类描述" prop="description">
        <Input type="text" v-model="formModel.description" number></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('category-add-form')">提交</Button>
        <Button @click="handleReset('category-add-form')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { pageCategory, createCategory } from "@/api/category.js";

export default {
  name: "category-add-form",
  data() {
    return {
      formModel: {
        name: "",
        parId: 0,
        productUnit: "",
        icon: "",
        description: ""
      },
      categoryList: []
    };
  },
  methods: {
    /**
     * 获取并装填类目数据
     */
    async loadCategoryList(current, size, parId, level) {
      try {
        const { records } = await pageCategory({
          current,
          size,
          parId,
          level
        });
        records.unshift({
          id: 0,
          name: "无上级分类"
        });
        this.categoryList = records;
      } catch (e) {
        throw e;
      }
    },
    /**
     * 创建类目
     */
    async handleCreateCategory() {
      const postData = this.formModel;
      try {
        const resource = await createCategory(postData);
        this.$Message.success({
          content: `成功创建类目[${resource.name}]`,
          duration: 3
        });
        await this.loadCategoryList(1, 1000, 0, 0);
      }
      catch (e) {
        this.$Message.error({
          content: e.message,
          duration: 5
        });
      }
    },
    async handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.handleCreateCategory();
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  created() {
    this.loadCategoryList(1, 1000, 0, 0);
  }
};
</script>

<style lang="less" scoped>
</style>