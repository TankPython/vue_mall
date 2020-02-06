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
        <el-menu default-active="2" class="menu" :router="true" :unique-opened="true">
          <el-submenu :index="item.path" v-for="(item,i) in menus" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item :index="item1.path" v-for="(item1,i1) in item.children" :key="i1">
              <i class="el-icon-setting"></i>
              {{item1.authName}}
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
  data () {
    return {
      menus: []
    }
  },
  created () {
    const token = sessionStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: 'login' })
      this.$message.warning('请先登录')
      return
    }
    this.getMenus()
  },
  methods: {
    loginout () {
      sessionStorage.clear()
      this.$router.push({ name: 'login' })
      this.$message.success('退出成功')
    },
    async getMenus () {
      const res = await this.$http.get(`menus`)
      console.log('menus=', res.data)
      const {
        data,
        meta: { status }
      } = res.data
      if (status === 200) {
        this.menus = data
      }
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
