<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div>
          <img src="../assets/login.jpeg" alt />
          <span>移动应用开发后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :collapse-transition="false"
            background-color="#f7f3ff"
            text-color="#000"
            active-text-color="#595ff8"
            router
          >
            <el-menu-item index="/index">
              <el-icon><icon-ep-menu /></el-icon>
              <template #title>首页</template>
            </el-menu-item>
            <el-menu-item index="/user">
              <el-icon><icon-ep-menu /></el-icon>
              <template #title>用户管理</template>
            </el-menu-item>
            <el-menu-item index="/slide">
              <el-icon><icon-ep-menu /></el-icon>
              <template #title>轮播管理</template>
            </el-menu-item>
          </el-menu>
          <div class="toggle-button" @click="toggleCollapse">
            <el-icon v-if="isCollapse"><icon-ep-Right /></el-icon>
            <el-icon v-else><icon-ep-Back /></el-icon>
          </div>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'HomeView',
  setup() {
    const router = useRouter()
    const isCollapse = ref(false)

    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value
    }
    const logout = () => {
      localStorage.removeItem('token')
      router.push('/login')
    }
    return {
      logout,
      router,
      isCollapse,
      toggleCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.common-layout,
.common-layout > .el-container {
  height: 100vh;
  // overflow: hidden;
}

.common-layout > .el-container > .el-header {
  height: 3.75rem;
  line-height: 3.75rem;
  background-color: #986cfb;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.common-layout > .el-container {
  > .el-header > div {
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    > span {
      font-size: 20px;
    }
  }
  .el-aside {
    position: relative;
    height: 100vh;
    color: #fff;
    overflow: visible;
  }
  .el-main {
    height: 100vh;
    background-color: #f5f5f5;
    color: #333;
    text-align: center;
  }
  .toggle-button {
    position: absolute;
    top: 50vh;
    right: -15px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    cursor: pointer;
    background-color: #fff;
    color: #000;
    border-radius: 50%;
    i {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
