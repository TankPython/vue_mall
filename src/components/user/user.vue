<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="searchValue"  clearable>
        <el-button slot="append" icon="el-icon-search" @click="loadUserlist"></el-button>
      </el-input>

      <el-button type="primary" @click="openAddDialog">添加用户</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%; margin-top: 15px;">
      <el-table-column type="index" prop="index" label="#"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>

      <el-table-column label="创建日期">
        <template slot-scope="dataTable">
          <div>{{dataTable.row.create_time|dateFmt('YYYY-MM-DD')}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="dataTable">
          <el-switch
            v-model="dataTable.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column prop label="操作">
        <template slot-scope="dataTable">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            circle
            @click="editAddDialog(dataTable.row.id)"
          ></el-button>

          <el-button type="success" icon="el-icon-check" plain circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="delUser(dataTable.row.id)" plain circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 15px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormAddVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="120px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false , form={}">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormEditVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="120px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false , form={}">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // dialogTableVisible: false,
      dialogFormAddVisible: false,
      dialogFormEditVisible: false,
      form: {},
      searchValue: "",
      pagenum: 1,
      pagesize: 10,
      total: 1
    };
  },
  methods: {
    openAddDialog() {
      // this.dialogTableVisible = true;
      this.dialogFormAddVisible = true;
    },
    editAddDialog(id) {
      console.log("edit id=", id);
      // this.dialogTableVisible = true;
      this.dialogFormEditVisible = true;
    },
    async loadUserlist() {
      console.log("load---");
      const token = sessionStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = token;
      const res = await this.$http.get(
        "users" +
          `?query=${this.searchValue}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      const {
        data: { users, total },
        meta: { msg, status }
      } = res.data;
      if (status == 200) {
        this.tableData = users;
        this.$message.success(msg);
        this.total = total;
        console.log("total=", total);
      } else {
        this.$message.warning(msg);
      }
      console.log("users=====", res.data);
    },
    async addUser() {
      this.dialogFormAddVisible = false;
      const token = sessionStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = token;
      const res = await this.$http.post("users", this.form);
      this.form = {};
      const {
        data: { users },
        meta: { msg, status }
      } = res.data;
      if (status == 200) {
        this.tableData = users;
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
      this.loadUserlist();
    },
    editUser() {
      this.dialogFormEditVisible = false;
    },
    delUser(id){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${id}`)
          const data = res.data
          // console.log(data)
          const { meta: { status, msg } } = data

          if (status === 200) {
            // 删除成功 重新加载数据
            this.pagenum = 1
            this.loadUserlist()
          } else {
            this.$message({
              type: 'success',
              message: msg
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: msg
          })
        })
    },
    handleSizeChange(val) {
      this.pagenum = 1
      this.pagesize = val;
      this.loadUserlist();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadUserlist();
      console.log(`当前页: ${val}`);
    }
  },
  mounted() {
    this.loadUserlist();
  }
};
</script>

<style>
.el-input {
  width: 400px;
}
</style>
