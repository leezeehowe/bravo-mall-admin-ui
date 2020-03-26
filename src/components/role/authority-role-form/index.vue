<template>
  <div>
    <Row>
      <Col span="24">
        <Tag size="medium" type="dot" color="error">当前角色</Tag>
        <br />
        <p
          style="font-weight: bolder; margin-top: 10px; margin-bottom: 15px;"
        >ID：{{role ? role.id : '无'}} 名称：{{role ? role.name : '无'}}</p>
      </Col>
    </Row>
    <Row type="flex" justify="start" align="top" :gutter="60">
      <Col span="12">
        <Tag size="medium" type="dot" color="primary">页面资源</Tag>
        <Tree
          ref="webpageTree"
          :data="webpageTreeData"
          show-checkbox
          multiple
          @on-check-change="handleWebpageTreeOnCheck"
        ></Tree>
      </Col>
      <Col span="12">
        <Tag size="medium" type="dot" color="primary">API资源</Tag>
        <Tree
          ref="apiTree"
          :data="apiTreeData"
          show-checkbox
          multiple
          @on-check-change="handleApiTreeOnCheck"
        ></Tree>
      </Col>
    </Row>
    <br />
    <Button type="primary" long @click="handleOnSubmit">提交</Button>
  </div>
</template>

<script>
import { getAdminWebpageResourceTree } from "@/api/webpage.resource.js";
import { getAllRootTree } from "@/api/api.resource.js";
import {
  postAuthority,
  deleteAuthority,
  getAuthority
} from "@/api/authority.js";
import {
  filterLeaf,
  peekAttributeFromPayloadToOutside,
  wrapWithBeenIssuedResourceId,
  relativeComplement
} from "@/libs/bravoUtil.js";

