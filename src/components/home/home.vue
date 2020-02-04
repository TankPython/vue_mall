<template>
    <el-container class="container">
      <el-header class="header">
        <el-row class="elrow">
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <img src="../../assets/static/aa.png" alt />
            </div>
          </el-col>
          <el-col :span="18" class="middle">
            <div>
              <h2 class="wordh2">后台管理系统</h2>
            </div>
          </el-col>
          <el-col :span="2" class="loginout">
            <div class="grid-content bg-purple">
              <a @click.prevent="loginout">退出</a>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="container2">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

          <el-menu default-active="2" class="menu" 
          :router="true"
          :unique-opened="true">
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>

              <el-menu-item index="/user">
                <i class="el-icon-setting"></i>用户列表
              </el-menu-item>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>

              <el-menu-item index="51">
                <i class="el-icon-setting"></i>角色列表
              </el-menu-item>
              <el-menu-item index="52">
                <i class="el-icon-setting"></i>权限列表
              </el-menu-item>
            </el-submenu>

            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>

              <el-menu-item index="71">
                <i class="el-icon-setting"></i>商品列表
              </el-menu-item>

              <el-menu-item index="72">
                <i class="el-icon-setting"></i>分类参数
              </el-menu-item>

              <el-menu-item index="73">
                <i class="el-icon-setting"></i>商品分类
              </el-menu-item>
            </el-submenu>

            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>

              <el-menu-item index="81">
                <i class="el-icon-setting"></i>订单列表
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  created(){
    const token = sessionStorage.getItem('token')
    if(!token){
      this.$router.push({name: 'login'})
      this.message.warning('请先登录')
    }
  }, 
  methods:{
      loginout(){
        sessionStorage.clear()
           this.$router.push({name: 'login'})
           this.$message.success('退出成功')
      }

}
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}
.header {
  height: 200px;
  width: 100%;
  background-color: #b3c0d1;
  text-align: center;
}

.aside,
.menu {
  height: 100%;
}
.main {
  background-color: #e9eef3;
}
.loginout,
.middle,
.wordh2 {
  margin: 0%;
  height: 100%;
}

.loginout {
  margin-top: 19px;
}

.middle {
  margin-top: 14px;
}
</style>
