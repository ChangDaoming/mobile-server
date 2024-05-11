<template>
  <el-breadcrumb separator-class="icon-ep-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="user-view">
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 90%"
      highlight-current-row
    >
      <el-table-column prop="_id" label="UID" width="220" align="center" />
      <el-table-column prop="username" label="用户名" align="center" />
      <el-table-column prop="password" label="密码" align="center" />
      <el-table-column label="操作" align="center">
        <template #header>
          <el-button type="success" @click="centerDialogVisible = true"
            >添加账号</el-button
          >
        </template>
        <template #default="{ row }">
          <el-button type="danger" size="small" @click="handleClick(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="centerDialogVisible"
      title="添加用户"
      width="50%"
      align-center
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false"> 取消 </el-button>
          <el-button
            type="primary"
            :disabled="addForm.password.length > 5 ? false : true"
            @click="addUser"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { register, getUsers, deleteUser } from '@/http/api'

export default {
  name: 'UserView',
  setup() {
    // 模拟数据
    const tableData = ref([])
    // 是否显示添加账号的弹窗
    const centerDialogVisible = ref(false)
    // 添加账号的表单
    const addForm = reactive({
      username: '',
      password: ''
    })
    // 添加账号的表单校验规则
    const addFormRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
      ]
    }

    // 加载状态
    const loading = ref(true)

    // 获取用户列表
    const getUserList = async () => {
      const res = await getUsers()
      if (res.code !== 200) return ElMessage.error('获取用户列表失败')
      // 加载2秒后显示数据函数
      setTimeout(() => {
        loading.value = false
        tableData.value = res.data
      }, 500)
    }

    // 页面加载时获取用户列表
    onMounted(() => {
      getUserList()
    })

    // 添加账号的弹窗表单
    const addFormRef = ref(null)

    // 添加账号的弹窗表单提交
    const addUser = async () => {
      if (addForm.username === '' || addForm.password === '') {
        ElMessage.error('用户名或密码不能为空')
        addFormRef.value.resetFields()
        return
      }
      const username = addForm.username.length
      const password = addForm.password.length
      if (password > 12 || password < 6 || username < 3 || username > 10) {
        ElMessage.error('用户名或密码长度不合法')
        addFormRef.value.resetFields()
        return
      }
      // 表单提交
      const res = await register(addForm)
      console.log(res)
      if (res.code !== 200) return ElMessage.error(res.message)

      ElMessage.success(res.message)

      // 获取用户列表
      getUserList()
      // 关闭弹窗
      centerDialogVisible.value = false
      // 清空表单
      addFormRef.value.resetFields()
    }
    // 删除用户
    const handleClick = async (e) => {
      // 弹出确认框
      await ElMessageBox.confirm(`确定删除用户 ${e.username} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteUser(e)
          if (res.code !== 200) return ElMessage.error(res.message)
          ElMessage.success(res.message)

          // 获取用户列表
          getUserList()
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除'
          })
        })
    }
    return {
      tableData,
      handleClick,
      centerDialogVisible,
      addForm,
      addFormRules,
      addFormRef,
      loading,
      addUser,
      getUserList
    }
  }
}
</script>

<style lang="less" scoped>
.user-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  > .el-table {
    margin-top: 20px;
    > .el-table-column {
      text-align: center;
    }
  }
}
</style>