export default {
  name: "authority-role-form",
  props: {
    role: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      webpageTreeData: [],
      apiTreeData: [],
      // 当前选中的页面资源的id
      webpageSelected: [],
      // 当前选中的API资源的id
      apiSelected: [],
      // 该角色当前已经有的页面资源id
      beenIssuedWebpage: [],
      // 该角色当前已经有的API资源id
      beenIssuedApi: []
    };
  },
  watch: {
    role: {
      handler(n, o) {
        this.handleAfterRoleChange();
      },
      deep: true
    }
  },
  methods: {
    async handleAfterRoleChange() {
      // 加载该角色的权限
      await this.loadBeenIssued();
      // 加载资源
      const { webpageResource, apiResource } = await this.loadTreeData();
      // 处理资源树
      wrapWithBeenIssuedResourceId(webpageResource, this.beenIssuedWebpage);
      wrapWithBeenIssuedResourceId(apiResource, this.beenIssuedApi);
      this.webpageTreeData = webpageResource;
      this.apiTreeData = apiResource;
    },

    // 加载资源(页面、API)树
    async loadTreeData() {
      const webpageResource = await getAdminWebpageResourceTree();
      const apiResource = await getAllRootTree();
      peekAttributeFromPayloadToOutside(webpageResource, [
        ["title", "text"],
        ["expand", null, true]
      ]);
      peekAttributeFromPayloadToOutside(apiResource, [
        ["title", "name"],
        ["expand", null, true]
      ]);
      return {
        webpageResource,
        apiResource
      };
    },

    // 加载当前角色拥有的资源id
    async loadBeenIssued() {
      const { webpage, api } = await getAuthority(this.role.id);
      this.beenIssuedWebpage = webpage;
      this.beenIssuedApi = api;

      this.webpageSelected = webpage.map(_ => ({
        payload: {
          id: _.resourceId
        }
      }));

      this.apiSelected = api.map(_ => ({
        payload: {
          id: _.resourceId
        }
      }));
    },

    /**
     * 页面资源树控件选中值变化
     */
    handleWebpageTreeOnCheck() {
      this.webpageSelected = filterLeaf(
        this.$refs.webpageTree.getCheckedNodes()
      );
    },

    /**
     * API资源树控件选中值变化
     */
    handleApiTreeOnCheck() {
      this.apiSelected = filterLeaf(this.$refs.apiTree.getCheckedNodes());
    },

    /**
     * 提交按钮点击事件
     */
    async handleOnSubmit() {
      // 当前所有选择的页面资源
      const webpageSelectedIdList = this.webpageSelected.map(_ => _.payload.id);

      // 当前所有选择的API资源
      const apiSelectedIdList = this.apiSelected.map(_ => _.payload.id);

      // 要删除的页面资源权限 selected没有 beenIssue有的
      const deletedWebpageAuthority = relativeComplement(
        this.beenIssuedWebpage.map(_ => _.resourceId),
        webpageSelectedIdList
      );

      // 要删除的API资源权限
      const deletedApiAuthority = relativeComplement(
        this.beenIssuedApi.map(_ => _.resourceId),
        apiSelectedIdList
      );

      // 新增的页面资源权限 = selected有， beenIssue里没有的
      const addedWebpageAuthority = relativeComplement(
        webpageSelectedIdList,
        this.beenIssuedWebpage.map(_ => _.resourceId)
      );

      // 新增的API资源权限
      const addedApiAuthority = relativeComplement(
        apiSelectedIdList,
        this.beenIssuedApi.map(_ => _.resourceId)
      );

      console.log(` 当前所有选择的页面资源: ${webpageSelectedIdList.join()}`);
      console.log(` 当前所有选择的API资源: ${apiSelectedIdList.join()}`);
      console.log(` 新增的页面资源权限: ${addedWebpageAuthority.join()}`);
      console.log(` 新增的API资源权限: ${addedApiAuthority.join()}`);
      console.log(` 要删除的页面资源权限: ${deletedWebpageAuthority.join()}`);
      console.log(` 要删除的API资源权限: ${deletedApiAuthority.join()}`);

      const showNotice = ({ successfulIssue, failIssue }) => {
        if (successfulIssue && successfulIssue.length > 0) {
          this.$Notice.success({
            title: "新增授权结果",
            desc: successfulIssue.join("<br>"),
            duration: 0
          });
        }
        if (failIssue && failIssue.length > 0) {
          this.$Notice.error({
            title: "新增授权结结果",
            desc: failIssue.join("<br>"),
            duration: 0
          });
        }
      };

      // 执行新增权限
      if (addedWebpageAuthority.length > 0 || addedApiAuthority.length > 0) {
        try {
          const issueResult = await postAuthority({
            roleId: this.role.id,
            webpage: addedWebpageAuthority,
            api: addedApiAuthority
          });
          if (issueResult.webpage) {
            showNotice(issueResult.webpage);
          }
          if (issueResult.api) {
            showNotice(issueResult.api);
          }
        } catch (error) {
          this.$Message.error(error.message);
        }
      }

      // 执行删除权限
      if (
        deletedWebpageAuthority.length > 0 ||
        deletedApiAuthority.length > 0
      ) {
        try {
          const {
            deleteWebpageAuthorityFail,
            deleteApiAuthorityFail
          } = await deleteAuthority({
            roleId: this.role.id,
            webpage: deletedWebpageAuthority,
            api: deletedApiAuthority
          });
          if (deleteWebpageAuthorityFail) {
            this.$Notice.error({
              title: "删除授权结果",
              desc: deleteWebpageAuthorityFail,
              duration: 0
            });
          } else {
            if (deletedWebpageAuthority.length > 0) {
              this.$Notice.success({
                title: "删除授权结果",
                desc: "成功删除页面权限",
                duration: 0
              });
            }
          }

          if (deleteWebpageAuthorityFail) {
            this.$Notice.error({
              title: "删除授权结果",
              desc: deletedApiAuthority,
              duration: 0
            });
          } else {
            if (deletedApiAuthority.length > 0) {
              this.$Notice.success({
                title: "删除授权结果",
                desc: "成功删除API权限",
                duration: 0
              });
            }
          }
        } catch (error) {
          this.$Message.error(error.message);
        }
      }

      this.handleAfterRoleChange();
    }
  },
  created() {
    this.loadTreeData();
  },
  mounted() {}
};
</script>