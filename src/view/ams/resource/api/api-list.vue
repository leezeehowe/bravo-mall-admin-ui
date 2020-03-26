<template>
  <div>
    <api-table-component></api-table-component>
  </div>
</template>

<script>
import ApiTableComponent from '@/components/api-resource/api-table/api-table.vue'

  export default {
    name: 'api-list-view',
    components: {
      ApiTableComponent
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="less" scoped>
  
</style>