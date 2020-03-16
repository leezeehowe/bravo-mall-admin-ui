<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'App',
    created() {
      // this.initRoleList()
    },
    methods: {
      ...mapActions({
        'initRoleList': 'role/handleGetPage'
      })
    }
  }
</script>

<style lang="less">
  .size {
    width: 100%;
    height: 100%;
  }

  html,
  body {
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  #app {
    .size;
  }

  .text-danger {
    color: #ed4014;
  }
</style>