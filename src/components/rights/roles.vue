<template>
  <div>
    <el-button type="primary" @click="openAddDialog" plain>添加角色</el-button>

    <bread level1="权限管理" level2="角色列表" style=" margin-top: 15px;"></bread>

    <el-table :data="tableData" style="width: 100%; margin-top: 15px;">
      <el-table-column type="expand" label>
        <template slot-scope="dataTable">
          <el-row v-for="(item,index) in dataTable.row.children" :key="index" class="el-row-level1">
            <el-col :span="4">
              <el-tag closable @close="handleClose(dataTable.row,item.id)">{{item.authName}}</el-tag>
              <li class="el-icon-arrow-right"></li>
            </el-col>

            <el-col :span="20">
              <el-row v-for="(item1,index1) in item.children" :key="index1" class="el-row-level2">
                <el-col :span="4">
                  <el-tag
                    type="success"
                    closable
                    @close="handleClose(dataTable.row,item1.id)"
                  >{{item1.authName}}</el-tag>
                  <li class="el-icon-arrow-right"></li>
                </el-col>

                <el-col :span="20">
                  <el-tag
                    type="warning"
                    v-for="(item2,index2) in item1.children"
                    :key="index2"
                    closable
                    @close="handleClose(dataTable.row,item2.id)"
                  >{{item2.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <h2 v-if="dataTable.row.children.length==0">没有权限</h2>
        </template>
      </el-table-column>
      <el-table-column type="index" prop="index" label="#"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>

      <el-table-column prop label="操作">
        <template slot-scope="dataTable">
          <!-- 编辑按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            circle
            @click="editDialog(dataTable.row)"
          ></el-button>

          <!-- 设置用户角色 -->
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            circle
            @click="SetDialog(dataTable.row)"
          ></el-button>

          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="delUser(dataTable.row.id)"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分配权限" :visible.sync="dialogFormSetVisible">
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :default-checked-keys="checkedId"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormSetVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRights">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentRid: -1,
      tableData: [],
      checkedId: [],
      treeData: [],
      dialogFormSetVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    async setRoleRights () {
      this.dialogFormSetVisible = false
      console.log('orign=', this.checkedId)
      var checked = this.$refs.tree.getCheckedKeys()
      var halfChecked = this.$refs.tree.getHalfCheckedKeys()
      console.log('checked=', checked)
      console.log('halfchecked=', halfChecked)
      // 发送请求修改权限
      var totalChecked = [...checked, ...halfChecked]
      const res = await this.$http.post(`roles/${this.currentRid}/rights`, {rids: totalChecked.join(',')})
      console.log(res.data)
      this.loadroles()
    },
    async SetDialog (row) {
      this.currentRid = row.id
      console.log('this.currentRid=', this.currentRid)
      this.dialogFormSetVisible = true
      // 显示所有的权限
      console.log('load---')
      const res = await this.$http.get('rights/tree')
      const {
        data,
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        this.treeData = data
        this.$message.success(msg)
        console.log('rights=====', res.data)
        // 展示拥有的权限
        var templist = []
        console.log('row---', row)
        row.children.forEach(item => {
          // templist.push(item.id);
          item.children.forEach(item1 => {
            // templist.push(item1.id);
            item1.children.forEach(item2 => {
              templist.push(item2.id)
            })
          })
        })
        this.checkedId = templist
      } else {
        this.$message.warning(msg)
      }
    },
    async loadroles () {
      console.log('load---')

      const res = await this.$http.get('roles')
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
      console.log('roles=====', res.data)
    },
    openAddDialog () {},
    async handleClose (row, rightid) {
      console.log('---close-', row, rightid)
      const res = await this.$http.delete(`roles/${row.id}/rights/${rightid}`)
      const {
        data,
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        this.$message.success(msg)
        row.children = data
      } else {
        this.$message.warning(msg)
      }
    }
  },
  mounted () {
    this.loadroles()
  }
}
</script>

<style>
.el-row-level1 {
  border-bottom: 1px solid #e9eef3;
  margin-bottom: 10px;
}
.el-row-level2 {
  margin-bottom: 10px;
}
</style>
