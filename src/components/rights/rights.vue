<template>
  <div>
    <bread level1="权限管理" level2="权限列表"></bread>
    <el-table :data="tableData" style="width: 100%; margin-top: 15px;">
      <el-table-column type="index" prop="index" label="#"></el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>

      <el-table-column prop="level" label="权限等级">
        <template slot-scope="dataTable">
          <el-tag v-if="dataTable.row.level=='1'">一级</el-tag>
          <el-tag type="success" v-if="dataTable.row.level=='2'">二级</el-tag>
          <el-tag type="danger" v-if="dataTable.row.level=='3'">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async loadRightslist () {
      console.log('load---')

      const res = await this.$http.get('rights/list')
      const {
        data,
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        this.tableData = data
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
      console.log('rights=====', res.data)
    }

  },
  mounted () {
    this.loadRightslist()
  }
}
</script>

<style>
</style>
