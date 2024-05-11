<template>
  <h3>管理</h3>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>添加商品</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'SlideView',
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped></style>
