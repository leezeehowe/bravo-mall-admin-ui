<template>
    <div>
        <Row>
            <Col span="24">
            <Table :columns="tableMetaData" :data="tableData"></Table>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableMetaData: [
                    {
                        title: 'ID'
                    },
                    {
                        title: '日志内容'
                    },
                    {
                        title: '日志类型'
                    },
                    {
                        title: '创建时间'
                    }
                ]
            }
        }
    }
</script>
<style>

</style>