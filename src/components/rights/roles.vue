<template>
  <div>
    <el-button type="primary" @click="openAddDialog">添加角色</el-button>

    <bread level1="权限管理" level2="角色列表" style=" margin-top: 15px;"></bread>

    <el-table :data="tableData" style="width: 100%; margin-top: 15px;">
      <el-table-column type="expand" label>
        <template slot-scope="dataTable">
          <el-row v-for="(item,index) in dataTable.row.children" :key="index">
            <el-col :span="4">
              <el-tag>{{item.authName}}</el-tag>
            </el-col>

            <el-col :span="20">
              <el-row v-for="(item1,index1) in item.children" :key="index1">
                <el-col :span="4">
                  <el-tag type="success">{{item1.authName}}</el-tag>
                </el-col>

                <el-col :span="20">
                  <el-tag
                    type="warning"
                    closable
                    v-for="(item2,index2) in item1.children"
                    :key="index2"
                    @close="handleClose()"
                  >{{item2.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    async loadroles() {
      console.log("load---");

      const res = await this.$http.get("roles");
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.tableData = data;
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
      console.log("roles=====", res.data);
    },
    openAddDialog() {},
    handleClose() {
      console.log("---close");
    }
  },
  mounted() {
    this.loadroles();
  }
};
</script>

<style>
</style>
