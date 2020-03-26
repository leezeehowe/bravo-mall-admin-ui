<template>
  <div class="form">
    <Form ref="formAdd" :model="formModel" :rules="validateRules">
      <FormItem prop="type">
        <p>资源类型</p>
        <Select v-model="formModel.type">
          <Option
            v-for="item in webpageResourceType"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="level">
        <p>层级</p>
        <Select v-model="formModel.level">
          <Option :value="formModel.level" :key="formModel.level">{{ formModel.level + 1 + "级资源" }}</Option>
        </Select>
      </FormItem>
      <FormItem label="上级资源" prop="parId">
        <Cascader
          :data="resourcesTree"
          v-model="formModel.parId"
          change-on-select
          filterable
          @on-change="handleParOnchange"
          placeholder="非一级资源请在此选择上级资源"
        ></Cascader>
      </FormItem>
      <FormItem prop="name">
        英文名称
        <Input type="text" v-model="formModel.name" placeholder="用于标识该页面资源，不能重复"></Input>
      </FormItem>
      <FormItem prop="text">
        中文标题
        <Input type="text" v-model="formModel.text" placeholder="文字内容"></Input>
      </FormItem>
      <FormItem prop="description">
        描述信息
        <Input type="text" v-model="formModel.description" placeholder="关于此页面资源的描述信息"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formAdd')">提交</Button>
        <Button @click="handleReset('formAdd')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { postResource, getAdminWebpageResourceTree } from "@/api/webpage.resource.js";
import {
  peekAttributeFromPayloadToOutside
} from "@/libs/bravoUtil.js";

export default {
  name: "webpage-resource-form",
  data() {
    return {
      // 表单域
      formModel: {
        type: 0,
        level: 0,
        parId: [],
        name: "",
        text: "",
        description: ""
      },
      // 网页资源类型选择项
      webpageResourceType: [
        {
          value: 0,
          label: "菜单"
        }
      ],
      // 表单域校验规则
      validateRules: {
        name: [
          {
            required: true,
            message: "名称必须填写哦"
          }
        ],
        text: [
          {
            required: true,
            message: "最好填写哦"
          }
        ],
        description: [
          {
            required: false
          }
        ]
      },
      // 网页资源树
      resourcesTree: []
    };
  },
  methods: {
    /**
     * 上级资源变化时
     */
    handleParOnchange(value, selectedData) {
      if (selectedData.length == 0) this.formModel.level = 0;
      else {
        this.formModel.level = selectedData[selectedData.length - 1].payload.level + 1;
      }
    },

    async handlePostResource({ name, parId, text, type, description, level }) {
      try {
        const _parId = parId.length > 0 ? parId[parId.length - 1] : 0;
        const resource = await postResource({
          name,
          parId: _parId,
          text,
          type,
          description,
          level
        });
        return resource;
      } catch (e) {
        throw e;
      }
    },

    /**
     * 提交表单
     */
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.handlePostResource(this.formModel)
            .then(res => {
              this.handleGetResource({
                size: 1000,
                level: 0
              });
              this.$Message.success("成功添加资源!");
            })
            .catch(err => {
              this.$Message.error(`添加失败，${err.message}`);
            });
        }
      });
    },
    /**
     * 重置表单
     */
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },

  created() {
    getAdminWebpageResourceTree().then(res => {
      peekAttributeFromPayloadToOutside(res, [["label", "text"], ['value', 'id']]);
      this.resourcesTree = res;
    }).catch(err => {
      this.$Message.error(err.message);
    })
  }
};
</script>

<style lang="less" scoped>
</style>